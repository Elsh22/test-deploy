"use client";
import React, {useState} from "react";

export default function UserProfile({ params }: any) {
    const [profileImage, setProfileImage] = useState<string | null>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p className="text-4xl">Name 
                <span className="p-2 ml-2 rounded bg-orange-500 text-black">{params.id}</span>
            </p>
            <div>
                {profileImage && <img src={profileImage} alt="Profile" className="rounded-full h-32 w-32" />}
                <input type="file" onChange={handleImageUpload} />
            </div>
        </div>
    );
}

