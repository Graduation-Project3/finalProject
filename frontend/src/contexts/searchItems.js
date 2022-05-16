import React, { useState } from "react";
import axios from "axios";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
 export const SearchContext = createContext();

const SearchProvider = (props) => {
    let navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState("");
  
  const state = {
    title,
    items,
    message,
    setItems,
    setTitle,
    setMessage,
    getItemsByTitle
    
  };
  function getItemsByTitle() {
      console.log(title);
    axios
      .get(`/item/title/${title}`)
      .then((result) => {
        console.log(result.data)
        setItems(result.data)
        console.log("items",items)
        navigate(`/search`);
        
        
      })
      .catch((err) => {
        setMessage("No item found")
      });

  }

  return (
    <SearchContext.Provider value={state}>
      {props.children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;