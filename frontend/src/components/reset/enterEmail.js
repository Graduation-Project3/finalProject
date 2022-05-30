import './login.css';
import TextField from '@mui/material/TextField';
import { Button, createTheme, Typography } from '@mui/material';
import { useState } from 'react';
import Axios from 'axios';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import useStyle from './login-style';
import ErrorIcon from '@mui/icons-material/Error';
import CheckIcon from '@mui/icons-material/Check';
const emailvalidator = require("email-validator");
const theme = createTheme({
    typography: {
        fontFamily: '"Segoe UI Symbol"',
    }
})

const Forget = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState('');
    const emailVali = () => {
        console.log("VALI FUN", email !== "" && !(emailvalidator.validate(email)))
        if (email !== "" && !(emailvalidator.validate(email))) {
            return (<div className='errorMessage emailMsg'><ErrorIcon sx={{ height: 17 }}></ErrorIcon> <span className='msg' style={{ position: 'absolute' }}> Incorrect Email</span></div>)
        }
        else if (email === "") {
            return
        }
        else {
            return (<div className='passMessage emailMsg'><CheckIcon sx={{ height: 17 }}></CheckIcon><span className='msg' style={{ position: 'absolute' }}> Correct Email</span> </div>)
        }
    }
    const forget = (e) => {
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
                            <TextField sx={{ width: '80%',marginBottom:'10%' }} label="Email" variant="outlined"
                                onChange={(e) => {
                                    setEmail(e.target.value.toLowerCase());
                                }} />
                        </Grid >

                        {/* password and hide password */}


                    </Grid>


                </Box>
                {emailVali()}
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


