import connectDB from "@/config/database";
import Property from "@/models/Property";
import { NextResponse } from "next/server";
import { getSessionUser } from "@/utils/getSessionUser";

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

// DELETE /api/properties/:id
export async function DELETE(_req, { params }) {
  try {
    const propertyId = await params.id;
    const sessionUser = await getSessionUser();

    //check for session user
    if (!sessionUser || !sessionUser.userId) {
      return NextResponse("Unauthorized", { status: 401 });
    }
    const { userId } = sessionUser;
    await connectDB();

    // quick guard for invalid ObjectId to avoid CastError
    if (!propertyId || propertyId.length < 12) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    const property = await Property.findById(propertyId).lean();
    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }
    //check if the logged in user is the owner of the property
    if (property.owner.toString() !== userId) {
      return NextResponse("Unauthorized", { status: 401 });
    }
    await Property.findByIdAndDelete(propertyId);
    return NextResponse.json(
      { message: "Property deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
