import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import useStyle from "./login-style";
import './addItem.css';
import { TextField, Box, Grid, Button, Typography, Input } from '@mui/material';
import { AddItemContext } from '../../contexts/addItem';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



const AddItem = () => {
    const [category, setCategory] = useState([]);
    const [categoryTitle, setCategoryTitle] = useState([]);
    document.body.classList.add('mbAdd');

    useEffect(() => {
        axios.get(`/getAllCategory`)
            .then((result) => {
                setCategory(result.data)
            })
            .catch((err) => {
            })
    }, [])

    const classes = useStyle();
    const addItemContext = useContext(AddItemContext);
    // on click submit 
    const handleSubmit = (e) => {
        addItemContext.addItem();
    };
    // to on chane upload photo



    return (<div className={classes.page_login}>
        <div className={classes.content_login}>

            <form className={classes.form}>

                <Grid item xs={12}>
                    {/* typography */}
                    <Typography variant='h4' className={classes.typo} >
                        ADD ITEM
                    </Typography>
                </Grid>
                <Grid>
                    {/* create Title */}
                    <TextField
                        label="Please Enter Title"
                        className={classes.margindown}
                        onChange={(e) => {
                            addItemContext.setTitle(e.target.value.toLowerCase());
                        }} />

                </Grid>

                <Grid>
                    {/* create Description */}
                    <textarea
                        style={{ resize: 'none' }}
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

                </Grid>
                <Grid>
                    <FormControl sx={{ minWidth: 210 }}>
                        <InputLabel id="demo-simple-select-helper-label">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            label="category"
                            value={categoryTitle}
                            onChange={(e) => {
                                setCategoryTitle(e.target.value)
                                addItemContext.setCategory(e.target.value)
                            }}
                        >
                            {category.map(val => {
                                return (
                                    <MenuItem value={val.title} >{val.title}</MenuItem>
                                )
                            })}

                        </Select>
                    </FormControl>
                </Grid>
                <Grid>
                    {/* create Description */}
                    <input type="file" multiple onChange={addItemContext.handleImage} />
                </Grid>

                <Grid>
                    <Button variant='contained' size="medium" sx={[{ bgcolor: '#A7BBC7' },
                    { "&:hover": { bgcolor: '#A7BBC7' } }]}
                        type='button'
                        onClick={handleSubmit}>
                        Add Item
                    </Button>
                </Grid>


            </form>
        </div>
    </div>
    )
};

export default AddItem;