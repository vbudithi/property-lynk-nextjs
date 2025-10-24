import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

export const getSessionUser = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return null;
    }
    return {
      user: session.user,
      userId: session.user.id,
    };
  } catch (error) {
    console.error("Error in getSessionUser:", error);
    return null;
  }
};
