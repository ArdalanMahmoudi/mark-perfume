import { randomUUID } from "crypto"
import { mkdir, writeFile } from "fs"
import path from "path"

export async function uploadFile(file:File, folder="products") {
    const buffer = Buffer.from(await file.arrayBuffer())
    const extension = file.name.split(".").pop() //id
    const fileName = `${randomUUID()}.${extension}` //fileName unique
    const uploadDir = path.join(process.cwd(),"public","uploads",folder) 
    await mkdir(uploadDir,{
        recursive:true,  
    })
    const filePath = path.join(uploadDir,fileName)

    // save file
    await writeFile(filePath, buffer)

    return `/uploads/${folder}/${fileName}`

}