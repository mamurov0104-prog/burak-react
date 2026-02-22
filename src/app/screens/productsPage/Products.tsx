import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { AspectRatio, Card, CardOverflow, CssVarsProvider } from "@mui/joy";
import { Box, Button, CardContent, Container, Pagination, Stack, TextField, Typography, PaginationItem } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "../../../css/products.css";

const products = [
  { productName: "Salmon Pasta", imagePath: "/img/cutlet.webp" },
  { productName: "Korean Spice Soup", imagePath: "/img/kebab-fresh.webp" },
  { productName: "Vegeterian Soup", imagePath: "/img/kebab.webp" },
  { productName: "Kebuli Rice", imagePath: "/img/lavash.webp" },
  { productName: "Lavash", imagePath: "/img/lavash.webp" },
  { productName: "Cutlet", imagePath: "/img/cutlet.webp" },
  { productName: "Kebab", imagePath: "/img/kebab.webp" },
  { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
{ productName: "Cutlet", imagePath: "/img/cutlet.webp" },
  { productName: "Kebab", imagePath: "/img/kebab.webp" },
  { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
];

export default function Products() {
  // Pagination state
  const [page, setPage] = useState(1);
  const itemsPerPage = 8; // har sahifada 8 ta card agar 4 ta qilsak 4 ta korinadi 
  const paginatedProducts = products.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <div className="products-page">
      <Container>
        <Stack flexDirection={'column'} alignItems={'center'}>
          
          {/* Header / Search */}
          <Stack className="avatar-big-box">
            <Typography className="main-text">Burak Restaurant</Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#FFFFFF",
                borderRadius: "40px",
                padding: "4px",
                width: "366px",
              }}
            >
              <TextField
                placeholder="Type here"
                variant="standard"
                fullWidth
                InputProps={{ disableUnderline: true }}
                sx={{ paddingLeft: "16px" }}
              />
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#343434",
                  borderRadius: "40px",
                  padding: "10px 20px",
                  textTransform: "none",
                  boxShadow: "none",
                }}
                endIcon={<SearchIcon />}
              >
                Search
              </Button>
            </Box>
          </Stack>

          {/* Filters */}
          <Stack className="dishes-filter-section">
            <Button variant="contained" color="primary" className="order">New</Button>
            <Button variant="contained" color="secondary" className="order">Price</Button>               
            <Button variant="contained" color="secondary" className="order">Views</Button>
          </Stack>

          {/* List Category */}
          <Stack className="list-category-section">
            <Stack className="buttons" flexDirection={'column'} rowGap={'10px'}>
              <Button variant="contained" color="primary" className="order">DISH</Button>
              <Button variant="contained" color="secondary" className="order">SALAD</Button>               
              <Button variant="contained" color="secondary" className="order">DRINK</Button>
              <Button variant="contained" color="secondary" className="order">DESSERT</Button>               
              <Button variant="contained" color="secondary" className="order">OTHER</Button>
            </Stack>

            {/* Cards */}
            <Stack className="cards">
              {paginatedProducts.length !== 0 ? paginatedProducts.map((e, i) => (
                <CssVarsProvider key={i}>
                  <Card className="card" sx={{ width: '273px', height: "361px" }}>
                    {/* Hover Icons */}
                    <Box className='hover'>
                      <img style={{ cursor:'pointer' }} src="/icons/fullcart.png" alt="" />
                      <img src="/icons/views.png" alt="" />
                    </Box>

                    {/* Normal size png */}
                    <img className="product-volume" src="/icons/product-volume.png" alt="" />

                    <CardOverflow>
                      <AspectRatio ratio={"1"}>
                        <img className="card-img" src={e.imagePath} alt="" />
                      </AspectRatio>
                    </CardOverflow>

                    <CardContent>
                      <Typography textAlign={'center'} className="product-name">{e.productName}</Typography>
                      <Typography marginTop={'4px'} className="price" display={'flex'} alignItems={'center'} justifyContent={'center'}>
                        <img src="/icons/dollar.png" alt="" /> 9
                      </Typography>
                    </CardContent>
                  </Card>
                </CssVarsProvider>
              )) : <Box>No products</Box>}
            </Stack>
          </Stack>

          {/* Pagination */}
          <Stack className="pagination-section" alignItems="center" mt={4}>
            <Pagination
              count={Math.ceil(products.length / itemsPerPage)}
              page={page}
              onChange={handleChange}
              renderItem={(item) => (
                <PaginationItem
                  components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                  {...item}
                  color="secondary"
                />
              )}
            />
          </Stack>
        </Stack>
      </Container>

      {/* Family Brands Section */}
      <div className="brands-logo">
        <Stack className="family-brand">
          <Typography color="secondary" className="brand">Our Family Brands</Typography>
          <Stack flexDirection={'row'} justifyContent={'space-around'}>
            <CssVarsProvider> 
              <Card className='card'><img className="img" src="/img/gurme.webp" alt="" /></Card>
              <Card className='card'><img className="img" src="/img/seafood.webp" alt="" /></Card>
              <Card className='card'><img className="img" src="/img/sweets.webp" alt="" /></Card>
              <Card className='card'><img className="img" src="/img/doner.webp" alt="" /></Card>
            </CssVarsProvider>
          </Stack>
        </Stack>
      </div>

      {/* Address Section */}
      <div className="address"> 
        <Container>
          <Stack className={"address-area"}>
            <Box className={"title"}>Our address</Box>
            <iframe
              title="Google Maps location"
              src="https://www.google.com/maps?q=Amir+Temur+Square+Tashkent&output=embed" 
              width="1320"
              height="500"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Stack>
        </Container>
      </div>
    </div>
  );
}