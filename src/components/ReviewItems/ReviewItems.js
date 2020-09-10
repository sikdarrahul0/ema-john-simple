import React from 'react';
import './ReviewItems.css';

const ReviewItems = (props) => {
    const product = props.product;
    const {name, quantity, img, key, price} = product;
    return (
        <div className="review-item">
            <div>
              <img src={img} alt=""/>
            </div>
            <div>
            <h4>{name}</h4>
            <p>Quantity: {quantity}</p>
            <p>Price: $ {price}</p>
            <button className="cart-btn" onClick={()=> props.removeProduct(key)}>Remove item</button>
            </div>
        </div>
    );
};

export default ReviewItems;