// React kutubxonasidan React va useEffect hookini import qilamiz
import React, { useEffect } from "react";

// HomePage ichida ishlatiladigan UI componentlar
import Statistics from "./Statistics";        // statistik ma'lumotlar componenti
import PopularDishes from "./PopularDishes";  // mashhur taomlar componenti
import NewDishes from "./NewDishes";          // yangi qo'shilgan taomlar componenti
import Advertisement from "./Advertisement";  // reklama componenti
import ActiveUsers from "./ActiveUsers";      // eng faol foydalanuvchilar componenti
import Events from "./Events";                // eventlar componenti

// Redux bilan ishlash uchun hooklar
import { useDispatch, useSelector } from "react-redux";

// Redux Toolkitdan Dispatch typeni import qilamiz (TypeScript uchun)
import { Dispatch } from "@reduxjs/toolkit";

// Reselect kutubxonasi — optimizatsiya qilingan selector yaratish uchun
import { createSelector } from "reselect";

// Redux slice ichidan actionlar (state ni o'zgartiruvchi buyruqlar)
import { setNewDishes, setPopularDishes, setTopUsers } from "./slice";

// Redux store dan ma'lumot olish uchun selector
import { retrievePopularDishes } from "./selector";

// TypeScript typelari
import { Product } from "../../../lib/types/product";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { Member } from "../../../lib/types/member";

// css fayl
import "../../../css/home.css";

// =======================================================
// REDUX ACTION DISPATCH HELPER
// =======================================================

// Bu funksiya dispatch ni qulay ishlatish uchun yozilgan.
// Odatda Reduxda action yuborish uchun:
// dispatch(setPopularDishes(data))
// deb yoziladi.
//
// Bu wrapper orqali esa biz faqat:
// setPopularDishes(data)
// deb ishlatamiz.

const actionDispatch = (dispatch: Dispatch) => ({
  // mashhur taomlarni Redux store ga yozadi
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),

  // yangi taomlarni Redux store ga yozadi
  setNewDishes: (data: Product[]) => dispatch(setNewDishes(data)),

  // eng faol userlarni Redux store ga yozadi
  setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)),
});

// =======================================================
// REDUX SELECTOR (RESELECT)
// =======================================================

// createSelector yordamida optimizatsiya qilingan selector yaratamiz.
// Bu selector Redux store ichidan popularDishes ni olib beradi.
// Reselect cache qiladi va ortiqcha renderlarni kamaytiradi.

const PopularDishesRetriever = createSelector(
  retrievePopularDishes,        // store dan data olish
  (popularDishes) => ({ popularDishes }) // componentga object sifatida qaytarish
);

// =======================================================
// HOMEPAGE COMPONENT
// =======================================================

export default function HomePage() {

  // Redux dispatch ni olib kelamiz va actionDispatch orqali
  // bizga kerakli action funksiyalarini hosil qilamiz
  const { setPopularDishes, setNewDishes, setTopUsers } = actionDispatch(
    useDispatch()
  );

  // Redux store dan popularDishes ni olish
  // useSelector store dagi state ni componentga olib keladi
  const { popularDishes } = useSelector(PopularDishesRetriever);

  // React lifecycle hook
  // component render bo‘lganda (mount) ishlaydi
  useEffect(() => {

    // odatda bu yerda API chaqiriladi
    // masalan:
    //
    // fetchPopularDishes()
    // .then(data => setPopularDishes(data))
    //
    // ya'ni backenddan data olib Redux store ga yoziladi

  }, []);

  // Redux store dan kelgan data ni console da ko'rish uchun
  console.log("popularDishes: ", popularDishes);

  // =======================================================
  // UI RENDER
  // =======================================================

  return (
    <div className="homepage">

      {/* Statistik ma'lumotlar */}
      <Statistics/>

      {/* Eng mashhur taomlar */}
      <PopularDishes/>

      {/* Yangi qo'shilgan taomlar */}
      <NewDishes/>

      {/* Reklama */}
      <Advertisement/>

      {/* Eng faol foydalanuvchilar */}
      <ActiveUsers/>

      {/* Eventlar */}
      <Events/>

    </div>
  );
}