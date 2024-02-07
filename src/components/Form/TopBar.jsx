"use client";
import { Logout } from "@mui/icons-material";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import img1 from '../../newassest/person.jpg';


const TopBar = () => {
  
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user;

  const handleLogout = async () => {
    await signOut({ redirect: false });
    window.location.href = "/login";
  };

  return (
    <div className="top-0 sticky px-10 py-5 flex items-center justify-between bg-blue-2">
      <Link href="/chats">
        <h1 className='font-bold text-4xl'>DMC</h1>
      </Link>

      <div className="flex items-center gap-8 max-sm:hidden">
        <Link
          href="/chats"
          className={`${
            pathname === "/chats" ? "text-red-1" : ""
          } text-heading4-bold`}
        >
          Chats
        </Link>
        <Link
          href="/contacts"
          className={`${
            pathname === "/contacts" ? "text-red-1" : ""
          } text-heading4-bold`}
        >
          Contacts
        </Link>

        <Logout
          sx={{ color: "#737373", cursor: "pointer" }}
          onClick={handleLogout}
        />

        <Link href="/Image">
          <img
            src={user?.profileImage || img1.src }
            alt="Image"
            width={11} 
            height={11} 
            className="w-11 h-11 rounded-full object-cover object-center"
          />
        </Link>
      </div>
    </div>
  );
};

export default TopBar;