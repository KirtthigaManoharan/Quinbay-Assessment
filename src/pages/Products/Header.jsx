import React from "react";
import Logo from "../../assets/Images/Logo.png"

export const Header = ({searchValue, handleInput, clearSearch}) => {
  return (
    <div className='products-header-wrapper'>
      <div className='products-header'>
        <img src={Logo} alt="logo" />
        <div className='search-container'>
          <button className='search-icon-btn'>
            <i className='fa fa-search search-icon'></i>
          </button>
          <input type='text' placeholder='Search..' name='search' className='search-input-box' value={searchValue} onChange={(e) => handleInput(e)} />
          <button className='search-close' onClick={() => clearSearch()}>
            <i className='fa fa-times-circle'></i>
          </button>
        </div>

      </div>
    </div>
  );
};
