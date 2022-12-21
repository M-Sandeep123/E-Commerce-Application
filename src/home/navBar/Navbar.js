import Box from "@mui/material/Box";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button, InputBase } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";
import LoginPopup from "../../components/Authentication/login";
// import ProductCards from "../components/Products/product"
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import ProductDetails from "../../components/Products/productDetails";
import OrderPlace from "../../components/PlaceOrder/orderPlace";
import Home from "../Home";
import AddProduct from "../../components/AdminView/AddProduct";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function NavAppBar() {
  const [loginPopupOpen, setLoginPopup] = useState(false);
  const [userLoginDetails,setUserLoginDetails] = useState(JSON.parse(sessionStorage.getItem("userLoginData")));
  const [searchProduct,setSearchProduct] = useState("");

  const handleLoginPopupOpen = (event) => {
    setLoginPopup(true);
  }
  const handleLoginPopupClose = (event) => {
    setUserLoginDetails(JSON.parse(sessionStorage.getItem("userLoginData")));
    setLoginPopup(false);
  }

  const isLogout= ()=>{
    sessionStorage.removeItem("userLoginData");
    setUserLoginDetails(null);
  }
 

  return (
    <div>
      <BrowserRouter>
      <Box>
        <LoginPopup openLogin={loginPopupOpen} handleLoginClose={handleLoginPopupClose} />
        <AppBar position="static" sx={{ backgroundColor: "#0E3385"  }}>
          <Toolbar >
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <ShoppingCart />
            </IconButton>
            <Typography variant="h6" component="div" sx={{flexGrow:1}}>
              upGrad E-Shop
            </Typography>
            <Search className="search-bar" sx={{flexGrow:20}}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                onChange={(e)=>setSearchProduct(e.target.value)}
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                fullWidth
              />
            </Search>
           <Link to={"/home"} ><Button  style={{color : "white"}} className="interaction" >Home</Button></Link>
           {userLoginDetails?.role === "ADMIN" && <Link to={"/add-or-modify-product"}><Button  style={{color : "white"}} className="interaction">Add Product</Button></Link>}
           {userLoginDetails===null && <Link to={"/login"} ><Button  style={{color : "white"}} onClick={handleLoginPopupOpen} className="interaction">Login</Button></Link>}
           {userLoginDetails!==null && <Button  style={{color : "white"}} onClick={isLogout} className="interaction"><ExitToAppIcon/></Button>}      
          </Toolbar>
        </AppBar>
      </Box>
      <Routes>
            <Route path="/" element={<Home userLoginDetails={userLoginDetails} searchProduct={searchProduct}/>}/>
            <Route path="/home" element={<Home userLoginDetails={userLoginDetails} searchProduct={searchProduct}/>}/>
            <Route path="/add-or-modify-product" element={<AddProduct/>}/>
            <Route path="/login" element={<Home userLoginDetails={userLoginDetails} searchProduct={searchProduct}/>}/>
            <Route path="/register" element={<Home userLoginDetails={userLoginDetails} searchProduct={searchProduct}/>}/>
            <Route path="/product-details" element={<ProductDetails/>}/>
            <Route path="/place-order" element={<OrderPlace userLoginDetails={userLoginDetails}/>}/>
           </Routes>
      </BrowserRouter>
    </div>
  )
}