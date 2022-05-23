import React, { useState } from "react";
import Axios from "axios";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import {storage} from "../components/firebase/firebase";
import { createContext } from "react";
import { Input } from '@mui/material';
export const AddItemContext = createContext(' ');

const AddItemProvider = (props) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState([]);
    const [message, setMessage] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [images, setImages] = useState([]);
    const [urls, setUrls] = useState([]);
    let path = [];

    const handleImage = (e) => {
        for (let i = 0; i < e.target.files.length; i++) {
            const newImage = e.target.files[i];
            newImage["id"] = Math.random();
            setImages((prevState) => [...prevState, newImage]);
        }
        const promises = [];
        images.map((file) => {
            if (!file) return;
            const sotrageRef = ref(storage, `files/${file.name}`);
            const uploadTask = uploadBytesResumable(sotrageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const prog = Math.round(
                      (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                  },
                  (error) => console.log(error),
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log(downloadURL);
                        path.push(downloadURL);
                        setImage(path);
                        console.log(path);
                        
                    }).catch(err => console.log(err));
                }
            );
        });

        /*  Promise.all(promises)
           .then(() => alert("All images uploaded"))
           .catch((err) => console.log(err)); */
    };


    const state = {
        setTitle,
        setDescription,
        setMessage,
        addItem,
        setImage,
        setMinPrice,
        setMaxPrice,
        setImages,
        setUrls,
        handleImage,
        title,
        description,
        message,
        image,
        minPrice,
        maxPrice,
        images,
        urls,
    };

    function addItem(e) {

        console.log("khkusvccccccccccccccccccccccccccccccccccccccccccccccccccj");
        Axios.post("/add_item", {
            title: title,
            description: description,
            imageUrl: image,
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