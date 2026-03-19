import React from "react";
import { Box, Stack } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";

//  NEW
import { useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { retrieverFinishedOrders } from "./selector";
import { Order, OrderItem } from "../../../lib/types/order";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";

// redux selector
const finishedOrdersRetriever = createSelector(
  retrieverFinishedOrders,
  (finishedOrders) => ({ finishedOrders })
);

export default function FinishedOrders() {
  const { finishedOrders } = useSelector(finishedOrdersRetriever);

  return (
    <TabPanel value={"3"}>
      <Stack>
        {finishedOrders?.map((order: Order) => {
          return (
            <Box key={order._id} className={"order-main-box"}>
              
              {/*  ITEMS */}
              <Box className={"order-box-scroll"}>
                {order.orderItems?.map((item: OrderItem) => {

                  //  PRODUCT TOPISH
                  const product: Product = order.productData.filter(
                    (ele: Product) => ele._id === item.productId
                  )[0];

                  const imagePath = `${serverApi}/${product.productImages[0]}`;

                  return (
                    <Box key={item._id} className={"orders-name-price"}>
                      
                      {/*  SENING STRUCTURE SAQLANDI */}
                      <img
                        src={imagePath}
                        className={"order-dish-img"}
                        alt="dish"
                      />

                      <p className={"title-dish"}>
                        {product.productName}
                      </p>

                      <Box className={"price-box"}>
                        <p>${item.itemPrice}</p>

                        <img src={"/icons/close.svg"} alt="close" />

                        <p>{item.itemQuantity}</p>

                        <img src={"/icons/pause.svg"} alt="pause" />

                        <p style={{ marginLeft: "15px" }}>
                          ${item.itemPrice * item.itemQuantity}
                        </p>
                      </Box>
                    </Box>
                  );
                })}
              </Box>

              {/*  TOTAL */}
              <Box className={"total-price-box"}>
                <Box className={"box-total"}>
                  <p>Product price</p>
                  <p>${order.orderTotal - order.orderDelivery}</p>

                  <img
                    src={"/icons/plus.svg"}
                    style={{ marginLeft: "20px" }}
                    alt="plus"
                  />

                  <p>Delivery cost</p>
                  <p>${order.orderDelivery}</p>

                  <img
                    src={"/icons/pause.svg"}
                    style={{ marginLeft: "20px" }}
                    alt="minus"
                  />

                  <p>Total</p>
                  <p>${order.orderTotal}</p>
                </Box>
              </Box>
            </Box>
          );
        })}

        {/*  EMPTY STATE */}
        {!finishedOrders ||
          (finishedOrders.length === 0 && (
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"center"}
            >
              <img
                src={"/icons/noimage-list.svg"}
                style={{ width: 300, height: 300 }}
                alt="no orders"
              />
            </Box>
          ))}
      </Stack>
    </TabPanel>
  );
}