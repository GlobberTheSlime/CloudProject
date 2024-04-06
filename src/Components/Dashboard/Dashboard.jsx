import React, { useState } from "react";
import CoordinateInput from 'react-coordinate-input';

const Dashboard = () => {
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [result, setResult] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        // const humidity_url = 'https://api.data.gov.sg/v1/environment/relative-humidity';
        // const temp_url = 'https://api.data.gov.sg/v1/environment/air-temperature';
        // const rainfall_url = 'https://api.data.gov.sg/v1/environment/rainfall';

        // // Fetch data from each URL
        // var humidityData = await fetchData(humidity_url);
        // var tempData = await fetchData(temp_url);
        // var rainfallData = await fetchData(rainfall_url);
        const data = {
            long: longitude,
            lat: latitude  // Example data to be passed to the function
        };
        
        fetch('http://localhost:5000/invoke-function', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            mode: 'cors',  // Include CORS headers in the request
        })
        .then(response => response.json())
        .then(result => {
            console.log('Result from Python function:', result.result);
            setResult(result.result);
        })
        .catch(error => {
            console.error('Error calling Python function:', error);
        });
        
    };

    return (
        <div style={{textAlign:'left'}}>
            <h1>Welcome to the Dengue Prediction Webapp!</h1>
            <div> 
                <h2>Enter your latitude and longitude and let's see whats the dengue rating near you!</h2>
                <form onSubmit={handleSubmit}>
                    <h3>Round off your inputs to 6 decimal places!!!</h3>
                        <div>
                            <label> Latitude: 
                                    <input type="number" min="0"  step="0.000001" value={latitude} onChange={(event) =>

                                        setLatitude(event.target.value)

                                    }/>                    
                            </label>                           
                        </div>
                        <div>
                            <label> Longitude: 
                                    <input type="number" min="0" step="0.000001" value={longitude} onChange={(event) =>
                                    
                                        setLongitude(event.target.value)
                                    
                                    }/>                    
                            </label>                       
                        </div>
                        <div>
                            <input type="submit" value="Submit"/>  
                        </div>
                </form>
            </div>
        </div>

    )
}

export default Dashboard
