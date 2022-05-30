import * as React from 'react';
import axios from "axios";
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import useStyle from './styles';
import Nav from '../home/home-nav';
import { useLocation } from 'react-router-dom';



function CategoryItem() {
    const location = useLocation();

    const [items, setItems] = useState([]);
    const [message, setMessage] = useState("");
    const classes = useStyle();
    const [show, setShow] = useState(classes.cardContainer);
    useEffect(() => {
        axios
            .get(`/item/category/${location.state.category}`)
            .then((result) => {
                setItems(result.data)
                setMessage("")
                if (result.data.length == 0) {
                    setMessage(" There is no items to display at the moment")
                }

            })
            .catch((err) => {
                setMessage("No item found")
            });
    }, [location.state.category]);

    return (
        <>
<Nav />
        <div className={classes.cards} >
            


            <div className={show}>
                {items.map((item, i) => (
                    <Item key={i} {...item} />
                ))}
            </div >
            <div className={classes.cardButton}>
            </div>

            {message && (
                <h1 style={{ textAlign: "center" }}>
                    {message}
                </h1>
            )}



        </div>
        </>

    );
}
export default CategoryItem;



const Item = ({ imageUrl, title, description, _id }) => {

    const classes = useStyle();
    return (
        <Card className={classes.card}>
            <CardMedia
                component="img"
                height="140"
                image={imageUrl[0]}
                alt="green iguana"

            />
            <CardContent className= {classes.cardContent}>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
                <Link to={`/product/${_id}`} style={{ textDecoration: 'none' ,color:'white'}}>
                    <Button style={{ backgroundColor: '#8D8DAA', color: 'white', margin: '1rem auto', display: 'block' }}>
                        Details
                    </Button>
                </Link>
            </CardContent>
        </Card>
    );
};