import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";
import {
  successResponse,
  unauthorized,
  serverError,
} from "@/utils/apiResponse";

export const dynamic = "force-dynamic";

//GET /api/messages/unread-count
export const GET = async (_req, { params }) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) {
      return unauthorized();
    }

    const { userId } = sessionUser;

    const count = await Message.countDocuments({
      recipient: userId,
      read: false,
    });
    return successResponse({ count });
  } catch (error) {
    console.error(error);
    return serverError();
  }
};
