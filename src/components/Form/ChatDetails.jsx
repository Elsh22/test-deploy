"use client";

import { useState, useEffect, useRef } from "react";
import Loader from "./Loader";
import { AddPhotoAlternate } from "@mui/icons-material";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { CldUploadButton } from "next-cloudinary";
import MessageBox from "./MessageBox";
import { pusherClient } from "../../app/models/lib/pusher.js";
import img1 from "../../newassest/person.jpg"  
import img2 from "../../newassest/group.png" 
import img3 from "../../newassest/send.jpg"


const ChatDetails = ({ chatId }) => {
  const [loading, setLoading] = useState(true);
  const [chat, setChat] = useState({});
  const [otherMembers, setOtherMembers] = useState([]);

  const { data: session } = useSession();
  const currentUser = session?.user;

  const [text, setText] = useState("");

  const getChatDetails = async () => {
    try {
      const res = await fetch(`/api/chats/${chatId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setChat(data);
      setOtherMembers(
        data?.members?.filter((member) => member._id !== currentUser._id)
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (currentUser && chatId) getChatDetails();
  }, [currentUser, chatId]);

  const sendText = async () => {
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatId,
          currentUserId: currentUser._id,
          text,
        }),
      });

      if (res.ok) {
        setText("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const sendPhoto = async (result) => {
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatId,
          currentUserId: currentUser._id,
          photo: result?.info?.secure_url,
        }),
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    pusherClient.subscribe(chatId);

    const handleMessage = async (newMessage) => {
      setChat((prevChat) => {
        return {
          ...prevChat,
          messages: [...prevChat.messages, newMessage],
        };
      });
    };

    pusherClient.bind("new-message", handleMessage);

    return () => {
      pusherClient.unsubscribe(chatId);
      pusherClient.unbind("new-message", handleMessage);
    };
  }, [chatId]);

  /* Scrolling down to the bottom when having the new message */

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [chat?.messages]);

  return loading ? (
    <Loader />
  ) : (
    <div className="pb-20">
      <div className="flex flex-col max-h-screen bg-white rounded-2xl">
        <div className="flex items-center gap-4 px-8 py-3">
          {chat?.isGroup ? (
            <>
              <Link href={`/chats/${chatId}/group-info`}>
              <img
                  src={chat?.groupPhoto || img2.src}
                  alt="group-photo"
                  width={11}
                  height={11}
                  className="w-11 h-11 rounded-full object-cover object-center"
                />
              </Link>

              <div className="text">
                <p>
                  {chat?.name} &#160; &#183; &#160; {chat?.members?.length}{" "}
                  members
                </p>
              </div>
            </>
          ) : (
            <>
              <img
                src={otherMembers[0].profileImage || img1.src}
                alt="profile photo"
                width={11}
                height={11}
                className="w-11 h-11 rounded-full object-cover object-center"
              />
              <div className="text">
                <p>{otherMembers[0].username}</p>
              </div>
            </>
          )}
        </div>

        <div className="flex-1 flex flex-col gap-5 bg-grey-2 p-5 overflow-y-scroll custom-scrollbar">
          {chat?.messages?.map((message, index) => (
            <MessageBox
              key={index}
              message={message}
              currentUser={currentUser}
            />
          ))}
          <div ref={bottomRef} />
        </div>

        <div className="flex items-center justify-between px-7 py-3 rounded-3xl bg-white">
          <div className="flex-grow flex items-center gap-4">
            <CldUploadButton
              options={{ maxFiles: 1 }}
              onUpload={sendPhoto}
              uploadPreset="yflkby8h"
            >
              <AddPhotoAlternate
                sx={{
                  fontSize: "35px",
                  color: "#737373",
                  cursor: "pointer",
                  "&:hover": { color: "red" },
                }}
              />
            </CldUploadButton>

            <input
              type="text"
              placeholder="Write a message..."
              className="flex-grow px-5 py-3 rounded-2xl bg-white outline-none"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
          </div>

          <div onClick={sendText}>
          <img src={img3.src} alt="send" className="w-10 h-10 rounded-full hover:scale-125 ease-in-out duration-300" width={10} height={10} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatDetails;
