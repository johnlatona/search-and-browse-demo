import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchProducts } from '../store/store';
import { Link } from 'react-router-dom';

const SearchBar = () => {
  const [inputText, setInputText] = useState("");
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();

  const handleSearch = async (category, query) => {
    dispatch(searchProducts(category, query));
  }

  return (
    <nav className="navbar navbar-default">
      <form className="navbar-form navbar-left" role="search">
        <div className="form-group">
          <input 
            type="text" 
            className="form-control search-bar" 
            placeholder="Search"
            onChange={(e) => {
              console.log(e.target.value)
              setInputText(e.target.value);
            }}
            value={inputText}
          />
        </div>
        <select 
          className="dropdown"
          onChange={(e) => {
            console.log(e.target.value)
            setCategory(e.target.value)
          }}
          value={category}
        >
          <option value="">Choose A Category</option>
          <option value="Home And Kitchen">Home & Kitchen</option>
          <option value="Home Decor">Home Decor</option>
        </select>
        <button 
          type="submit" 
          className="btn btn-default"
          onClick={(e) => {
            e.preventDefault();
            handleSearch(category, inputText)
          }}
        >Submit</button>
      </form>
    </nav>
  )
}

export default SearchBar;

