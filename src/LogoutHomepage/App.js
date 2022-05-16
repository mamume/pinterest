import React from 'react';
import Mainboard from './Mainboard';
import './App.css';
import HeaderSection from "./header_section"


function App() {
    return (
        <React.Fragment>
            <HeaderSection />
            <Mainboard />
        </React.Fragment>
    );
}
export default App;