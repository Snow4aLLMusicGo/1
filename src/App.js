import React, { useState } from 'react';
import './App.css';

function App() {
  const [article, setArticle] = useState('');
  const [searchResult, setSearchResult] = useState(null); /

  const handleArticleChange = (event) => {
    setArticle(event.target.value);
  };

  const handleSearchClick = async () => {
    try {
      const response = await fetch(`http://localhost:8000/search-by-article?article=${article}`);
      if (response.ok) {
        const data = await response.json();
        console.log(data); 
        setSearchResult(data); 
      } else {
        console.error('Failed to fetch data:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Search Product by Article</h1>
        <form>
          <input
            type="text"
            placeholder="Enter article..."
            value={article}
            onChange={handleArticleChange}
          />
          <button type="button" onClick={handleSearchClick}>
            Search
          </button>
        </form>
        {}
        {searchResult && (
          <div>
            <h2>Search Results</h2>
            <p>Brand: {searchResult.brand}</p>
            <p>Article: {searchResult.article}</p>
            <p>Name: {searchResult.name}</p>
            <p>Quantity: {searchResult.quantity}</p>
            <p>Price: {searchResult.price}</p>
            <p>Delivery Duration: {searchResult.delivery_duration}</p>
            <p>Vendor ID: {searchResult.vendorId}</p>
            <p>Warehouse Alias: {searchResult.warehouseAlias}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
