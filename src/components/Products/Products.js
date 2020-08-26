import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Products.css';

const Products = (props) => {
    const {img, name, seller, price, stock} = props.products;
    return (
        <div className="product">
            <div>
              <img src={img} alt=""/>
            </div>
            <div>
                <h4>{name}</h4><br/>
                <p><small>by: {seller}</small></p><br/>
                <p>${price}</p>
                <p><small>only {stock} left in stock - order soon</small></p> 
                <button onClick={ () => props.handleAddProduct(props.products)} className="cart-btn"> <FontAwesomeIcon icon={faShoppingCart} />add to cart</button>                  
            </div>   
        </div>
    );
};

export default Products;