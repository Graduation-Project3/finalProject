import React, { useState } from "react";
import Axios from "axios";
import { createContext } from "react";
export const AddItemContext = createContext(' ');

const AddItemProvider = (props) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [message, setMessage] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const state = {
        setTitle,
        setDescription,
        setMessage,
        addItem,
        setImage,
        setMinPrice,
        setMaxPrice,
        title,
        description,
        message,
        image,
        minPrice,
        maxPrice
    };

    function addItem(e) {
       
        console.log("khkusvccccccccccccccccccccccccccccccccccccccccccccccccccj");
        Axios.post("/add_item", {
            title: title,
            description: description,
            imageUrl:image,
            minPrice: minPrice,
            maxPrice: maxPrice
        })
            .then((result) => {
                console.log(result);
                if (result.status === 201) {
                    setMessage("Valid Add Item");
                }
                else {
                    setMessage(result.data)
                }
            })
            
    }
    return (
        <AddItemContext.Provider value={state}>
            {props.children}
        </AddItemContext.Provider>
    );
};

export default AddItemProvider;