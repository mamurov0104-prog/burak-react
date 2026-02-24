

import { useState, SyntheticEvent } from "react";
import { Container, Stack, Box } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import "../../../css/orders.css";

export default function OrdersPage() {
  const [value, setValue] = useState("1");

  const handleChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className={"order-page"}>
      <Container className="order-container">
        <Stack className="order-left">
          <TabContext value={value}>
            <Box className="order-nav-frame">
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  className="table-list"
                >
                  <Tab label="PAUSED ORDERS" value={"1"} />
                  <Tab label="PROCESS ORDERS" value={"2"} />
                  <Tab label="FINISHED ORDERS" value={"3"} />
                </Tabs>
              </Box>
            </Box>

            <Stack className="order-main-content">
              <PausedOrders />
              <ProcessOrders />
              <FinishedOrders />
            </Stack>
          </TabContext>
        </Stack>

        <Stack className="order-right">
          <Box className="order-info-box">
            <Box className="member-box">
              <div className="order-user-img">
                <img
                  src="/icons/default-user.svg"
                  alt="userImg"
                  className="order-user-avatar"
                />
                <div className="order-user-icon-box">
                  <img
                    src="/icons/user-badge.svg"
                    alt="user-badge"
                    className="order-user-prof-img"
                  />
                </div>
              </div>
              <span className="order-user-name">Martin</span>
              <span className="order-user-prof">User</span>
            </Box>
            <Box className="linear"></Box>
            <Box className="order-user-address">
              <LocationOnIcon />
              <div className="spec-address-txt">No Data Found</div>
            </Box>
          </Box>

          <Box className="order-info-box" sx={{ marginTop: "15px" }}>
            <input
              className="card-input"
              type="text"
              placeholder="Card number : 5243 4090 2002 7495"
            />

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <input
                className="card-half-input"
                type="text"
                placeholder="07 / 24"
              />

              <input
                className="card-half-input"
                type="text"
                placeholder="CVV : 010"
              />
            </Box>

            <input
              className="card-input"
              type="text"
              placeholder="Justin Robertson"
            />

            <Box className="cards-box">
              <img src="/icons/western-card.svg" alt="cardImg" />
              <img src="/icons/master-card.svg" alt="cardImg" />
              <img src="/icons/paypal-card.svg" alt="cardImg" />
              <img src="/icons/visa-card.svg" alt="cardImg" />
            </Box>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}