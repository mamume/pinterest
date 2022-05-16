import React from 'react'
import styled from 'styled-components';
import { IconButton } from '@mui/material'
import PinterestIcon from '@mui/icons-material/Pinterest';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import TextsmsIcon from '@mui/icons-material/Textsms';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// <></>

function AltNavigationBar() {
    return (
        <Wrapper>
            <LogoWrapper>
                <IconButton>
                    <PinterestIcon/>
                </IconButton>
            </LogoWrapper>

            <HomePageButton>
                <a href="/">Home</a>
            </HomePageButton>

            <SearchWrapper>
                
                <SearchBarWrapper>
                    <IconButton>
                        <SearchIcon></SearchIcon>
                    </IconButton>
                    
                    <form>
                        <input type="text" />
                        <button type="submit">Submit</button>
                    </form>

                </SearchBarWrapper>    
            </SearchWrapper> 

            <IconsWrapper>
                <IconButton> 
                    <NotificationsIcon></NotificationsIcon>
                </IconButton>
                <IconButton> 
                    <TextsmsIcon></TextsmsIcon>
                    </IconButton>
                <IconButton>
                     <KeyboardArrowDownIcon></KeyboardArrowDownIcon> 
                </IconButton>
            </IconsWrapper>



        </Wrapper>
    )
}

export default AltNavigationBar

const Wrapper = styled.div`
    display: flex;
    align-items:center;
    height: 60px;
    padding: 12px 4px 4px 16px;
    background-color: white;
    color: black;
`

const LogoWrapper = styled.div`
    .MuiSvgIcon-root{
        color: #e60023;
        font-size: 32px;
        cursor: pointer;
    }
`

const HomePageButton = styled.div`
    display: flex;
    height: 48px;
    mix-width: 123px;
    align-items: center;
    justify-content: center;
    padding: 5px 10px;
    border-radius: 24px;
    cursor: pointer;
    background-color: rgba(17, 17, 17, 1);
    a{
        text-decoration: none;
        color: white;
        font-weight: 700;
        font-size: 20px;
    }
`

const SearchWrapper = styled.div`
    flex: 1;
`

const SearchBarWrapper = styled.div`
    background-color: #efefef;
    display: flex;
    height: 48px;
    width: 100%;
    border-radius: 50px;
    border: none;

    form{
        display: flex;
        flex: 1;
    }
    
    form > input{
        background-color: transparent;
        border: none;
        width: 100%;
        margin-left: 5px;
        font-size: 16px;
    
    }

    form > button{
        display: none;

    }

    input:focus{
        outline: none;
    }

`

const IconsWrapper = styled.div`

`





