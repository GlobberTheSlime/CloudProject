import React, { useEffect, useState } from 'react';
import './Table.css';

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



// Example of a data array that
// you might receive from an API
// const initialData = [
//     { date: "24/01/24", lat: "1.358286", long: "103.845226" , rating: "0.6"},
//     { date: "25/01/24", lat: "1.357293", long: "103.445326" , rating: "0.3"},
//     { date: "26/01/24", lat: "1.359138", long: "103.615231" , rating: "1.2"},
// ];

// function Table({queryLat , queryLong , queryResult}) {
//     const [data, setData] = useState(initialData);

//     const updateTable = (date, lat, long, rating) => {
//         const newData = [...data];
//         newData.push({ date, lat, long, rating });
//         setData(newData);
//     };

    
//     useEffect(() => {
//         const newData = [...data];
//         const today = new Date();
//         const month = today.getMonth()+1;
//         const year = today.getFullYear();
//         const date = today. getDate();
//         const currentDate = month + "/" + date + "/" + year;
//         if(queryLat !=='' &&  queryLong !== '')
//         newData.push({date: currentDate,lat: queryLat,long: queryLong, rating: queryResult});
//         setData(newData);

//         }, [queryResult]);
//       //}, [queryLat, queryLong]);

//     return (
//         <div>
//             <table style={{ marginleft: 40 }}>
//             <thead>
//                 <tr>
//                     <th>Date</th>
//                     <th>Latitude</th>
//                     <th>Longitude</th>
//                     <th>Risk Index</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {data.slice(-15).map((val, key) => ( 
//                     <tr key={key}>
//                         <td>{val.date}</td>
//                         <td>{val.lat}</td>
//                         <td>{val.long}</td>
//                         <td>{val.rating}</td>
//                     </tr>
//                 ))}
//             </tbody>
//             </table>
//             <button onClick={() => 
//                 updateTable("1/1/25", "1.123456", "103.654321", "0.5")}>
//                 Refresh Table
//             </button>
//         </div>
//     );
// }
 
// export default Table;

