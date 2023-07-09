import classes from './profile-form.module.css';
import { useState, useRef } from 'react';

function ProfileForm({ onChangePassword }) {
  const oldPwdInputRef = useRef();
  const newPwdInputRef = useRef();

  const submithandler = (event) => {
    event.preventDefault();
    const newPassword = newPwdInputRef.current.value;
    const oldPassword = oldPwdInputRef.current.value;
    onChangePassword({ oldPassword, newPassword });
  };

  return (
    <form className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPwdInputRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor='old-password'>Old Password</label>
        <input type='password' id='old-password' ref={oldPwdInputRef} />
      </div>
      <div className={classes.action}>
        <button onClick={submithandler}>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
