import React, { useState } from "react";
import CoordinateInput from 'react-coordinate-input';

const Dashboard = ( {onQueryLat , onQueryLong , onQueryResult}) => {
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [result, setResult] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            long: longitude,
            lat: latitude  // Example data to be passed to the function
        };
        
        const hostname = window.location.hostname;
        console.log(hostname)
        fetch(`http://${hostname}:5000/invoke-function`, {
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
            onQueryResult(result.result);

            //Get current Date
            const today = new Date();
            const month = today.getMonth()+1;
            const year = today.getFullYear();
            const date = today. getDate();
            const currentDate = month + "/" + date + "/" + year;

            //Insert data into database
            const data = {
                date: currentDate,
                long: longitude,
                lat: latitude,
                rating: result.result
            }
            fetch(`http://${hostname}:5000/insert-data`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
                mode: 'cors',  // Include CORS headers in the request
            })
        })
        .catch(error => {
            console.error('Error calling Python function:', error);
        });
        
    };

    const latLong = () =>{
        onQueryLat(latitude)
        onQueryLong(longitude)
    }

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
                            <input type="submit" value="Submit" onClick={latLong}/>  
                        </div>
                </form>
            </div>
        </div>

    )
}

export default Dashboard
