import React, { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import Catalog from './components/Catalog';

function App() {
  // HOOKS
  const [products, setProducts] = useState([]);
  const [fetched, setFetched] = useState(false);

  return (
    <div>
      <SearchBar setProducts={setProducts} setFetched={setFetched}/>
      {
        fetched && products.length > 0 ? (
          <Catalog products={products}/>
        ) : (
          <React.Fragment></React.Fragment>
        )
      }
    </div>
  );
}

export default App;
