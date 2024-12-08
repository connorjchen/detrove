import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  Box,
  Container,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
  Link,
} from "@mui/material";
import { useSnackbar } from "notistack";
import Button from "../components/landingPage/Button";
import Footer from "../components/landingPage/Footer";
import InfoCard from "../components/landingPage/InfoCard";
import Navbar from "../components/landingPage/Navbar";
import Tile from "../components/landingPage/Tiles";
import authenticityIcon from "../images/authenticity-icon.svg";
import sneakerVideo from "../images/sneakerAnimation2.mp4";
import sneakerVideoCrop from "../images/sneakerAnimation.mp4";
import discountIcon from "../images/discount.png";
import vaultIcon from "../images/vault.png";
import iphone from "../images/iphone demo.png";
import { addEmail, addPageView } from "../redux/actions/landingActions";
import Aos from "aos";
import "aos/dist/aos.css";
import ReactGa from "react-ga";

const Title = styled(Typography)(({ theme }) =>
  theme.unstable_sx({
    fontSize: { xs: "2rem", sm: "3rem", md: "4.75rem" },
    fontWeight: 600,
    letterSpacing: { xs: -1, sm: -0.8 },
    lineHeight: { xs: "40px", sm: "60px", md: "94px" },
  })
);

const Home = () => {
  const mediumMediaQuery = useMediaQuery("(max-width:900px)");
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const valueProposition = searchParams.get("value") ?? "default";

  useEffect(() => {
    Aos.init();
    ReactGa.pageview(`/landing?value=${valueProposition}`);
    dispatch(addPageView("landing", valueProposition));
  }, [dispatch, valueProposition]);

  const TitleText = ({ valueProposition }) => {
    if (valueProposition === "invest") {
      return (
        <Title
          variant="h1"
          sx={{
            maxWidth: { xs: 1, md: 0.6 },
            fontWeight: 900,
            fontSize: "4rem",
          }}
        >
          Resell{" "}
          <span style={{ color: theme.palette.accent.logoDark }}>Sneakers</span>{" "}
          Without Physically Owning Them
        </Title>
      );
    } else if (valueProposition === "storage") {
      return (
        <Title
          variant="h1"
          sx={{
            maxWidth: { xs: 1, md: 0.6 },
            fontWeight: 900,
          }}
        >
          We store your{" "}
          <span style={{ color: theme.palette.accent.logoDark }}>kicks</span>{" "}
          while you sell them
        </Title>
      );
    } else if (valueProposition === "time") {
      return (
        <Title
          variant="h1"
          sx={{
            maxWidth: { xs: 1, md: 0.6 },
            fontWeight: 900,
          }}
        >
          Trade{" "}
          <span style={{ color: theme.palette.accent.logoDark }}>sneakers</span>{" "}
          in 10 seconds
        </Title>
      );
    } else if (valueProposition === "money") {
      return (
        <Title
          variant="h1"
          sx={{
            maxWidth: { xs: 1, md: 0.6 },
            fontWeight: 900,
          }}
        >
          Trade{" "}
          <span style={{ color: theme.palette.accent.logoDark }}>sneakers</span>{" "}
          at only 5% fees
        </Title>
      );
    } else {
      // default
      return (
        <Title
          variant="h1"
          sx={{
            maxWidth: { xs: 1, md: 0.6 },
            fontWeight: 900,
          }}
        >
          Resell{" "}
          <span style={{ color: theme.palette.accent.logoDark }}>Sneakers</span>{" "}
          Without Physically Owning Them
        </Title>
      );
    }
  };

  return (
    <Box id="top-container">
      <Container sx={{ maxWidth: 0.95 }}>
        <Navbar prefixQueryString={`?value=${valueProposition}`} />
        <Box
          data-aos="fade-down"
          data-aos-duration="1000"
          sx={{
            mt: { xs: 4, md: 16 },
            position: "relative",
            overflow: "hidden",
          }}
        >
          {mediumMediaQuery && (
            <video
              src={sneakerVideoCrop}
              autoPlay
              muted
              loop
              playsInline
              style={{
                right: -100,
                width: "100%",
                zIndex: -10,
                WebkitMaskImage: "-webkit-radial-gradient(white, black)",
                outline: "none",
                border: "none",
              }}
            />
          )}
          <TitleText valueProposition={valueProposition} />
          <Typography
            variant="h6"
            sx={{
              fontSize: "1.125rem",
              lineHeight: "24px",
              letterSpacing: "-0.8px",
              maxWidth: { xs: 1, md: 0.5 },
              mt: 4,
            }}
          >
            Enjoy 5% total transaction fees, instant transactions, and zero
            consignment fees
          </Typography>
          <Box
            sx={{
              mt: 6,
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            {/* <OutlinedInput
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Enter Email"
              sx={{
                ...theme.inputAnimation,
                borderRadius: "8px",
                width: { xs: "auto", md: "240px" },
              }}
            /> */}
            {/* <Button
              title="Enter Marketplace"
              variant="primary"
              color="black"
              sx={{
                width: { xs: "auto", md: "240px" },
                boxSizing: "border-box",
                ml: { xs: 0, md: 0 },
                mt: { xs: 2, md: 0 },
              }}
              onClick={() => {
                window.location.href = "https://www.detrove.io/marketplace";
                dispatch(addEmail("google form", valueProposition));
                //   if (/\S+@\S+\.\S+/.test(email) === false) {
                //     enqueueSnackbar("Invalid email format", {
                //       variant: "error",
                //     });
                //     return;
                //   } else {
                //     dispatch(addEmail(email, valueProposition));
                //     setEmail("");
                //     enqueueSnackbar("Email added to waitlist", {
                //       variant: "success",
                //     });
                //     ReactGa.event({
                //       category: "Email Button",
                //       action: `${process.env.REACT_APP_BRANCH} ${valueProposition}`,
                //     });
                //   }
              }}
            /> */}
          </Box>
          <Box
            sx={{
              mt: { xs: 0, md: 19 },
            }}
          >
            {!mediumMediaQuery && (
              <video
                src={sneakerVideo}
                autoPlay
                muted
                playsInline
                style={{
                  width: "100%",
                  height: "85%",
                  position: "absolute",
                  right: -261,
                  top: 30,
                  outline: "none",
                  border: "none",
                  zIndex: -10,
                  borderRadius: "40px",
                  WebkitMaskImage: "-webkit-radial-gradient(white, black)",
                }}
              />
            )}
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            columnGap: { xs: 0, md: "20px" },
            rowGap: { xs: 2, md: 0 },
            mt: { xs: 7, md: 10 },
          }}
        >
          <Tile
            imgSrcImage={mediumMediaQuery ? null : authenticityIcon}
            imgSrcIcon={mediumMediaQuery ? authenticityIcon : null}
            title="Authenticity Guaranteed"
            text="Thanks to our meticulous multi-verification process, we ensure your product is authentic - or your money back."
          />
          <Tile
            compact
            imgSrcIcon={discountIcon}
            title="Save More, Earn More"
            text="Detrove has no shipping cost, no sales tax, and the lowest transaction fees in the game."
          />
        </Box>
        <Box
          data-aos="fade-down"
          data-aos-duration="1000"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            columnGap: { xs: 0, md: "20px" },
            rowGap: { xs: 2, md: 0 },
            mt: 2.5,
          }}
        >
          <Tile
            compact
            imgSrcIcon={vaultIcon}
            title="Save Space in Your Home"
            text="Your brand new sneakers are insured and kept in our secure, climate-controlled vault to be redeemed at any time."
          />
          <Tile
            blackBg
            imgIphone={iphone}
            title="Fast Sales"
            text="Don't waste time on shipping - get your payout instantly when you sell your kicks."
          />
        </Box>

        <Title
          data-aos="fade-down"
          data-aos-duration="1000"
          variant="h2"
          sx={{ textAlign: "center", mt: { xs: 7, md: 24 } }}
          id="how-it-works"
        >
          How does it work?
        </Title>
        <Box sx={{ mt: { xs: 4, md: 10.25 }, mb: { xs: 7, md: 24 } }}>
          <InfoCard
            title="1. Buy and sell sneakers"
            text="Resell sneakers without physically owning them. Buy and hold, or go for a quick flip - your choice."
            sx={{ maxWidth: { xs: 1, sm: 0.95 }, mb: 4 }}
          />
          <InfoCard
            title="2. Deposit your collection"
            text="Planning to sell your collection? List your sneakers on Detrove and earn commission on each trade, even after the initial sale."
            sx={{ maxWidth: { xs: 1, sm: 0.95 }, mb: 4, ml: "auto" }}
          />
          <InfoCard
            title="3. Redeem anytime"
            text="Thinking of flexing those kicks in person? Redeem any sneaker in your collection and we’ll ship it to you immediately."
            sx={{ maxWidth: { xs: 1, sm: 0.95 } }}
          />
        </Box>
      </Container>
      <Box sx={{ bgcolor: "black" }}>
        <Container
          sx={{
            maxWidth: 0.95,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2rem", sm: "4rem" },
              fontWeight: 600,
              letterSpacing: { xs: -1, sm: -0.8 },
              lineHeight: { xs: "40px", sm: "94px" },
              color: "white",
              textAlign: "center",
              mt: { xs: 8, sm: 12 },
            }}
          >
            Be a Part of the Future of Reselling
          </Typography>
          {/* <Link
            href={"marketplace"}
            sx={{
              textDecoration: "none",
            }}
          >
            <Button
              title="Enter Marketplace"
              variant="secondary"
              color="white"
              sx={{ mt: { xs: 4, sm: 9 }, mb: { xs: 4, sm: 9 } }}
            />
          </Link> */}
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default Home;
