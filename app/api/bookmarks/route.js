import connectDB from "@/config/database";
import User from "@/models/User";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { NextResponse } from "next/server";

export const dynamic = "force";
export const POST = async (rsequest) => {
  try {
    await connectDB();
    const { propertyId } = await request.json;
    const sessionUser = await getSessionUser();
    if (!session || !session.userId) {
      return new Response("User ID is required", { status: 401 });
    }

    const { userId } = sessionUser;
    //Find user in database
    const user = await User.findOne({ _id: userId });
    //check if property is bookmarked
    let isBookmarked = user.bookmarks.includes(propertyId);
    let message;

    if (isBookmarked) {
      //If already bookmarked, remove it
      user.bookmarks.pull(propertyId);
      message = "Bookmark Removed Succesfully";
      isBookmarked = false;
    } else {
      if (!isBookmarked) {
        //If not bookmarked, add it
        user.bookmarks.push(propertyId);
        message = "Bookmark Added Successfully";
        isBookmarked = true;
      }
    }

    await user.save();
    return NextResponse.json({ message, isBookmarked }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse("Something Went Wrong", { status: 500 });
  }
};
