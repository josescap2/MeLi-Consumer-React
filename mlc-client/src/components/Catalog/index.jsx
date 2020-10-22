import React from 'react';
import ProductCard from './../ProductCard';
import { Grid } from '@material-ui/core';

export default function({ products = []}) {
  return (
    <div>
      <Grid container justify="space-between">
        {
          products.length > 0 ? products.map((product) => (
            <Grid item lg={4}>
              <ProductCard
                title={product.title}
                money={product.money}
                price={product.price}
                stock={product.stock}
                image={product.image}
                permalink={product.link}
              />
            </Grid>
          )) : (
            <React.Fragment>
              <Grid item>
                No products
              </Grid>
            </React.Fragment>
          )
        }
      </Grid>
    </div>
  );
}