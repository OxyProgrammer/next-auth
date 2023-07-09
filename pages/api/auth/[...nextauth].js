import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectToDatabase } from '../../../lib/db';
import { verifyPassword } from '../../../lib/auth';
import jwt from 'jsonwebtoken';

export const authOptions = {
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const { email, password } = credentials;

        if (!email || !password) {
          //Throwing error in this function will make Next auth library to redirect.
          //To prevent that, we are setting redirect:fasle in the signIn method in frontend.
          throw new Error('email and password needs to be supplied.');
        }

        const client = await connectToDatabase();

        const usersCollection = client.db().collection('users');

        const user = await usersCollection.findOne({ email });

        if (!user) {
          client.close();
          throw new Error('No user found!');
        }
        const passwordMatches = await verifyPassword(password, user.password);
        if (!passwordMatches) {
          client.close();
          throw new Error('Could not log in as password doesnt match!');
        }
        client.close();

        //The following object will be embedded in the JSON web token.
        const tokenContent = {
          id: user._id.toString(),
          email: user.email,
          isActive: true,
          prop1:'prop1',
          prop2:'prop2', 
          name:user.email,
          image:
          'https://www.pexels.com/photo/photography-of-a-guy-wearing-green-shirt-1222271/'
        };
        return tokenContent;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token;
      return session;
    },
  },
  jwt: {
    async encode({ secret, token }) {
      return jwt.sign(token, secret);
    },
    async decode({ secret, token }) {
      return jwt.verify(token, secret);
    },
  },
};

export default NextAuth(authOptions);
