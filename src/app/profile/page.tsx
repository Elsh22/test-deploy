"use client";
import axios from "axios";
import React from "react";
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";
import Profile  from "./Profile"
import Directory from "./Directory";


export default function ProfilePage() {
    const router = useRouter();


    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success('Logout successful')
            router.push('/login')
        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message)
        }
    }


    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 select-none mt-20">
           <Profile />

            <button
                onClick={logout}
                className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Logout
            </button>
        
        <Directory />

        </div>
    );
}
//<App />