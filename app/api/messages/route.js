import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";
import {
  successResponse,
  selfMessageError,
  unauthorized,
  serverError,
} from "@/utils/apiResponse";

export const dynamic = "force-dynamic";

//GET /api/messages
export const GET = async () => {
  try {
    await connectDB();
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) {
      return unauthorized();
    }

    const { userId } = sessionUser;
    const readMessages = await Message.find({ recipient: userId, read: true })
      .sort({ createdAt: -1 })
      .populate("sender", "username")
      .populate({
        path: "property",
        select:
          "name location.street location.city location.state location.zipcode",
      });
    const unReadMessages = await Message.find({
      recipient: userId,
      read: false,
    })
      .sort({ createdAt: -1 })
      .populate("sender", "username")
      .populate({
        path: "property",
        select:
          "name location.street location.city location.state location.zipcode",
      });

    const messages = [...unReadMessages, ...readMessages];

    return successResponse(messages);
  } catch (error) {
    console.log(error);
    return serverError();
  }
};

//POST /api/messages
export const POST = async (request) => {
  try {
    await connectDB();
    const { name, email, phone, message, property, recipient } =
      await request.json();
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) {
      return unauthorized("You must be logged in to send a message");
    }
    const { user } = sessionUser;

    //Cannot message to self
    if (user.id === recipient) {
      return selfMessageError();
    }

    // Create new message
    await Message.create({
      sender: user.id,
      recipient,
      property,
      name,
      email,
      phone,
      body: message,
    });

    return successResponse({ message: "Message Sent" });
  } catch (error) {
    console.log(error);
    return serverError("Error sending message");
  }
};
