import React from "react";
import { Link } from "react-router-dom";
import {
  useTheme,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { convertToDisplayPrice } from "../utils/utils";

export default function ItemCard({
  sneakerId,
  image,
  title,
  price,
  page,
  sneakerSize,
}) {
  const theme = useTheme();

  function ItemCardContent() {
    let displayedPrice;
    if (!price) {
      if (page === "marketplace") {
        displayedPrice = "Not for Sale";
      } else if (page === "profile") {
        displayedPrice = "Unlisted";
      }
    } else {
      displayedPrice = convertToDisplayPrice(price);
    }

    return (
      <Box
        sx={{
          "&:hover .for-sale-popup": {
            opacity: "1",
          },
        }}
      >
        <CardMedia component="img" height="auto" image={image} alt="image" />
        <CardContent>
          <Typography
            variant="h6"
            fontSize="14px"
            lineHeight="24px"
            sx={{
              minHeight: "48px",
              marginBottom: "8px",
              WebkitLineClamp: "2",
              ...theme.ellipsis,
            }}
          >
            {title}
          </Typography>
          <Typography variant="h6" fontSize={"12px"}>
            Price
          </Typography>
          <Box>
            <Typography variant="h6">{displayedPrice}</Typography>
          </Box>
        </CardContent>
        {!price && page === "profile" && (
          <Link
            to={`/sell/${sneakerId}/?size=${sneakerSize}`}
            style={{
              textDecoration: "none",
            }}
          >
            <Box
              className="for-sale-popup"
              sx={{
                display: "flex",
                backgroundColor: theme.palette.accent.dark,
                color: theme.palette.primary.main,
                height: "65px",
                bottom: "58px",
                marginBottom: "-58px",
                position: "relative",
                padding: "0 16px",
                opacity: 0,
                cursor: "pointer",
                ...theme.easeTransition,
                "&:hover": {
                  backgroundColor: theme.palette.accent.hover,
                },
              }}
            >
              <Typography variant="h6" textAlign="center" margin="auto">
                List for Sale
              </Typography>
            </Box>
          </Link>
        )}
      </Box>
    );
  }

  if (page === "marketplace" || page === "profile") {
    return (
      <Link
        to={`/product/${sneakerId}`}
        style={{
          textDecoration: "none",
        }}
      >
        <Card
          sx={{
            borderRadius: "16px",
            boxShadow:
              "0px 2px 16px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
            ...theme.easeTransition,
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        >
          <CardActionArea>
            <ItemCardContent />
          </CardActionArea>
        </Card>
      </Link>
    );
  } else if (page === "sell" || page === "buy") {
    return (
      <Card
        sx={{
          borderRadius: "16px",
          boxShadow:
            "0px 2px 16px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <CardActionArea
          disableRipple={true}
          sx={{
            cursor: "default",
            "&:hover": {
              "& .MuiCardActionArea-focusHighlight": {
                opacity: 0,
              },
            },
          }}
        >
          <ItemCardContent />
        </CardActionArea>
      </Card>
    );
  }
}
