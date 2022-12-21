const defaultUrl = "http://localhost:8080";

export function placeOrderAPI(productId,addressId){
    const userLoginData = JSON.parse(sessionStorage.getItem("userLoginData"));
    const orderPlacing = {
        addressId: addressId,
        productId: productId
    };
    const data = fetch(`${defaultUrl}/orders`,{
        method : "POST",
        headers:{
            "Content-Type" : "application/json",
            "x-access-token" : userLoginData?.isAuthenticated,     
        },
        body:JSON.stringify(orderPlacing)
    }).then((response)=>response.json())
    .then((data)=>{
        console.log(data);
        return data;
    })
    .catch((error)=>{
        console.log(error);
        return error;
    });
    return data;
}