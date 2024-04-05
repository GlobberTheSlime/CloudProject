import React, { useState } from "react";
import CoordinateInput from 'react-coordinate-input';

const Dashboard = () => {
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [result, setResult] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Ensure Pyodide is loaded
            if (typeof window.pyodide === 'undefined') {
                console.error('Pyodide is not loaded.');
                return;
            }

            // Execute Python code using Pyodide
            const pyCode = `
                from algorithm.LoadAlgorithm import get_prediction
                result = get_prediction(${longitude},${latitude});
            `;
            window.pyodide.runPython(pyCode);
            
        
            // Get result from Pyodide
            const pyResult = window.pyodide.globals.get('result');
            setResult(pyResult);
            console.log(result)
        } catch (error) {
            console.error('Error executing Python code:', error);
        }
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
