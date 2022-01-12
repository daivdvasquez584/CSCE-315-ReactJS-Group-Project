
import React from 'react';
import '../App.css';
import video from '../../images/twollamavideo.mp4';
import { Button } from "@material-ui/core";
import { Link } from 'react-router-dom'

function Home() {
    return (
        <div className='home'>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <h1 id='text'>Your Llama Adventure Awaits You...</h1>    
                <Button component={Link} to="/widget-page" variant="contained" color="default" size="medium"><h3>Choose Your Destination</h3></Button>
            </div>
            <video id='vid' src={video} autoPlay loop muted/>
        </div>
    )
}

export default Home;