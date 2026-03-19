import React from "react";
import { Box, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import TabPanel from "@mui/lab/TabPanel";

//  NEW
import { useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { retrieverPausedOrders } from "./selector";
import { Order, OrderItem, OrderUpdateInput } from "../../../lib/types/order";
import { Product } from "../../../lib/types/product";
import { serverApi, Messages } from "../../../lib/config";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { OrderStatus } from "../../../lib/enums/order.enum";
import { useGlobals } from "../../hooks/useGlobals";
import OrderService from "../../services/OrderService";

// redux selector
const pausedOrdersRetriever = createSelector(
  retrieverPausedOrders,
  (pausedOrders) => ({ pausedOrders })
);

interface PausedOrdersProps {
  setValue: (value: string) => void;
}

export default function PausedOrders(props: PausedOrdersProps) {
  const { setValue } = props;
  const { authMember, setOrderBuilder } = useGlobals();
  const { pausedOrders } = useSelector(pausedOrdersRetriever);

  /**  DELETE (CANCEL) */
  const deleteOrderHandler = async (e: any) => {
    try {
      if (!authMember) throw Error(Messages.error2);

      const orderId = e.target.value;

      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.DELETE,
      };

      const confirm = window.confirm("Do you want to delete this order?");
      if (confirm) {
        const order = new OrderService();
        await order.updateOrder(input);

        setValue("2"); //  process tabga o'tadi
        setOrderBuilder(new Date()); //  refresh
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err);
    }
  };

  /**  PAYMENT (PROCESS GA O'TADI) */
  const processOrderHandler = async (e: any) => {
    try {
      if (!authMember) throw Error(Messages.error2);

      const orderId = e.target.value;

      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.PROCESS,
      };

      const confirm = window.confirm(
        "Do you want to proceed with payment?"
      );

      if (confirm) {
        const order = new OrderService();
        await order.updateOrder(input);

        setValue("2"); //  process tab
        setOrderBuilder(new Date()); //  refresh
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err);
    }
  };

  return (
    <TabPanel value={"1"}>
      <Stack>
        {pausedOrders?.map((order: Order) => {
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
                      />

                      <p className={"title-dish"}>
                        {product.productName}
                      </p>

                      <Box className={"price-box"}>
                        <p>${item.itemPrice}</p>

                        <img src={"/icons/close.svg"} />

                        <p>{item.itemQuantity}</p>

                        <img src={"/icons/pause.svg"} />

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
                  />

                  <p>Delivery cost</p>
                  <p>${order.orderDelivery}</p>

                  <img
                    src={"/icons/pause.svg"}
                    style={{ marginLeft: "20px" }}
                  />

                  <p>Total</p>
                  <p>${order.orderTotal}</p>
                </Box>

                {/*  CANCEL */}
                <Button
                  value={order._id}
                  variant="contained"
                  color="secondary"
                  className={"cancel-button"}
                  onClick={deleteOrderHandler}
                >
                  Cancel
                </Button>

                {/*  PAYMENT */}
                <Button
                  value={order._id}
                  variant="contained"
                  className={"pay-button"}
                  onClick={processOrderHandler}
                >
                  Payment
                </Button>
              </Box>
            </Box>
          );
        })}

        {/*  EMPTY */}
        {!pausedOrders ||
          (pausedOrders.length === 0 && (
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"center"}
            >
              <img
                src={"/icons/noimage-list.svg"}
                style={{ width: 300, height: 300 }}
              />
            </Box>
          ))}
      </Stack>
    </TabPanel>
  );
}