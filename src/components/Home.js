import React  , {useEffect , useState} from "react";

import {validate_token} from "../web_api"


function Home (){
  const [is_token_valid, set_token_valid] = useState(false); 
  const [is_loading, set_is_loading] = useState(true); 

  let access_token = null ;
  useEffect(() => {
    const  user_info = localStorage.getItem("user_info")
     access_token = user_info && JSON.parse(user_info).access_token

    validate_token(access_token).then( is_valid=> {
      console.log(access_token)
      set_token_valid(is_valid)

      set_is_loading(false)
      
    }) 

  }, [access_token]);


       return  is_loading ? <h1> loading ... </h1> :  is_token_valid && <h1> home page </h1> || <h1> {"sorry, you are un-authorized :("}</h1> 
     
                 
          
  }

export default Home;
