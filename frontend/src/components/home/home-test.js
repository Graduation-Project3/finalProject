import React from 'react';
import Carousel from 'react-material-ui-carousel';
import Typography from '@mui/material/Typography';
import useStyle from './styles';
import test from './test-provider';




function Test(props) {
 
    const classes = useStyle();
    return (
            <div className={classes.testomonial}>
                <Carousel
                    height={'200px'}
                    indicators={null}
                >

                    {test.map((item,i) => (
                        <Item key={i} {...item} />
                    ))}
                </Carousel>
            </div>
    );
}

const Item = ({ imageUrl, name, description }) => {
    const classes = useStyle();
    return (
        
        <div>
            <div className={classes.testoContent}>
                <Typography variant='h5' className={classes.mainColor}>{name}</Typography>
                <Typography variant='body1' className={classes.mainColor}>{description}</Typography>
            </div>
        </div>
    );
};



export default Test;