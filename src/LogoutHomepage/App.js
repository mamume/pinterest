import React from 'react';
// import Header from './header';
import Mainboard from './Mainboard';
import './App.css';
import HeaderSection from "./header_section"


function App() {

    return (
        <React.Fragment>
            {/* <Header /> */}
            <HeaderSection />
            <Mainboard />
        </React.Fragment>
    );
}
export default App;