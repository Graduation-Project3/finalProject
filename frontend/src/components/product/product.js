import { Fragment, useEffect, useState } from "react";
import Nav from "../home/home-nav";
import Box from '@mui/material/Box';
import { Button } from "@mui/material";
import Typography from '@mui/material/Typography';
import useStyle from './styles';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Select from '@mui/material/Select';
import { Carousel } from 'react-carousel-minimal';


function Product(props) {
    const classes = useStyle();
    const params = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("auth-token");
    const [product, setProduct] = useState(null);
    const [prices, setPrices] = useState([]);
    const [image,setImage] = useState();
    const [datee, setDate] = useState();
    const [price, setPrice] = useState(0);
 

    useEffect(() => {
        Axios.get(`/product?id=${params.prodId}&type=single`).then(response => {
            setProduct(response.data.prod)
            setPrices(response.data.prod.prices);
            setPrice(response.data.prod.maxPrice);
            setDate(response.data.prod.date)
            let i = response.data.prod.imageUrl;
            let d =[];
            for (let index = 0; index < i.length; index++) {
                d.push({
                    image : i[index],

                })
            };
            setImage(d);
        }).catch(err => console.log(err))
    }, []);
    const handleSubmit = () => {
        if (!token) {
            navigate('/signIn');
        }
        else {
            Axios.post('/auction', { product: product, price: price, token: token }).then(response => {
                console.log(response);
                if (response.data.pay) {
                    window.location.reload()
                }
                else {
                    navigate('/payment',{state:{product:product._id,price:price,token:token}});
                }
            }).catch(err => console.log(err))

        }
    };
    const handleChange = (event) => {
        setPrice(event.target.value);
        console.log(price);
    }
    return (

        <Fragment>
            <Nav />
            {
                product ? <main className={classes.productContainer}>
                    <Box className={classes.mainBox}>
                    <Box className={classes.imgBox}>
                            {/* <img className={classes.prodImg} src={product.imageUrl[0]}></img>
                            <img className={classes.prodImg} src={product.imageUrl[1]}></img>
                            <img className={classes.prodImg} src={product.imageUrl[2]}></img>  */}

                            {
                                <div style={{
                                    padding: "0 20px"
                                }}>
                                    {
                                        image ? <Carousel
                                        data={image}
                                        time={2000}
                                        width="400px"
                                        height="200px"
                                        radius="10px"
                                        slideNumber={true}
                                        automatic={true}
                                        pauseIconColor="white"
                                        pauseIconSize="40px"
                                        slideBackgroundColor="darkgrey"
                                        slideImageFit="cover"
                                        thumbnails={true}
                                        thumbnailWidth="100px"
                                        style={{
                                            textAlign: "center",
                                            maxWidth: "850px",
                                            maxHeight: "500px",
                                            margin: "40px auto",
                                        }}
                                    /> 
                                    : ''
                                    }
                                    
                                </div>

                            }

                        </Box>
                        <Box className={classes.aucBox}>
                        <Typography className={classes.prodTitle} variant='h6' component="h3" style={{ margin: '1rem 0' }}>expires at {datee}</Typography>
                            <Typography className={classes.prodTitle} variant='h4' component="h3" style={{ margin: '1rem 0' }}>{product.title}</Typography>
                            <Typography variant="body" className={classes.prodDesc} style={{ margin: '1rem 0' }}>
                                {product.description}
                            </Typography>
                            <Typography variant="body" className={classes.prodDesc} style={{ margin: '1rem 0' }}>
                                starts with {product.minPrice}
                            </Typography>
                            <Typography variant="body" className={classes.prodDesc} style={{ margin: '1rem 0' }}>
                                cuurent price = {price}
                            </Typography>

                            <FormControl sx={{ m: 2, minWidth: '10rem', textAlign: 'center' }} variant="outlined" >
                                <InputLabel id="demo-simple-select-helper-label">Enter Ammount</InputLabel>
                                <Select

                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={price}
                                    label="Enter Ammount"
                                    onChange={handleChange}
                                    className={classes.select}
                                >
                                    <MenuItem value={prices[0]}>{prices[0]}</MenuItem>
                                    <MenuItem value={prices[1]}>{prices[1]}</MenuItem>
                                    <MenuItem value={prices[2]}>{prices[2]}</MenuItem>
                                    <MenuItem value={prices[3]}>{prices[3]}</MenuItem>
                                    <MenuItem value={prices[4]}>{prices[4]}</MenuItem>
                                </Select>
                            </FormControl>

                            <Button style={{ backgroundColor: '#8D8DAA', color: 'white', margin: '1rem auto', display: 'block' }} onClick={handleSubmit} >
                                Aucation
                            </Button>

                        </Box>
                    </Box>
                </main> : <div></div>
            }



        </Fragment >

    );
}

export default Product;