const defaultUrl = "http://localhost:8080";

export function addProductAPI(productName,productCategory,productPrice,productDesctiption,manufacturer,availableItems,imageUrl){
    const userLoginData = JSON.parse(sessionStorage.getItem("userLoginData"));

    const ProductDetails = {
        name: productName,
        category: productCategory,
        price: productPrice,
        description: productDesctiption,
        manufacturer: manufacturer,
        availableItems:availableItems,
        imageUrl: imageUrl
    }

    const data = fetch(`${defaultUrl}/products`,{
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
            "x-access-token" : userLoginData?.isAuthenticated,
        },
        body : JSON.stringify(ProductDetails)
    }).then(res=>res.json())
    .then((data)=>{
        console.log(data);
        return data;
    }).catch((err)=>{
        console.log(err);
        return err;
    });
    return data;
}

export function updateProductAPI(id,productName,productCategory,productPrice,productDesctiption,manufacturer,availableItems,imageUrl){
    const userLoginData = JSON.parse(sessionStorage.getItem("userLoginData"));
    const ProductDetails = {
        name: productName,
        category: productCategory,
        price: productPrice,
        description: productDesctiption,
        manufacturer: manufacturer,
        availableItems:availableItems,
        imageUrl: imageUrl
    }

    const data = fetch(`${defaultUrl}/products/${id}`,{
        method : "PUT",
        headers : {
            "Content-Type" : "application/json",
            "x-access-token" : userLoginData?.isAuthenticated,
        },
        body : JSON.stringify(ProductDetails)
    }).then(res=>res.json())
    .then((data)=>{
        console.log(data);
        return data;
    }).catch((err)=>{
        console.log(err);
        return err;
    });
    return data;
}

export function deleteProductAPI(id){
    const userLoginData = JSON.parse(sessionStorage.getItem("userLoginData"));
    const data = fetch(`${defaultUrl}/products/${id}`,{
        method : "DELETE",
        headers : {
            "Content-Type" : "application/json",
            "x-access-token" : userLoginData?.isAuthenticated,
        }
    }).then(res=>res.json())
    .then((data)=>{
        console.log(data);
        return data;
    }).catch((err)=>{
        console.log(err);
        return err;
    });
    return data;
}

