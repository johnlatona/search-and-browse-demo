import React from 'react';
import { useSelector } from 'react-redux';

const Product = ({ match }) => {
  const id = match.params.id;
  const product = useSelector(state => {
    return state.products.filter(product => product.id === id);
  });
  if (product.length) {
    const { itemName, image, description, price, rating } = product[0];
    return (
      <div>
        <div className="product-image">
          <img src={image} width="200"/>
        </div>
        <div className="product-details">
          <h4>{itemName}</h4>
          <p>{description}</p>
          <p>PRICE: {price}</p>
          <p>RATING: {rating}</p>
        </div>
      </div>
    )
  } else return null;
}

export default Product;