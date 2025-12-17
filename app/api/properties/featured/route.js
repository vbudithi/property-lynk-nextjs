import connectDB from "@/config/database";
import Property from "@/models/Property";
import { serverError, successResponse } from "@/utils/apiResponse";

//GET /api/properties/featured
export const GET = async (request) => {
  try {
    await connectDB();
    const properties = await Property.find({
      is_featured: true,
    });
    return successResponse({ properties }, "Properties fetched successfully");
  } catch (error) {
    return serverError("Failed to create the property");
  }
};
