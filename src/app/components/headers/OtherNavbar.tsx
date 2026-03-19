import React from "react";
import {
  Container,
  Stack,
  Box,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { Logout } from "@mui/icons-material";
import Basket from "./Basket";

// TYPE
interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

// PROPS
interface OtherNavbarProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;

  setSignupOpen: (value: boolean) => void;
  setLoginOpen: (value: boolean) => void;

  handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void;
  handleCloseLogout: () => void;
  handleLogoutRequest: () => void;

  anchorEl: HTMLElement | null;
}

export default function OtherNavbar(props: OtherNavbarProps) {
  const {
    cartItems,
    onAdd,
    onRemove,
    onDelete,
    onDeleteAll,
    setLoginOpen,
    handleLogoutClick,
    handleCloseLogout,
    handleLogoutRequest,
    anchorEl,
  } = props;

  // keyinchalik useGlobals qilasan
  const authMember = null;

  return (
    <div className="other-navbar">
      <Container className="navbar-container">
        <Stack className="menu">
          <Box>
            <NavLink to="/">
              <img
                className="brand-logo"
                src="/icons/burak.svg"
                alt=""
              />
            </NavLink>
          </Box>

          <Stack className="links">
            <Box className={"hover-line"}>
              <NavLink to="/">Home</NavLink>
            </Box>

            <Box className={"hover-line"}>
              <NavLink to="/products" activeClassName={"underline"}>
                Products
              </NavLink>
            </Box>

            {authMember && (
              <Box className={"hover-line"}>
                <NavLink to="/orders" activeClassName={"underline"}>
                  Orders
                </NavLink>
              </Box>
            )}

            {authMember && (
              <Box className={"hover-line"}>
                <NavLink to="/member-page" activeClassName={"underline"}>
                  My page
                </NavLink>
              </Box>
            )}

            <Box className={"hover-line"}>
              <NavLink to="/help" activeClassName={"underline"}>
                Help
              </NavLink>
            </Box>

            {/*  BASKET ENDI REAL */}
            <Basket
              cartItems={cartItems}
              onAdd={onAdd}
              onRemove={onRemove}
              onDelete={onDelete}
              onDeleteAll={onDeleteAll}
            />

            {/*  AUTH */}
            {!authMember ? (
              <Box>
                <Button
                  variant="contained"
                  className="login-button"
                  onClick={() => setLoginOpen(true)}
                >
                  Login
                </Button>
              </Box>
            ) : (
              <img
                src="/icons/default-user.svg"
                className="user-avatar"
                aria-haspopup={"true"}
                onClick={handleLogoutClick}
              />
            )}

            {/*  LOGOUT MENU */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseLogout}
              onClick={handleCloseLogout}
            >
              <MenuItem onClick={handleLogoutRequest}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}