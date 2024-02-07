"use client";

import Loader from "../../../../../components/Form/Loader";
import { GroupOutlined, PersonOutline } from "@mui/icons-material";
import { CldUploadButton } from "next-cloudinary";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Layout2 from "../../../layout";
import Image from 'next/image';

const GroupInfo = () => {
  const [loading, setLoading] = useState(true);
  const [chat, setChat] = useState({});

  const { chatId } = useParams();

  const getChatDetails = async () => {
    try {
      const res = await fetch(`/api/chats/${chatId}`);
      const data = await res.json();
      setChat(data);
      setLoading(false);
      reset({
        name: data?.name,
        groupPhoto: data?.groupPhoto,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (chatId) {
      getChatDetails();
    }
  }, [chatId]);

  const {
    register,
    watch,
    setValue,
    reset,
    handleSubmit,
    formState: { error },
  } = useForm();

  const uploadPhoto = (result) => {
    setValue("groupPhoto", result?.info?.secure_url);
  };

  const router = useRouter();

  const updateGroupChat = async (data) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/chats/${chatId}/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      setLoading(false);

      if (res.ok) {
        router.push(`/chats/${chatId}`);
      }

    } catch (error) {
      console.log(error);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="mt-16 flex flex-col gap-11 items-center justify-center">
      <h1 className="text-heading3-bold">Edit Group Info</h1>

      <form className="flex flex-col gap-9" onSubmit={handleSubmit(updateGroupChat)}>
        <div className="flex items-center justify-between px-5 py-3 rounded-2xl cursor-pointer shadow-2xl">
          <input
            {...register("name", {
              required: "Group chat name is required",
            })}
            type="text"
            placeholder="Group chat name"
            className="w-[300px] max-sm:w-full bg-transparent outline-none"
          />
          <GroupOutlined sx={{ color: "#737373" }} />
        </div>
        {error?.name && <p className="text-red-500">{error.name.message}</p>}

        <div className="flex items-center justify-between">
          <Image
            src={watch("groupPhoto") || "../../../../../newassest/group.png"}
            alt="profile"
            width={40}
            height={40}
            className="w-40 h-40 rounded-full"
          />
          <CldUploadButton
            options={{ maxFiles: 1 }}
            onUpload={uploadPhoto}
            uploadPreset="yflkby8h"
          >
            <p className="text-body-bold">Upload new photo</p>
          </CldUploadButton>
        </div>

        <div className="flex flex-wrap gap-3">
          {chat?.members?.map((member, index) => (
            <p className="text-base-bold p-2 bg-pink-1 rounded-lg" key={index}>{member.username}</p>
          ))}
        </div>

        <button className="flex items-center justify-center rounded-xl p-3 bg-gradient-to-l from-blue-1 to-blue-3 text-body-bold text-white" type="submit">
          Save Changes
        </button>
      </form>
    </div>
  );
};
GroupInfo.getLayout = function getLayout(page) {
  return <Layout2>{page}</Layout2>;
}

export default GroupInfo;