import UserProfile from '../components/profile/user-profile';
import { authOptions } from './api/auth/[...nextauth]';
import { getServerSession } from 'next-auth/next';
import { getSession } from 'next-auth/react';
import { useEffect } from 'react';

function ProfilePage() {
  useEffect(() => {
    getSession().then((s) => {
      console.log(s);
    });
  }, []);
  return <UserProfile />;
}

export async function getServerSideProps(context) {
  // const session = await getSession({ req: context.req });
  const session = await getServerSession(context.req, context.res, authOptions);
  console.log('Session from server side:', session);
  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  } else {
    return {
      props: {
        session,
      },
    };
  }
}

export default ProfilePage;
