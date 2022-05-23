import React, { useContext } from 'react';
import "./signUp.css";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import Grid from '@material-ui/core/Grid';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { SignUpContext } from '../../contexts/signUp';
import ErrorIcon from '@mui/icons-material/Error';
import CheckIcon from '@mui/icons-material/Check';
const emailvalidator = require("email-validator");


const SignUp = () => {
    const signUpContext = useContext(SignUpContext);
    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });
    const [values1, setValues1] = React.useState({
        amount1: '',
        password1: '',
        weight1: '',
        weightRange1: '',
        showPassword1: false,
    });
    const handleChange1 = (prop) => (event) => {
        setValues1({ ...values1, [prop]: event.target.value });
        signUpContext.setConfirmPassword(event.target.value)

    };
    const handleClickShowPassword1 = () => {
        setValues1({ ...values1, showPassword1: !values.showPassword1 });
    };
    const handleMouseDownPassword1 = (event) => {
        event.preventDefault();
    };
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
        signUpContext.setPassword(event.target.value)

    };

    ///Email validate
    const emailVali = () => {
        console.log("VALI FUN", signUpContext.email !== "" && !(emailvalidator.validate(signUpContext.email)))
        if (signUpContext.email !== "" && !(emailvalidator.validate(signUpContext.email))) {
            return (<div className='errorMessage emailMsg'><ErrorIcon sx={{ height: 17 }}></ErrorIcon> <span className='msg' style={{ position: 'absolute' }}> Incorrect Email</span></div>)
        }
        else if (signUpContext.email === "") {
            return
        }
        else {
            return (<div className='passMessage emailMsg'><CheckIcon sx={{ height: 17 }}></CheckIcon><span className='msg' style={{ position: 'absolute' }}> Correct Email</span> </div>)
        }
    }

    /// Password Validate
    const passwordValidate = () => {
        if (signUpContext.password === "") {
            return
        }
        else if (signUpContext.password.length < 8) {
            return (<div className='errorMessage'><ErrorIcon sx={{ height: 17 }}></ErrorIcon> <span style={{ position: 'absolute' }}> Your password must be at least 8 characters</span></div>)
        }

        else {
            return (<div className='passMessage'><CheckIcon sx={{ height: 17 }} /> <span style={{ position: 'absolute' }}> Correct  Password</span></div>)
        }
    }

    /// Confirm Password Validate
    const confirmPasswordValidate = () => {
        if (signUpContext.confirmPassword === "") {
            return
        }
        else if (signUpContext.confirmPassword.length < 8) {
            return (<div className='errorMessage'><ErrorIcon sx={{ height: 17 }}></ErrorIcon> <span style={{ position: 'absolute' }}> Your password must be at least 8 characters</span></div>)
        }
        else if (signUpContext.confirmPassword !== signUpContext.password)
            return (<div className='errorMessage' ><ErrorIcon sx={{ height: 17 }} />  <span style={{ position: 'absolute' }}> Incorrect Password</span></div>)
        else {
            return (<div className='passMessage'><CheckIcon sx={{ height: 17 }}></CheckIcon><span style={{ position: 'absolute' }}> Correct Password</span></div>)
        }
    }

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleSubmit = (e) => {
        console.log('sub func');
        signUpContext.addNewUser();
        e.preventDefault();
    };

    return (
        <div className="mainDiv mainQ" >
            <div className='rightDiv '>
                <h1 className='title'> SIGNUP</h1>
                <form onSubmit={handleSubmit} className='form'>
                    <Grid container spacing={2}>
                        {/* First Name */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                size='small'
                                className='txt'
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                id="firstName"
                                label="First Name"
                                autoFocus
                                onChange={(e) => {
                                    signUpContext.setFirstName(e.target.value);
                                }}
                            />
                        </Grid>

                        {/* Last Name */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                size='small'
                                className='txt'
                                autoComplete="lname"
                                name="lastName"
                                variant="outlined"
                                id="firstName"
                                label="Last Name"
                                onChange={(e) => {
                                    signUpContext.setLastName(e.target.value);
                                }}
                            />
                        </Grid>
                    </Grid>

                    {/* Email Address */}
                    <TextField
                        size='small'
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        variant="outlined"
                        onChange={(e) => {
                            signUpContext.setEmail(e.target.value);
                        }}
                    />

                    {emailVali()}

                    <Grid container spacing={2}>

                        {/* country */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                size='small'
                                className='txt'
                                autoComplete="country"
                                name="country"
                                variant="outlined"
                                fullWidth
                                id="country"
                                label="Country"

                            />

                        </Grid>

                        {/* Location */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                size='small'
                                variant="outlined"
                                fullWidth
                                id="location"
                                label="Location"
                                name="location"
                                autoComplete="location"
                                onChange={(e) => {
                                    signUpContext.setLocation(e.target.value);
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>

                        {/* Password */}
                        <Grid item xs={12} sm={6}>
                            <FormControl size='small' className='txt' variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={values.showPassword ? 'text' : 'password'}
                                    value={values.password}
                                    onChange={
                                        handleChange('password')
                                    }
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>

                                    }
                                    labelWidth={70}
                                />
                                {passwordValidate()}
                            </FormControl>
                        </Grid>

                        {/* Confirm Password */}
                        <Grid item xs={12} sm={6}>
                            <FormControl size='small' className='txt' variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    size='small'
                                    type={values1.showPassword1 ? 'text' : 'password'}
                                    value={values1.password1}
                                    onChange={
                                        handleChange1('password1')

                                    }
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword1}
                                                onMouseDown={handleMouseDownPassword1}
                                                edge="end"
                                            >
                                                {values1.showPassword1 ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    labelWidth={130}
                                />
                                {confirmPasswordValidate()}
                            </FormControl>
                        </Grid>
                    </Grid>


                    {/* Phone */}
                    <TextField
                        // type={signUpContext.phone ?'text' : 'number'}
                        size='small'
                        id="phone"
                        label="Phone"
                        variant="outlined"
                        onChange={(e) => {
                            signUpContext.setPhone(e.target.value);
                        }}
                    />
                    <p>If you have account <a href="#" >Click here</a>.</p>
                    <Button variant='contained' size="medium" sx={{ bgcolor: '#A7BBC7' }} onClick={(e) => { handleSubmit(e) }} > Sign Up</Button>

                </form>
                {signUpContext.message && (
                    <div className='message'>{signUpContext.message}</div>
                )}
            </div>
        </div>
    );
};

export default SignUp;