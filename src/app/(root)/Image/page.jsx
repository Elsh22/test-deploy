"use client";
import Loader from "../../../components/Form/Loader";
import { PersonOutline } from "@mui/icons-material";
import { useSession } from "next-auth/react";
import { CldUploadButton } from "next-cloudinary";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import img1 from '../../../newassest/person.jpg';
import Layout2 from '../layout'


const Profile = () => {
  const { data: session } = useSession();
  const user = session?.user;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      reset({
        username: user?.username,
        profileImage: user?.profileImage,
      });
    }
    setLoading(false);
  }, [user]);

  const {
    register,
    watch,
    setValue,
    reset,
    handleSubmit,
    formState: { error },
  } = useForm();

  const uploadPhoto = (result) => {
    setValue("profileImage", result?.info?.secure_url);
  };

  const updateUser = async (data) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/users/${user._id}/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      setLoading(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="mt-20/ flex flex-col gap-11 items-center justify-center">
      <h1 className="text-2xl font-bold">Edit Your Profile</h1>

      <form className="flex flex-col gap-9" onSubmit={handleSubmit(updateUser)}>
        <div className="flex items-center justify-between px-5 py-3 rounded-2xl cursor-pointer shadow-2xl">
          <input
            {...register("username", {
              required: "Username is required",
              validate: (value) => {
                if (value.length < 3) {
                  return "Username must be at least 3 characters";
                }
              },
            })}
            type="text"
            placeholder="Username"
            className="w-72 sm:w-full bg-transparent outline-none"
          />
          <PersonOutline sx={{ color: "#737373" }} />
        </div>
        {error?.username && (
          <p className="text-red-500">{error.username.message}</p>
        )}

        <div className="flex items-center justify-between">
          <img
            src={
              watch("profileImage") ||
              user?.profileImage ||
              img1.src
            }
            width={40}
            height={40}
            alt="profile"
            className="w-40 h-40 rounded-full"
          />
          <CldUploadButton
            options={{ maxFiles: 1 }}
            onUpload={uploadPhoto}
            uploadPreset="yflkby8h"
          >
            <p className="text-lg font-bold">Upload new photo</p>
          </CldUploadButton>
        </div>

        <button className="flex items-center justify-center rounded-xl p-3 bg-gray-700 text-white mb-5" type="submit">
          Save Changes
        </button>
      </form>
    </div>
  );
};

Profile.getLayout = function getLayout(page) {
  return <Layout2>{page}</Layout2>;
}

export default Profile;
