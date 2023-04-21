import sql from "@/app/util/neon"
import { NextResponse } from "next/server"


export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        let data = await sql`select * from orders where id = ${params.id}`
        if (!data.length) {
            return NextResponse.json({ message: "No Order found with this id" })
        }
        return NextResponse.json(data[0])
    }
    catch (err) {
        return NextResponse.json({ error: err })
    }
}
export async function DELETE(request: Request, { params }: { params: { id: string } }) {

    if (!params.id)
      return NextResponse.json({ message: "Missing required Data" });
  
    const check = await sql`SELECT * FROM orders WHERE id=${params.id}`;
    if (check.length === 0) {
      return NextResponse.json({ message: "Order with this ID does not exist" });
    }
  
    const res = await sql`DELETE FROM orders WHERE id=${params.id}`;
    return NextResponse.json({
      message: "Your Order Has been Successfully deleted",
    });
  }