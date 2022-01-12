import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import { Restaurant, Place, Language, Map } from '@material-ui/icons';
import 'react-vertical-timeline-component/style.min.css';
import { useEffect, useState } from "react";
import { Button } from "@material-ui/core";

var axios = require("axios").default;

function Itinerary(props) {

    // Get Restaurant Information
    const [getRestaurants, setRestaurants] = useState([]);

    var restaurantLocationOptions = {
        method: 'POST',
        url: 'https://worldwide-restaurants.p.rapidapi.com/typeahead',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'x-rapidapi-host': 'worldwide-restaurants.p.rapidapi.com',
          'x-rapidapi-key': 'fc1f1ff2d3mshe2267e55a9681dfp1c29e0jsnfc471925dd78'
        },
        params: {q: props.destination, language: 'en_US'}
    };

    useEffect(() => {
        axios.request(restaurantLocationOptions).then(function (response) {
            console.log(response.data);
            let locationId = response.data.results.data[0].result_object.location_id;
            console.log(locationId);

            var restaurantOptions = {
                method: 'POST',
                url: 'https://worldwide-restaurants.p.rapidapi.com/search',
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'x-rapidapi-host': 'worldwide-restaurants.p.rapidapi.com',
                    'x-rapidapi-key': 'fc1f1ff2d3mshe2267e55a9681dfp1c29e0jsnfc471925dd78'
                },
                params: {language: 'en_US', limit: '3', location_id: locationId, currency: 'USD'}
            };
    
            axios.request(restaurantOptions).then(function (response) {
                console.log(response.data);
                setRestaurants(response.data.results.data);
            }).catch(function (error) {
                console.error(error);
            });

        }).catch(function (error) {
            console.error(error);
        });
    }, []);

    // Get Tourist Attraction Information

    const [ getFirstPlace, setFirstPlace ] = useState({});
    const [ getSecondPlace, setSecondPlace] = useState({});

    var placesLocationOptions = {
        method: 'GET',
        url: 'https://opentripmap-places-v1.p.rapidapi.com/en/places/geoname',
        params: {name: props.destination},
        headers: {
            'x-rapidapi-host': 'opentripmap-places-v1.p.rapidapi.com',
            'x-rapidapi-key': 'fc1f1ff2d3mshe2267e55a9681dfp1c29e0jsnfc471925dd78'
        }
      };
      
    useEffect(() => { 
        axios.request(placesLocationOptions).then(function (response) {
            console.log(response.data);
            let longitude = response.data.lon;
            let latitude = response.data.lat;

            var placesOptions = {
                method: 'GET',
                url: 'https://opentripmap-places-v1.p.rapidapi.com/en/places/radius',
                params: {radius: '500', lon: longitude, lat: latitude},
                headers: {
                  'x-rapidapi-host': 'opentripmap-places-v1.p.rapidapi.com',
                  'x-rapidapi-key': 'fc1f1ff2d3mshe2267e55a9681dfp1c29e0jsnfc471925dd78'
                }
            };
            
            axios.request(placesOptions).then(function (response) {
                console.log(response.data);
                let places = response.data.features;

                var placesDetailsOptions1 = {
                    method: 'GET',
                    url: 'https://opentripmap-places-v1.p.rapidapi.com/en/places/xid/' + places[0].properties.xid,
                    headers: {
                        'x-rapidapi-host': 'opentripmap-places-v1.p.rapidapi.com',
                        'x-rapidapi-key': 'fc1f1ff2d3mshe2267e55a9681dfp1c29e0jsnfc471925dd78'
                    }
                };
                
                axios.request(placesDetailsOptions1).then(function (response) {
                    console.log(response.data);
                    setFirstPlace(response.data);
                }).catch(function (error) {
                    console.error(error);
                });

                var placesDetailsOptions2 = {
                    method: 'GET',
                    url: 'https://opentripmap-places-v1.p.rapidapi.com/en/places/xid/' + places[1].properties.xid,
                    headers: {
                        'x-rapidapi-host': 'opentripmap-places-v1.p.rapidapi.com',
                        'x-rapidapi-key': 'fc1f1ff2d3mshe2267e55a9681dfp1c29e0jsnfc471925dd78'
                    }
                };
                
                axios.request(placesDetailsOptions2).then(function (response) {
                    console.log(response.data);
                    setSecondPlace(response.data);
                }).catch(function (error) {
                    console.error(error);
                });

            }).catch(function (error) {
                console.error(error);
            });

        }).catch(function (error) {
            console.error(error);
        });
    }, []);

    return (
        <VerticalTimeline>
            
            {/* Breakfast */}
            <VerticalTimelineElement
                contentStyle={{ background: 'rgb(255, 255, 255)', color: '#000' }}
                contentArrowStyle={{ borderRight: '7px solid  rgb(255, 255, 255)' }}
                date="9:00am"
                iconStyle={{ background: 'rgb(255, 255, 255)', color: '#fff' }}
                icon={<Restaurant color="action" />}
            >   
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h3>{getRestaurants[0]?.name}</h3>
                    <h3 style={{ fontWeight: "lighter" }}>Breakfast</h3>
                </div>
                <p>{"Address: "} <span style={{ fontWeight: "lighter"}}>{getRestaurants[0]?.address}</span></p>
                <p>{"Phone: "}<span style={{ fontWeight: "lighter"}}>{getRestaurants[0]?.phone}</span></p>
            </VerticalTimelineElement>

            {/* Tourist Attraction #1 */}
            <VerticalTimelineElement
                contentStyle={{ background: 'rgb(255, 255, 255)', color: '#000' }}
                contentArrowStyle={{ borderRight: '7px solid  rgb(255, 255, 255)' }}
                date="11:00am"
                iconStyle={{ background: 'rgb(255, 255, 255)', color: '#fff' }}
                icon={<Place color="action" />}
            >   
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h3>{getFirstPlace?.name}</h3>
                    <h3 style={{ fontWeight: "lighter" }}>Tourist Attraction</h3>
                </div>
                <h4 style={{ fontWeight: "lighter", marginTop: '20px' }}>{getFirstPlace?.wikipedia_extracts?.text}</h4>
                <div style={{ display: "flex", marginTop: '20px', justifyContent: "space-around"}}>
                    {!(getFirstPlace?.wikipedia) || <Button variant="contained" href={getFirstPlace?.wikipedia} endIcon={<Language />}>Wikipedia</Button>}
                    {!(getFirstPlace?.otm) || <Button variant="contained" href={getFirstPlace?.otm} endIcon={<Map />}>Open Trip Map</Button>}    
                </div>
            </VerticalTimelineElement>

            {/* Lunch */}
            <VerticalTimelineElement
                contentStyle={{ background: 'rgb(255, 255, 255)', color: '#000' }}
                contentArrowStyle={{ borderRight: '7px solid  rgb(255, 255, 255)' }}
                date="2:00pm"
                iconStyle={{ background: 'rgb(255, 255, 255)', color: '#fff' }}
                icon={<Restaurant color="action" />}
            >   
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h3>{getRestaurants[1]?.name}</h3>
                    <h3 style={{ fontWeight: "lighter" }}>Lunch</h3>
                </div>
                <p>{"Address: "} <span style={{ fontWeight: "lighter"}}>{getRestaurants[1]?.address}</span></p>
                <p>{"Phone: "}<span style={{ fontWeight: "lighter"}}>{getRestaurants[1]?.phone}</span></p>
            </VerticalTimelineElement>

            {/* Tourist Attraction #2 */}
            <VerticalTimelineElement
                contentStyle={{ background: 'rgb(255, 255, 255)', color: '#000' }}
                contentArrowStyle={{ borderRight: '7px solid  rgb(255, 255, 255)' }}
                date="4:00pm"
                iconStyle={{ background: 'rgb(255, 255, 255)', color: '#fff' }}
                icon={<Place color="action" />}
            >   
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h3>{getSecondPlace?.name}</h3>
                    <h3 style={{ fontWeight: "lighter", flexShrink: 0 }}>Tourist Attraction</h3>
                </div>
                <h4 style={{ fontWeight: "lighter", marginTop: '20px' }}>{getSecondPlace?.wikipedia_extracts?.text}</h4>
                <div style={{ display: "flex", justifyContent: "space-around", marginTop: '20px' }}>
                    {!(getSecondPlace?.wikipedia) || <Button variant="contained" href={getSecondPlace?.wikipedia} endIcon={<Language />}>Wikipedia</Button>}
                    {!(getSecondPlace?.otm) || <Button variant="contained" href={getSecondPlace?.otm} endIcon={<Map />}>Open Trip Map</Button>}    
                </div>
            </VerticalTimelineElement>

            {/* Dinner */}
            <VerticalTimelineElement
                contentStyle={{ background: 'rgb(255, 255, 255)', color: '#000' }}
                contentArrowStyle={{ borderRight: '7px solid  rgb(255, 255, 255)' }}
                date="7:00pm"
                iconStyle={{ background: 'rgb(255, 255, 255)', color: '#fff' }}
                icon={<Restaurant color="action" />}
            >   
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h3>{getRestaurants[2]?.name}</h3>
                    <h3 style={{ fontWeight: "lighter" }}>Dinner</h3>
                </div>
                <p>{"Address: "} <span style={{ fontWeight: "lighter"}}>{getRestaurants[2]?.address}</span></p>
                <p>{"Phone: "}<span style={{ fontWeight: "lighter"}}>{getRestaurants[2]?.phone}</span></p>
            </VerticalTimelineElement>

        </VerticalTimeline>
    );
}

export default Itinerary;