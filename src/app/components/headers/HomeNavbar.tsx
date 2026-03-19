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
import { useGlobals } from "../../hooks/useGlobals";

// TYPE
interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

// PROPS (ENG MUHIM)
interface HomeNavbarProps {
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

export default function HomeNavbar(props: HomeNavbarProps) {
  const {
    cartItems,
    onAdd,
    onRemove,
    onDelete,
    onDeleteAll,
    setSignupOpen,
    setLoginOpen,
    handleLogoutClick,
    handleCloseLogout,
    handleLogoutRequest,
    anchorEl,
  } = props;

  //  keyinchalik useGlobals qo‘shamiz
  // const authMember = null;
  const { authMember } = useGlobals();

  return (
    <div className="home-navbar">
      <Container className="navbar-container">
        <Stack className="menu">
          <Box>
            <NavLink to="/">
              <img className="brand-logo" src="/icons/burak.svg" />
            </NavLink>
          </Box>

          <Stack className="links">
            <Box className={"hover-line"}>
              <NavLink to="/" activeClassName={"underline"}>
                Home
              </NavLink>
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

            {/*  ENG MUHIM QISM */}
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

        {/*  PASTKI QISM (SENIKI SAQLANDI) */}
        <Stack className="header-frame">
          <Stack className="detail">
            <Box className="head-main-txt">
              World's Most Delicious Cousine
            </Box>

            <Box className="wel-txt">
              The Choice , not just a choice
            </Box>

            <Box className="service-txt">
              24 hours service
            </Box>

            <Box className="signup">
              {!authMember && (
                <Button
                  variant={"contained"}
                  className={"signup-button"}
                  onClick={() => setSignupOpen(true)}
                >
                  SIGN UP
                </Button>
              )}
            </Box>
          </Stack>

          <Stack className="logo-frame">
            <div className="logo-img"></div>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}