import sql from "../../util/neon"
import { NextResponse } from "next/server"

export async function GET(){
   const users = await sql`select * from clients`
   return NextResponse.json(users)
}
export async function POST(request: Request) {
    const { id,email }: clients = await request.json();
  
    if (!id ||!email)
      return NextResponse.json({ message: "Missing required Data" });
      
    const res = await sql`INSERT INTO clients (id,email ) VALUES (${id}, ${email})`;
  
    return NextResponse.json({
      message: "Your client Has been Successfully registered",
    });
  }
  export async function PUT(request: Request) {
    const { id, email}: clients = await request.json();
  
    if (!id || !email ) {
      return NextResponse.json({ message: "Missing required Data" });
    }
  
    const existingOrder = await sql`SELECT * FROM clients WHERE id = ${id}`;
    if (existingOrder.length === 0) {
      return NextResponse.json({ message: `Order with id ${id} not found.` });
    }
  
    await sql`UPDATE clients SET email = ${email} WHERE id = ${id}`;
  
    return NextResponse.json({
      message: "Your client Has been Successfully Updated",
    });
  }
  

