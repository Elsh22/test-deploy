
import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
// edit back the avatar
const Profile = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({ id: null, username: '', email: '', fullName: 'null', avatar: 'null'});
  const [loading, setLoading] = useState(false);

  const getUserDetails = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/users/me');
      setUserData({
        id: res.data.data._id,
        username: res.data.data.username,
        email: res.data.data.email,
        fullName: res.data.data.fullName,
        avatar: res.data.data.avatar,
      });
      setLoading(false);
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);
  
  return (
    <div>
      <h1>Profile</h1>
      <hr />
      {loading ? (
        <p>Loading user details...</p>
      ) : userData.id ? (
        <>
        {userData.avatar && userData.avatar !== 'null' && (
            <img src={userData.avatar} alt="Profile Avatar" className="w-20 h-20 rounded-full"/>
          )}
          <p>Welcome <strong>{userData.fullName}</strong></p>
          <p>Username: <strong>{userData.username}</strong></p>
          <p>Email: <strong>{userData.email}</strong></p>
        </>
      ) : (
        <p>No user data</p>
      )}
      <hr />
    </div>
  );
};

export default Profile;
