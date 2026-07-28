"use server"
import { prisma } from "../prisma";
import { ProductType } from "../types/product.type";

export async function getProductHomePage():Promise<ProductType> {

    
    return prisma.product.findMany({
        take:8,
        orderBy:{
            createdAt:"desc"
        },
        select:{
            id:true,
            slug:true,
            name:true,
            latinName:true,
            price:true,
            discount:true,
            thumbnail:true,

        }
    })
}

export async function getCategories (){
    return prisma.category.findMany()
} 