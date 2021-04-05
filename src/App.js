import './styles/App.css';
import React, { useState, useEffect } from 'react';
import Autosuggest from 'react-autosuggest';
import Form from 'react-bootstrap/Form';

function App() {
  const [coins, setCoins] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetch(`https://api.coingecko.com/api/v3/coins/list`)
      .then(response => response.json())
      .then((json) => {
        let coins = [];
        let suggestions = [];
        json.map(item => { 
          coins.push({'name': item.name, 'symbol': item.symbol, 'id': item.id})
          suggestions.push(item.name)
      });
        setCoins(coins);
        setSuggestions(suggestions);
      })
  }, []);

  return (
    <div className="App">
      Yello World
      <div className="app-container">
        <div className="search-container">
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
          onSuggestionSelected={async (event, {suggestion}) => {
            const result = await fetch(`https://api.coingecko.com/api/v3/coins/${suggestion.id}`)
            .then(response => response.json())
            .then((json) => {
              setSearchResults([{
                'name': json.name,
                'description': json.description,
                'homepage': json.links.homepage[0],
                'image': json.image.small,
                'currentPrice': json.market_data.current_price.usd,
                'allTimeHigh': json.market_data.atl.usd,
                'highDate': json.market_data.ath_date.usd,
                'pastDayHigh': json.market_data.high_24h,
                'pastDayLow': json.market_data.low_24h
              }])
              console.log(searchResults)
            })
            event.preventDefault();
          }}
        />
        </div>
        <div className="graph-container">
          {searchResults.map((current) => {
            <div>{current.name} {current.currentPrice}</div>
          })}
        </div>
      </div>

      
      
    </div>
  );
}

export default App;
