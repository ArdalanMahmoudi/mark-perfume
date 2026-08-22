import { getCategories, getProductWithScore } from '@/src/lib/queries/product.queries';
import ShopTemplate from '@/src/templates/shop/ShopTemplate';
import React from 'react';

const ShopPage = async() => {
    const categories = await getCategories()
    const products = await getProductWithScore()
    return (
        <ShopTemplate categories={categories} products={products}/>
    );
}

export default ShopPage;
