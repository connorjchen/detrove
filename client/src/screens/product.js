import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSearchParams, Link, useParams } from "react-router-dom";
import { Box, Typography, useTheme, Grid, useMediaQuery } from "@mui/material";
import ContentBox from "../components/contentBox";
import LineGraph from "../components/linegraph";
import {
  getSneaker,
  getListings,
  getIsWatchlistItem,
  createWatchlistItem,
  deleteWatchlistItem,
} from "../redux/actions/productActions";
import { displayErrors, convertToDisplayPrice } from "../utils/utils.js";
import { RequestsEnum } from "../redux/helpers/requestsEnum";
import { getLoadingAndErrors } from "../redux/helpers/requestsSelectors";
import { useSnackbar } from "notistack";
import Loading from "../components/loading";
import { SelectSize } from "../components/selectSize";
import { s3Object } from "../redux/constants";
import {
  StarBorder as StarBorderIcon,
  Star as StarIcon,
} from "@material-ui/icons";

export default function Product() {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const dispatch = useDispatch();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [params, setParams] = useState({});
  const { sneakerId } = useParams();
  const { sneaker, listings, isWatchlistItem } = useSelector(
    (state) => state.product
  );
  const { user } = useSelector((state) => state.profile);
  const { isLoading, errors } = useSelector((state) =>
    getLoadingAndErrors(state, [
      RequestsEnum.productGetSneaker,
      RequestsEnum.productGetListings,
      RequestsEnum.productGetIsWatchlistItem,
    ])
  );
  const [sizeSelected, setSizeSelected] = useState("Select Size");
  const [price, setPrice] = useState("");

  useEffect(() => {
    dispatch(getSneaker(sneakerId));
    dispatch(getListings(sneakerId));

    if (!user) return;
    dispatch(getIsWatchlistItem(user.id, sneakerId));
  }, [dispatch, user, sneakerId]);

  useEffect(() => {
    displayErrors(errors, enqueueSnackbar);
  }, [errors, enqueueSnackbar]);

  const handleSizeSelect = (size) => {
    setSizeSelected(size);
    setParams({ ...params, size });
    setPrice(listings.find((l) => l.size === size)?.price);
  };

  const ItemLabels = ({ sneaker }) => {
    const labelsToDisplay = [
      { label: "Name", value: sneaker.name },
      { label: "Gender", value: sneaker.gender },
      { label: "Colorway", value: sneaker.colorway },
      {
        label: "Release Date",
        value: new Date(sneaker.release_date).toLocaleDateString(),
      },
      {
        label: "Retail Price",
        value: convertToDisplayPrice(sneaker.retail_price),
      },
      { label: "Style Code", value: sneaker.style_code },
    ];

    return (
      <>
        {labelsToDisplay.map(({ label, value }, i) => (
          <Grid item xs={4} sm={2} key={i} textAlign="center">
            <Box margin="16px 0">
              <Typography variant="h6">{label}</Typography>
              <Typography variant="h6">{value}</Typography>
            </Box>
          </Grid>
        ))}
      </>
    );
  };

  const WatchListButton = () => {
    if (!user) return null;

    if (!isWatchlistItem) {
      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => dispatch(createWatchlistItem(user.id, sneakerId))}
        >
          <StarBorderIcon style={{ color: theme.palette.gold.main }} />
          <Typography variant="h6" fontSize="14px" whiteSpace="nowrap">
            Add to Watchlist
          </Typography>
        </Box>
      );
    } else {
      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => dispatch(deleteWatchlistItem(user.id, sneakerId))}
        >
          <StarIcon style={{ color: theme.palette.gold.main }} />
          <Typography variant="h6" fontSize="14px" whiteSpace="nowrap">
            Remove from Watchlist
          </Typography>
        </Box>
      );
    }
  };

  if (isLoading) return <Loading />;

  return (
    <Box display="flex" justifyContent="center">
      <Grid container spacing="16px" width="1200px">
        <Grid
          item
          xs={12}
          justifyContent="space-between"
          alignItems="center"
          sx={{
            display: { xs: "block", sm: "flex" },
          }}
        >
          <Typography variant="h6" fontSize="24px">
            {sneaker.name}
          </Typography>
          <WatchListButton />
        </Grid>
        <Grid item xs={12} sm={8}>
          <LineGraph sneakerId={sneaker.id} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              marginLeft: { xs: 0, sm: "48px" },
              display: { xs: "flex", sm: "block" },
            }}
          >
            <Box
              component="img"
              src={s3Object(sneaker.id)}
              borderRadius="16px"
              sx={{
                width: { xs: "50%", sm: "100%" },
              }}
            />
            <Box
              sx={{
                width: { xs: "50%", sm: "100%" },
                margin: { xs: "auto 0 auto 32px", sm: 0 },
              }}
            >
              <SelectSize
                listings={listings}
                sizeSelected={sizeSelected}
                handleSizeSelect={(size) => handleSizeSelect(size)}
                noMarginTop={isSmallScreen ? true : false}
              />
              <Link
                to={`/buy/${sneakerId}?${createSearchParams(params)}`}
                style={{
                  textDecoration: "none",
                }}
              >
                <Box
                  sx={{
                    ...theme.basicButton,
                    backgroundColor: theme.palette.accent.dark,
                    color: theme.palette.primary.main,
                    marginTop: "16px",
                    "&:hover": {
                      backgroundColor: theme.palette.accent.hover,
                    },
                  }}
                >
                  <Typography variant="h6" textAlign="center">
                    Checkout {price ? convertToDisplayPrice(price) : ""}
                  </Typography>
                </Box>
              </Link>
            </Box>
          </Box>
        </Grid>
        <ItemLabels sneaker={sneaker} />
        <Grid item xs={12}>
          <ContentBox
            title="About"
            content={
              <Typography variant="h6">{sneaker.description}</Typography>
            }
          />
        </Grid>
        <Grid item xs={12}>
          <ContentBox
            title="Information"
            content={
              <Typography variant="h6">
                Any sneaker issued by Detrove is redeemable for its physical
                counterpart at anytime. To redeem, please email
                contact@detrove.com. If you have any questions or concerns, you
                can reach us at contact@detrove.com.
              </Typography>
            }
          />
        </Grid>
      </Grid>
    </Box>
  );
}
