import React,{ useEffect, useState } from 'react';
import styled from 'styled-components';
import unsplash from './api/unsplash';


function PinMain(props) {

    let {urls} = props;
    console.log(urls)

    return ( 
        <Wrapper>
            <Container>
                <img src={urls} alt="pin_img_main_board"/>
            </Container>
        </Wrapper>
     );
}

export default PinMain;

const Wrapper = styled.div`
    display:inline-flex;
    padding:8px;
`

const Container = styled.div`
    display:flex;
    align-items:center;
    box-sizing:border-box;
    cursor:pointer;
    width:236px;

    img{
        display:flex;
        width:100%;
        cursor:zoom-in;
        border-radius:16px;
        object-fit:cover;

    }
`