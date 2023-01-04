import React  from "react";
import { Link } from "react-router-dom";


function Welcome(){

    return (


        <div style={{textAlign : "center", marginTop : "3rem"}}>
            <h1> A POC of a microservice-based architecture incorporating keycloak's identity management & access control </h1> 
           

           <Link className = "btn btn-outline-success" to={"/signin"}>{"Sign in"}</Link>
           <Link style={{marginLeft : "1rem"}} className = "btn btn-outline-primary" to={"/signup"}>{"Sign up"}</Link>

        </div>
                   

    )
}


export default Welcome