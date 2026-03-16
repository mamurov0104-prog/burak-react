// React kutubxonasini import qilyapmiz
import React from "react";

// MUI componentlari
import { Box, Button, Container, Stack, Typography } from "@mui/material";

// Custom styled component
import { RippleBadge } from "./MaterialTheme/styled";

import { Link, useLocation } from "react-router-dom";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";

import HomePage from "./screens/homePage";
import ProductsPage from "./screens/productsPage";
import OrdersPage from "./screens/ordersPage";
import UserPage from "./screens/userPage";
import HomeNavbar from "./components/headers/HomeNavbar";
import OtherNavbar from "./components/headers/OtherNavbar";
import Footer from "./components/footer";
import Test from "./screens/Test";

import "../css/app.css";
import "../css/navbar.css";
import "../css/footer.css";

import HelpPage from "./screens/helpPage";

/* =========================
   👇 QO‘SHILGAN JOY (1)
   dostingdagi kabi basket hook
========================= */
import useBasket from "./hooks/useBasket";

// ==============================
// Asosiy App komponent
// ==============================

function App() {

  const location = useLocation();

  /* =========================
     👇 QO‘SHILGAN JOY (2)
     onAdd shu yerda yaratiladi
  ========================= */
  const { onAdd } = useBasket();

  return (
    <>
      {location.pathname === "/" ? <HomeNavbar /> : <OtherNavbar />}

      <Switch>
        <Route path="/products">
          <ProductsPage onAdd={onAdd} />
        </Route>

        <Route path="/orders">
          <OrdersPage />
        </Route>

        <Route path="/member-page">
          <UserPage />
        </Route>

        <Route path="/help">
          <HelpPage />
        </Route>

        <Route path="/">
          {/* <Test /> */}
          <HomePage />
        </Route>
      </Switch>

      <Footer />
    </>
  );
}

export default App;