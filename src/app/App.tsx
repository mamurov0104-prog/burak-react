// React kutubxonasini import qilyapmiz
// JSX ishlashi uchun kerak
import React from "react";

// App ga tegishli CSS fayl
// Bu yerda global yoki maxsus style lar bo‘lishi mumkin
import "../css/app.css";

// MUI dan kerakli componentlarni import qilyapmiz
// Box → universal wrapper (div o‘rniga ishlatiladi)
// Button → tayyor MUI tugma
// Container → contentni markazga joylashtiradi va maxWidth beradi
// Stack → flexbox asosida elementlarni tartibli joylashtiradi
// Typography → matnlar uchun professional text component
import { Box, Button, Container, Stack, Typography } from "@mui/material";

// Bu custom styled component
// Ehtimol MaterialTheme/styled ichida yaratilgan
// RippleBadge oddiy Badge emas — animatsiya yoki custom style bo‘lishi mumkin
import { RippleBadge } from "./MaterialTheme/styled";
import { Link, useLocation } from "react-router-dom";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import { HomePage } from "./screens/homePage";
import { ProductsPage } from "./screens/productsPage";
import { OrdersPage } from "./screens/ordersPage";
import { UserPage } from "./screens/userPage";
import { HomeNavbar } from "./components/headers/HomeNavbar";
import { OtherNavbar } from "./components/headers/OtherNavbar";
import { Footer } from "./components/footer";


// ==============================
// Asosiy App komponent
// ==============================

function App() {

    const location = useLocation();

  return (

    <>
    {location.pathname === "/" ? <HomeNavbar/> : <OtherNavbar/>}
        
        <Switch>
          <Route path="/products">
            <ProductsPage />
          </Route>
          <Route path="/orders">
            <OrdersPage/>
          </Route>
          <Route path="/member-page">
            <UserPage />
          </Route>
           <Route path="/">
            <HomePage />
          </Route>
        </Switch>
        <Footer/>
      </>
  );
}




// App componentni export qilyapmiz
// Shunda main.tsx yoki index.tsx ichida import qilsa bo‘ladi
export default App;
