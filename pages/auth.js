import AuthForm from '../components/auth/auth-form';
import { authOptions } from './api/auth/[...nextauth]';
import { getServerSession } from 'next-auth/next';

function AuthPage() {
  return <AuthForm />;
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (session) {
    return {
      redirect: {
        destination: '/',
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
export default AuthPage;
