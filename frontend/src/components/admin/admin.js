import React from 'react';
import './admin.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

              

const theme = createTheme({
    palette: {
      primary: {
        main: '#8D8DAA',
      }
    },
  
  });
  
  
const Admin = () => {
    const redirect =(e)=>{
       
    }
    
const logout = () => {
        localStorage.setItem("auth-token", "");
        window.location.reload();
      }
    const navigate = useNavigate();
    return (
        <ThemeProvider theme={theme}>
    <div>
    <nav>
        <Button variant="contained" className='signOut' onClick={logout}><Link to="/" style={{ textDecoration: 'none' ,color:'white'}}>Sign Out</Link></Button>
    </nav>
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
    </ThemeProvider>
    )
};

export default Admin;