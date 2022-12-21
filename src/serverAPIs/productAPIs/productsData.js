
const defaultUrl = "http://localhost:8080";


export function getAllProductsAPI(){
    const productsData = fetch(`${defaultUrl}/products`,{
        method : "GET",
        headers : {
            "Content-Type" : "application/json"
        }
    }).then(res=> res.json())
    .then((data)=>{
        return data;
    }).catch(error => {
        console.log(error);
        return error;
    });
    return productsData;
}

export function getCategoriesAPI(){
    const productsCategories = fetch(`${defaultUrl}/products/category`,{
        method : "GET",
        headers : {
            "Content-Type" : "application/json"
        }
    }).then(res=> res.json())
    .then((data)=>{
        return data;
    }).catch(error => {
        console.log(error);
        return error;
    });
    return productsCategories;
}