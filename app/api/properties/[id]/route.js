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

    console.log("Fetched property:", property);

    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(property, { status: 200 });
  } catch (err) {
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
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
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
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
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

// UPDATE /api/properties/:id

export const PUT = async (request, { params }) => {
  try {
    await connectDB();
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("UserID is required", { status: 401 });
    }

    const { id } = params;
    const { userId } = sessionUser;
    const formData = await request.formData();

    //Access all values from amenities and images fields
    const amenities = formData.getAll("amenities");

    //get Property to update
    const existingProperty = await Property.findById(id).lean();
    if (!existingProperty) {
      return new Response("Property not found", { status: 404 });
    }
    //check if the logged in user is the owner of the property
    if (existingProperty.owner.toString() !== userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    //create all the  propertyData object for database
    const propertyData = {
      type: formData.get("type"),
      name: formData.get("name"),
      description: formData.get("description") || "",
      location: {
        street: formData.get("location.street"),
        city: formData.get("location.city"),
        state: formData.get("location.state"),
        zipcode: formData.get("location.zipcode"),
      },
      beds: formData.get("beds"),
      baths: formData.get("baths"),
      square_feet: formData.get("square_feet"),
      amenities,
      rates: {
        nightly: formData.get("rates.nightly"),
        weekly: formData.get("rates.weekly"),
        monthly: formData.get("rates.monthly"),
      },
      seller_info: {
        name: formData.get("seller_info.name"),
        email: formData.get("seller_info.email"),
        phone: formData.get("seller_info.phone"),
      },
      owner: userId,
    };

    //update property in database
    const updatedProperty = await Property.findByIdAndUpdate(id, propertyData);

    console.log("Property Updated:", id);

    return new Response(JSON.stringify(updatedProperty), { status: 200 });
  } catch (error) {
    return new Response("Failed to update property", { status: 500 });
  }
};
