"use server"
import { prisma } from "../prisma";

export async function getProductHomePage() {

    
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