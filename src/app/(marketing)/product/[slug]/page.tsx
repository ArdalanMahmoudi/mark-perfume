import Header from '@/src/components/layout/Header';
import ProductTemplate from '@/src/templates/product/ProductTemplate';
import React from 'react';

const ProductPage = async({params}:{params:{slug:string}}) => {
        const {slug} = await params
        
    return (
        <>
        <ProductTemplate product={slug}/>
        </>
    );
}

export default ProductPage;
