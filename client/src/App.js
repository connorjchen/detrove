import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Marketplace from "./screens/marketplace";
import Product from "./screens/product";
import Sell from "./screens/sell";
import Buy from "./screens/buy";
import Landing from "./screens/landing";
import Profile from "./screens/profile";
import Admin from "./screens/admin";
import Layout from "./components/layout";
import Listing from "./screens/listing";
import TransferMoney from "./screens/transferMoney";
import { ThemeProvider } from "@mui/material";
import theme from "./styles/theme";
import { SnackbarProvider } from "notistack";
import ReactGa from "react-ga";

const ScrollToTop = (props) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <>{props.children}</>;
};

ReactGa.initialize(process.env.REACT_APP_GA_TRACKING_ID);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <BrowserRouter>
          <ScrollToTop>
            <Routes>
              <Route path="/" element={<Landing />} exact />
              <Route element={<Layout />}>
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/product/:sneakerId" element={<Product />} />
                <Route path="/sell/:sneakerId" element={<Sell />} />
                <Route path="/buy/:sneakerId" element={<Buy />} />
                <Route path="/listing/:listingId" element={<Listing />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/cash" element={<TransferMoney />} />
                <Route path="/admin" element={<Admin />} />
              </Route>
            </Routes>
          </ScrollToTop>
        </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
