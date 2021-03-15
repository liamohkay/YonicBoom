import React, { useState, useEffect } from 'react';

export default function SearchResults({ results }) {
  const [count, setCount] = useState(0);

  useEffect(() => setCount(results.length), [results]);

  return (
    <>
      { count === 0 ? null : (
        <div id="search-results">
          <h5>{`There are ${count} results`}</h5>
          { results.map(result => (
            <div className="search-result">
              {result.artist}
              <br />
              {result.genre}
            </div>
          )) }
        </div>
      ) }
    </>
  );
};