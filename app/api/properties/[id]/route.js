import connectDB from "@/config/database";
import Property from "@/models/Property";
import { NextResponse } from "next/server";

// GET /api/properties/:id
export async function GET(_req, { params }) {
  try {
    const { id } = await params;

    await connectDB();

    // quick guard for invalid ObjectId to avoid CastError
    if (!id || id.length < 12) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    const property = await Property.findById(id).lean();
    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(property, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
