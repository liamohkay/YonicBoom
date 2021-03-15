// Dependencies
import React, { useState } from 'react';
import axios from 'axios';

// Components
import SearchResults from './SearchResults.jsx';

export const App = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [resultCount, setResultCount] = useState(0);

  const handleSearch = () => {
    axios.get('/api/artist/', { params: { search: search } })
      .then(resp => setResults(resp.data))
      .then(() => setResultCount(results.length))
      .catch(err => console.log(err))
  }

  return (
    <div id="app-container">
      <div id="app-header">
        <h1>YonicBoom</h1>
        <div>women, nonbinary, and trans artists in dance</div>
      </div>
      <div className="search-container">
        <h3>search the database...</h3>
        <input type="text" onChange={(e) => setSearch(e.target.value)}></input>
        <button onClick={handleSearch}>Search</button>
      </div>
      <SearchResults results={results} />
    </div>
  );
}

export default App;