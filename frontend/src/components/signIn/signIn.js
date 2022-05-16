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



const Login = () => {
    const signInContext = useContext(SignInContext);
    const navigate = useNavigate();


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
    /*  const submitHandler = (e) => {
         signInContext.addLogin();
     }; */
    const redirect = () => {
        navigate('/signUp')
    }

    const classes = useStyle();

    return <div className={classes.page_login}>

        <div className={classes.content_login}>
            <form className={classes.form}>

                <Box >
                    asfasf
                    <Grid container rowSpacing={3} >
                        {/* typography */}
                        <Grid item xs={12}>
                            <Typography variant='h4' className={classes.typo} theme={theme} >
                                Welcome back
                            </Typography>
                        </Grid>

                        {/* email */}
                        <Grid item xs={12} >
                            <TextField sx={{ width: '80%' }} label="Email" variant="outlined" 
                            onChange={(e) => {
                                signInContext.setEmail(e.target.value);
                            }} />
                        </Grid >

                        {/* password and hide password */}

                        <Grid item xs={12} >
                            <FormControl sx={{ width: '80%' }} variant="outlined">
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
                    </Grid>

                </Box>
                <p><a href='#' className={classes.link}>Forget password?</a></p>

                <Button variant='contained' size="medium" sx={[{ bgcolor: '#A7BBC7' },
                { "&:hover": { bgcolor: '#A7BBC7' } }]}
                    type='submit'
                    onClick={sign}
                >
                    Login</Button>

                <p><a href='' className={classes.link} onClick={redirect} >Create account</a></p>

            </form>
        </div>
    </div>


};

export default Login;