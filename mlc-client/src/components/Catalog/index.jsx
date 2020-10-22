import React from 'react';
import ProductCard from './../ProductCard';

export default function({ products = []}) {
  return (
    <div>
      {
        products.length > 0 ? products.map((product) => (
          <div>
            <ProductCard
              title={product.title}
              money={product.currency_id}
              price={product.price}
              stock={product.available_quantity}
              image={product.thumbnail}
            />
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