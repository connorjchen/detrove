import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Typography,
  useTheme,
  OutlinedInput,
  Divider,
} from "@mui/material";
import ItemCard from "../components/itemCard";
import { getListing, updateListing } from "../redux/actions/listingActions";
import { displayErrors, convertToDisplayPrice } from "../utils/utils.js";
import { RequestsEnum } from "../redux/helpers/requestsEnum";
import { getLoadingAndErrors } from "../redux/helpers/requestsSelectors";
import { useSnackbar } from "notistack";
import Loading from "../components/loading";
import LogInReminder from "../components/logInReminder";
import { s3Object } from "../redux/constants";

export default function Listing() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();

  const { listingId } = useParams();
  const { listing } = useSelector((state) => state.listing);
  const { user } = useSelector((state) => state.profile);
  const { isLoading, errors } = useSelector((state) =>
    getLoadingAndErrors(state, [
      RequestsEnum.profileGetUser,
      RequestsEnum.listingGetListing,
    ])
  );
  const [price, setPrice] = useState("");
  const fee = 0.95;

  useEffect(() => {
    dispatch(getListing(listingId));
  }, [dispatch, listingId]);

  useEffect(() => {
    if (listing) {
      setPrice(listing.price);
    }
  }, [listing]);

  useEffect(() => {
    displayErrors(errors, enqueueSnackbar);
  }, [errors, enqueueSnackbar]);

  const handleUpdateListing = (isDeleted) => {
    dispatch(updateListing(listingId, price, isDeleted)).then((res) => {
      navigate("/profile");
    });
  };

  const handleSetPrice = (e) => {
    const value = e.target.value;
    const regex = /^\d{0,8}(\.\d{0,2})?$/;
    if (regex.test(value)) {
      setPrice(value);
    }
  };

  function renderPriceInput() {
    return (
      <Box>
        <Typography variant="h6">Price</Typography>
        <OutlinedInput
          value={price}
          type="number"
          onChange={handleSetPrice}
          startAdornment={<Typography variant="h6">$</Typography>}
          placeholder="Price"
          sx={{
            ...theme.inputAnimation,
            height: "48px",
            width: "100%",
          }}
        />
      </Box>
    );
  }

  function FeesInfo() {
    return (
      <>
        <Typography variant="h6">Fees</Typography>
        <Box display="flex" justifyContent="space-between">
          <Typography
            variant="h6"
            fontSize="14px"
            color={theme.palette.secondary.bold}
          >
            Service Fee
          </Typography>
          <Typography
            variant="h6"
            fontSize="14px"
            color={theme.palette.secondary.bold}
          >
            5%
          </Typography>
        </Box>
      </>
    );
  }

  function TotalIncome() {
    return (
      <>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6" fontSize="20px">
            Total Income:
          </Typography>
          <Typography variant="h6" fontSize="20px">
            {price ? `${convertToDisplayPrice(price * fee)}` : "$"}
          </Typography>
        </Box>
      </>
    );
  }

  function UpdateButton() {
    return (
      <Box
        sx={{
          ...theme.basicButton,
          height: "48px",
          backgroundColor: theme.palette.accent.dark,
          color: theme.palette.primary.main,
          marginTop: "32px",
          "&:hover": {
            backgroundColor: theme.palette.accent.hover,
            cursor: "pointer",
          },
        }}
        onClick={() => handleUpdateListing(false)}
      >
        <Typography variant="h6">Update Listing</Typography>
      </Box>
    );
  }

  function DeleteButton() {
    return (
      <Box
        sx={{
          ...theme.basicButton,
          height: "48px",
          backgroundColor: theme.palette.error.main,
          color: theme.palette.primary.main,
          marginTop: "32px",
          "&:hover": {
            backgroundColor: theme.palette.error.hover,
            cursor: "pointer",
          },
        }}
        onClick={() => handleUpdateListing(true)}
      >
        <Typography variant="h6">Delete Listing</Typography>
      </Box>
    );
  }

  if (!user) return <LogInReminder />;
  if (isLoading) return <Loading />;
  if (listing.seller_id !== user.id)
    return (
      <Box
        borderRadius="16px"
        border={`1px solid ${theme.palette.secondary.outline}`}
        display="flex"
        height="100%"
        width="100%"
      >
        <Typography variant="h6" fontSize="30px" margin="auto">
          You are not the seller of this listing.
        </Typography>
      </Box>
    );

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexFlow: { xs: "column-reverse", md: "row" },
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
        }}
      >
        <Typography variant="h6" fontSize="30px" marginBottom="16px">
          Update Listing
        </Typography>
        {renderPriceInput()}
        <Divider sx={{ margin: "16px 0" }} />
        <FeesInfo />
        <Divider sx={{ margin: "16px 0" }} />
        <TotalIncome />
        <UpdateButton />
        <DeleteButton />
      </Box>
      <Box
        sx={{
          width: "fit-content",
          margin: { xs: "0 auto 32px auto", md: "0 0 0 32px" },
        }}
      >
        <Typography variant="h6" marginBottom="16px">
          Preview
        </Typography>
        <ItemCard
          address={1}
          image={s3Object(listing.sneaker_id)}
          title={`${listing.name} ${listing.size}`}
          price={price ?? ""}
          page="sell"
        />
      </Box>
    </Box>
  );
}
