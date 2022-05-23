import React from 'react';
import Carousel from 'react-material-ui-carousel';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import items from './items-provider';
import Typography from '@mui/material/Typography';
import { Button } from '@material-ui/core';
import useStyle from './styles';



function Carousell(props) {
    const classes = useStyle();
    return (

        <div className={classes.slider}>
            <Carousel
                className={classes.cas}
                NextIcon={<KeyboardArrowRightIcon />}
                PrevIcon={<KeyboardArrowLeftIcon />}
                navButtonsProps={{          // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
                    className: classes.sliderButtons,
                }}
                indicators={null}

            >

                {items.map((item, i) => (
                    <Item key={i} {...item} />
                ))}
            </Carousel>
        </div>



    );
}

const Item = ({ imageUrl, name, description }) => {
    const classes = useStyle();
    return (

        <div className={classes.sliderContainer}>

            <img src={imageUrl} className={classes.sliderImage} alt='hi' />

            <div className={classes.sliderText}>
                <Typography variant='h5' >{name} </Typography>
                <Typography variant='body1' >{description}</Typography>
            </div>
            <div className={classes.sliderButtono} style={{
                position: 'absolute',
                bottom: ' 10% ',
                left: '29% ',
                borderRadius: '2%',
            }}>
                <Button variant="contained" style={{ backgroundColor: '#8D8DAA', color: '#FFFFFF' }}> Read More</Button>
            </div>
        </div>
    );
};



export default Carousell;