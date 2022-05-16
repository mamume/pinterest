import React, { useEffect, useState } from 'react';
import PinMain from './Pin_main';
import unsplash from './api/unsplash';
import './mainboard.css';
import Masonry from 'react-masonry-component';
import Styles from '../styles/Styles'


function Mainboard() {
    const classes = Styles()
    const [pins, setNewPins] = useState([]);

    function extractedValue(arr, prop) {
        let extractValue = arr.map(item => item[prop]);
        // let regularurls = extractValue.map(item => item['regular'])
        // return regularurls;
        let smallurls = extractValue.map(item => item['small'])
        return smallurls
    }

    useEffect(() => {
        async function fetchData() {
            const request = await unsplash.get("https://api.unsplash.com/photos?per_page=30");
            let urls = extractedValue(request.data, 'urls');
            setNewPins(urls)
            return request
        }
        fetchData()
    }, []);


    return (
        <Masonry className={classes.masonry}>
            {
                pins.map(pin => {
                    return <PinMain urls={pin} />
                })
            }
        </Masonry>
    );
}

export default Mainboard;