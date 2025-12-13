import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";
import {
  unauthorized,
  notFound,
  successResponse,
  serverError,
  badRequest,
} from "@/utils/apiResponse";

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

//DELETE /api/messages/:id
export const DELETE = async (_req, { params }) => {
  try {
    await connectDB();
    const { id } = params;

    // validating session
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.user) {
      return unauthorized("You must be logged in");
    }

    const { userId } = sessionUser;

    //quick guard for invalid ObjectId
    if (!id || id.length < 12) {
      return badRequest("Invalid message ID");
    }

    // find message
    const message = await Message.findById(id);
    if (!message) {
      return notFound("Message not found");
    }

    // only recipient can delete
    if (message.recipient.toString() !== userId.toString()) {
      return unauthorized("You are not allowed to delete this message");
    }

    await Message.findByIdAndDelete(id);

    return successResponse({ message: "Message deleted successfully" });
  } catch (error) {
    console.error("Delete message error:", error);
    return serverError("Failed to delete message");
  }
};
