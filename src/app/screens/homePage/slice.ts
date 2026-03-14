// Redux Toolkit dan createSlice funksiyasini import qilamiz
// createSlice Redux reducer + actionlarni bitta joyda yaratib beradi
import { createSlice } from "@reduxjs/toolkit";

// HomePage uchun TypeScript state typeni import qilamiz
import { HomePageState } from "../../../lib/types/screen";


// ======================================================
// INITIAL STATE
// ======================================================

// HomePage sahifasiga tegishli boshlang‘ich Redux state
// Bu state Redux store ichida saqlanadi

const initialState: HomePageState = {

  // eng mashhur taomlar ro‘yxati
  popularDishes: [],

  // yangi qo‘shilgan taomlar
  newDishes: [],

  // eng faol foydalanuvchilar
  topUsers: [],
};


// ======================================================
// CREATE SLICE
// ======================================================

// createSlice — Redux Toolkitdagi eng muhim funksiya
// u quyidagilarni avtomatik yaratadi:
//
// 1️⃣ actionlar
// 2️⃣ reducer
// 3️⃣ action type

const homePageSlice = createSlice({

  // slice nomi (Redux DevTools va loggerda ko‘rinadi)
  name: "homePage",

  // boshlang‘ich state
  initialState,

  // state ni o‘zgartiruvchi reducer funksiyalar
  reducers: {

    // ==================================================
    // SET POPULAR DISHES
    // ==================================================

    setPopularDishes: (state, action) => {

      // state => Redux ichidagi HomePageState
      // action => dispatch orqali kelgan action object

      // action struktura odatda shunday bo‘ladi:

      /*
        action = {
          type: "homePage/setPopularDishes",
          payload: data
        }
      */

      // payload ichidagi ma'lumotni Redux state ga yozib qo‘yamiz

      state.popularDishes = action.payload;

      // ya'ni backenddan kelgan data
      // Redux store ichidagi popularDishes ni yangilaydi
    },


    // ==================================================
    // SET NEW DISHES
    // ==================================================

    setNewDishes: (state, action) => {

      // yangi taomlar ro‘yxatini yangilash

      state.newDishes = action.payload;

    },


    // ==================================================
    // SET TOP USERS
    // ==================================================

    setTopUsers: (state, action) => {

      // eng faol userlar ro‘yxatini yangilash

      state.topUsers = action.payload;

    },

  },
});



// ======================================================
// ACTION EXPORT
// ======================================================

// createSlice avtomatik actionlar yaratadi.
// Ularni componentlarda dispatch qilish uchun export qilamiz.

export const { setPopularDishes, setNewDishes, setTopUsers } =
  homePageSlice.actions;


// Endi bu actionlar React component ichida ishlatiladi:

/*

dispatch(setPopularDishes(data))
dispatch(setNewDishes(data))
dispatch(setTopUsers(data))

*/



// ======================================================
// REDUCER EXPORT
// ======================================================

// createSlice ichida yaratilgan reducer ni alohida export qilamiz

const HomePageReducer = homePageSlice.reducer;

export default HomePageReducer;


// Bu reducer store.ts ichida ulanadi

/*
store.ts

reducer: {
  homePage: HomePageReducer
}
*/


// Natijada Redux store tuzilishi shunday bo‘ladi:

/*

Redux Store

{
  homePage: {

    popularDishes: [],
    newDishes: [],
    topUsers: []

  }
}

*/