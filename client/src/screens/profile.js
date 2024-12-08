import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  useTheme,
  Grid,
  OutlinedInput,
  Tabs,
  useMediaQuery,
  Tab,
} from "@mui/material";
import ItemCard from "../components/itemCard";
import SortByFilter from "../components/sortByFilter";
import FiltersBar from "../components/filtersBar";
import { Search as SearchIcon } from "@mui/icons-material";
import LineGraph from "../components/linegraph";
import { convertToDisplayPrice } from "../utils/utils";
import {
  getActiveListings,
  getItems,
  getUser,
  getWatchlist,
} from "../redux/actions/profileActions";
import { getLoadingAndErrors } from "../redux/helpers/requestsSelectors";
import { useSnackbar } from "notistack";
import { filterAndSortProfileItems, displayErrors } from "../utils/utils.js";
import { RequestsEnum } from "../redux/helpers/requestsEnum";
import Loading from "../components/loading";
import LogInReminder from "../components/logInReminder";
import { s3Object } from "../redux/constants";

export default function Profile() {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { user, items, activeListings, watchlist } = useSelector(
    (state) => state.profile
  );
  const { isLoading, errors } = useSelector((state) =>
    getLoadingAndErrors(state, [
      RequestsEnum.profileGetUser,
      RequestsEnum.profileGetItems,
      RequestsEnum.profileGetActiveListings,
      RequestsEnum.profileGetWatchlist,
    ])
  );
  const [optionsSelected, setOptionsSelected] = useState([[], []]);
  const [forSaleOnly, setForSaleOnly] = useState(false);
  const [sortBy, setSortBy] = useState("Price: Low to High");
  const [priceRange, setPriceRange] = useState(["", ""]);
  const [filterOptions, setFilterOptions] = useState([[], []]);
  const [filteredSortedItems, setFilteredSortedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [tab, setTab] = useState("items");
  const sortByOptions = ["Price: Low to High", "Price: High to Low"];

  useEffect(() => {
    if (!user) return;

    dispatch(getUser(user.email));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!user) return;

    dispatch(getItems(user.id));
    dispatch(getActiveListings(user.id));
    dispatch(getWatchlist(user.id));
  }, [user, dispatch]);

  useEffect(() => {
    displayErrors(errors, enqueueSnackbar);
  }, [errors, enqueueSnackbar]);

  useEffect(() => {
    if (!items) return;
    setFilterOptions([
      Array.from(new Set(items.map((item) => item.brand))).sort(),
      Array.from(new Set(items.map((item) => item.size))).sort((a, b) => a - b),
    ]);
  }, [items]);

  useEffect(() => {
    setFilteredSortedItems(
      filterAndSortProfileItems(
        items,
        optionsSelected,
        forSaleOnly,
        sortBy,
        priceRange,
        searchTerm
      )
    );
  }, [items, optionsSelected, forSaleOnly, sortBy, priceRange, searchTerm]);

  const clearFilters = () => {
    setOptionsSelected([[], []]);
    setForSaleOnly(false);
    setPriceRange(["", ""]);
  };

  const switchTabs = (tab) => {
    setTab(tab);
    clearFilters();
  };

  if (!user) return <LogInReminder />;
  if (isLoading) return <Loading />;

  const renderItemsTab = () => {
    return (
      <Box
        sx={{
          display: { xs: "block", md: "flex" },
        }}
      >
        <Box display="flex" columnGap="32px" marginBottom="16px">
          <FiltersBar
            clearFilters={clearFilters}
            options={filterOptions}
            optionsSelected={optionsSelected}
            setOptionsSelected={setOptionsSelected}
            forSaleOnly={forSaleOnly}
            setForSaleOnly={setForSaleOnly}
            setPriceRange={setPriceRange}
            isMediumScreen={isMediumScreen}
          />
          {isMediumScreen && (
            <SortByFilter
              sortBy={sortBy}
              setSortBy={setSortBy}
              options={sortByOptions}
              isMediumScreen={isMediumScreen}
            />
          )}
        </Box>
        <Box width="100%">
          <Box
            display="flex"
            marginBottom="16px"
            alignItems="center"
            justifyContent="space-between"
          >
            <OutlinedInput
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              startAdornment={
                <SearchIcon sx={{ color: theme.palette.secondary.bold }} />
              }
              placeholder="Search"
              sx={{
                ...theme.inputAnimation,
                height: "48px",
                width: "100%",
                marginRight: "32px",
              }}
            />
            <Box display="flex" alignItems="center">
              <Typography variant="h6" marginRight="16px" whiteSpace="nowrap">
                {filteredSortedItems.length}{" "}
                {filteredSortedItems.length === 1 ? "item" : "items"}
              </Typography>
              {!isMediumScreen && (
                <SortByFilter
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  options={sortByOptions}
                  isMediumScreen={isMediumScreen}
                />
              )}
            </Box>
          </Box>
          {filteredSortedItems.length === 0 ? (
            <Box
              borderRadius="16px"
              border={`1px solid ${theme.palette.secondary.outline}`}
              height="400px"
              display="flex"
            >
              <Typography variant="h6" fontSize="30px" margin="auto">
                No items to display
              </Typography>
            </Box>
          ) : (
            <Grid container spacing="32px">
              {filteredSortedItems.map((item, idx) => (
                <Grid item key={idx} xs={6} sm={4} md={4} lg={3} xl={2.4}>
                  <ItemCard
                    sneakerId={item.sneaker_id}
                    image={s3Object(item.sneaker_id)}
                    title={`${item.name} Size ${item.size}`}
                    price={item.price}
                    page="profile"
                    sneakerSize={item.size}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>
    );
  };

  const renderActiveListingsTab = () => {
    return (
      <>
        {activeListings.length === 0 ? (
          <Box
            borderRadius="16px"
            border={`1px solid ${theme.palette.secondary.outline}`}
            height="400px"
            display="flex"
          >
            <Typography variant="h6" fontSize="30px" margin="auto">
              No listings to display
            </Typography>
          </Box>
        ) : (
          <>
            {activeListings.map((listing, idx) => {
              return (
                <Box
                  key={idx}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  padding="8px"
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    onClick={() => navigate(`/product/${listing.sneaker_id}`)}
                    sx={{
                      cursor: "pointer",
                    }}
                  >
                    <Box
                      component="img"
                      src={s3Object(listing.sneaker_id)}
                      alt="image"
                      width="48px"
                      borderRadius="10px"
                      marginRight="16px"
                    />
                    <Typography
                      variant="h6"
                      fontSize="14px"
                      sx={{
                        WebkitLineClamp: "1",
                        ...theme.ellipsis,
                      }}
                    >
                      {`${listing.name} Size ${listing.size}`}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <Typography
                      variant="h6"
                      fontSize="14px"
                      flex="1"
                      textAlign="right"
                      whiteSpace="nowrap"
                      marginRight="16px"
                    >
                      {convertToDisplayPrice(listing.price)}
                    </Typography>
                    <Box
                      sx={{
                        ...theme.basicButton,
                        height: "48px",
                        backgroundColor: theme.palette.accent.dark,
                        color: theme.palette.primary.main,
                        "&:hover": {
                          backgroundColor: theme.palette.accent.hover,
                          cursor: "pointer",
                        },
                      }}
                      onClick={() => navigate(`/listing/${listing.id}`)}
                    >
                      <Typography variant="h6" whiteSpace="nowrap">
                        Edit Listing
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </>
        )}
      </>
    );
  };

  return (
    <Box>
      <Typography
        variant="h6"
        fontSize="30px"
        sx={{
          WebkitLineClamp: "1",
          ...theme.ellipsis,
        }}
      >
        {`${user.first_name} ${user.last_name}`} |{" "}
        {convertToDisplayPrice(user.balance)} |{" "}
        {`Referral Code: ${user.id.slice(0, 5).toUpperCase()}`}
      </Typography>
      <Grid container rowSpacing="16px" columnSpacing="64px">
        {/* <Grid item xs={12} md={8}>
          <LineGraph tempPrice={convertToDisplayPrice(user.balance)} />
        </Grid> */}
        <Grid item xs={12} md={12}>
          <Typography variant="h6">Watchlist</Typography>
          <Box
            overflow="auto"
            borderRadius="16px"
            border={`1px solid ${theme.palette.secondary.outline}`}
            height="auto"
          >
            {watchlist.length === 0 ? (
              <Box
                borderRadius="16px"
                border={`1px solid ${theme.palette.secondary.outline}`}
                display="flex"
                height="100%"
              >
                <Typography variant="h6" fontSize="30px" margin="auto">
                  No items to display
                </Typography>
              </Box>
            ) : (
              watchlist.map((item, i) => (
                <Box
                  key={i}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  padding="8px"
                  onClick={() => navigate(`/product/${item.sneaker_id}`)}
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  <Box
                    component="img"
                    src={s3Object(item.sneaker_id)}
                    alt="image"
                    width="48px"
                    borderRadius="10px"
                    marginRight="16px"
                  />
                  <Typography
                    variant="h6"
                    fontSize="14px"
                    sx={{
                      WebkitLineClamp: "1",
                      ...theme.ellipsis,
                    }}
                  >
                    {item.name}
                  </Typography>
                  <Typography
                    variant="h6"
                    fontSize="14px"
                    flex="1"
                    textAlign="right"
                    whiteSpace="nowrap"
                    marginLeft="16px"
                  >
                    {item.price
                      ? convertToDisplayPrice(item.price)
                      : "Not for Sale"}
                  </Typography>
                </Box>
              ))
            )}
          </Box>
        </Grid>
      </Grid>
      <Box margin="32px 0">
        <Tabs
          textColor="inherit"
          value={tab}
          onChange={(_, tab) => switchTabs(tab)}
          TabIndicatorProps={{
            style: {
              backgroundColor: "black",
            },
          }}
        >
          <Tab label="Items" value="items" />
          <Tab label="Active Listings" value="activeListings" />
        </Tabs>
      </Box>
      {tab === "items" ? renderItemsTab() : renderActiveListingsTab()}
    </Box>
  );
}
