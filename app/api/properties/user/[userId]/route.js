import connectDB from "@/config/database";
import Property from "@/models/Property";
import { NextResponse } from "next/server";

//GET /api/properties/user/:userId
export const GET = async (request, { params }) => {
  try {
    await connectDB();
    const { userId } = params;
    if (!userId) {
      return NextResponse.json(
        { message: "UserID is required" },
        { status: 400 }
      );
    }

    const properties = await Property.find({ owner: userId });

    return NextResponse.json(properties, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
};
