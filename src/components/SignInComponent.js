import React, { useState } from "react";
import styled from "styled-components";
import { Formik, Field, Form, ErrorMessage } from 'formik';

import { useHistory } from "react-router-dom";



import {login ,  home , get_current_auth_user_roles} from '../web_api'


const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  align-items: center;
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  margin-top: 50px;
`

const Title = styled.h1`
  white-space: pre-line;
`

const SignInForm = styled(Form)`
  display: flex;
  flex-direction: column;
  padding: 30px;
  border: 1px solid black;
`

const Label = styled.label`
  margin-top: 20px;
  font-size: 24px;
`

const EmailField = styled(Field)`
  height: 40px;
  font-size: 24px;
`

const UsernameField = styled(Field)`
  height: 40px;
  font-size: 24px;
`

const PasswordField = styled(Field)`
  height: 40px;
  font-size: 24px;
`

const CheckboxContainer = styled.div`
  display: flex;
  height: 50px;
  align-items: center;
`

const CheckboxLabel = styled(Label)`
  margin-top: 7px;
  margin-left: 10px;
`

const RememberMeCheckboxField = styled(Field)`
  margin-top: 10px;
`

const SubmitButton = styled.input`
  height: 40px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #666666;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 40px;
`

const ErrorLabel = styled.div`
  font-size: 26px;
  color: red;
`



function handleValidation(values) {
  const errors = {};

  // if(!values.email) {
  //   errors.email = "Email can't be empty"
  // }

    if(!values.username) {
    errors.username = "Username can't be empty"
  }


  if(!values.password) {
    errors.password = "Password can't be empty" 
  } else if (values.password.length < 4) {
    errors.password = "Password should be at least 8 characters" 
  }
  return errors
}


function SignInComponent () {


   
  
  // const [access_token , setAccess_token] = useState(null)

  
  // return access_token ? <Redirect to="/home" /> :
  let history = useHistory();
  
       return  (
        <Container>
          <ContentContainer>
          <Title>{"Sign In"}</Title>
          
          <Formik initialValues={{ username: '', password: '', rememberMe: false }} 
                  onSubmit={(values)=>{

                      let user_input= values 
                   
               
                      const out = login('/login').then(access_token=>{
                  
                        if(user_input.rememberMe){
                       
                          localStorage.setItem("access_token", JSON.stringify(access_token));


                          //get authenticated user's roles
                                          
                          get_current_auth_user_roles(access_token.access_token).then(roles=>{
                  
                            
                         
                            localStorage.setItem("user_roles", JSON.stringify(roles));

                        //  1. here we can either call the further portected business service layer , passing in [access_token + our user role ] , get the data , and render it back to react

                        // 2. or we call back to a protected route on react-side [with state ?]
                        // home(access_token).then(history.push("/home"))

                      home(access_token , roles ).then(api_gateway_response => {
                       
                        console.log(api_gateway_response)
  
                         return history.push("/home")
                        })

                        

                          }) 



                        }else {
                          //TODO
                          localStorage.setItem("access_token", true);
                        }
                        
                       
                      
                   
                      
                     
                        
               
                        
                    } )

                  }}
                  validate={handleValidation}>

            {props => {
              
              
               //TODO 
               return  ! localStorage.getItem("access_token") ? (


                    
              <SignInForm>
                {/* <Label>Email</Label>
                <EmailField name="email" type="email"/>

                <ErrorMessage name="email">
                  {error => <ErrorLabel>{error}</ErrorLabel>}
                </ErrorMessage> */}


                <Label>Username</Label>
                <UsernameField name="username" type="username"/>

                <ErrorMessage name="username">
                  {error => <ErrorLabel>{error}</ErrorLabel>}
                </ErrorMessage>



                <Label>Password</Label>
                <PasswordField name="password" type="password"/>

                <ErrorMessage name="password">
                  {error => <ErrorLabel>{error}</ErrorLabel>}
                </ErrorMessage>

                <CheckboxContainer>
                  <RememberMeCheckboxField type="checkbox" name="rememberMe"/>
                  <CheckboxLabel>Remember me</CheckboxLabel>
                </CheckboxContainer>

                <SubmitButton type="submit" disabled={props.isSubmitting}/>
              </SignInForm>

            ) : history.push("/home") 
            
          }
            }
          </Formik>

          </ContentContainer>
        </Container>
      ); 
   
  }

export default SignInComponent;
