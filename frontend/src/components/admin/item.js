import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './admin.css';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@material-ui/core/Button';
import { useNavigate } from 'react-router-dom';




const EditItem = () => {
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

    useEffect(() => {
        axios
            .get(`/getitems`)
            .then((result) => {
                setItems(result.data)
                setMessage("result")
            })
            .catch((err) => {
                setMessage("No item found")
            });
    }, [id]);


    return (<div>
        <div style={{textAlign:'center'}}><h1>View And Delete Item</h1></div>
            {/* <div className='subDivUser'>
                <h2 className='imageItem'>image</h2>
                <h2 className='tadInDiv'>title</h2>
                <h2 className='emailInDiv'>Description</h2>
                <h2 className='tadInDiv'>Delete iTEM</h2>

            </div> */}
        
            {items.map((ele) => {
                return (
                    <div  className='subDivUser'>
                        <img className='imageItem' src={ele.imageUrl[0]}></img>
                        <h3 className='itemInDiv'>{ele.title }</h3>
                        <p className='itemInDiv'>{ele.description}</p>
                        <DeleteIcon
                            onClick={() => deleteItemById(ele._id)}
                            className='deleteIcon' />


                    </div>
                )

            })}
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


export default EditItem;