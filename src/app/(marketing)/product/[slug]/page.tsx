import Header from '@/src/components/layout/Header';
import { prisma } from '@/src/lib/prisma';
import ProductTemplate from '@/src/templates/product/ProductTemplate';
import React from 'react';

const ProductPage = async({params}:{params:{slug:string}}) => {
        const {slug} = await params
        const product = await prisma.product.findUnique({
            where:{
                slug
            },
            include:{
                gallery:true,
                category:true,
                comments:{
                    where:{
                        status:'ACCEPT'
                    },
                    orderBy:{
                        createdAt:"desc"
                    }
                },
            }
        })
        
    return (
        <>
        <ProductTemplate product={product}/>
        </>
    );
}

export default ProductPage;