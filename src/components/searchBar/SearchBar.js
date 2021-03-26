import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({ setLocation }) {
  const [query, setQuery] = useState('');

  const handleClick = () => {
    console.log('Je hebt zoek geklikt');
    setLocation(query);
    console.log(query);
    };
  
  const handleKeyPress = e => {
    if(e.keyCode === 13){
      handleClick();
    }
  };

  return (
    <span className="searchbar">
      <input
        type="text"
        name="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown= {handleKeyPress}
        placeholder="Zoek een stad in Nederland"
      />

      <button onClick={handleClick} type="button">
        Zoek
      </button>
    </span>
  );
};

export default SearchBar;
