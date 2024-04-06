import { useEffect, useState } from 'react';

// Example of a data array that
// you might receive from an API
const initialData = [
    { date: "24/01/24", lat: "1.358286", long: "103.845226" , rating: "0.6"},
    { date: "25/01/24", lat: "1.357293", long: "103.445326" , rating: "0.3"},
    { date: "26/01/24", lat: "1.359138", long: "103.615231" , rating: "1.2"},
];

import React, { useEffect, useState } from 'react';

const Table = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Retrieve data from cookie
    const cookieData = getCookie('myData');
    if (cookieData) {
      setData(JSON.parse(cookieData));
    }
  }, []);

  return (
    <div>
      <h2>History</h2>
      <ul>
        {data.map((entry, index) => (
          <li key={index}>
            <span>Date: {entry.date}</span>
            <span>Latitude: {entry.lat}</span>
            <span>Longitude: {entry.long}</span>
            <span>Rating: {entry.rating}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Table;

  