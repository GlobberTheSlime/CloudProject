import React, { useState } from "react";
import CoordinateInput from 'react-coordinate-input';

const Dashboard = () => {
    const [latitude, setLatitude] = useState({
        latitude: 0
    });
    const [longitude, setLongitude] = useState({
        longitude: 0
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(latitude);
        console.log(longitude)
    };

    return (
        <div style={{textAlign:'left'}}>
            <h1>Welcome to the Dengue Prediction Webapp!</h1>
            <div> 
                <h2>Enter your latitude and longitude and let's see how fucked you are!</h2>
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
