import React, { useState } from 'react';
import axios from 'axios'; // добавлен импорт библиотеки axios
import './App.css';

function App() {
  const [article, setArticle] = useState('');
  const [searchResult, setSearchResult] = useState(null); // добавлено состояние для хранения результатов поиска

  const handleArticleChange = (event) => {
    setArticle(event.target.value);
  };

  const handleSearchClick = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/search-by-article?article=${article}`);
      
      if (response.status === 200) {
        setSearchResult(response.data); // сохраняем результаты поиска в состояние
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
        {searchResult && ( // проверяем, есть ли результаты поиска
          <div>
            <h2>Search Result:</h2>
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