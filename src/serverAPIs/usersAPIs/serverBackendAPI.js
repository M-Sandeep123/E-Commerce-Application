const defaultUrl = "http://localhost:8080";

export async function loginAPI(email, password){
    const loginDetails = {email : email, password : password};
    const data = fetch(`${defaultUrl}/signIn`,{
        method : "POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body:JSON.stringify(loginDetails)
    }).then((response)=>response.json())
    .then((data)=>{
        sessionStorage.setItem("userLoginData",JSON.stringify(data));
        return data;
    })
    .catch((error)=>{
        console.log(error);
        return error;
    });
    return data;
}

export function signupAPI(firstName,lastName,contactNumber,email,password){
    const userDetails = {
        firstName : firstName, 
        lastName : lastName, 
        contactNumber : contactNumber, 
        email : email, 
        password : password
    };
    const data = fetch(`${defaultUrl}/users`,{
        method : "POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body:JSON.stringify(userDetails)
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

export function userAddressAPI(name,contactNumber,street,landMark,city,state,zipCode){
    const userLoginData = JSON.parse(sessionStorage.getItem("userLoginData"));
    const addressDetails = {
        name : name,
        contactNumber : contactNumber,
        street : street,
        landMark : landMark,
        city : city,
        state : state,
        zipCode : zipCode
    };
    const data = fetch(`${defaultUrl}/addresses`,{
        method : "POST",
        headers:{
            "Content-Type" : "application/json",
            "x-access-token" : userLoginData?.isAuthenticated,     
        },
        body:JSON.stringify(addressDetails)
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


