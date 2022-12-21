import { Dialog, DialogTitle, DialogContent, Button, DialogContentText, DialogActions } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import { deleteProductAPI } from "../../serverAPIs/adminAPIs/AdminProductsAPI";

export default function DeleteProduct({ openPopupDel, closePopupDel, productId }) {
    const deleteProduct = ()=>{
        deleteProductAPI(productId).then((data)=>{
            if (!data?.message){
                toast.success(data.success);
            }else{
                toast.error(data?.message);
            }
        })
        closePopupDel();
    }

    return (
        <div>
            <Dialog open={openPopupDel} onClose={closePopupDel}>
                <DialogTitle>Confirm deletion of product!</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete the product?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={deleteProduct} variant="contained">Ok</Button>
                    <Button onClick={()=>closePopupDel()} variant="outlined">Cancel</Button>
                </DialogActions>
                <ToastContainer/>
            </Dialog>
        </div>
    )
}