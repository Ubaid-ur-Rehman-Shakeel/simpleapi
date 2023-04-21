import sql from "@/app/util/neon";
import { NextResponse } from "next/server";
// Get Method Which will get all orders

export async function GET(request: Request) {
  const order = await sql`select * from orders`;
  return NextResponse.json(order);
}
//Post Method Which will Post The new orders
export async function POST(request: Request) {
  const { id, customerName, customerEmail, bookName, quantity }: Userorder = await request.json();

  if (!id || !customerName || !customerEmail || !bookName || !quantity)
    return NextResponse.json({ message: "Missing required Data" });
    
  const res = await sql`INSERT INTO orders (id, customerName, customerEmail, bookName, quantity) VALUES (${id}, ${customerName}, ${customerEmail}, ${bookName}, ${quantity})`;

  return NextResponse.json({
    message: "Your Order Has been Successfully Placed",
  });
}

//Put method Which will Modify the order 
export async function PUT(request: Request) {
  const { id, customerName, customerEmail, bookName, quantity }: Userorder = await request.json();

  if (!id || !customerName || !customerEmail || !bookName || !quantity) {
    return NextResponse.json({ message: "Missing required Data" });
  }

  const existingOrder = await sql`SELECT * FROM orders WHERE id = ${id}`;
  if (existingOrder.length === 0) {
    return NextResponse.json({ message: `Order with id ${id} not found.` });
  }

  await sql`UPDATE orders SET customerName = ${customerName}, customerEmail = ${customerEmail}, bookName = ${bookName}, quantity = ${quantity} WHERE id = ${id}`;

  return NextResponse.json({
    message: "Your Order Has been Successfully Updated",
  });
}
