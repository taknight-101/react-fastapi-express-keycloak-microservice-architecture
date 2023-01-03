import React  from "react";
import { Link } from "react-router-dom";


function Welcome(){

    return (


        <div style={{textAlign : "center", marginTop : "3rem"}}>
            <h1> A POC of a microservice-based architecture incorporating keycloak's identity management & access control </h1> 
           

           <Link className = "btn btn-outline-dark" to={"/signin"}>{"Sign in"}</Link>

        </div>
                   

    )
}


export default Welcome