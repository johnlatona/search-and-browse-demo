import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Results = () => {
  const products = useSelector(state => state.products);
  const isLoading = useSelector(state => state.isLoading);

  console.log("PRODUCTS", products)
  return isLoading ? null : ( 
    <div>
      {
        products.map(product => {
          const { id, itemName, description, image, price, rating } = product;
          console.log("RUNNING")
          return (
            <Link to={`/products/${id}`} key={id}>
              <div className="product">
                <div className="product-image">
                  <img src={image} width="200"/>
                </div>
                <div className="product-details">
                  <h3>{itemName}</h3>
                </div>
              </div>
            </Link>
          );
        })
      }
    </div>
  )
}

export default Results;