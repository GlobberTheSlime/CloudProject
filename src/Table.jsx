// Filename - App.js
import React, { useEffect, useState } from 'react';
import './Table.css';

// Example of a data array that
// you might receive from an API
const initialData = [
    { date: "24/01/24", lat: "1.358286", long: "103.845226" , rating: "0.6"},
    { date: "25/01/24", lat: "1.357293", long: "103.445326" , rating: "0.3"},
    { date: "26/01/24", lat: "1.359138", long: "103.615231" , rating: "1.2"},
];

function Table({queryLat , queryLong , queryResult}) {

    const [data, setData] = useState([]);

    useEffect(() => {
        // Fetch data from the backend when the component mounts
        fetch(`http://${hostname}:5000/get-database`, {
            method: 'GET',
            mode: 'cors',  // Include CORS headers in the request
            headers: {
                'Content-Type': 'application/json'
                // Add any other headers if needed
            }
        })
        .then(response => response.json())
        .then(data => {
            // Convert the data to the desired format
            const formattedData = data.map(item => ({
                date: item.date,
                lat: item.lat.toString(), // Convert to string if needed
                long: item.long.toString(), // Convert to string if needed
                rating: item.rating.toString() // Convert to string if needed
            }));
            setData(formattedData); // Update state with formatted data
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []); // Empty dependency array ensures the effect runs only once after the component mounts
    
    // const [data, setData] = useState(initialData);

    // const updateTable = (date, lat, long, rating) => {
    //     const newData = [...data];
    //     newData.push({ date, lat, long, rating });
    //     setData(newData);
    // };
    // useEffect(() => {
    //     const newData = [...data];
    //     const today = new Date();
    //     const month = today.getMonth()+1;
    //     const year = today.getFullYear();
    //     const date = today. getDate();
    //     const currentDate = month + "/" + date + "/" + year;
    //     if(queryLat !=='' &&  queryLong !== '')
    //     newData.push({date: currentDate,lat: queryLat,long: queryLong, rating: queryResult});
    //     setData(newData);

    //     }, [queryResult]);
      //}, [queryLat, queryLong]);

    return (
        <div>
            <table style={{ marginleft: 40 }}>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                    <th>Risk Index</th>
                </tr>
            </thead>
            <tbody>
                {data.slice(-15).map((val, key) => ( 
                    <tr key={key}>
                        <td>{val.date}</td>
                        <td>{val.lat}</td>
                        <td>{val.long}</td>
                        <td>{val.rating}</td>
                    </tr>
                ))}
            </tbody>
            </table>
            <button onClick={() => 
                updateTable("1/1/25", "1.123456", "103.654321", "0.5")}>
                Refresh Table
            </button>
        </div>
    );
}
 
export default Table;