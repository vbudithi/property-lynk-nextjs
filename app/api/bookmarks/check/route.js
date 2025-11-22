import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const POST = async (request) => {
  try {
    await connectDB();

    const { propertyId } = await request.json();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { userId } = sessionUser;
    //Fetch user
    const user = await User.findOne({ _id: userId });
    //Ensure bookmark array exists
    user.bookmarks = user.bookmarks || [];
    //check if property is bookmarked
    let isBookmarked = user.bookmarks.includes(propertyId);

    return NextResponse.json({ isBookmarked }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something Went Wrong" },
      { status: 500 }
    );
  }
};
