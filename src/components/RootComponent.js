import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import SignInComponent from "./SignInComponent";
import SignUpComponent from "./SignUpComponent";
import Welcome from "./Welcome" ; 

function RootComponent (){
  
       return (
        <Router>
          <Switch>

          <Route
              exact
              path={"/"}
              render={() => {
                return <Welcome />;
              }}
            />

            <Route
              exact
              path={"/signin"}
              render={() => {
                return <SignInComponent />;
              }}
            />

            <Route
              exact
              path={"/home"}
              render={(prop) => {
                // debugger;
                //TODO: just the existing of an access_token is enough to authorize the user at the moment :)
                return localStorage.getItem("access_token") && <h1> home page </h1>  || <h1> {"sorry, you are un-authorized :("}</h1>;
              }}
            />

            <Route
              exact
              path={"/signup"}
              render={() => {
                return <SignUpComponent />;
              }}
            />
          </Switch>
        </Router>
      ); 
  }

export default RootComponent;
