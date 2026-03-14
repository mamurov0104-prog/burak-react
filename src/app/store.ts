// Redux Toolkitdan store yaratish uchun kerakli funksiyalar va typelarni import qilamiz
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

// HomePage sahifasi uchun yozilgan reducer (slice ichidan keladi)
import HomePageReducer from './screens/homePage/slice';

// Redux logger middleware
import reduxLogger from "redux-logger";


// =====================================================
// REDUX STORE YARATISH
// =====================================================

// configureStore Redux Toolkitdagi eng muhim funksiya.
// Bu yerda biz global Redux store ni yaratamiz.
// Store = butun application state saqlanadigan markaziy joy.

export const store = configureStore({

  // =====================================================
  // MIDDLEWARE
  // =====================================================

  middleware: (getDefaultMiddleware) =>
    // @ts-ignore
    getDefaultMiddleware().concat(reduxLogger),

  // getDefaultMiddleware() => Redux Toolkit default middlewarelari
  // masalan:
  // - thunk
  // - serializableCheck
  // - immutableCheck

  // concat(reduxLogger) => reduxLogger ni qo'shyapmiz

  // reduxLogger nima qiladi?
  // Redux store ichida:
  // - qaysi action ishladi
  // - state oldin qanday edi
  // - state keyin qanday bo‘ldi
  //
  // hammasini console da ko'rsatadi.

  // Masalan console da shunday chiqadi:
  //
  // action: setPopularDishes
  // prev state: {...}
  // next state: {...}



  // =====================================================
  // REDUCER
  // =====================================================

  reducer: {

    // homePage nomli state yaratilyapti
    // va unga HomePageReducer ulanmoqda

    // Redux store tuzilishi shunday bo‘ladi:

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

    // HomePageReducer esa slice ichida yozilgan reducer
    // u state ni o'zgartiradi

    homePage: HomePageReducer,

    // Redux Storage ga HomePage screen componentimizga
    // daxldor bo'lgan Slice ichidagi reducerni bog'ladik

  },
});



// =====================================================
// TYPESCRIPT TYPELAR
// =====================================================


// AppDispatch
// Redux dispatch funksiyasining typeni aniqlaydi
// React component ichida dispatch ishlatganda yordam beradi

export type AppDispatch = typeof store.dispatch;



// RootState
// Redux store ning umumiy state typeni avtomatik aniqlaydi

export type RootState = ReturnType<typeof store.getState>;


// Misol uchun RootState quyidagicha ko‘rinadi:

/*

RootState = {
  homePage: {
    popularDishes: Product[]
    newDishes: Product[]
    topUsers: Member[]
  }
}

*/



// =====================================================
// THUNK TYPE
// =====================================================

// Thunk — async Redux action yozish uchun ishlatiladi.
// masalan API chaqirishda.

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,   // qaytadigan qiymat
  RootState,    // Redux state
  unknown,      // extra argument
  Action<string> // action type
>;


// Misol uchun thunk action:

/*

export const fetchPopularDishes = (): AppThunk => async (dispatch) => {

   const data = await api.getPopularDishes();

   dispatch(setPopularDishes(data));

}

*/