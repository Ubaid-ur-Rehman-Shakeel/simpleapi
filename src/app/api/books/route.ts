import sql from "../../util/neon"
import { NextResponse } from "next/server"
//get method to get all books
export async function GET(request: Request) {
  try{
    const data =await sql`select * from simplebooks`
    return NextResponse.json(data)
   }
   catch(err){
    return NextResponse.json({eror : err})
   }
}
//post method to post books
export async function POST(request: Request) {
  const { id, title, type, status}: books = await request.json();

  if (!id || !title || !type || !status )
    return NextResponse.json({ message: "Missing required Data" });
    
  const res = await sql`INSERT INTO simplebooks (id, title, type, status) VALUES (${id}, ${title}, ${type}, ${status})`;

  return NextResponse.json({
    message: "Your books Has been Successfully Added",
  });
}

//Put method Which will Modify the order 
export async function PUT(request: Request) {
  const { id, title, type, status }: books = await request.json();

  if (!id || !title || !type || !status) {
    return NextResponse.json({ message: "Missing required Data" });
  }

  const existingOrder = await sql`SELECT * FROM simplebooks WHERE id = ${id}`;
  if (existingOrder.length === 0) {
    return NextResponse.json({ message: `Books with id ${id} not found.` });
  }

  await sql`UPDATE simplebooks SET title = ${title}, type = ${type}, status = ${status} WHERE id = ${id}`;

  return NextResponse.json({
    message: "Your books Has been Successfully Updated",
  });
}