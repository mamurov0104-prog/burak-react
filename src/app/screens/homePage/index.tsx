/**
 * HOMEPAGE (DATA ORCHESTRATOR)
 *
 * Bu komponentning asosiy vazifasi — sahifa ochilganda backenddan
 * kerakli datalarni olib kelish va ularni Redux store ga joylash.
 *
 * Data oqimi:
 *   Backend API
 *        ↓
 *   Service layer (ProductService / MemberService)
 *        ↓
 *   Redux action (setPopularDishes / setNewDishes / setTopUsers)
 *        ↓
 *   Redux Store (homePage slice)
 *        ↓
 *   UI componentlar (PopularDishes, NewDishes, ActiveUsers)
 *
 * Muhim: Bu komponent UI ni chizishdan ko‘ra KO‘PROQ data yuklashni boshqaradi.
 */

import React, { useEffect } from "react";
import Statistics from "./Statistics";
import PopularDishes from "./PopularDishes";
import NewDishes from "./NewDishes";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";

import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";

import { setNewDishes, setPopularDishes, setTopUsers } from "./slice";

import { Product } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";

import MemberService from "../../services/MemberService";
import { Member } from "../../../lib/types/member";

import "../../../css/home.css";

/**
 * actionDispatch — bu helper.
 *
 * Nega kerak?
 * Chunki React component ichida har safar
 *   dispatch(setPopularDishes(data))
 * deb yozish o‘rniga, qisqa yozish uchun:
 *   setPopularDishes(data)
 *
 * Ya’ni dispatch mexanizmini wrapper qilib qo‘yyapmiz.
 */
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
  setNewDishes: (data: Product[]) => dispatch(setNewDishes(data)),
  setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)),
});

export default function HomePage() {

  /**
   * Redux dispatch funksiyasini olamiz.
   * actionDispatch orqali uni soddalashtirdik.
   */
  const { setPopularDishes, setNewDishes, setTopUsers } =
    actionDispatch(useDispatch());

  /**
   * useEffect — sahifa birinchi marta render bo‘lganda ishlaydi.
   *
   * Nega aynan shu yerda?
   * Chunki API requestlar faqat bir marta bajarilishi kerak.
   *
   * Agar dependency array [] bo‘lsa:
   *   component mount bo‘lganda 1 marta ishlaydi.
   */
  useEffect(() => {

    /**
     * SERVICE LAYER OBJECT
     *
     * ProductService — backend bilan gaplashadigan class.
     * Bu class axios orqali API request qiladi.
     *
     * Shunday qilib component to‘g‘ridan-to‘g‘ri axios ishlatmaydi.
     * Bu architecture professional frontendlarda ishlatiladi.
     */
    const product = new ProductService();

    /**
     * 1) POPULAR DISHES OLISH
     *
     * Backend endpoint:
     *   GET /product/all
     *
     * Query paramlar:
     *   page=1
     *   limit=4
     *   order=productViews
     *   productCollection=DISH
     *
     * Natija:
     *   eng ko‘p ko‘rilgan 4 ta taom
     */
    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "productViews",
        productCollection: ProductCollection.DISH,
      })
      .then((data) => {

        /**
         * data = backenddan kelgan productlar
         *
         * Redux store ga saqlaymiz.
         * Shundan keyin PopularDishes component
         * Reduxdan shu datani o‘qiydi.
         */
        setPopularDishes(data);

      })
      .catch((err) => console.log(err));


    /**
     * 2) NEW DISHES
     *
     * Bu endpoint ham o‘sha /product/all,
     * lekin order = createdAt
     *
     * Ya’ni eng oxiri qo‘shilgan productlar.
     */
    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "createdAt",
      })
      .then((data) => {

        /**
         * Redux store ga joylanadi:
         * store.homePage.newDishes
         */
        setNewDishes(data);

      })
      .catch((err) => console.log(err));


    /**
     * 3) TOP USERS
     *
     * Bu data product emas.
     * MemberService orqali olinadi.
     *
     * Backend endpoint:
     *   GET /member/top-users
     */
    const member = new MemberService();

    member
      .getTopUsers()
      .then((data) => {

        /**
         * Redux store ga joylanadi:
         * store.homePage.topUsers
         */
        setTopUsers(data);

      })
      .catch((err) => console.log(err));

  }, []);

  /**
   * UI bu yerda faqat componentlarni joylashtiradi.
   *
   * Data esa yuqorida Redux ga yuklangan.
   * Har bir component Reduxdan o‘qiydi.
   */
  return (
    <div className={"homepage"}>
      <Statistics />
      <PopularDishes />
      <NewDishes />
      <Advertisement />
      <ActiveUsers />
      <Events />
    </div>
  );
}