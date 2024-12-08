import React from "react";
import NavBar from "./navBar";
import Footer from "./footer";
import { Outlet } from "react-router-dom";
class Layout extends React.Component {
  render() {
    return (
      <>
        <NavBar />
        <Outlet />
        <Footer />
      </>
    );
  }
}
export default Layout;
