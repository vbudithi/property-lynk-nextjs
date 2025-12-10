import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";
import {
  successResponse,
  badRequest,
  unauthorized,
  serverError,
} from "@/utils/apiResponse";

export const dynamic = "force-dynamic";

export const POST = async (request) => {
  try {
    await connectDB();
    const { name, email, phone, message, property, recipient } =
      await request.json();
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) {
      return unauthorized();
    }
    const { user } = sessionUser;
    //Cannot message to self
    if (user.id === recipient) {
      return badRequest("Cannot send a message to yourself");
    }
    const newMessage = new Message({
      sender: user.id,
      recipient,
      property,
      name,
      email,
      phone,
      body: message,
    });
    await newMessage.save();
    return successResponse({ message: "Message Sent" });
  } catch (error) {
    console.log(error);
    return serverError();
  }
};
