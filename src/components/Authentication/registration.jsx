import { Dialog, DialogTitle, DialogContent, TextField, Button, DialogContentText, DialogActions } from "@mui/material";

export default function SignUp({openSignUp, handleSignUpClose}) {
    return (
        <div>
            <Dialog open={openSignUp} onClose={handleSignUpClose} >
                <DialogTitle>Create Account</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        provide your details
                    </DialogContentText>
                    <TextField
                        fullWidth
                        autoFocus
                        margin="dense"
                        id="f-name"
                        label="First Name"
                        type="text"
                        variant="outlined"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="l-name"
                        label="Last Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="password"
                        label="password"
                        type="password"
                        fullWidth
                        variant="outlined"
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
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={openSignUp}>Register</Button>
                    <Button onClick={handleSignUpClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}