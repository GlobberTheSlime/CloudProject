import React, { useEffect, useState } from 'react';
import './Table.css';

// Table component to display the history of queries using data from the universal cookie
const Table = () => {
  const [tableData, setTableData] = useState([]);

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  const clearHistory = () => {
    // Clear the cookie by setting its expiration date to a past date
    document.cookie = 'myData=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    setTableData([]);
  };

  useEffect(() => {
    // Function to retrieve data from cookie
    const fetchCookieData = () => {
      const cookieData = getCookie('myData');
      if (cookieData) {
        const decodedData = decodeURIComponent(cookieData); // Decode URL encoded data
        setTableData(JSON.parse(decodedData));
      }
    };

    // Fetch data from cookie initially
    fetchCookieData();

    // Subscribe to changes in the cookie data
    const interval = setInterval(fetchCookieData, 1000); // Check for changes every second

    // Clean up on component unmount
    return () => clearInterval(interval);
  }, []); // Only run once on component mount

  return (
    <div>
      <div style={{ border: '1px solid black', padding: '10px', marginBottom: '10px' }}>
        <h3>RISK INDEX</h3>
        <p>0 (Low Risk) - 1 (High Risk)</p>
      </div>
      <table style={{ marginBottom: '10px' }}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Risk Index</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((entry, index) => (
            <tr key={index}>
              <td>{entry.date}</td>
              <td>{entry.lat}</td>
              <td>{entry.long}</td>
              <td>{entry.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={clearHistory}
        style={{
          backgroundColor: 'grey',
          color: 'black',
          padding: '10px',
          border: '2px solid black',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Clear History
      </button>
    </div>
  );
};

export default Table;