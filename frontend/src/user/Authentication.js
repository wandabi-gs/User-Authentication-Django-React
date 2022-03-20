import { API } from "../backend";
import { User } from "./SessionData";

const user = User();

export const signin = (data) => {
    let formData = new FormData();

     for(const name in data){
         formData.append(name,data[name])
     }

     return fetch(`${API}user/signin/`,{
         method : "POST",
         body : formData,
     })
     .then((response) => {
         return response.json()
     })
     .catch((error) => console.log(error))
}

export const is_authenticated = () => {
   if(localStorage.getItem('user')){
       return true;
   }
   else if(!localStorage.getItem('user')){
       return false;
   }
}

export const signup = (data) =>{
    let formData = new FormData();

    for(const name in data){
        formData.append(name,data[name])
    }

    return fetch(`${API}user/signup/`, {
        method: "POST",
        body : formData
    })
    .then((response) =>{return response.json()})
    .catch((error) => console.log(error))
}

export const signout = () => {
    if(is_authenticated()){
        localStorage.removeItem('user')
    }
}

export const changepicture = (data) => {
    let formData = new FormData();

    for(const name in data){
        formData.append(name,data[name]);
    }

    return fetch(`${API}user/ChangePicture/`,{
        method : "POST",
        headers : {
            'Authorization' : `Token ${user['session_token']}` ,
        },
        body : formData,
    })
    .then((response) => {
        return response.json();
    })
    .catch((error) => console.log(error))
}

export const deleteaccount = (data) => {
   let formData = new FormData();

   for(const name in data){
       formData.append(name,data[name]);
   }

   return fetch(`${API}user/DeleteAccount/`,{
    method : "POST",
    headers : {
        'Authorization' : `Token ${user['session_token']}` ,
    },
    body : formData,
})
.then((response) => {
    return response.json();
})
.catch((error) => console.log(error))

}

export const changepassword = (data) => {
    let formData = new FormData();

    for(const name in data){
        formData.append(name,data[name]);
    }

    return fetch(`${API}user/ChangePassword/`,{
        method : "POST",
        headers : {
            'Authorization' : `Token ${user['session_token']}`
        },
        body : formData,
    })
    .then((response) => {
        return response.json();
    })
    .catch((error) => console.log(error))
}
