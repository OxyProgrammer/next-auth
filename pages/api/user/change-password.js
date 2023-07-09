import { connectToDatabase } from '../../../lib/db';
import { verifyPassword, hashPassword } from '../../../lib/auth';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../api/auth/[...nextauth]';

async function handler(req, res) {
  if (req.method !== 'PATCH') {
    return;
  }

  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    res.status(400).json({ message: 'Old and New password needs to be supplied!' });
    return;
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session || !session.user) {
    res.status(401).json({ message: 'Not authenticated!' });
    return;
  }

  const { email } = session.user;
  const client = await connectToDatabase();
  const db = client.db();

  const existingUser = await db.collection('users').findOne({ email });
  if (!existingUser) {
    res.status(404).json({ message: 'Strange! User doesnt exist.' });
    client.close();
    return;
  }

  const passwordMatch = await verifyPassword(oldPassword, existingUser.password);
  if (!passwordMatch) {
    res.status(403).json({ message: "Sorry! Old password doesn't match." });
    client.close();
    return;
  }

  //Time to go and change the password
  const hashedPassword = await hashPassword(newPassword);
  const result = await db.collection('users').updateOne(
    {
      email: email,
    },
    {
      $set: {
        password: hashedPassword,
      },
    }
  );

  res.status(200).json({ message: 'Password changed successfully!', result });

  client.close();
}

export default handler;
