import { useContext, useState } from 'react';
import useStyle from "../signIn/login-style";
import './addItem.css';

import { TextField, Box, Grid, Button, Typography, Input } from '@mui/material';
import { AddItemContext } from '../../contexts/addItem';



const AddItem = () => {
    const classes = useStyle();
    const addItemContext = useContext(AddItemContext);
    const [selectedFiles, setSelectedFiles] = useState([]);
    // on click submit 
    const handleSubmit = (e) => {
        console.log('kjh');
        addItemContext.addItem();
    };
    // to on chane upload photo
    const handleImageChange = (e) => {
        // console.log(e.target.files[])
        if (e.target.files) {
            const filesArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));

            // console.log("filesArray: ", filesArray);

            setSelectedFiles((prevImages) => prevImages.concat(filesArray));
            Array.from(e.target.files).map(
                (file) => URL.revokeObjectURL(file) // avoid memory leak
            );
        }
    };

    const renderPhotos = (source) => {
        console.log('source: ', source);
        return source.map((photo) => {
            return <img src={photo} alt="" key={photo} style={{height: '100px', width:'100px'}}/>;
        });
    };

    return (<div className={classes.page_login}>
        <div className={classes.content_login}>

            <form className={classes.form}>
                <Box item xs={12}>
                    <Grid >
                        <Grid item xs={12}>
                            {/* typography */}
                            <Typography variant='h4' className={classes.typo} >
                                ADD ITEM
                            </Typography>
                        </Grid>
                        <Grid>
                            {/* create Title */}
                            <TextField
                                required
                                label="Title"
                                className={classes.margindown}
                                onChange={(e) => {
                                    addItemContext.setTitle(e.target.value);
                                }} />
                            
                        </Grid>

                        <Grid>
                            {/* create Description */}
                            <textarea
                                style={{resize: 'none'}}
                                required
                                rows="6" cols="25"
                                placeholder='Please type description..'
                                label="Description"
                                className={classes.margindown}
                                onChange={(e) => {
                                    addItemContext.setDescription(e.target.value);
                                }} >
                                </textarea>
                        </Grid>
                        <Grid>
                            {/* create Price */}
                            <TextField
                                required
                                label="min Price"
                                className={classes.margindown}
                                onChange={(e) => {
                                    addItemContext.setMinPrice(e.target.value);
                                }} />
                                 <TextField
                                required
                                label="max Price"
                                className={classes.margindown}
                                onChange={(e) => {
                                    addItemContext.setMaxPrice(e.target.value);
                                }} />
                            
                        </Grid>
                        <Grid>
                            {/* create Description */}
                            <TextField
                                required
                                label="image"
                                className={classes.margindown}
                                onChange={(e) => {
                                    addItemContext.setImage(e.target.value);
                                }} />
                        </Grid>
{/* 
                        <Grid>
                           
                            <div>
                                <input type="file" id="file" multiple onChange={handleImageChange} />
                                
                                <div >{renderPhotos(selectedFiles)}</div>
                            </div>
                        </Grid>
                         */}
                        <Grid>
                            <Button variant='contained' size="medium" sx={[{ bgcolor: '#A7BBC7' },
                            { "&:hover": { bgcolor: '#A7BBC7' } }]}
                                type='button'
                                onClick={handleSubmit}>
                                Add Item
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </div>
    </div>
    )
};

export default AddItem;