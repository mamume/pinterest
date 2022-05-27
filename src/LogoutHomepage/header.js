import React from 'react';
import PinterestIcon from '@mui/icons-material/Pinterest';

import styled from 'styled-components';

function Header() {
    return (
        <Wrapper>
            <LogoWrapper>
                <PinterestIcon />
                <span className="site_name">Pinterest</span>
            </LogoWrapper>
            <Container>
                <AboutButton>
                    <a href="/">About</a>
                </AboutButton>
                <BusinessButton>
                    <a href="/">Business</a>
                </BusinessButton>
                <BlogButton>
                    <a href="/">Blog</a>
                </BlogButton>
                <LoginButton>
                    <a href="/" id="login">Log in</a>
                </LoginButton>
                <SignupButton>
                    <a href="/">Sign up</a>
                </SignupButton>
            </Container>
        </Wrapper>
    );
}

export default Header;


const Wrapper = styled.div`
    display:flex;
    align-items:centet;
    height:80px;
    padding:12px 4px 4px 16px;
    background-color:white;
    color:black;
    justify-content: space-between;
    align-items:center;
    flex-wrap:wrap;

    .site_name{
        color:#e60023;
        font-size:2vw;
        font-weight: 700;
        margin-left:5px;
        text-align:center;
    }
`

const LogoWrapper = styled.div`
    .MuiSvgIcon-root{
        color:#e60023;
        font-size:2vw;
        curser:pointer;
    }
    display-flex;
    align-items:center;
    
`

const RegularHomeButtons = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    padding:10px;
    
`

const AboutButton = styled(RegularHomeButtons)`
`
const BusinessButton = styled(RegularHomeButtons)`
`
const BlogButton = styled(RegularHomeButtons)`
`


const SpecialHomeButtons = styled(RegularHomeButtons)`
    border-radius:30px;
    min-width:75px;
    min-height:40px;
`

const LoginButton = styled(SpecialHomeButtons)`
    background-color:#e60023;  
`
const SignupButton = styled(SpecialHomeButtons)`
    background-color:#e2e2e2;
    
`

const Container = styled.div`
    display:flex;
    min-width:35%;
    height: 100%;
    align-items: center;
    justify-content: space-evenly;

    a{
        text-decoration:none;
        color:black;
        font-weight:700;

    }

    #login{
        color:white;
    }
    

`