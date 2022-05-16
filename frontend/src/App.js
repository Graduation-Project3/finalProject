import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useState, useEffect, useCallback } from 'react';
import Axios from 'axios';
import Home from './components/home/Home';
import SignUp from './components/signUp/signUp'
import Login from './components/signIn/signIn';
import Product from './components/product/product';
import AddItem from './components/addItem/addItem';
import { userContext } from './contexts/userContext';
import CategoryItem from './components/itemsByCategories/itemsByCategories';
import SearchItem from './components/searchItems/searchItems';

function App() {
  let t = localStorage.getItem("auth-token");
  const [token, setToken] = useState(t);
  const [userId, setUserId] = useState(false);
  const [routes, setRoutes] = useState(<Routes>
    <Route exact path='/' element={<Home />} />
    <Route path='/signUp' element={<SignUp />} />
    <Route path='/signIn' element={<Login />} />
    <Route path="*" element={<Navigate to='/signIn' />} />
  </Routes>)

  const login = useCallback((uid, token) => {
    setToken(token);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
  }, []);

  useEffect(() => {
    let token = localStorage.getItem("auth-token");
    if (token === null) {
      localStorage.setItem("auth-token", "");
      token = "";
      setToken()
    }
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const bodyParameters = {
      key: "value"
    };
    console.log(token);
    Axios.post('/isValid', bodyParameters, config).then(result => {
      console.log(result);
      if (result.data.token === false) {
        localStorage.setItem("auth-token", "");
        setToken(false);
      }
      
    })
  }, []);

  return (
    <userContext.Provider value={
      {
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout
      }
    }>

      {token ? <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/product/:prodId' element={<Product />} />
        <Route path='/addItem' element={<AddItem />} />
        <Route path="*" element={<Navigate to='/' />} />
        <Route path='/category/:category' element={<CategoryItem />} />
      <Route path='/Search' element={<SearchItem />} />
      </Routes> :
      <Routes>
      <Route exact path='/' element={<Home />} />
      <Route path='/signUp' element={<SignUp />} />
      <Route path='/signIn' element={<Login />} />
      <Route path='/product/:prodId' element={<Product />} />
      <Route path="*" element={<Navigate to='/signIn' />} />
      <Route path='/category/:category' element={<CategoryItem />} />
      <Route path='/Search' element={<SearchItem />} />
      </Routes>
  }
    </userContext.Provider>
  );
}

export default App;
