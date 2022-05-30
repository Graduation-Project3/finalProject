import './login.css';
import { Button, createTheme} from '@mui/material';
import { useState,  useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import { useParams } from "react-router-dom";
import Axios from 'axios';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import useStyle from './login-style';
import ErrorIcon from '@mui/icons-material/Error';
import CheckIcon from '@mui/icons-material/Check';





//this is style

// end style

//theme for typograpy
const theme = createTheme({
    typography: {
        fontFamily: '"Segoe UI Symbol"',
    }
})



const Reset = () => {
    const params = useParams();
    const [passwordCheck, setPasswordCheck] = useState("");
    const [password, setPassword] = useState("");
    const [valid, setValid] = useState('ok');
    const [message, setMessage] = useState('');
    const [id,setId] = useState();
    useEffect(() => {
        Axios.get(`/reset?id=${params.token}&type=single`)
            .then((result) => {
                console.log(result);
                setValid(true)
                setMessage('setted');
                setId(result.data.id);
            })
            .catch((err) => {
                console.log(err);
                setValid(false);
            });
    }, []);
    const passwordValidate = () => {
        if (passwordCheck === "") {
            return
        }
        else if (passwordCheck.length < 8) {
            return (<div className='errorMessage'><ErrorIcon sx={{ height: 17 }}></ErrorIcon> <span style={{ position: 'absolute' }}> Your password must be at least 8 characters</span></div>)
        }

        else {
            return (<div className='passMessage'><CheckIcon sx={{ height: 17 }} /> <span style={{ position: 'absolute' }}> Correct  Password</span></div>)
        }
    }
    const reset = () => {
        
        Axios.post("/reset", {
            password: password,
            id:id,
            token:params.token
        })
          .then((result) => {
            
              setValid(false)
                
           
          })
          .catch((err) => {
              console.log(err);
              setMessage('email not connected to any account')
          });

    }
    const classes = useStyle();

    return <div className={classes.page_login}>
{ valid ? 
        <div className={classes.content_login}>
        
            <form className={classes.form}>

                <Box >
                     <Grid item xs={12} >
                        <FormControl sx={{ width: '80%', marginBottom:'10%' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={ 'password'}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setPasswordCheck(e.target.value)
                                }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                           
                                            edge="end"
                                        >
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                    </Grid>
                    {passwordValidate()}

                     
                </Box>

                <Button variant='contained' size="medium" sx={[{ bgcolor: '#A7BBC7' },
                { "&:hover": { bgcolor: '#A7BBC7' } }]}
                    type='button'
                    onClick={reset}
                >
                    Send</Button>

            </form>
            <span>{message}</span>
           
        </div>
         : <div>Not valid token</div>}
    </div>


};

export default Reset;


