import ProfileForm from './profile-form';
import classes from './user-profile.module.css';

function UserProfile() {
  // const [isLoading, setIsLoading] = useState(true);
  // const [loadedSession, setIsLoadedSession] = useState(null);

  // useEffect(() => {
  //   getSession().then((session) => {
  //     setIsLoadedSession(session);
  //     if (!session) {
  //       window.location.href = '/auth';
  //     } else {
  //       setIsLoading(false);
  //     }
  //   });
  // }, []);

  // if (isLoading) {
  //   return <p className={classes.profile}>Loading...</p>;
  // }

  async function passwordChangeRequested({ oldPassword, newPassword }) {
    
    const response = await fetch('/api/user/change-password', {
      method: 'PATCH',
      body: JSON.stringify({
        oldPassword,
        newPassword,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response);
  }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={passwordChangeRequested} />
    </section>
  );
}

export default UserProfile;
