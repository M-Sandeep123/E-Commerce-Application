import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { addProductAPI, updateProductAPI } from "../../serverAPIs/adminAPIs/AdminProductsAPI";
import "./addModify.css"


export default function AddProduct() {
    const productLocation = useLocation();
    const [name,setName] = useState(productLocation.state!==null?productLocation.state.product.name:"");
    const [manufacturer,setManufacturer] = useState(productLocation.state!==null?productLocation.state.product.manufacturer:"");
    const [availableItems,setAvailableItems] = useState(productLocation.state!==null?productLocation.state.product.availableItems:"");
    const [price,setPrice] = useState(productLocation.state!==null?productLocation.state.product.price:"");
    const [imageUrl,setImageUrl] = useState(productLocation.state!==null?productLocation.state.product.imageUrl:"");
    const [description,setDescription] = useState(productLocation.state!==null?productLocation.state.product.description:"");
    const [category,setCategory] = useState(productLocation.state!==null?productLocation.state.product.category:"");

    const addNewProductInDB = ()=>{
        addProductAPI(name,category,price,description,manufacturer,availableItems,imageUrl)
        .then((data)=>{
            console.log(data);
            if (!data?.message){
                toast.success("product updated successfully")
            }else{
                toast.error(data?.message);
            }
        })
    }

    const updateProductData = ()=>{
        updateProductAPI(productLocation.state.product._id,name,category,price,description,manufacturer,availableItems,imageUrl)
        .then((data)=>{
            console.log(data);
            if (!data?.message){
                toast.success("product updated successfully")
            }else{
                toast.error(data?.message);
            }
        });
    }
    
    return (
            <Box className="add-product-modify" sx={{ marginTop: 10 }}>
                      {productLocation.state!==null? "Modify Product" : "Add Product"}
                     <br></br>
                <TextField
                    autoFocus
                    margin="dense"
                    id="p-name"
                    value={name}
                    label="Product Name"
                    type="text"
                    variant="outlined"
                    sx={{ width: 400 }}
                    multiline
                    onChange={(e)=>setName(e.target.value)}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="p-category"
                    value={category}
                    label="Product category"
                    type="text"
                    variant="outlined"
                    sx={{ width: 400 }}
                    multiline
                    onChange={(e)=>setCategory(e.target.value)}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    value={manufacturer}
                    id="p-manufracture"
                    label="Manufracture"
                    type="text"
                    variant="outlined"
                    multiline
                    sx={{ width: 400 }}
                    onChange={(e)=>setManufacturer(e.target.value)}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    value={availableItems}
                    id="p-available-item"
                    label="Available Items"
                    type="text"
                    variant="outlined"
                    sx={{ width: 400 }}
                    multiline
                    onChange={(e)=>setAvailableItems(e.target.value)}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="p-price"
                    value={`${price}`}
                    label="$Price"
                    type="text"
                    variant="outlined"
                    sx={{ width: 400 }}
                    multiline
                    onChange={(e)=>setPrice(e.target.value)}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="p-img"
                    value={imageUrl}
                    label="Image Url"
                    type="text"
                    variant="outlined"
                    sx={{ width: 400 }}
                    multiline
                    onChange={(e)=>setImageUrl(e.target.value)}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="p-description"
                    value={description}
                    label="Description"
                    type="text"
                    variant="outlined"
                    sx={{ width: 400 }}
                    multiline
                    onChange={(e)=>setDescription(e.target.value)}
                />
                {productLocation.state===null?<Button variant="contained" sx={{ width: 400, marginTop: 1 }} onClick={addNewProductInDB}>Save Product</Button>
                : <Button variant="contained" sx={{ width: 400, marginTop: 1 }} onClick={updateProductData}>Modify Product</Button>    
            }
            <ToastContainer/>
            </Box>
    )
}