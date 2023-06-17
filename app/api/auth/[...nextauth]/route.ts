import NextAuth, { AuthOptions } from "next-auth";
import prismadb from '@/libs/prismadb';
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { objectToAuthDataMap, AuthDataValidator } from '@telegram-auth/server';

const authOptions: AuthOptions  = {
    adapter: PrismaAdapter(prismadb),
    providers: [
      CredentialsProvider({
        id: 'telegram-login',
        name: 'Telegram Login',
        credentials: {},
        async authorize(credentials, req): Promise<any> {
          const validator = new AuthDataValidator({ botToken: `${process.env.BOT_TOKEN}` });
  
          const data = objectToAuthDataMap(req.query || {});
  
          const user = await validator.validate(data);
  
          if (user.id && user.first_name) {
            return {
              id: user.id.toString(),
              name: [user.first_name, user.last_name || ''].join(' '),
              image: user.photo_url,
            };
          }
  
          return null;
        },
      }),
    ],
    pages: {
      signIn: '/auth',
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt"
    },
    debug: process.env.NODE_ENV === "development"
}



const handler =  NextAuth(authOptions)
export { handler as GET, handler as POST}