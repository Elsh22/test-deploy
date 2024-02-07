"use client";
import React from 'react'
import Contacts from "../../../components/Form/Contacts";
import ChatList from "../../../components/Form/ChatList";
import Layout2 from "../layout";

const Chats = () => {
  return (
      <div className=" mt-20 flex justify-between gap-5 px-10 py-3 max-lg:gap-8">
        <div className="w-1/3 max-lg:w-1/2 max-md:w-full">
        <ChatList currentChatId={undefined} />
      </div>
      <div className="w-2/3 max-lg:w-1/2 max-md:hidden">
        <Contacts />
      </div>
    </div>
  );
};
Chats.getLayout = function getLayout(page: any) {
  return <Layout2>{page}</Layout2>;
}

export default Chats
