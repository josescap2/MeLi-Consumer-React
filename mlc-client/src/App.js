import React, { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import Catalog from './components/Catalog';

function App() {
  // HOOKS
  const [products, setProducts] = useState([]);
  const [cache, setCache] = useState({});

  return (
    <div>
      <SearchBar setProducts={setProducts} setCache={setCache} cache={cache}/>
      <Catalog products={products}/>
    </div>
  );
}

export default App;
