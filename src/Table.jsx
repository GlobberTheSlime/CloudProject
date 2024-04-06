import React, { useEffect, useState } from 'react';

// Example of a data array that
// you might receive from an API
const initialData = [
    { date: "24/01/24", lat: "1.358286", long: "103.845226" , rating: "0.6"},
    { date: "25/01/24", lat: "1.357293", long: "103.445326" , rating: "0.3"},
    { date: "26/01/24", lat: "1.359138", long: "103.615231" , rating: "1.2"},
];

function Table() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const cookieData = getCookie('myData');
    if (cookieData) {
      const parsedData = JSON.parse(cookieData);
      setData(parsedData);
    }
  }, []);

  const getCookie = (name) => {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return '';
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => (
            <tr key={index}>
              <td>{entry.date}</td>
              <td>{entry.lat}</td>
              <td>{entry.long}</td>
              <td>{entry.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;

  