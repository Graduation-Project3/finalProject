import './login.css';
import TextField from '@mui/material/TextField';
import { Button, createTheme, Typography } from '@mui/material';
import { useState, useContext } from 'react';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import useStyle from './login-style';
import { SignInContext } from '../../contexts/signIn';
import ErrorIcon from '@mui/icons-material/Error';
import CheckIcon from '@mui/icons-material/Check';
const emailvalidator = require("email-validator");




//this is style

// end style

//theme for typograpy
const theme = createTheme({
    typography: {
        fontFamily: '"Segoe UI Symbol"',
    }
})



const Login = () => {
    const signInContext = useContext(SignInContext);
    const navigate = useNavigate();
    document.body.classList.add('mb');
    ///Email validate
    const emailVali = () => {
        if (signInContext.email !== "" && !(emailvalidator.validate(signInContext.email))) {
            return (<div className='errorMessage1 emailMsg1'><ErrorIcon sx={{ height: 17 }}></ErrorIcon> <span className='msg1' style={{ position: 'absolute' }}> Incorrect Email</span></div>)
        }
        else if (signInContext.email === "") {
            return
        }
        else {
            return (<div className='passMessage1 emailMsg1'><CheckIcon sx={{ height: 17 }}></CheckIcon><span className='msg1' style={{ position: 'absolute' }}> Correct Email</span> </div>)
        }
    }

    /// Password Validate
    const passwordValidate = () => {
        if (signInContext.password === "") {
            return
        }
        else if (signInContext.password.length < 8) {
            return (<div className='errorMessage'><ErrorIcon sx={{ height: 17 }}></ErrorIcon> <span style={{ position: 'absolute' }}> Your password must be at least 8 characters</span></div>)
        }

        else {
            return (<div className='passMessage'><CheckIcon sx={{ height: 17 }} /> <span style={{ position: 'absolute' }}> Correct  Password</span></div>)
        }
    }


    const sign = async (e) => {
        signInContext.login()
        e.preventDefault();

    };

    const [values, setValues] = useState({ password: '' });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });

    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    const redirect = () => {
        navigate('/signUp')
    }
    const forget = () => {
        navigate('/forget-email');
    };
    const classes = useStyle();

     return(
         <>
          <div className={classes.page_login}>
     

        <div className={classes.content_login}>
            <form className={classes.form}>

                <Box >
                    <Grid container rowSpacing={3} >
                        {/* typography */}
                        <Grid item xs={12}>
                            <Typography variant='h4' className={classes.typo} theme={theme} >
                                Welcome back
                            </Typography>
                        </Grid>
                      

                        {/* email */}
                        <Grid item xs={12} >
                            <TextField sx={{ width: '100%' }} label="Email" variant="outlined"
                            size='small'
                                onChange={(e) => {
                                    signInContext.setEmail(e.target.value.toLowerCase());
                                }} />
                        </Grid >
                        {emailVali()}

                        {/* password and hide password */}

                        <Grid item xs={12} >
                        
                            <FormControl sx={{ width: '100%' }} variant="outlined" size='small'>
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={values.showPassword ? 'text' : 'password'}
                                    onChange={(e) => {
                                        signInContext.setPassword(e.target.value);
                                    }}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {values.showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                />
                            </FormControl>
                        </Grid>
                        {passwordValidate()}
                    </Grid>

                </Box>
                <p><a href='#' className={classes.link} onClick={forget} >Forget password?</a></p>

                <Button variant='contained' size="medium" sx={[{ bgcolor: '#A7BBC7' },
                { "&:hover": { bgcolor: '#A7BBC7' } }]}
                    type='submit'
                    onClick={sign}
                >
                    Login</Button>

                <p><a href='' className={classes.link} onClick={redirect} >Create account</a></p>

            </form>
        </div>
        {signInContext.message && (
            <div className='message'>{signInContext.message}</div>
        )}
       
      </div>  
    </>

    ) 
};

export default Login;