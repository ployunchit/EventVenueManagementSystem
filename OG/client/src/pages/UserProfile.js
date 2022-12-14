import React, { useState } from "react";
// import { useEffect } from "react";
import Input from "./Input";
import useForm from "./form-hooks";
import '../navbar.css';
import Navbar from '../navbar/navbar';
import {Button} from '@material-ui/core';

import styles from "./UserProfile.module.css";

function UserProfile() {
  const [passwordForm, setPasswordForm] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState(true);
  const [fetchedUser, setFetchedUser] = useState({
    firstName: "Ploy",
    lastName: "Unchit",
    username: "punchit",
  });

  const [formState, inputHandler, setFormData] = useForm(
    {
      firstName: {
        value: fetchedUser.firstName,
        isValid: true,
      },
      lastName: {
        value: fetchedUser.lastName,
        isValid: true,
      },
      username: {
        value: fetchedUser.username,
        isValid: true,
      },
    },
    true
  );

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const response = await fetch("api-url");
  //     const responseData = await response.json();
  //     setFetchedUser(responseData.userData);
  //   };
  //   fetchUser();
  // }, [setFetchedUser]);

  const passwordFormHandler = () => {
    if (passwordForm) {
      setFormData(
        {
          ...formState.inputs,
          currentPassword: undefined,
          newPassword: undefined,
          confirmedPassword: undefined,
        },
        formState.inputs.firstName.isValid &&
          formState.inputs.lastName.isValid &&
          formState.inputs.username.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          currentPassword: {
            value: "",
            isValid: false,
          },
          newPassword: {
            value: "",
            isValid: false,
          },
          confirmedPassword: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setPasswordForm((prev) => !prev);
  };

  const profileSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState);
    // patch crud operation
  };

  const passwordSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState);
    if (formState.inputs.newPassword.value !== formState.inputs.confirmedPassword.value) {
      setPasswordCheck(false);
      return;
    }
    // patch crud operation
    setPasswordCheck(true);
  };

  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);

  const handleImageUpload = e => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = e => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  console.log(formState);


  return (
    <div>
      <Navbar></Navbar>
    <div className={styles.profile}>
      <div className={styles["profile-header"]}>
        <div className={styles["profile-header-h1"]}>Profile Page</div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <div className={styles["profile-account"]}>
        <h2>Account Information</h2>
        <div className={styles["profile-image"]}>
          <div className={styles["profile-image-img"]}>
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
              ref={uploadedImage}
              alt="Profile"
            />
          </div>
          <button className={styles.btn} onClick={() => imageUploader.current.click()}>Change Profile Image</button>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            ref={imageUploader}
            style={{
              display: "none"
            }}
          />
        </div>
      </div>
      <div className={styles["profile-settings"]}>
        <h2>Profile Settings</h2>
        <div>
          <form onSubmit={profileSubmitHandler}>
            <Input
              label="First Name"
              id="firstName"
              type="input"
              name="firstName"
              onInput={inputHandler}
              initialValue={formState.inputs.firstName.value}
              initialValid={formState.inputs.firstName.isValid}
            />
            <Input
              label="Last Name"
              id="lastName"
              type="input"
              name="lastName"
              onInput={inputHandler}
              initialValue={formState.inputs.lastName.value}
              initialValid={formState.inputs.lastName.isValid}
            />
            <Input
              label="Username"
              id="username"
              type="input"
              name="username"
              onInput={inputHandler}
              initialValue={formState.inputs.username.value}
              initialValid={formState.inputs.username.isValid}
            />
            <button className={styles.btn} type="submit" disabled={!formState.isValid}>
              Update Profile
            </button>
          </form>
        </div>
      </div>
      <div className={styles["profile-password"]}>
        <h2>Password Settings</h2>
        <button className={styles["btn-regular"]} onClick={passwordFormHandler}>
          Change Password
        </button>
        {passwordForm && (
          <form onSubmit={passwordSubmitHandler}>
            <Input
              label="Current Password"
              id="currentPassword"
              type="password"
              name="currentPassword"
              onInput={inputHandler}
            />
            <Input
              label="New Password"
              id="newPassword"
              type="password"
              name="newPassword"
              onInput={inputHandler}
            />
            <Input
              label="Confirm Password"
              id="confirmedPassword"
              type="password"
              name="confirmPassword"
              onInput={inputHandler}
            />
            {!passwordCheck && <p>Passwords do not match.</p>}
            <button className={styles.btn} type="submit" disabled={!formState.isValid}>
              Update Password
            </button>
          </form>
        )}
      </div>
    </div>
    </div>
  );
}

export default UserProfile;
