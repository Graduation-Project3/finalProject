import './login.css';
import TextField from '@mui/material/TextField';
import { Button, createTheme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState, useContext } from 'react';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';

import Axios from 'axios';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import useStyle from './login-style';
import { SignInContext } from '../../contexts/signIn';




//this is style

// end style

//theme for typograpy
const theme = createTheme({
    typography: {
        fontFamily: '"Segoe UI Symbol"',
    }
})



const Forget = () => {
   const [email,setEmail] = useState();
   const [message,setMessage] = useState('');
   const forget = (e) =>{
    Axios.post("/forget", {
      email: email,

  })
    .then((result) => {
      
        console.log(result);
        setMessage('email sent')
          
     
    })
    .catch((err) => {
        console.log(err);
        setMessage('email not connected to any account')
    });


}
    const classes = useStyle();

    return <div className={classes.page_login}>

        <div className={classes.content_login}>
            <form className={classes.form}>

                <Box >
                    <Grid container rowSpacing={3} >
                        {/* typography */}
                        <Grid item xs={12}>
                            <Typography variant='h5' className={classes.typo} theme={theme} >
                                please enter your email
                            </Typography>
                        </Grid>

                        {/* email */}
                        <Grid item xs={12} >
                            <TextField sx={{ width: '80%' }} label="Email" variant="outlined" 
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }} />
                        </Grid >

                        {/* password and hide password */}


                    </Grid>

                </Box>

                <Button variant='contained' size="medium" sx={[{ bgcolor: '#A7BBC7' },
                { "&:hover": { bgcolor: '#A7BBC7' } }]}
                    type='button'
                    onClick={forget}
                >
                    Send</Button>

            </form>
            <span>{message}</span>
        </div>
    </div>


};

export default Forget;


