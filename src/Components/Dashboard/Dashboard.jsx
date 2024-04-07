import React, { useState } from "react";
import Cookies from 'universal-cookie';

// Cookie instance to store data globally
const cookies = new Cookies();

const Dashboard = ({ onQueryLat, onQueryLong, onQueryResult }) => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  // Function to handle submit button event
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Example data to be passed to the function
    const data = { long: longitude, lat: latitude };

    // Fetch data from the backend
    fetch(`http://${window.location.hostname}:5000/invoke-function`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      mode: 'cors',
    })
      .then(response => response.json())
      .then(result => {
        // Update state with the result
        onQueryResult(result.result);

        // Store data in global cookie
        const currentDate = new Date().toLocaleDateString();
        const newEntry = { date: currentDate, long: longitude, lat: latitude, rating: result.result };
        const existingData = cookies.get('myData') || [];
        const updatedData = [...existingData, newEntry];
        cookies.set('myData', updatedData, { path: '/' });

        // Clear input fields
        setLatitude('');
        setLongitude('');
      })
      .catch(error => console.error('Error calling Python function:', error));
  };

  return (
    <div style={{ textAlign: 'left' }}>
      <h1>Welcome to the Dengue Prediction Webapp!</h1>
      <div>
        <h2>Enter your latitude and longitude to check the dengue rating near you</h2>
        <form onSubmit={handleSubmit}>
          <h3>Round off your inputs to 6 decimal places!!!</h3>
          <div>
            <label> Latitude: 
              <input type="number" min="0" step="0.000001" value={latitude} onChange={(event) => setLatitude(event.target.value)} />
            </label>
          </div>
          <div>
            <label> Longitude: 
              <input type="number" min="0" step="0.000001" value={longitude} onChange={(event) => setLongitude(event.target.value)} />
            </label>
          </div>
          <div>
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;

