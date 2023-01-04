import axios from "axios";
// import UuidStore from "./UuidStore";

const fastAPI_port = 8000
const fastAPI_baseURL = "http://localhost"
const fastAPI_URL = `${fastAPI_baseURL}:/${fastAPI_port}`


export async function login(username , password) {
    
    const response = await axios.get(
        "http://localhost:8000/login", {
            // headers: { 
            //     "X-SESSION-TOKEN": UuidStore.value
            // }
             params: { username , password  }
        });
    
    let output = response.data;
    return output;
}



export async function signup(username , first_name , last_name , email , password) {
    const response = await axios.post(
        "http://localhost:8000/users", null ,  {
            // headers: { 
            //     "X-SESSION-TOKEN": UuidStore.value
            // }
             params: { username , first_name , last_name, email ,password }
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

export async function validate_token(access_token , realmName = "") {
 //TODO: parameterize this
//  debugger
 realmName = "testRealm"

 
    if (!access_token)return false
    

    const response = await axios.get(
        `http://localhost:8080/realms/${realmName}/protocol/openid-connect/userinfo`, {
            headers: { 
                "Authorization": `Bearer ${access_token}`
            }
            
        }).catch(function (error) {
            
            if (error.response) {
                
                // alert(error.response.status)
                if(error.response.status == 401) return false
                return true
            
            }
          });
    
    return response
}


export async function business_signUP( id , username , email, password , access_token ,roles) {
  
    const response = await axios.post(
        "http://localhost:3333/signup", {

            id , username, email , password , access_token

        },{
            headers: { 
                "X-SESSION-TOKEN": access_token,
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



