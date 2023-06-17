import { NextResponse } from "next/server";

import prisma from '../../../libs/prismadb';

export async function POST(
    request: Request, 
  ) {
    const body = await request.json();
    const { 
      number
     } = body;

     const user = await prisma.user.create({
      data: {
        number
      }
    }); 
  
    return NextResponse.json(user);
}

