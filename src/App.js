import './styles/App.css';
import React, { useState, useEffect } from 'react';
import Autosuggest from 'react-autosuggest';
import Form from 'react-bootstrap/Form';

function App() {
  const [coins, setCoins] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  //const [searchResults, setSearchResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  // useEffect(() => {
  //   const results = !searchTerm ? [] : coins.filter(coin => {
  //     let current = coin.name;
  //     return current.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  //   });
  //   setSearchResults(results);
  // }, [searchTerm])

  useEffect(() => {
    fetch(`https://api.coingecko.com/api/v3/coins/list`)
      .then(response => response.json())
      .then((json) => {
        let coins = [];
        let suggestions = [];
        json.map(item => { 
        coins.push({'name': item.name, 'symbol': item.symbol})
        suggestions.push(item.name)
      });
        setCoins(coins);
        setSuggestions(suggestions);
      })
  }, []);

  return (
    <div className="App">
      Yello World
      <div>
        <label htmlFor="Coin Name">Search Coin Name</label>
        <Autosuggest
          inputProps={{
            placeholder: "Search For A Coin",
            autoComplete: "abcd",
            name: "coin-search",
            id: "coin-search",
            value: searchTerm,
            onChange: (_event, {newValue}) => {
              setSearchTerm(newValue)
            }
          }}
          suggestions={suggestions}
          onSuggestionsFetchRequested={({value}) => {
            if(!value) {
              setSuggestions([]);
              return;
            }
            // const results = !searchTerm ? [] : coins.filter(coin => {
            //   let current = coin.name;
            //   return current.toLowerCase().includes(searchTerm.toLocaleLowerCase())
            // });
            const results = coins.filter(coin => {
              let current = coin.name;
              return current.toLowerCase().includes(value.toLocaleLowerCase())
            });
            setSuggestions(results);
          }}
          multiSection={true}
          onSuggestionsClearRequested={() => setSuggestions([])}
          getSuggestionValue={(suggestion) => suggestion.name}
          renderSuggestion={suggestion => <span>{suggestion.name}</span>}
          renderSectionTitle={section => <strong>{'Symbol:'} {section.symbol}</strong>} //this needs an array to be fed to it from getSectionSuggestions
          getSectionSuggestions={(section) => [section]} //need to put result of func into array so when rendering it can map through array
        />
      </div>

      
      
    </div>
  );
}

export default App;


// const handleChange = event => {
  //   setSearchTerm(event.target.value);
  // };

{/* <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleChange}
      />
      {/* <div>
        {searchResults.map(item => (
          <div key={item.name}>{item.name}{' '}{item.symbol}</div>
        ))}
      </div> */}
