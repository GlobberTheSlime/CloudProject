import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Dashboard from './Components/Dashboard/Dashboard'
import './App.css'
import Table from './Table'

function App() {
  // const [count, setCount] = useState(0)
  const [queryLat, setQueryLat] = useState('');
  const [queryLong, setQueryLong] = useState('');
  const [queryResult, setQueryResult] = useState('');

  return (
    <div className="App">
      <div>
        <Dashboard onQueryLat={setQueryLat} onQueryLong ={setQueryLong} onQueryResult ={setQueryResult}/>
      </div>
      <span className="divider" />
      <div>
        <Table queryLat={queryLat} queryLong={queryLong} queryResult={queryResult}/>
      </div>
    </div>
  )
}

export default App
