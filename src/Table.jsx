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
    const [data, setData] = useState(initialData);

    const updateTable = (date, lat, long, rating) => {
        const newData = [...data];
        newData.push({ date, lat, long, rating });
        setData(newData);
    };

    
    useEffect(() => {
        const newData = [...data];
        const today = new Date();
        const month = today.getMonth()+1;
        const year = today.getFullYear();
        const date = today. getDate();
        const currentDate = month + "/" + date + "/" + year;
        if(queryLat !=='' &&  queryLong !== '')
        newData.push({date: currentDate,lat: queryLat,long: queryLong, rating: queryResult});
        setData(newData);

        }, [queryResult]);
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