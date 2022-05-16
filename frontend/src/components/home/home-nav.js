import Typography from '@mui/material/Typography';
import { useContext,useEffect } from 'react';
import GavelIcon from '@mui/icons-material/Gavel';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { CategoryContext } from '../../contexts/itemsByCategories';
import { SearchContext } from '../../contexts/searchItems';
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
  const categoryContext = useContext(CategoryContext);
  const searchContext = useContext(SearchContext);
  let token = localStorage.getItem("auth-token");
  const navigate = useNavigate();
  
  const logout = ()=> {
    localStorage.setItem("auth-token","");
    Axios.post('/signOut')
    .then((result) => {
      

      navigate('/')
    })
    .catch((err) => {
     console.log(err);
    });
  }
  const redirect = () => {
    navigate('/signIn')
  }

  useEffect(() => {
    console.log("state");
    categoryContext.getItemsByCatgory()
    categoryContext.setCategory("")
  }, [categoryContext.category]);


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
          <Box className={classes.navCategories}>
            <div className={classes.catContainer}><FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              label="Age"
              value={categoryContext.category}
              onChange={(e) => {
                console.log("category",categoryContext.category);
                categoryContext.setCategory(e.target.value)
                
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"car"} >Ten</MenuItem>
              <MenuItem value={20}
              >Twenty
              </MenuItem>

              <MenuItem value={30}>Thirty
              </MenuItem>
            </Select>
          </FormControl>  </div>
          </Box>
          <Box className={classes.navSearch}>
            <TextField
              id="standard-basic"
              label="Search"
              size='small'
              onChange={(e) => {
                searchContext.setTitle(e.target.value)
              }}
              className={classes.mainColor}
              color={'primary'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon className={classes.mainColor} onClick={()=>{searchContext.getItemsByTitle()}} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box className={classes.navButton}>
            {token  ? <Button variant="contained" onClick={logout}><Link to= "/">Sign Out</Link></Button> : <Button variant="contained" onClick={redirect}>Sign In</Button>}
          </Box>
        </Box>


      </nav>
    </ThemeProvider>
  );
}

export default Nav;
