import connectDB from "@/config/database";
import User from "@/models/User";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const POST = async (request) => {
  try {
    await connectDB();
    const { propertyId } = await request.json();

    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { userId } = sessionUser;
    //Fetch user
    const user = await User.findOne({ _id: userId });
    //Ensure bookmark array exists
    user.bookmarks = user.bookmarks || [];
    //check if property is bookmarked
    let isBookmarked = user.bookmarks.includes(propertyId);
    let message = "";

    if (isBookmarked) {
      //If already bookmarked, remove it
      user.bookmarks.pull(propertyId);
      message = "Bookmark Removed Succesfully";
      isBookmarked = false;
    } else {
      //If not bookmarked, add it
      user.bookmarks.push(propertyId);
      message = "Bookmark Added Successfully";
      isBookmarked = true;
    }

    await user.save();
    return NextResponse.json({ message, isBookmarked }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something Went Wrong" },
      { status: 500 }
    );
  }
};
