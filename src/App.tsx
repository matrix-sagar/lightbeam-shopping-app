import React from 'react';
import './App.css';
import CartList from './components/Cart'
import ProductsList from './components/ProductsList'
import AddProduct from '../src/components/Admin'

function App() {

  
  return (
    <div className="App">
      <AddProduct/>
      <ProductsList/>
      <CartList/>
    </div>
  );
}

export default App;
