import React, { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import Catalog from './components/Catalog';

function App() {
  // HOOKS
  const [products, setProducts] = useState([]);
  const [cache, setCache] = useState({});
  const [filter, setFilter] = useState('noFilter');

  return (
    <div>
      <SearchBar 
        setProducts={setProducts} 
        setCache={setCache} 
        cache={cache} 
        setFilter={setFilter} 
        filter={filter}
        av={products.length > 0 ? true : false}
      />
      <Catalog products={products}/>
    </div>
  );
}

export default App;
