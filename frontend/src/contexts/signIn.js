import React, { useState } from "react";
import Axios from "axios";
import { createContext , useContext} from "react";
import { useNavigate } from 'react-router-dom';
import {userContext} from "./userContext";
export const SignInContext = createContext(' ');


const LoginProvider = (props) => {
  const navigate = useNavigate();
  const auth = useContext(userContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const state = {
    setEmail,
    setPassword,
    login,
    setMessage,
    email,
    password,
    message
  };

  function login() {
      Axios.post("/signIn", {
        email: email,
        password: password 
    })
      .then((result) => {
        console.log(result);
        if (result.status === 200) {
          setMessage("Valid Login");
            auth.login(result.data.id,result.data.token)
            localStorage.setItem("auth-token", result.data.token);
            console.log(localStorage);
          navigate('/')
          window.location.reload();
        }
        else {
          setMessage(result.data)
        }
      })
      .catch((err) => {
       if (!email) {
          setMessage("please enter your e-mail");
        } else if (!password) {
          setMessage("please enter your password");
        }
         else {
          setMessage("the e-mail or password is not correct ");
        }
      });

  }

  return (
    <SignInContext.Provider value={state}>
      {props.children}
    </SignInContext.Provider>
  );
};

export default LoginProvider;