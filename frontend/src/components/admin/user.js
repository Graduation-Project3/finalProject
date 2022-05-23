import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './admin.css';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@material-ui/core/Button';
import { useNavigate } from 'react-router-dom';


const EditUsers = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');
    const [id, setId] = useState('');
    const deleteUserById = (id) => {
        axios.delete(`/deleteUser/${id}`)
            .then((result) => {
                setId(id)
                setMessage("result")
            })
            .catch(() => {
                setMessage("No item found")
            });
    }

    useEffect(() => {
        axios
            .get(`/getUsers`)
            .then((result) => {
                setUsers(result.data)
                setMessage("result")
            })
            .catch((err) => {
                setMessage("No users found")
            });
    }, [id]);


    return (<div>
        <div style={{textAlign:'center'}}><h1>View And Delete User</h1></div>
        <div className='mainDivUser'>
            <div className='subDivUser'>
                <h2 className='tadInDiv'>Name</h2>
                <h2 className='tadInDiv'>Location</h2>
                <h2 className='emailInDiv'>Email</h2>
                <h2 className='tadInDiv'>Delete user</h2>


            </div>
            {users.map((ele) => {
                return (
                    <div className='subDivUser'>
                        <h3 className='tadInDiv'>{ele.firstName + " " + ele.lastName}</h3>
                        <p className='tadInDiv'>{ele.location}</p>
                        <p className='emailInDiv'>{ele.email}</p>
                        <DeleteIcon
                            onClick={() => deleteUserById(ele._id)}
                            className='deleteIcon' />


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


export default EditUsers;