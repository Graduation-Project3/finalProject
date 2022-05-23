import React from 'react';

import { useNavigate } from 'react-router-dom';
import './admin.css';

const Admin = () => {
    const redirect =(e)=>{
       
    }
    
    const navigate = useNavigate();
    return (<div>
    <div style={{textAlign:'center'}}><h1>Admin Dashbord</h1></div>
    <div  className='mainDiv1' >
        <div onClick={() =>  navigate('/editUsers')} className='cardDiv1'>
            <h3 > View And Delete User</h3>
        </div >
        <div onClick={() =>  navigate('/editCategory')} className='cardDiv1'>
            <h3> Add And Delete Category</h3>
        </div>
        <div onClick={() =>  navigate('/editItems')} className='cardDiv1'>
            <h3> View And Delete User Item</h3>
        </div>
        <div onClick={() =>  navigate('/acceptItems')} className='cardDiv1'>
            <h3> Accept Or Reject The New Item</h3>
        </div>


    </div>
    </div>
    )
};

export default Admin;