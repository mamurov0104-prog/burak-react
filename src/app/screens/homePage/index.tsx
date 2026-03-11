import React, { useEffect } from "react";
import Statistics from "./Statistics";
import PopularDishes from "./PopularDishes";
import NewDishes from "./NewDishes";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setNewDishes, setPopularDishes, setTopUsers } from "./slice";
import { retrievePopularDishes } from "./selector";
import { Product } from "../../../lib/types/product";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { Member } from "../../../lib/types/member";
import "../../../css/home.css";
// import PopularDishes from "./PopularDishes";

/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)), // => setPopularDishes commandasini setPopularDishes reduceri orqali hosil qilib oldik
  setNewDishes: (data: Product[]) => dispatch(setNewDishes(data)),
  setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)),
}); // setPopularDishes: commanda va reducer ni bir xil atadik va 1 chi kelgan commanda, 2 chi kelgan reducer

const PopularDishesRetriever = createSelector(
  retrievePopularDishes,
  (popularDishes) => ({ popularDishes })
);
export default function HomePage() {
      const { setPopularDishes, setNewDishes, setTopUsers } = actionDispatch(
    useDispatch()
  );
  // function component ichida setPopularDishes ni caqirib qo'lga olyapmiz

  const {popularDishes} = useSelector(PopularDishesRetriever);
      useEffect(() => {
    // Backend server data request => Data (backenddan json formatda data krib keladi)
const result = [
    {
        "_id": "6981a5b9575de293b66439aa",
        "productStatus": "PROCESS",
        "productCollection": "DISH",
        "productName": "Palovsㅁ",
        "productPrice": "20",
        "productLeftCount": 100,
        "productSize": "SMALL",
        "productVolume": 1,
        "productDesc": "Delicious meal Qoymasak ham bolardi",
        "productImage": [],
        "productViews": 0,
        "createdAt": "2026-02-03T07:37:29.390Z",
        "updatedAt": "2026-02-14T14:21:12.499Z",
        "__v": 0
    }
]
// @ts-ignore
   setPopularDishes(result);
  }, []);

    return <div className="homepage">
    <Statistics/>
    <PopularDishes/>
    <NewDishes/>
    <Advertisement/>
    <ActiveUsers/>
    <Events/>
    </div>
}