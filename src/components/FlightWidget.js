import React from 'react';
import './App.css';

function FlightWidget(props) {
    function flight() {
        var fromLoc = props.place;
        var toLoc = props.destination; // get value from to destination text
        var myHeaders = new Headers();
        myHeaders.append("apikey", "OxSv378SRhr9MG0z6GmI0QulMXFaVcpf");
        myHeaders.append("Cookie", "__cfruid=225c9800ade02b5e4ab57503993105019863f688-1638685689");
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        var dataFrom;
        fetch("https://tequila-api.kiwi.com/locations/query?term=" + fromLoc + "&locale=en-US&location_types=airport&location_types=city&location_types=country&limit=1&active_only=true", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result.locations[0].id);
                dataFrom = result.locations[0].id;
            })
            .catch(error => console.log('error', error));    
        fetch("https://tequila-api.kiwi.com/locations/query?term=" + toLoc + "&locale=en-US&location_types=airport&location_types=city&location_types=country&limit=1&active_only=true", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result.locations[0].id);
                var dataTo = result.locations[0].id;
                var script = document.createElement("script");
                script.src = "https://widgets.kiwi.com/scripts/widget-single-iframe.js";
                script.setAttribute("data-currency", "USD"); 
                script.setAttribute("data-lang", "en"); 
                script.setAttribute("data-affilid", "calvinnguyenqtwollamawidget");
                script.setAttribute("data-from", dataFrom); 
                script.setAttribute("data-to", dataTo);
                document.body.appendChild(script);
            })
            .catch(error => console.log('error', error));
        }
    return (
        <div id="widget-holder" style={{ border: '3px solid white', borderRadius: '4px' }} >
            {flight()}
        </div>
    )
}

export default FlightWidget
