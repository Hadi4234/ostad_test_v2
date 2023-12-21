import {NextResponse } from "next/server"
import { PrismaClient } from '@prisma/client'

export async function PATCH(request, { params }) {
    try {
        const prisma = new PrismaClient({
            log:['query', 'info']
        })
      const id = params.id
      let json = await request.json();
     const updateUser = await prisma.user.update({
        where: { id:parseInt(id) },
        data: json,
      })
      let json_response = {
        status: "success",
        data: {
          user: updateUser,
        },
      };
      return NextResponse.json(json_response);
    } catch (error) {
      if (error.code === "P2025") {
        let error_response = {
          status: "fail",
          message: "No User with the Provided ID Found"
        }
        return new NextResponse(JSON.stringify(error_response), {
          status: 404,
          headers: { "Content-Type": "application/json" }
        })
      }
  
      let error_response = {
        status: "error",
        message: error.message
      }
      return new NextResponse(JSON.stringify(error_response), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      })
    }
  }
  
  export async function GET(request, { params }) {
    const prisma = new PrismaClient({
        log:['query', 'info']
    })
    const id = params.id
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id)
      }
    })
  
    if (!user) {
      let error_response = {
        status: "fail",
        message: "No User with the Provided ID Found"
      }
      return new NextResponse(JSON.stringify(error_response), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      })
    }
  
    let json_response = {
      status: "success",
      data: {
        user
      }
    }
    return NextResponse.json(json_response)
  }
export async function DELETE(request, { params }) {
    try {
        const prisma = new PrismaClient({
            log:['query', 'info']
        })
      const id = params.id
     const deleteUser = await prisma.user.delete({
        where: { id:parseInt(id) }
      })
      let json_response = {
        status: "success",
        data: {
          user: deleteUser,
        },
      };
      return NextResponse.json(json_response);
    } catch (error) {
      if (error.code === "P2025") {
        let error_response = {
          status: "fail",
          message: "No User with the Provided ID Found"
        }
        return new NextResponse(JSON.stringify(error_response), {
          status: 404,
          headers: { "Content-Type": "application/json" }
        })
      }
  
      let error_response = {
        status: "error",
        message: error.message
      }
      return new NextResponse(JSON.stringify(error_response), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      })
    }
  }
  
  