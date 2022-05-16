import React, { useState } from "react";
import axios from "axios";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
 export const CategoryContext = createContext();

const CategoryProvider = (props) => {
    let navigate = useNavigate();
    
  const [category, setCategory] = useState("");
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState("");
  
  const state = {
    category,
    items,
    message,
    setItems,
    setCategory,
    setMessage,
    getItemsByCatgory
    
  };
//   ${category}
  function getItemsByCatgory() {
    console.log("cat");
      console.log("invoke",category);
    axios
      .get(`/item/category/${category}`)
      .then((result) => {
        navigate(`/category/${category}`);
        console.log("items",items)
        setItems(result.data)
            // setItems([...items, element]))
            // console.log(element)
        
        
      })
      .catch((err) => {
        setMessage("No item found")
      });

  }

  return (
    <CategoryContext.Provider value={state}>
      {props.children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;