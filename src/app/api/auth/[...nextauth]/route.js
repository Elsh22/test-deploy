//import NextAuth from "next-auth";
//import { options } from "./options";

// const handler = NextAuth(options);
// export { handler as GET, handler as POST };

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";

import User from "../../../models/Users";
import { connect } from "../../../../dbConfig/dbConfig";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        if (!credentials.email || !credentials.password) {
          throw new Error("Invalid email or password");
        }

        await connect()

        const user = await User.findOne({ email: credentials.email });

        if (!user || !user?.password) {
          throw new Error("Invalid email or password");
        }

        const isMatch = await compare(credentials.password, user.password);

        if (!isMatch) {
          throw new Error("Invalid password");
        }

        return user
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async session({session}) {
      const mongodbUser = await User.findOne({ email: session.user.email })
      session.user.id = mongodbUser._id.toString()

      session.user = {...session.user, ...mongodbUser._doc}

      return session
    }
  }
});

export { handler as GET, handler as POST };