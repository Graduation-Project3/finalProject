import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './admin.css';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@material-ui/core/Button';
import { useNavigate } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';




const AcceptItem = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [message, setMessage] = useState('');
    const [id, setId] = useState('');
    const deleteItemById = (id) => {
        axios.delete(`/deleteItem/${id}`)
            .then((result) => {
                setMessage(result.data)
                setId(id)
            })
            .catch(() => {
                setMessage("No item found")
            });
    }
    const updateItem = (id) => {
        axios.put(`/itemToReady/${id}`).then((result) => {
            setMessage(result.data)
            setId(id)
        })
            .catch(() => {
                setMessage("No item found")
            });

    }

    useEffect(() => {
        axios
            .get(`/itemsNotReady`)
            .then((result) => {
                setItems(result.data)
                setMessage("result")
            })
            .catch((err) => {
                setMessage("No item found")
            });
    }, [id]);


    return (<div>
        <div style={{ textAlign: 'center' }}><h1>View And Delete Item</h1></div>

        {items.map((ele) => {
            return (
                <div className='subDivAccept'>
                    <img className='imageItem' src={ele.imageUrl[0]}></img>
                    <h3 className='itemInDiv'>{ele.title}</h3>
                    <p className='itemInDiv'>{ele.description}</p>
                    <ClearIcon
                        onClick={() => deleteItemById(ele._id)}
                        className='deleteIcon' />
                    <CheckIcon
                        onClick={() => updateItem(ele._id)}
                        className='AproovIcon' />

                </div>
            )

        })}
        {message && (
            <div className="backButton">
                <Button
                    variant='contained'
                    onClick={() => navigate('/admin')}
                >
                    Back</Button></div>
        )}


    </div>
    )

}


export default AcceptItem;