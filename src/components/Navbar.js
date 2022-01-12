import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { Button, List } from '@material-ui/core';
import { Add, Remove, Videocam, VideocamOff, AccountCircle } from '@material-ui/icons';
import { HamburgerArrow } from 'react-animated-burgers'
import Sidebar from 'react-sidebar';

function Navbar() {

    const [isOpen, setOpen] = useState(false);
    const [isVideoOn, setVideoOn] = useState(true);
    const [plusDisabled, setPlusDisabled] = useState(false);
    const [minusDisabled, setMinusDisabled] = useState(false);

    let sizeCounter = parseInt(window.localStorage.getItem('sizeCounter'));

    let appSheet = document.styleSheets[0];
    while (appSheet.parentStyleSheet) {
        appSheet = appSheet.parentStyleSheet;
    }

    const handleClick = () => {
        setOpen(!isOpen);
    };

    const toggleVideo = () => {
        if (!isVideoOn) {
            document.getElementById('vid').style.display = "block";
            setVideoOn(true);
        } else {
            document.getElementById('vid').style.display = "none";
            setVideoOn(false);
        }
    }

    const increaseFontSize = () => {

        console.log("Increase " + sizeCounter);
        console.log("Localstorage " + window.localStorage.getItem('sizeCounter'));


        if (sizeCounter < 1) {
            sizeCounter++;
            window.localStorage.setItem('sizeCounter', sizeCounter);
            console.log("Increasing font size");
            toggleFontSize();
        } 
        
        if (sizeCounter === 1) {
            setPlusDisabled(true);
        }
        else {
            setPlusDisabled(false);
        }

        if (minusDisabled) {
            setMinusDisabled(false);
        }
    }

    const decreaseFontSize = () => {

        console.log("Decrease " + sizeCounter);
        console.log("Localstorage " + window.localStorage.getItem('sizeCounter'));

        if (sizeCounter > -1) {
            sizeCounter--;
            window.localStorage.setItem('sizeCounter', sizeCounter);
            console.log('Decreasing font size');
            toggleFontSize();
        } 
        
        if (sizeCounter === -1) {
            setMinusDisabled(true);
        }
        else {
            setMinusDisabled(false);
        }

        if (plusDisabled) {
            setPlusDisabled(false);
        }
    }

    const toggleFontSize = () => {

        console.log(appSheet);
        console.log(sizeCounter);
    
        if (sizeCounter === -1) {
            appSheet.insertRule("* { font-size: x-small }", appSheet.cssRules.length);
            appSheet.insertRule("h1 { font-size: xx-large }", appSheet.cssRules.length);
            appSheet.insertRule("h2 { font-size: x-large }", appSheet.cssRules.length);
            appSheet.insertRule("h3 { font-size: medium }", appSheet.cssRules.length);
            appSheet.insertRule("p { font-size: x-small }", appSheet.cssRules.length);
        } 
        else if (sizeCounter === 0) {
            appSheet.insertRule("* { font-size: small }", appSheet.cssRules.length);
            appSheet.insertRule("h1 { font-size: xxx-large }", appSheet.cssRules.length);
            appSheet.insertRule("h2 { font-size: xx-large }", appSheet.cssRules.length);
            appSheet.insertRule("h3 { font-size: large }", appSheet.cssRules.length);
            appSheet.insertRule("p { font-size: small }", appSheet.cssRules.length);
        }
        else if (sizeCounter === 1) {
            appSheet.insertRule("* { font-size: medium }", appSheet.cssRules.length);
            appSheet.insertRule("h1 { font-size: xxxx-large }", appSheet.cssRules.length);
            appSheet.insertRule("h2 { font-size: xxx-large }", appSheet.cssRules.length);
            appSheet.insertRule("h3 { font-size: x-large }", appSheet.cssRules.length);
            appSheet.insertRule("p { font-size: medium }", appSheet.cssRules.length);
        }
    }

    return (
        <div>
            <nav className='navbar'>
                <div style={{ justifySelf: 'flex-start', alignSelf: 'center' }}> 
                    <HamburgerArrow isActive={isOpen} onClick={handleClick} barColor="white"/>
                </div>
                <div className='nav-container'>
                    <li className='nav-item'>
                        <Link to='/sign-up' className='nav-link'>
                            <h3>Sign Up</h3>
                        </Link>
                    </li>
                    <Link to='/' className='navbar-logo'>
                        <h2>TwoLlama Travels</h2>
                    </Link>
                    <li className='nav-item'>
                        <Link to='/log-in' className='nav-link'>
                            <h3>Log In</h3>
                        </Link>
                    </li>
                </div>
                <div style={{ justifySelf: 'flex-end', alignSelf: 'center' }}>
                    <Link to='/profile' >
                        <AccountCircle className="profile" style={{ fontSize: '40' }} />
                    </Link>
                </div>
            </nav>
            <Sidebar 
                sidebar={  
                    <List>
                        <p style={{ textAlign: 'center', color: 'white'}}>Text Size</p>
                        <div style={{ display: 'flex' }}>
                            <Button style={{margin: '5px'}} variant="contained" onClick={increaseFontSize} disabled={plusDisabled} ><Add /></Button>
                            <Button style={{margin: '5px'}} variant="contained" onClick={decreaseFontSize} disabled={minusDisabled}><Remove /></Button>
                        </div>
                        <p style={{ marginTop: '15px', textAlign: 'center', color: 'white' }}>Optimize</p>
                        {!isVideoOn && <Button style={{ margin: '5px', width: '90%' }} variant="contained" onClick={toggleVideo} ><Videocam /></Button>}
                        {isVideoOn && <Button style={{ margin: '5px', width: '90%' }} variant="contained" onClick={toggleVideo}><VideocamOff /></Button>}
                    </List>
                }
                open={isOpen}
                styles={{ root: { top: "80px", bottom: "60%", right: '70%' }, sidebar: { background: "rgba(0,0,0,0.5)" }, content: { top: '10px' } }}
            >
                <div id="blanksoidontgetanerror"></div>
            </Sidebar>
        </div>
    )
}

export default Navbar;