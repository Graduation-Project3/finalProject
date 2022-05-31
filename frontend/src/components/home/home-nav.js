import Typography from '@mui/material/Typography';
import {  useEffect, useState } from 'react';
import GavelIcon from '@mui/icons-material/Gavel';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import useStyle from './styles';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



const theme = createTheme({
  palette: {
    primary: {
      main: '#8D8DAA',
    }
  },

});



function Nav(props) {

  let token = localStorage.getItem("auth-token");
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [message, setMessage] = useState('');
  const [searchVal, setSearchVal] = useState("");
  const [categoryTitle, setCategoryTitle] = useState([]);

  useEffect(() => {
    Axios.get(`/getAllCategory`)
      .then((result) => {
        setCategory(result.data)
        setMessage("result")
      })
      .catch((err) => {
        setMessage("No Category found")
      })
  }, [message])

  const logout = () => {
    localStorage.setItem("auth-token", "");
    window.location.reload();
  };
  const redirect = () => {
    navigate('/signIn')
  };
  const addItem = () =>{
    navigate('/addItem');
  };



  const classes = useStyle();
  return (
    <ThemeProvider theme={theme}>
      <nav className={classes.nav}>

        <Box className={classes.dis}
        >
          <Box className={classes.navLogo} >
            <GavelIcon className='logo'></GavelIcon>
            <Typography variant='h6' component="h3" className={classes.navItem}>Mazad</Typography>
          </Box>
          <Box className={classes.navCategories} >
            <div className={classes.catContainer}>
              <FormControl sx={{ m: -2, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-helper-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  label="category"
                  value={categoryTitle}
                  onChange={(e) => {
                    setCategoryTitle(e.target.value)
                    navigate(`/category/${e.target.value}`, { state: { category: e.target.value } });

                  }}
                >
                  {category.map(val => {
                    return (
                      <MenuItem value={val.title} >{val.title}</MenuItem>
                    )
                  })}

                </Select>
              </FormControl>  </div>
          </Box>
          <Box className={classes.navSearch}>
            <TextField
              id="standard-basic"
              label="Search"
              size='small'
              onChange={(e) => {
                setSearchVal(e.target.value)
              }}
              className={classes.mainColor}
              color={'primary'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon className={classes.searchButton} onClick={() => { navigate(`/search`, { state: { title: searchVal.toLowerCase() } }); }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          
          {token && (
                        <Box className={classes.addItem}> <Button variant="contained" onClick={addItem}>Add Item</Button>
                        </Box>
                    )}
          <Box className={classes.navButton}>
            {token ? <Button variant="contained" onClick={logout}><Link to="/" style={{ textDecoration: 'none' ,color:'white'}}>Sign Out</Link></Button> : <Button variant="contained" onClick={redirect}>Sign In</Button>}
          </Box>
        </Box>


      </nav>
    </ThemeProvider>
  );
}

export default Nav;
