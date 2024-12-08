import { Slide } from "@mui/material";
import React from "react";

export const displayErrors = (errors, enqueueSnackbar) => {
  if (errors) {
    for (const error of errors) {
      enqueueSnackbar(error, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  }
};

export const filterAndSortMarketplaceListings = (
  listings,
  optionsSelected,
  forSaleOnly,
  sortBy,
  priceRange
) => {
  let filteredSortedListings = [...listings];

  filteredSortedListings.sort((a, b) => a.name.localeCompare(b.name));

  if (forSaleOnly) {
    filteredSortedListings = filteredSortedListings.filter(
      (listing) => listing.listings.length > 0
    );
  }
  if (optionsSelected[0].length > 0) {
    filteredSortedListings = filteredSortedListings.filter((listing) =>
      optionsSelected[0].includes(listing.brand)
    );
  }
  if (optionsSelected[1].length > 0) {
    filteredSortedListings = filteredSortedListings.map((listing) => {
      return {
        ...listing,
        listings: listing.listings.filter((listing) =>
          optionsSelected[1].includes(listing.size)
        ),
      };
    });
  }
  if (priceRange[0] !== "" || priceRange[1] !== "") {
    filteredSortedListings = filteredSortedListings.filter((listing) => {
      const listingPrice = listing.listings[0]?.price;
      if (!listingPrice) return false;

      if (priceRange[0] === "") {
        return listingPrice <= priceRange[1];
      } else if (priceRange[1] === "") {
        return listingPrice >= priceRange[0];
      } else {
        return listingPrice >= priceRange[0] && listingPrice <= priceRange[1];
      }
    });
  }
  if (sortBy === "Price: Low to High") {
    filteredSortedListings = filteredSortedListings.sort((a, b) => {
      if (!a.listings[0]) return 1;
      if (!b.listings[0]) return -1;
      return a.listings[0].price - b.listings[0].price;
    });
  } else if (sortBy === "Price: High to Low") {
    filteredSortedListings = filteredSortedListings.sort((a, b) => {
      if (!a.listings[0]) return 1;
      if (!b.listings[0]) return -1;
      return b.listings[0].price - a.listings[0].price;
    });
  }
  return filteredSortedListings;
};

export const filterAndSortProfileItems = (
  items,
  optionsSelected,
  forSaleOnly,
  sortBy,
  priceRange,
  searchTerm
) => {
  let filteredSortedItems = [...items];

  filteredSortedItems.sort((a, b) => {
    return a.name !== b.name ? a.name.localeCompare(b.name) : a.size - b.size;
  });

  if (forSaleOnly) {
    filteredSortedItems = filteredSortedItems.filter((item) => item.price);
  }
  if (optionsSelected[0].length > 0) {
    filteredSortedItems = filteredSortedItems.filter((item) =>
      optionsSelected[0].includes(item.brand)
    );
  }
  if (optionsSelected[1].length > 0) {
    filteredSortedItems = filteredSortedItems.filter((item) =>
      optionsSelected[1].includes(item.size)
    );
  }
  if (priceRange[0] !== "" || priceRange[1] !== "") {
    filteredSortedItems = filteredSortedItems.filter((item) => {
      const itemPrice = item.price;
      if (!itemPrice) return false;

      if (priceRange[0] === "") {
        return itemPrice <= priceRange[1];
      } else if (priceRange[1] === "") {
        return itemPrice >= priceRange[0];
      } else {
        return itemPrice >= priceRange[0] && itemPrice <= priceRange[1];
      }
    });
  }
  if (sortBy === "Price: Low to High") {
    filteredSortedItems = filteredSortedItems.sort((a, b) => {
      if (!a.price) return 1;
      if (!b.price) return -1;
      return a.price - b.price;
    });
  } else if (sortBy === "Price: High to Low") {
    filteredSortedItems = filteredSortedItems.sort((a, b) => {
      if (!a.price) return 1;
      if (!b.price) return -1;
      return b.price - a.price;
    });
  }
  if (searchTerm) {
    filteredSortedItems = filteredSortedItems.filter((item) =>
      `${item.name} Size ${item.size}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }
  return filteredSortedItems;
};

export const convertToDisplayPrice = (price) => {
  if (price === "") {
    return " ";
  }
  return `$${parseFloat(price)
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};

export const slideUpTransition = React.forwardRef(function Transition(
  props,
  ref
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
