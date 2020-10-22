import React, { useState } from 'react';
import ProductCard from './../ProductCard';
import Pager from './pager.jsx';
import { Grid } from '@material-ui/core';
import { v4 } from 'uuid';

export default function({ products = []}) {
  const [page, setPage] = useState(0);

  return (
    <div>
      <Grid container justify="space-between">
        {
          products.length > 0 ? products.map((product, index) => (
            index >= (page) * 10 && index < page + 1 * 10 ? (
              <Grid item lg={6} key={v4()}>
                <ProductCard
                  title={product.title}
                  money={product.money}
                  price={product.price}
                  stock={product.stock}
                  image={product.image}
                  permalink={product.link}
                />
              </Grid>
            ) : (
              <React.Fragment>
              </React.Fragment>
            )
          )) : (
            <React.Fragment>
              <Grid item>
                No products
              </Grid>
            </React.Fragment>
          )
        }
      </Grid>
      {
        products.length > 0 ? (
          <Pager />
        ) : (
          <React.Fragment></React.Fragment>
        )
      }
    </div>
  );
}