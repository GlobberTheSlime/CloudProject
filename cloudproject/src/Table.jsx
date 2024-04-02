// Filename - App.js
import './Table.css';
 
// Example of a data array that
// you might receive from an API
const data = [
    { date: "24/01/24", lat: "1.358286", long: "103.845226" , rating: "0.6"},
    { date: "25/01/24", lat: "1.357293", long: "103.445326" , rating: "0.3"},
    { date: "26/01/24", lat: "1.359138", long: "103.615231" , rating: "1.2"},

]
 
function Table() {
    return (
            <table marginLeft={40}>
                <tr>
                    <th>Date</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                    <th>Rating</th>
                </tr>
                {data.map((val, key) => {
                    return (
                        <tr key={key}>
                            <td>{val.date}</td>
                            <td>{val.lat}</td>
                            <td>{val.long}</td>
                            <td>{val.rating}</td>
                        </tr>
                    )
                })}
            </table>
    );
}
 
export default Table;