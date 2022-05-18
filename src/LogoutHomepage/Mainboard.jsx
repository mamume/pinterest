import React, { useEffect, useState } from 'react';
import PinMain from './PinMain';
import './mainboard.css';
import Masonry from 'react-masonry-component';
import Styles from '../styles/Styles'
import { createApi } from 'unsplash-js';

const unsplash = createApi({
    accessKey: process.env.REACT_APP_UNSPLASH_ACCESS_KEY,
});

function Mainboard() {
    const classes = Styles()
    const [pins, setPins] = useState([]);

    function extractedValue(arr, prop) {
        const extractValue = arr.map(item => item[prop]);
        return extractValue.map(item => item['thumb'])
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await unsplash.photos.list({ page: 2, perPage: 20 })

                if (result.type === 'error') {
                    throw new Error('Error fetching data from Unsplash')
                }

                const urls = extractedValue(result.response.results, 'urls');
                setPins(urls);
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, []);


    return (
        <Masonry className={classes.masonry}>
            {
                pins.map(pin => {
                    return <PinMain urls={pin} key={pin} />
                })
            }
        </Masonry>
    );
}

export default Mainboard;