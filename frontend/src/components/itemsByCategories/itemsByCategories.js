import * as React from 'react';
import { useState, useContext } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { Redirect } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import useStyle from './styles';
import Nav from '../home/home-nav';
import { CategoryContext } from '../../contexts/itemsByCategories';



function CategoryItem() {

    const categoryContext = useContext(CategoryContext);
    const classes = useStyle();
    const [show, setShow] = useState(classes.cardContainer);
    console.log("categoryContext.items", categoryContext.items);

    return (

        <div className={classes.cards} >
            <Nav />
            <div className={show}>
                {categoryContext.items.map((item, i) => (
                    <Item key={i} {...item} />
                ))}
            </div >
            <div className={classes.cardButton}>
            </div>

        </div>


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
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
                <Link to = {`/product/${_id}`}>
                    <Button style={{ backgroundColor: '#8D8DAA', color: 'white', margin: '1rem auto', display: 'block' }}>
                    Details
                </Button>
                </Link>
            </CardContent>
        </Card>
    );
};