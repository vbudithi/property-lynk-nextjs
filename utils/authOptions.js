import connectDB from "@/config/database";
import User from "@/models/User";

import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      // connect to the database
      await connectDB();
      // check if user already exists,
      const userExists = await User.findOne({ email: profile.email });
      // if not, create a new user
      if (!userExists) {
        //truncate userName if it is too long
        const username = profile.name.slice(0, 20).toLowerCase();

        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        });
      }
      // return true to allow the user to sign in
      return true;
    },
    // getting the user from database and adding it to the session

    //modifies the session object
    async session({ session }) {
      const user = await User.findOne({ email: session.user.email });
      //assign the user id to session
      session.user.id = user._id.toString();
      return session;
    },
  },
};
