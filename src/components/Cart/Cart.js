import React from 'react';


const Cart = (props) => {
    const cart = props.cart;
    // const total = cart.reduce((total, prd) => total + prd.price, 0);
    let totalPrice = 0;
    for(let i = 0; i < cart.length; i++){
        let item = cart[i];
        totalPrice = (totalPrice + item.price * item.quantity);
    }
    let shipping = 0;
    if( totalPrice > 35){
        shipping = 0;
    }
    else if( totalPrice >15){
        shipping = 4.99;
    }
    else if( totalPrice > 5){
        shipping = 3;
    }
    let tax = totalPrice / 10;

    return (
        <div>
            <h4>Order Summary</h4>
            <h5>Items ordered: {cart.length}</h5>
            <p>Shipping Cost: {shipping} </p>
            <p>TAX: {tax.toFixed(2)}</p>
            <p>Total Price: {(totalPrice + shipping + tax).toFixed(2)}</p>
            { props.children }
        </div>
    );
};

export default Cart;