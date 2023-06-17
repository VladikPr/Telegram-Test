import { signIn } from "next-auth/react";
import { NextResponse } from "next/server";


export async function GET(
    request: Request, 
  ) {
    const body = await request.json();
    console.log(body)
  
    return null
}