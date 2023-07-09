import UserProfile from '../components/profile/user-profile';
import { authOptions } from './api/auth/[...nextauth]';
import { getServerSession } from 'next-auth/next';

function ProfilePage() {
  return <UserProfile />;
}

export async function getServerSideProps(context) {
  // const session = await getSession({ req: context.req });
  const session = await getServerSession(context.req, context.res, authOptions);
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
