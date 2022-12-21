import { Card, CardMedia, CardContent, Typography, CardActionArea, FormControl, InputLabel, Select, MenuItem, TextField } from "@mui/material";
import { Button, Step, StepLabel, Stepper } from "@mui/material";
import { Fragment, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import "./orderPlace.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userAddressAPI } from "../../serverAPIs/usersAPIs/serverBackendAPI";
import { placeOrderAPI } from "../../serverAPIs/adminAPIs/OrdersAPIs/placeOrderAPI";



export default function OrderPlace({ userLoginDetails }) {
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);
    const location = useLocation();
    const product = location.state.product;
    const quantity = location.state.quantity;
    const [goBackHome, setGoBackHome] = useState(false);

    //Address field management  name,contactNumber,street,landMark,city,state,zipCode
     //state of selected address 
     const [selectAddress, setSelectAddress] = useState({});
     const [triger,setTriger] = useState(false);
     
    const [name, setName] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [street, setStreet] = useState("");
    const [landMark, setLandMark] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [addressId,setAddressId] = useState("");

   

    //calling the user Address API
    const userAddressDetails = () => {
        userAddressAPI(name, contactNumber, street, landMark, city, state, zipCode)
            .then((data) => {
                setAddressId(data._id);
                setSelectAddress(data);
            });
            goToNextStep();
    }

    const goToNextStep = () => {
        if (activeStep < 2)
            setActiveStep((val) => val + 1);
    }

    const goToPreviousStep = () => {
        if (activeStep !== -1)
            setActiveStep((val) => val - 1);
    }

    const confirmOrder = () => {
        
        placeOrderAPI(product._id,addressId)
        .then((data)=>{
            console.log(data);
            if(!data?.message){
                toast.success("Order placed successfully");
            }else{
                toast.error(data?.message);
            }
        })
        setGoBackHome(true);
    }

    const shopMore = () => {
        setGoBackHome(false);
        navigate("/home");
    }


    return (
        <Fragment>
            {!goBackHome && <Stepper activeStep={activeStep} style={{ marginTop: 10 }}>
                <Step>
                    <StepLabel>Items</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Select Address</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Conform Order</StepLabel>
                </Step>
            </Stepper>}<br></br>
            {activeStep === 0 &&
                <Card sx={{ maxWidth: 1000, height: 300, margin: "auto", marginTop: 10 }}>
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
                            <Typography gutterBottom component="div" >
                                Quantity : <b>{quantity}</b>
                            </Typography>
                            <Typography gutterBottom variant="h5" component="div" style={{ color: "red" }}>
                                ${product.price}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>}
            {activeStep === 1 &&
                <Fragment>
                    <Box sx={{ marginLeft: 50, marginRight: 50, marginTop: 5 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label" sx={{ display: "flex" }}>Select your Address</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                //value={age}
                                label="Age"
                                onChange={(e) => {
                                   if(e.target.value!== "new-address"){
                                    setTriger(true);
                                    setSelectAddress(userLoginDetails?.allAddresses[e.target.value]);
                                    setName(userLoginDetails?.allAddresses[e.target.value].name);
                                    setCity(userLoginDetails?.allAddresses[e.target.value].city);
                                    setContactNumber(userLoginDetails?.allAddresses[e.target.value].contactNumber);
                                    setState(userLoginDetails?.allAddresses[e.target.value].state);
                                    setLandMark(userLoginDetails?.allAddresses[e.target.value].landMark);
                                    setStreet(userLoginDetails?.allAddresses[e.target.value].street);
                                    setZipCode(userLoginDetails?.allAddresses[e.target.value].zipCode);
                                    setAddressId(userLoginDetails?.allAddresses[e.target.value]._id);
                                   }else{
                                    setSelectAddress({});
                                    setTriger(false);
                                    setName("");
                                    setCity("");
                                    setContactNumber("");
                                    setState("");
                                    setLandMark("");
                                    setStreet("");
                                    setZipCode("");
                                    setAddressId("");
                                   }
                                }}
                            >
                                <MenuItem value="new-address">New Address</MenuItem>
                                {userLoginDetails?.allAddresses.map((data, index) => {
                                    return <MenuItem value={index}>land mark :{data.landMark} - Street:{data.street}/ ZipCode : {data.zipCode}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </Box>
                    <div className="comment-tag">-OR-</div>
                    <div className="comment-tag">Add Address</div>
                    <Box id="address-field" >
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            value={name}
                            label="Name"
                            type="text"
                            variant="outlined"
                            sx={{ width: 400 }}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="contact-number"
                            label="Contact Number"
                            type="text"
                            value={contactNumber}
                            variant="outlined"
                            sx={{ width: 400 }}
                            onChange={(e) => setContactNumber(e.target.value)}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="street"
                            label="Street"
                            type="text"
                            value={street}
                            variant="outlined"
                            sx={{ width: 400 }}
                            onChange={(e) => setStreet(e.target.value)}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="city"
                            label="City/Town"
                            type="text"
                            value={city}
                            variant="outlined"
                            sx={{ width: 400 }}
                            onChange={(e) => setCity(e.target.value)}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="dist"
                            label="District"
                            type="text"
                            variant="outlined"
                            sx={{ width: 400 }}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="state"
                            label="State"
                            type="text"
                            value={state}
                            variant="outlined"
                            sx={{ width: 400 }}
                            onChange={(e) => setState(e.target.value)}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="land-mark"
                            label="Land Mark"
                            type="text"
                            value={landMark}
                            variant="outlined"
                            sx={{ width: 400 }}
                            onChange={(e) => setLandMark(e.target.value)}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="zip-dode"
                            label="Zip Code"
                            type="text"
                            value={zipCode}
                            variant="outlined"
                            sx={{ width: 400 }}
                            onChange={(e) => setZipCode(e.target.value)}
                        />
                        {!triger && <Button variant="contained" sx={{ width: 400, marginTop: 1 }} onClick={userAddressDetails}>Save and Next</Button>}
                    </Box>
                </Fragment>
            } {activeStep === 2 &&
                <Box className="product-order">
                    <Card sx={{ maxWidth: 500, height: 320, marginLeft: 40, marginTop: 10 }}>
                        <CardActionArea>
                            <CardContent >
                                <Typography gutterBottom variant="h4" component="div">
                                    {product.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {product.description}jlksdjfkdsfkasljflkdsjflkdsjklfjsdakljfdksljflksdjkljdsklfjsd
                                    flsdajfdslkjflksdjfkldjsklfjdskjfdsnvn jsnvjdshfhsadhfjsdhfksdjfkdsjflksdjafl;a;lskdjflksjaflasjfalskjf
                                </Typography><br />
                                <Typography gutterBottom >
                                    Category : <b>{product.category}</b>
                                </Typography>
                                <Typography gutterBottom component="div" >
                                    Quantity : <b>{quantity}</b>
                                </Typography>
                                <Typography gutterBottom variant="h5" component="div" style={{ color: "red" }}>
                                    ${product.price}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    <Card sx={{ maxWidth: 500, height: 320, marginRight: 50, marginTop: 10 }}>
                        <CardActionArea >
                            <CardContent >
                                <Typography gutterBottom variant="h4" component="div">
                                    Address Details :
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Name : {selectAddress?.name}
                                </Typography><br />
                                <Typography gutterBottom >
                                    Contact Number : {selectAddress?.contactNumber}
                                </Typography>
                                <Typography gutterBottom component="div" >
                                    Land Mark : {selectAddress?.landMark}
                                </Typography>
                                <Typography gutterBottom >
                                    City/Town : {selectAddress?.city}
                                </Typography>
                                <Typography gutterBottom >
                                    Dist : Nalgonda
                                </Typography>
                                <Typography gutterBottom >
                                    State : {selectAddress?.state}
                                </Typography>
                                <Typography gutterBottom >
                                    ZipCode : {selectAddress?.zipCode}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Box>
            }
            <br></br>
            <div className="navigate-buttons">
                {activeStep === 0 ? <Button onClick={goToPreviousStep} disabled>Back</Button>
                    : !goBackHome && <Button onClick={goToPreviousStep}>Back</Button>
                }
                {(activeStep !== 2) &&  <Button onClick={goToNextStep}>Next</Button>}
                {!goBackHome && activeStep === 2 &&
                    <Button onClick={confirmOrder} variant="contained">Place Order</Button>
                }
                {goBackHome && <Button onClick={shopMore} variant="contained">Shop More</Button>}
                <ToastContainer background="Green" />
            </div>
            
        </Fragment>
    )
}