import React from 'react';
import Carousel from 'react-material-ui-carousel';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import items from './items-provider';
import Typography from '@mui/material/Typography';
import { Button } from '@material-ui/core';
import useStyle from './styles';
import zIndex from '@mui/material/styles/zIndex';

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

const Item = ({ imageUrl, description }) => {
    const classes = useStyle();
    return (

        <div className={classes.sliderContainer}>

            <img src={imageUrl} className={classes.sliderImage} alt='hi' style={{height:'350px'}}/>

            <div className={classes.sliderText} >
                <Typography variant='body1' >{description}</Typography>
            </div>
        </div>
    );
};



export default Carousell;