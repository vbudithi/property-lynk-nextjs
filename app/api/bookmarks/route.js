import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
import { NextResponse } from "next/server";
import Property from "@/models/Property";

export const dynamic = "force-dynamic";

//GET /api/bokmarks
export const GET = async () => {
  try {
    await connectDB();
    const sessionUser = await getSessionUser();
    const userId = sessionUser?.user?.id;
    if (!userId) {
      return NextResponse.json({ message: "unauthorized" }, { status: 401 });
    }
    //Fetch user in db
    const user = await User.findOne({ _id: userId });

    //Get user bookmarks
    const bookmarks = await Property.find({ _id: { $in: user.bookmarks } });
    return NextResponse.json(bookmarks, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something Went Wrong" },
      { status: 500 }
    );
  }
};

export const POST = async (request) => {
  try {
    await connectDB();
    const { propertyId } = await request.json();

    const sessionUser = await getSessionUser();

    const userId = sessionUser?.user?.id;

    if (!userId) {
      return NextResponse.json({ message: "unauthorized" }, { status: 401 });
    }

    //Fetch user in db
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
