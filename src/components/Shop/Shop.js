import React, { useState } from 'react';
import fakedata from '../../fakeData';
import './Shop.css';
import Products from '../Products/Products';
import Cart from '../Cart/Cart';

const Shop = () => {
    const first10 = fakedata.slice(0, 10);
    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([]);
    const handleAddProduct = (product) =>{
        const newCart = [...cart,product];
        setCart(newCart);
    }
    return (
        
        <div className="shop-container">
           <div className="product-container">
              
                    {
                        products.map(product => <Products handleAddProduct={handleAddProduct} products={product}></Products>)
                    }
        
           </div>
           <div className="order-container">
               <Cart cart={cart}></Cart>
           </div>           
        </div>
    );
};

export default Shop;