import React from "react";
import { useEffect, useState } from 'react';
import axios from 'axios';
import './admin.css';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useNavigate } from 'react-router-dom';




const CategoryControll = () => {
    const navigate = useNavigate();
    const [category, setCategory] = useState([]);
    const [message, setMessage] = useState('');
    const [title, setTitle] = useState('');
    const [id, setId] = useState('');
    const addCategory = () => {
        axios.post(`/addCategory/${title}`)
            .then((result) => {
                setMessage(result.data)
                setId(title)
            })
            .catch(() => {
                setMessage("No item found")
            });
    }

    const deleteCategoryById = (id) => {
        axios.delete(`/deleteCategory/${id}`)
            .then((result) => {
                setMessage(result.data)
                setId(id)
                
            })
            .catch(() => {
                setMessage("No item found")
            });
    }

    useEffect(() => {
        axios
            .get(`/getAllCategory`)
            .then((result) => {
                setCategory(result.data)
                setMessage("result")
            })
            .catch((err) => {
                setMessage("No Category found")
            });
    }, [id]);
    return (
        <div >
            <div style={{ textAlign: 'center' }}><h1>Add And Delete Category</h1></div>
            <div className="addCategory">
                <h3  className="addCat">Add New Category : </h3>
                <TextField
                    size='small'
                    variant="outlined"
                    label="Enter Category Name"
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                />
              <Button className="addCategoryButton"
              variant='contained'
              sx={{ bgcolor: '#A7BBC7' }}
              onClick={() =>  addCategory()}
                >
                    Add Category</Button>

            </div>
            <div className="mainDivCategory">
                {category.map((ele) => {
                    return (
                        <div className='subDivCategory'>
                            <h2 >{ele.title}</h2>

                            <DeleteIcon
                                onClick={() => deleteCategoryById(ele._id)}
                                className='deleteIconCategory' />
                        </div>
                    )

                })}
            </div>
            {message && (
                   <div className="backButton">
                   <Button 
                   variant='contained'
                   onClick={() => navigate('/admin') }
                     >
                         Back</Button></div>
                )}
        </div>
    )
}

export default CategoryControll