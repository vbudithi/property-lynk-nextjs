import connectDB from "@/config/database";
import Property from "@/models/Property";
import { NextResponse } from "next/server";

//GET /api/properties/search

export const GET = async (request) => {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const location = searchParams.get("location");
    const propertyType = searchParams.get("propertyType");
    const locationPattern = new RegExp(location, "i");

    //Match location pattern against database fields
    let query = {
      $or: [
        { name: locationPattern },
        { description: locationPattern },
        { "location.street": locationPattern },
        { "location.city": locationPattern },
        { "location.zipcode": locationPattern },
      ],
    };

    //only check for property if its not'All'
    if (propertyType && propertyType !== "All") {
      const typePattern = new RegExp(propertyType, "i");
      query.type = typePattern;
    }
    const properties = await Property.find(query);
    return NextResponse.json({ properties }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};
