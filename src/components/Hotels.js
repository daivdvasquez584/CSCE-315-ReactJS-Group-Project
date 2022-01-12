import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
var axios = require("axios").default;

function Hotels(props) {

    const [getHotels, setHotels] = useState([])
    
    var getLocationIdOptions = {
      method: 'GET',
      url: 'https://hotels4.p.rapidapi.com/locations/v2/search',
      params: {query: props.destination, locale: 'en_US', currency: 'USD'},
      headers: {
        'x-rapidapi-host': 'hotels4.p.rapidapi.com',
        'x-rapidapi-key': 'fc1f1ff2d3mshe2267e55a9681dfp1c29e0jsnfc471925dd78'
      }
    };

    useEffect(() => {
      axios.request(getLocationIdOptions).then(function (response) {
        let locationId = response.data.suggestions[0].entities[0].destinationId;
        console.log(locationId);

        var getHotelsOptions = {
          method: 'GET',
          url: 'https://hotels4.p.rapidapi.com/properties/list',
          params: {
            destinationId: locationId,
            pageNumber: '1',
            pageSize: '25',
            checkIn: '2020-01-08',
            checkOut: '2020-01-15',
            adults1: '1',
            sortOrder: 'PRICE',
            locale: 'en_US',
            currency: 'USD'
          },
          headers: {
            'x-rapidapi-host': 'hotels4.p.rapidapi.com',
            'x-rapidapi-key': 'fc1f1ff2d3mshe2267e55a9681dfp1c29e0jsnfc471925dd78'
          }
        };

        axios.request(getHotelsOptions).then(function (response) {
            setHotels(response.data.data.body.searchResults.results);
            console.log(response.data.data.body.searchResults.results);
        }).catch(function (error) {
            console.error(error);
        });
      }).catch(function (error) {
        console.error(error);
      });
    }, []);

    const columns = [
      {
        name: 'Name',
        selector: row => row.name,
      },
      {
        name: 'Stars',
        selector: row => row.starRating,
        sortable: true,
      },
      {
        name: 'Price',
        selector: row => row.ratePlan.price.current + " per night",
        sortable: true,
      },
    ];

    return (props.destination && (
        <div style={{ border: '3px solid white', borderRadius: '4px' }}>
          <DataTable
            columns={columns}
            data={getHotels}
            fixedHeader
            fixedHeaderScrollHeight="300px"
            progressPending={(getHotels.length === 0)}
            theme="dark"
            />
        </div>
    )) || <div></div>;
}

export default Hotels;