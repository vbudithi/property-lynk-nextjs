import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import cloudinary from "@/config/cloudinary";
import { NextResponse } from "next/server";

//GET /api/properties
export const GET = async (request) => {
  try {
    await connectDB();

    const properties = await Property.find({});

    return new Response(JSON.stringify({ properties }), {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
};

export const POST = async (request) => {
  try {
    await connectDB();
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return NextResponse({ message: "UserID is required" }, { status: 401 });
    }

    const { userId } = sessionUser;
    const formData = await request.formData();

    //Access all values from amenities and images fields
    const amenities = formData.getAll("amenities");
    const images = formData
      .getAll("images")
      .filter((image) => image.name !== "");

    //create all the  propertyData object for database
    const propertyData = {
      type: formData.get("type"),
      name: formData.get("name"),
      description: formData.get("description"),
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

    //upload images to cloudinary
    const imageUploadPromises = [];

    for (const image of images) {
      const imageBuffer = await image.arrayBuffer();
      const imageArray = new Uint8Array(imageBuffer);
      const imageData = Buffer.from(imageArray);

      //convert the image data to base64 format
      const imageBase64 = imageData.toString("base64");

      //make request to cloudinary to upload the image
      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        {
          folder: "propertylynk",
        }
      );
      imageUploadPromises.push(result.secure_url);

      //wait for all the images to be uploaded
      const uploadedImages = await Promise.all(imageUploadPromises);

      //add uploaded images to propertyData
      propertyData.images = uploadedImages;
    }

    //create new property in database
    const newProperty = new Property(propertyData);
    await newProperty.save();

    console.log("New Property Created:", newProperty._id);

    return Response.redirect(
      `${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`
    );
  } catch (error) {
    return new Response("Failed to create property", { status: 500 });
  }
};
