import { Card, CardActionArea, CardMedia, CardContent, Typography, Button, CardActions, IconButton } from "@mui/material";
import shoes1 from "../../assets/productImages/shoes1.jpg";
import "./productCard.css"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteProduct from "../AdminView/DeletePopup";

export default function ProductCards({userLoginDetails,product}) {
  const navigate = useNavigate();
  const [openPopupDel,setOpenPopupDel] = useState(false)

  const handleOnClick= ()=>{
    navigate("/product-details", {state: {product : product}});
  }
  const handleProductModify=()=>{
    navigate("/add-or-modify-product",{state:{product:product}});
  }

  const handleProductDelection = ()=>{
    setOpenPopupDel(true);
  }

  const closePopupDel = ()=>{
    setOpenPopupDel(false)
  }
  return (
      <Fragment>
        <DeleteProduct openPopupDel={openPopupDel} closePopupDel = {closePopupDel} productId={product._id} />
      <Card sx={{ maxWidth: 345 }} className="productCard">
        <CardActionArea>
          <CardMedia
            component="img"
            height="250"
            image={shoes1}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product.name}
              <Typography gutterBottom variant="h5" component="div" style={{float:"right"}}>
              ${product.price}
            </Typography>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.description}
            </Typography>
            <Typography gutterBottom variant="h7" component="div">
              Category : {product.category}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className="cardActions">
         <Button size="small" color="primary" variant="contained" onClick={handleOnClick}>
            Buy
          </Button>
         {userLoginDetails?.role === "ADMIN" && <div className="cardActions">
            <IconButton onClick={handleProductModify}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={handleProductDelection}>
              <DeleteIcon />
            </IconButton>
          </div>}
        </CardActions>
      </Card>
      </Fragment>
  );
}