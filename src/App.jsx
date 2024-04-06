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
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </div>
  )
}

export default App
