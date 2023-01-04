import React from "react";
import styled from "styled-components";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useHistory } from "react-router-dom";


import {login ,  home , get_current_auth_user_roles , signup , business_signUP} from '../web_api'


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

const SignUpForm = styled(Form)`
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

const ConfirmPasswordField = styled(PasswordField)`
  height: 40px;
  font-size: 24px;
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

const SignupSchema = Yup.object().shape({
   email: Yup.string().email("Invalid email").required("Email can't be empty") , 
   usernane: Yup.string().default('h').required("Username can't be empty") 
 });

const PasswordSchema = Yup.object().shape({
   password: Yup.string().required("Password can't be empty")
                         .test('len', "Very weak", val => val.length > 5)
                         .test('len', "Weak", val => val.length > 8)
 });



  // SignupSchema.validate({ username: 'jimmy' }).catch(function (err) {
  //   console.log(err.name)
  //   console.log(err.errors)
  // });

 
 function validatePassword(value) {
  var error = undefined;

  try {
    PasswordSchema.validateSync({password: value})
  } catch(validationError) {
    error = validationError.errors[0]
  }
console.log(error)
  return error;
}

function SignUpComponent (){
  
  let history = useHistory();


       return (
        <Container>
          <ContentContainer>
          <Title>{"Sign Up"}</Title>
          
          <Formik initialValues={{ email: '', password: '', confirmPassword: '' , username: ''  , first_name :'' , last_name : ''}} validationSchema={SignupSchema}
                  onSubmit={ (values, {setSubmitting}) => {
                    // alert(JSON.stringify(values))

                    //todo
                    signup(values.username , values.first_name , values.last_name , values.email, values.password).then((resp)=>{
                        console.log(resp)

                        const { id , username ,emailVerified , email , access_token } = resp 
                        const user_info = {id , username , email , access_token }
                        // call service layer to store user in db  
                        // localStorage.setItem("access_token", JSON.stringify(access_token));


                      // {
                      //   "id": "1ddeea81-2238-4c6d-9896-3e3ab684280c",
                      //   "createdTimestamp": 1672743268578,
                      //   "username": "oy",
                      //   "enabled": true,
                      //   "totp": false,
                      //   "emailVerified": false,
                      //   "firstName": "oy",
                      //   "lastName": "oy",
                      //   "email": "oy@test.com",
                      //   "disableableCredentialTypes": [],
                      //   "requiredActions": [],
                      //   "realmRoles": null,
                      //   "notBefore": 0,
                      //   "access": {
                      //     "manageGroupMembership": true,
                      //     "view": true,
                      //     "mapRoles": true,
                      //     "impersonate": false,
                      //     "manage": true
                      //   },
                      //   "attributes": null
                      // }

                       

                            get_current_auth_user_roles(access_token).then(roles=>{
                  
                            
                              user_info.roles = roles ; 
                            localStorage.setItem("user_info", JSON.stringify(user_info));

                           


                       business_signUP(user_info.id , user_info.username,user_info.email , values.password , user_info.access_token , roles).then(api_gateway_response => {
                       
                        console.log(api_gateway_response)
  
                         return history.push("/home")
                        })

                        

                          }) 



                     

                    })

                  }}
                  >

            {props => (

              <SignUpForm>

                <Label>Username</Label>
                <UsernameField name="username" type="username"/>

                <ErrorMessage name="username">
                  {error => <ErrorLabel>{error}</ErrorLabel>}
                </ErrorMessage>

                
                <Label>First Name</Label>
                <UsernameField name="first_name" type="first_name"/>

                <ErrorMessage name="first_name">
                  {error => <ErrorLabel>{error}</ErrorLabel>}
                </ErrorMessage>



                <Label>Last Name</Label>
                <UsernameField name="last_name" type="last_name"/>

                <ErrorMessage name="last_name">
                  {error => <ErrorLabel>{error}</ErrorLabel>}
                </ErrorMessage>




                <Label>Email</Label>
                <EmailField name="email" type="email"/>

                <ErrorMessage name="email">
                  {error => <ErrorLabel>{error}</ErrorLabel>}
                </ErrorMessage>

                <Label>Password</Label>
                <PasswordField name="password" validate={validatePassword} type="password"/>

                <ErrorMessage name="password">
                  {error => <ErrorLabel>{error}</ErrorLabel>}
                </ErrorMessage>

                <Label>Confirm Password</Label>
                <PasswordField name="confirmPassword" validate={validatePassword} type="password"/>

                <ErrorMessage name="confirmPassword">
                  {error => <ErrorLabel>{error}</ErrorLabel>}
                </ErrorMessage>

                <SubmitButton type="submit" disabled={props.isSubmitting}/>
              </SignUpForm>

            )}
          </Formik>

          </ContentContainer>
        </Container>
      ); 
   
  }

export default SignUpComponent;
