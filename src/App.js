import './styles/App.css';
import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form'
import { FormGroup } from 'react-bootstrap';
//import { router }
//import useFetchCryptoSearch from './useFetchCryptoSearch';

function App() {
  const [coins, setCoins] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    fetch(`https://api.coingecko.com/api/v3/coins/list`)
      .then(response => response.json())
      .then((json) => {
        let coinNames = [];
        json.map(item => coinNames.push(item.name))
        setCoins(coinNames);
      })
    const results = !searchTerm ? [] : coins.filter(coin =>
        coin.toLowerCase().includes(searchTerm.toLocaleLowerCase())
      );
    setSearchResults(results);
        //setCoins(json))
  }, [searchTerm]);

  return (
    <div className="App">
      Yello World

      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleChange}
      />
      <ul>
        {searchResults.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      {/* <Form>
        <FormGroup>
          <Form.Label>Search For Coins Here</Form.Label>
          <Form.Control type="search" placeholder="Search..." />
          <Form.Text className="text-muted">
            Lots of coins to search, have at it!
          </Form.Text>
        </FormGroup>
      </Form> */}
      {/* {coins.map(coin => {
        return <pre>{coin}</pre>
      // })} */}
    </div>
  );
}

export default App;
