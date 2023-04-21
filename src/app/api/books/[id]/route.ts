
import sql from "@/app/util/neon"
import { NextResponse } from "next/server"

//get method to get books by id
export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        let data = await sql`select * from simplebooks where id = ${params.id}`
        if (!data.length) {
            return NextResponse.json({ message: "No book found with this id" })
        }
        return NextResponse.json(data[0])
    }
    catch (err) {
        return NextResponse.json({ error: err })
    }
}
//delete method to delete books by id
export async function DELETE(request: Request, { params }: { params: { id: string } }) {

    if (!params.id)
      return NextResponse.json({ message: "Missing required Data" });
  
    const check = await sql`SELECT * FROM simplebooks WHERE id=${params.id}`;
    if (check.length === 0) {
      return NextResponse.json({ message: "book with this ID does not exist" });
    }
  
    const res = await sql`DELETE FROM simplebooks WHERE id=${params.id}`;
    return NextResponse.json({
      message: "Your books Has been Successfully deleted",
    });
  }