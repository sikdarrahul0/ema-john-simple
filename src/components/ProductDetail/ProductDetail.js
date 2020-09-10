import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Products from '../Products/Products';

const ProductDetail = () => {
    const {ProductKey} = useParams();
    const product = fakeData.find(pd => ProductKey === pd.key);
    return (
        <div>
            <h1> Product details is here.....</h1>
            <Products showAddToCart = {false} products={product}></Products>
        </div>
    );
};

export default ProductDetail;