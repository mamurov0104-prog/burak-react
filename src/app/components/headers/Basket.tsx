import React from "react";
import { Box, Button, Stack } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useHistory } from "react-router-dom";
import { serverApi } from "../../../lib/config";

// TYPE (friendingdan olingan)
interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

// PROPS qo‘shildi (ENG MUHIM)
interface BasketProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
}

export default function Basket(props: BasketProps) {
  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = props;

  const history = useHistory();

  //  TOTAL PRICE LOGIC
  const itemsPrice = cartItems.reduce(
    (a, c) => a + c.price * c.quantity,
    0
  );

  const shippingCost = itemsPrice < 100 ? 5 : 0;
  const totalPrice = (itemsPrice + shippingCost).toFixed(1);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  /** HANDLERS **/
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box className={"hover-line"}>
      <IconButton onClick={handleClick}>
        {/*  LENGTH dynamic bo‘ldi */}
        <Badge badgeContent={cartItems.length} color="secondary">
          <img src={"/icons/shopping-cart.svg"} />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
          },
        }}
      >
        <Stack className={"basket-frame"}>
          
          {/*  HEADER */}
          <Box className={"all-check-box"}>
            {cartItems.length === 0 ? (
              <div>Cart is empty!</div>
            ) : (
              <Stack flexDirection={"row"}>
                <div>Cart Products:</div>

                {/*  DELETE ALL */}
                <DeleteForeverIcon
                  sx={{ ml: "5px", cursor: "pointer" }}
                  onClick={onDeleteAll}
                />
              </Stack>
            )}
          </Box>

          {/*  PRODUCTS LIST */}
          <Box className={"orders-main-wrapper"}>
            <Box className={"orders-wrapper"}>
              {cartItems.map((item) => {
                // const imagePath = item.image; // agar backend bo‘lsa serverApi qo‘shamiz 
                  const imagePath = `${serverApi}/${item.image}`;
                return (
                  <Box className={"basket-info-box"} key={item._id}>
                    
                    {/*  DELETE ONE */}
                    <div className={"cancel-btn"}>
                      <CancelIcon
                        color="primary"
                        onClick={() => onDelete(item)}
                      />
                    </div>

                    <img src={imagePath} className={"product-img"} />

                    <span className={"product-name"}>
                      {item.name}
                    </span>

                    <p className={"product-price"}>
                      ${item.price} x {item.quantity}
                    </p>

                    {/*  +/- BUTTON */}
                    <Box sx={{ minWidth: 120 }}>
                      <div className="col-2">
                        <button
                          onClick={() => onRemove(item)}
                          className="remove"
                        >
                          -
                        </button>

                        <button
                          onClick={() => onAdd(item)}
                          className="add"
                        >
                          +
                        </button>
                      </div>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>

          {/*  FOOTER */}
          {cartItems.length !== 0 && (
            <Box className={"basket-order"}>
              <span className={"price"}>
                Total: ${totalPrice} ({itemsPrice} + {shippingCost})
              </span>

              <Button
                startIcon={<ShoppingCartIcon />}
                variant="contained"
                onClick={() => history.push("/orders")}
              >
                Order
              </Button>
            </Box>
          )}
        </Stack>
      </Menu>
    </Box>
  );
}