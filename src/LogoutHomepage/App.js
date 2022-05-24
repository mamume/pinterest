import React from 'react';
import MainBoard from './MainBoard';
import './App.css';
import HeaderSection from "./header_section"


function App() {
    return (
        <React.Fragment>
            <HeaderSection />
            <MainBoard />
        </React.Fragment>
    );
}
export default App;