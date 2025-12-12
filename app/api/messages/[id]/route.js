import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";
import {
  unauthorized,
  notFound,
  successResponse,
  serverError,
} from "@/utils/apiResponse";
import { convertSegmentPathToStaticExportFilename } from "next/dist/shared/lib/segment-cache/segment-value-encoding";

export const dynamic = "force-dynamic";

//PUT  /api/messages/:id
export const PUT = async (_req, { params }) => {
  try {
    await connectDB();
    const { id } = params;
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.user) {
      return unauthorized(message);
    }
    const { userId } = sessionUser;

    const message = await Message.findById(id);

    if (!message) return notFound();

    //verify ownership
    if (message.recipient.toString() !== userId) {
      return unauthorized();
    }
    //update message to read/unread depending on the current status
    message.read = !message.read;
    await message.save();

    return successResponse({ message: "Status updated" });
  } catch (error) {
    console.log(error);
    return serverError();
  }
};

//DELETE  /api/messages/:id
export const DELETE = async (_req, { params }) => {};
