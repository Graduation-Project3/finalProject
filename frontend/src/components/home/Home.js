import { Fragment } from "react";
import { useEffect } from "react";
import { useState } from "react";
import {useLocation} from 'react-router-dom';
import Nav from "./home-nav";
import Slider from "./home-slider";
import HomeCard from "./home-card";
import Test from "./home-test";
import Footer from "./home-footer";
import Axios from 'axios';


function Home() {
    const location = useLocation();
    
    const [all, setAll] = useState([]);
    useEffect(() => {
        Axios.get('/home').then(response => {
            setAll(response.data.prods.reverse());
            
        }
        )
    },[] );
    return (

        <Fragment>
            <Nav />
            <Slider />
            <HomeCard items={all} />
            <Test  />
            <Footer />

        </Fragment>

    );
}

export default Home;