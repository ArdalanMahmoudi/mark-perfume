"use server"
export const createProductAction = (initialState:any, formData:FormData) => {
    const raw = Object.fromEntries(formData.entries())
    const image = formData.get("image") as File;
    const gallery = formData.getAll("gallery") as File[]
    console.log("raw:" + raw, "image:" + image, "gallery:"+gallery);
    
}