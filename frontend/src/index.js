import React from 'react';
import ReactDOM from 'react-dom';
import RegisterProvider from './contexts/signUp';
import LoginProvider from './contexts/signIn';
import AddItemProvider from './contexts/addItem';
import CategoryProvider from './contexts/itemsByCategories'
import SearchProvider from './contexts/searchItems'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  BrowserRouter
} from "react-router-dom";
import App from './App';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <LoginProvider>
        <RegisterProvider>
          <AddItemProvider>
          <SearchProvider>
            <CategoryProvider>
              <App />
            </CategoryProvider>
          </SearchProvider>
          </AddItemProvider>
        </RegisterProvider>
      </LoginProvider>
    </BrowserRouter>

  </React.StrictMode>,
  document.getElementById('root')
);

