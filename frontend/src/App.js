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
import UploadImage from './components/firebase/img';
import Payment from './components/payment/Payment';
import Forget from './components/reset/enterEmail';
import Reset from './components/reset/new-password';
import Admin from './components/admin/admin';
import EditUsers from './components/admin/user';
import CategoryControll from './components/admin/category';
import EditItem from './components/admin/item';
import AcceptItem from './components/admin/acceptItems';

function App() {
  let t = localStorage.getItem("auth-token");
  const [token, setToken] = useState(t);
  const [userId, setUserId] = useState(false);
  const [routes, setRoutes] = useState(<Routes>
    <Route exact path='/' element={<Home />} />
    <Route path='/signUp' element={<SignUp />} />
    <Route path='/signIn' element={<Login />} />
    <Route path='/admin' element={<Admin />} />

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
        <Route path='/UploadImage' element={<UploadImage />} />
        <Route path='/category/:category' element={<CategoryItem />} />
        <Route path='/Search' element={<SearchItem />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/editUsers' element={<EditUsers />} />
        <Route path='/editCategory' element={<CategoryControll />} />
        <Route path='/editItems' element={<EditItem />} />
        <Route path='/acceptItems' element={<AcceptItem />} />

      </Routes> :
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/signUp' element={<SignUp />} />
          <Route path='/signIn' element={<Login />} />
          <Route path='/UploadImage' element={<UploadImage />} />
          <Route path='/product/:prodId' element={<Product />} />
          <Route path="*" element={<Navigate to='/signIn' />} />
          <Route path='/category/:category' element={<CategoryItem />} />
          <Route path='/Search' element={<SearchItem />} />
          <Route path='/forget-email' element={<Forget />} />
          <Route path='/reset/:token' element={<Reset />} />
          <Route path='/editUsers' element={<EditUsers />} />
          <Route path='/editCategory' element={<CategoryControll />} />
          <Route path='/editItems' element={<EditItem />} />
          <Route path='/acceptItems' element={<AcceptItem />} />
          <Route path='/admin' element={<Admin />} />

        </Routes>
      }
    </userContext.Provider>
  );
}

export default App;


