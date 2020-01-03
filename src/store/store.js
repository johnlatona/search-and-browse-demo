import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';
import { composeWithDevTools } from 'redux-devtools-extension';

const initialState = {
  products: [],
  isLoading: false,
};

const SET_PRODUCTS = 'SET_PRODUCTS';
const LOADING_DATA = 'LOADING_DATA';

const setProductsToState = data => {
  return {
    type: SET_PRODUCTS,
    data,
  };
};

const loading = () => {
  console.log("LOADING DISPATCHED")
  return{
    type: LOADING_DATA,
  }
}

export const searchProducts = (category, query) => {
  let url = 'http://localhost:1337/products';
  if (!category) {
    category = 'all';
  }
  const splitCategory = category.split(' ').join('+');
  console.log(splitCategory)
  url += `/${splitCategory}`;
  
  if (query) {
    const splitQuery = query.split(' ').join('+');
    url += `/${splitQuery}`
  }
  return async dispatch => {
    console.log("IN RETURN DISPATCH?")
    dispatch(loading());
    console.log(url)
    try {
      const { data } = await axios.get(url, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        }
      });
      console.log(data);
      dispatch(setProductsToState(data));
    } catch(err) {
      const message = err.message || 'Internal Error - cannot process request';
      console.error(err, message, err.stack);
    }
  }
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_PRODUCTS: {
      console.log("GOT PRODUCTS")
      return { ...state, products: action.data, isLoading: false };
    }
    case LOADING_DATA: {
      return { ...state, isLoading: true };
    }
    default: return state;
  };
};

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware)
);

const store = createStore(reducer, middleware);

export default store;
