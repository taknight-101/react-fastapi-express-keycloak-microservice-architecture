import axios from "axios";
// import UuidStore from "./UuidStore";

const fastAPI_port = 8000
const fastAPI_baseURL = "http://localhost"
const fastAPI_URL = `${fastAPI_baseURL}:/${fastAPI_port}`


export async function login(route) {
    const response = await axios.get(
        "http://localhost:8000/login", {
            // headers: { 
            //     "X-SESSION-TOKEN": UuidStore.value
            // }
             params: { username: "ahmed.ibrahim" , password :"admin" }
        });
    
    let output = response.data;
    return output;
}


export async function home(token , roles) {
  
    const response = await axios.get(
        "http://localhost:3333/home", {
            headers: { 
                "X-SESSION-TOKEN": token,
                "USER-ROLES" : JSON.stringify(roles)
            }
            
        });
    
    let output = response.data;
    return output;
}


export async function get_current_auth_user_roles(token) {
    const response = await axios.get(
        "http://localhost:8000/current_user/roles", {
            headers: { 
                "Authorization": `Bearer ${token}`
            }
            
        });
    
    let roles = response.data;
    return roles;
}



