import React from "react";
import { Box, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import TabPanel from "@mui/lab/TabPanel";
import moment from "moment";

//  NEW
import { useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { retrieverProcessedOrders } from "./selector";
import { Order, OrderItem, OrderUpdateInput } from "../../../lib/types/order";
import { Product } from "../../../lib/types/product";
import { serverApi, Messages } from "../../../lib/config";
import { useGlobals } from "../../hooks/useGlobals";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";

// redux selector
const processedOrdersRetriever = createSelector(
  retrieverProcessedOrders,
  (processOrders) => ({ processOrders })
);

interface ProcessOrdersProps {
  setValue: (value: string) => void;
}

export default function ProcessOrders(props: ProcessOrdersProps) {
  const { processOrders } = useSelector(processedOrdersRetriever);
  const { authMember, setOrderBuilder } = useGlobals();
  const { setValue } = props;

  /**  ORDER FINISH HANDLER */
  const finishOrderHandler = async (e: any) => {
    try {
      if (!authMember) throw Error(Messages.error2);

      const orderId = e.target.value;

      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.FINISH,
      };

      const confirm = window.confirm("Have you received your order?");
      if (confirm) {
        const order = new OrderService();
        await order.updateOrder(input);

        setValue("3"); //  FINISHED TAB GA O‘TADI
        setOrderBuilder(new Date()); //  REFRESH
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err);
    }
  };

  return (
    <TabPanel value={"2"}>
      <Stack>
        {processOrders?.map((order: Order) => {
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
                      
                      {/*  SENING LAYOUT SAQLANDI */}
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

                  <p>delivery cost</p>
                  <p>${order.orderDelivery}</p>

                  <img
                    src={"/icons/pause.svg"}
                    style={{ marginLeft: "20px" }}
                    alt="pause"
                  />

                  <p>Total</p>
                  <p>${order.orderTotal}</p>
                </Box>

                <p className={"data-comp"}>
                  {moment().format("YY-MM-DD HH:mm")}
                </p>

                {/*  BUTTON */}
                <Button
                  value={order._id}
                  variant="contained"
                  className={"verify-button"}
                  onClick={finishOrderHandler}
                >
                  Verify to Fulfil
                </Button>
              </Box>
            </Box>
          );
        })}

        {/*  EMPTY STATE */}
        {!processOrders ||
          (processOrders.length === 0 && (
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"center"}
            >
              <img
                src="/icons/noimage-list.svg"
                style={{ width: 300, height: 300 }}
                alt="no orders"
              />
            </Box>
          ))}
      </Stack>
    </TabPanel>
  );
}