import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, useTheme, Grid, Typography, useMediaQuery } from "@mui/material";
import { getListings } from "../redux/actions/marketplaceActions";
import { getLoadingAndErrors } from "../redux/helpers/requestsSelectors";
import { useSnackbar } from "notistack";
import {
  filterAndSortMarketplaceListings,
  displayErrors,
} from "../utils/utils.js";
import { RequestsEnum } from "../redux/helpers/requestsEnum";
import SortByFilter from "../components/sortByFilter";
import FiltersBar from "../components/filtersBar";
import ItemCard from "../components/itemCard";
import Loading from "../components/loading";
import { s3Object } from "../redux/constants";

// make state defaults like default optionsSelected or default sizes to reference up here

export default function Marketplace() {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const dispatch = useDispatch();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { listings } = useSelector((state) => state.marketplace);
  const { isLoading, errors } = useSelector((state) =>
    getLoadingAndErrors(state, [RequestsEnum.marketplaceGetListings])
  );
  const [optionsSelected, setOptionsSelected] = useState([[], []]);
  const [forSaleOnly, setForSaleOnly] = useState(true);
  const [sortBy, setSortBy] = useState("Price: Low to High");
  const [priceRange, setPriceRange] = useState(["", ""]);
  const [filterOptions, setFilterOptions] = useState([[], []]);
  const [filteredSortedListings, setFilteredSortedListings] = useState([]);
  const sortByOptions = ["Price: Low to High", "Price: High to Low"];

  useEffect(() => {
    dispatch(getListings());
  }, [dispatch]);

  useEffect(() => {
    displayErrors(errors, enqueueSnackbar);
  }, [errors, enqueueSnackbar]);

  useEffect(() => {
    if (!listings) return;

    setFilterOptions([
      Array.from(new Set(listings.map((listing) => listing.brand))).sort(),
      Array.from(
        new Set(
          listings.reduce((acc, listing) => {
            return [...acc, ...listing.listings.map((listing) => listing.size)];
          }, [])
        )
      ).sort((a, b) => a - b),
    ]);
  }, [listings]);

  useEffect(() => {
    setFilteredSortedListings(
      filterAndSortMarketplaceListings(
        listings,
        optionsSelected,
        forSaleOnly,
        sortBy,
        priceRange
      )
    );
  }, [listings, optionsSelected, forSaleOnly, sortBy, priceRange]);

  const clearFilters = () => {
    setOptionsSelected([[], []]);
    setForSaleOnly(false);
    setPriceRange(["", ""]);
  };

  if (isLoading) return <Loading />;

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
        <Box marginBottom="32px">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h6" fontSize="30px">
              Marketplace
            </Typography>
            <Box display="flex" alignItems="center">
              <Typography variant="h6" marginRight="16px">
                {filteredSortedListings.length}{" "}
                {filteredSortedListings.length === 1 ? "item" : "items"}
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
          <a
            href="https://forms.gle/u1Mz5fcxsG7bdw8v9"
            target="_blank"
            style={{ color: "black" }}
          >
            <Typography
              variant="h6"
              fontSize="16px"
              display="inline-block"
              sx={{ textDecoration: "underline" }}
            >
              Request a Sneaker
            </Typography>
          </a>
        </Box>

        {filteredSortedListings.length === 0 ? (
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
            {filteredSortedListings.map((listing, idx) => (
              <Grid item key={idx} xs={6} sm={4} md={4} lg={3} xl={2.4}>
                <ItemCard
                  sneakerId={listing.id}
                  image={s3Object(listing.id)}
                  title={listing.name}
                  price={listing.listings[0]?.price}
                  page="marketplace"
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
}
