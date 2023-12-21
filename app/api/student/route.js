import {NextResponse } from "next/server"
import { PrismaClient } from '@prisma/client'

export async function POST(req,res){
try {
        const prisma = new PrismaClient({
            log:['query', 'info']
        })
        const userData = await req.json();
        console.log(userData);

        const result = await prisma.user.create({
        data: userData      
        })
        return NextResponse.json({status:"success",data:result})
    }
       catch(err){
        return NextResponse.json({status:"error",data: err})
       }
}



export async function GET(req,res){
try {
    const prisma = new PrismaClient({
        log:['query', 'info']
    })
    const result = await prisma.user.findMany({})
    return NextResponse.json({status:"success",data:result})

} catch (err) {
    return NextResponse.json({status:"error",data: err}) 
}

}

export async function DELETE(req,res){
    try {
        const prisma = new PrismaClient({
            log:['query', 'info']
        })
        const {searchParams}= new URL(req.url);
        const id = searchParams.get('id');
        const reqBody = await req.json();
        console.log(reqBody,id)
        const result = await prisma.user.delete({
            where:{
                id: id,
            }
        })
        return NextResponse.json({status:"success",data:result})
    
    } catch (err) {
        return NextResponse.json({status:"error",data: err}) 
    }
    
}