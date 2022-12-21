import { Card, CardMedia, CardContent, Typography, Button, CardActions, TextField, CardActionArea } from "@mui/material";
// import shoes1 from "../../assets/productImages/shoes1.jpg";
import "./productCard.css"
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ProductDetails() {
    const navigate = useNavigate();
    const [storyQuantity, setStoryQuanty] = useState(1);
    const location = useLocation();
    const product = location.state.product;

    const onClickHandle=()=>{
        navigate("/place-order", {state : {product : product, quantity:storyQuantity}})
    }


    return (
        <Card sx={{ maxWidth: 1000, height: 300, margin: "auto", marginTop: 10, padding: "50px" }}>
            <CardActionArea sx={{ display: "flex" }}>
                <CardMedia
                    component="img"
                    height="300"
                    image={product.imageUrl}
                    alt="green iguana"
                />
                <CardContent >
                    <Typography gutterBottom variant="h5" component="div">
                        {product.name}
                        <Typography gutterBottom style={{ float: "right" }}>
                            Available Quantity : {product.availableItems}
                        </Typography>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {product.description}jdksljfldsiofjmesdnflnsdncncbjkhed jnhjhsdcndjkshfjdsh
                        dsjajfioesefksadlkfjsldfjskldaf
                    </Typography><br />
                    <Typography gutterBottom >
                        Category : <b>{product.category}</b>
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div" style={{ color: "red" }}>
                        ${product.price}
                    </Typography>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="quntity"
                        value={storyQuantity}
                        label="Quantity"
                        type="number"
                        variant="outlined"
                        onChange={(event)=>setStoryQuanty(event.target.value)}
                    />
                    <CardActions className="cardActions" style={{ float: "right" }}>
                        <Button variant="contained" onClick={onClickHandle}>Place Order</Button>
                    </CardActions>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}