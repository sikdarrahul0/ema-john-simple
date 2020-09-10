import React, { useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import { useState } from 'react';
import fakeData from '../../fakeData';
import ReviewItems from '../ReviewItems/ReviewItems';
import Cart from '../Cart/Cart';
import { Link, useHistory } from 'react-router-dom';
import happyImg from '../../images/giphy.gif';

const Review = () => {
    const [cart, setCart] = useState([]);
    const history = useHistory();
    const removeProduct = (ProductKey) => {
        const newCart = cart.filter(pd => pd.key !== ProductKey);
        setCart(newCart);
        removeFromDatabaseCart(ProductKey);
}
const [order , setOrder] = useState(false);
const handleProccedCheckout = () => {
        history.push('/shipment');
}
    useEffect(()=>{
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart);
        const cartProducts = productKeys.map(key =>{
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = saveCart[key];
            return product;
        })
        setCart(cartProducts);
        
    },[])
    let thankYou;
    if(order){
        thankYou = <img src={happyImg} alt=""/>
    }
    return (
        <div className="shop-container">
            <div className="product-container">
            { 
                cart.map(pd => <ReviewItems key={pd.key} removeProduct={removeProduct} product={pd}></ReviewItems>)
            }
            {
                thankYou
            }
        </div>
        <div>
            <Cart cart={cart}>
                <button onClick={handleProccedCheckout} className="cart-btn">Proceed Checkout</button>
            </Cart>
        </div>
        </div>
        
    );
};

export default Review;