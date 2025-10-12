import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import "@/assets/styles/globals.css";
import PropertySections from "@/components/PropertySections";
import connectDB from "@/config/database";
import mongoose from "mongoose";
import Property from "@/models/Property";

const PropertyPage = async ({ params }) => {
  const { id } = await params;
  await connectDB();

  // Guard invalid ObjectId to avoid CastError
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        Property Not found
      </h1>
    );
  }

  const property = await Property.findById(id).lean();

  if (!property) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        Property Not found
      </h1>
    );
  }

  // Convert to plain JSON-safe object
  const propertyData = JSON.parse(JSON.stringify(property));

  return (
    <>
      <PropertyHeaderImage image={property.images?.[0]} />
      <PropertySections property={propertyData} />
    </>
  );
};
export default PropertyPage;
