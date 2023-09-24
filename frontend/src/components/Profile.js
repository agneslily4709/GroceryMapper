import React, { useState, useEffect } from 'react';
import '../index.css';

const Profile = () => {
  const [userData, setUserData] = useState({});

  const callAboutPage = async () => {
    try {
      const res = await fetch('https://grocery-mapper-be.onrender.com/api/profile', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await res.json();
      setUserData(data);
      if (res.status !== 200) { // Corrected this line
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    callAboutPage();
  }, []);

  return (
    <>
      <div className="profile-component">
        <p className='profile-title'>PROFILE</p>
        <form method="GET">
          <div className="data-field">
            <p>Name : {userData.name}</p>
            <p>Email : {userData.email}</p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Profile;
