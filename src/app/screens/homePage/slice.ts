/**
 * REDUX SLICE
 *
 * Bu fayl HomePage uchun global state ni boshqaradi.
 *
 * Redux store tuzilishi:
 *
 * store
 *  └ homePage
 *       ├ popularDishes
 *       ├ newDishes
 *       └ topUsers
 *
 * Bu state ga componentlar useSelector orqali kiradi.
 */

import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../lib/types/screen";

/**
 * Boshlang‘ich state
 *
 * Hali backenddan data kelmagan paytda
 * bu qiymatlar ishlatiladi.
 */
const initialState: HomePageState = {
  popularDishes: [],
  newDishes: [],
  topUsers: [],
};

/**
 * createSlice:
 *   reducer + actionlarni avtomatik yaratadi.
 */
const homePageSlice = createSlice({

  name: "homePage",

  initialState,

  reducers: {

    /**
     * setPopularDishes
     *
     * Qachon ishlaydi?
     *   HomePage component API chaqirganda
     *
     * Natija:
     *   state.popularDishes yangilanadi
     *
     * Bu o‘zgarishdan keyin
     * PopularDishes component qayta render bo‘ladi.
     */
    setPopularDishes: (state, action) => {
      state.popularDishes = action.payload;
    },

    /**
     * setNewDishes
     *
     * Backenddan kelgan yangi productlar
     * store ga yoziladi.
     */
    setNewDishes: (state, action) => {
      state.newDishes = action.payload;
    },

    /**
     * setTopUsers
     *
     * Eng faol userlar ro‘yxati
     * store ga yoziladi.
     */
    setTopUsers: (state, action) => {
      state.topUsers = action.payload;
    },
  },
});

/**
 * actionlarni tashqariga chiqaramiz.
 *
 * Ular component ichida dispatch qilinadi.
 */
export const { setPopularDishes, setNewDishes, setTopUsers } =
  homePageSlice.actions;

/**
 * Reducer store ga ulanish uchun export qilinadi.
 */
export default homePageSlice.reducer; 