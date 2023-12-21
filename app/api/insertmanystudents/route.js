import {NextResponse } from "next/server"
import { PrismaClient } from '@prisma/client'
export async function POST(req,res){
    try {
            const prisma = new PrismaClient({
                log:['query', 'info']
            })
            const userData = await req.json();
                
            const result = await prisma.user.createMany({
            data: userData,      
            })
            return NextResponse.json({status:"success",data:result})
        }
           catch(err){
            return NextResponse.json({status:"error",data: err})
           }
}