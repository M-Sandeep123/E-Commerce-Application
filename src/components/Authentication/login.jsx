import { Dialog, DialogTitle, DialogContent, TextField, Button, DialogContentText, DialogActions } from "@mui/material";
import { Box } from "@mui/system";
import { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { loginAPI, signupAPI } from "../../serverAPIs/usersAPIs/serverBackendAPI";


export default function Login({ openLogin, handleLoginClose }) {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [contact, setContact] = useState("");

    const [isLogin, setIsLogin] = useState(true);
    const [isRegister, setIsResgister] = useState(false);

    const openSignUp = () => {
        setIsResgister(true);
        setIsLogin(false);
    }

    const openSignin = () => {
        setIsLogin(true);
        setIsResgister(false)
    }

    const backToHome = () => {
        handleLoginClose();
        handleLoginClose();
        setIsLogin(true);
        setIsResgister(false)
        navigate("/home");

    }

    const userLogin = () => {
        loginAPI(email, password)
            .then((data) => {
                console.log(data);
                if (!data?.message) {
                    sessionStorage.setItem("userLoginData", JSON.stringify(data));
                    handleLoginClose();
                    setIsLogin(true);
                    setIsResgister(false)
                    navigate("/home");
                }else{
                    toast.error(data.message);
                }
            });
    }

    const userRegistration = () => {
        signupAPI(firstName, lastName, contact, email, password)
            .then((data) => {
                console.log(data);
            })
    }

    return (
        <div>
            <Dialog open={openLogin} >
                <DialogTitle> {isLogin ? "Sign In" : "Create Account"} </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        provide your details
                    </DialogContentText>
                    {isLogin && <Fragment>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="email"
                            label="Email Address"
                            value={email}
                            type="email"
                            fullWidth
                            variant="standard"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="password"
                            label="password"
                            type="password"
                            value={password}
                            fullWidth
                            variant="standard"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Box sx={{ marginTop: 2 }}><Link to={"/register"} onClick={openSignUp}>Don't have an account? signup</Link></Box>
                    </Fragment>}
                    {isRegister && <Fragment>
                        <TextField
                            fullWidth
                            autoFocus
                            margin="dense"
                            id="f-name"
                            label="First Name"
                            type="text"
                            variant="outlined"
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="l-name"
                            label="Last Name"
                            type="text"
                            fullWidth
                            variant="outlined"
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="email"
                            label="Email Address"
                            type="email"
                            fullWidth
                            variant="outlined"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="password"
                            label="password"
                            type="password"
                            fullWidth
                            variant="outlined"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="c-password"
                            label="Conform Password"
                            type="password"
                            fullWidth
                            variant="outlined"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="contact"
                            label="Contact"
                            type="text"
                            fullWidth
                            variant="outlined"
                            onChange={(e) => setContact(e.target.value)}
                        />
                        <Box sx={{ marginTop: 2, float: "right" }}><Link to={"/login"} onClick={openSignin} >Already have an account? sign in</Link></Box>
                    </Fragment>}
                </DialogContent>
                <DialogActions>
                    {isLogin && <Button onClick={userLogin}>Login</Button>}
                    {isRegister && <Button onClick={userRegistration}>register</Button>}
                    <Button onClick={backToHome}>Close</Button>
                </DialogActions>
            </Dialog>
            <ToastContainer/>
        </div>
    )
}
