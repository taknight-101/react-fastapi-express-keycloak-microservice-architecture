import React  , {useEffect , useState} from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import SignInComponent from "./SignInComponent";
import SignUpComponent from "./SignUpComponent";
import Welcome from "./Welcome" ; 
import Home from "./Home"
import {validate_token} from "../web_api"


function RootComponent (){



       return (
        <>
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
              path={"/signup"}
              render={() => {
                return <SignUpComponent />;
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
             return <Home/>
              }}
            />

         
          </Switch>
        </Router>

        </>
      ); 
  }

export default RootComponent;
