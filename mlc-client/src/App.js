import React, { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import Catalog from './components/Catalog';

function App() {
  // HOOKS
  const [products, setProducts] = useState([]);

  return (
    <div>
      <SearchBar setProducts={setProducts}/>
      <Catalog products={products}/>
    </div>
  );
}

export default App;
