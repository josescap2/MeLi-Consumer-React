import React from 'react';
import ProductCard from './../ProductCard';

export default function({ products = []}) {
  return (
    <div>
      {
        products.length > 0 ? products.map((product) => (
          <div>
            <ProductCard title={product.title}/>
          </div>
        )) : (
          <React.Fragment>
            No products
          </React.Fragment>
        )
      }
    </div>
  );
}