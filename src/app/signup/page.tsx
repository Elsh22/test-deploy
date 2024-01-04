"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";


export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
        fullName: "",
        phoneNumber: "",
        major: "",
        status: "",
    });
    const [avatar, setAvatar] = useState<string>("");
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // Ensure reader.result is a string before setting the state
                if (typeof reader.result === 'string') {
                    setAvatar(reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };
   


    const onSignup = async () => {
        try {
            setLoading(true);
            const newUser = { ...user, avatar };
            const response = await axios.post("/api/users/signup", newUser);
            console.log("Signup success", response.data);
            toast.success("Signup success");
            router.push("/login");
        } catch (error: any) {
            console.log("Signup failed", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
            router.push("/login");
        }
    };
   


    useEffect(() => {
        const allFieldsFilled = Object.values(user).every(field => field.length > 0);
        setButtonDisabled(!allFieldsFilled);
    }, [user]);




    return (
        <div className="select-none mt-16">
        {loading && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <p className="text-white text-lg">Processing...</p>
            </div>
        )}
        <div className="w-full max-w-4xl mx-auto p-6 rounded-lg ">
            <h1 className="text-4xl font-bold text-center mb-6">{loading ? "Processing" : "Signup"}</h1>
            <div className="flex flex-col items-center gap-4">
        <label htmlFor="Full Name">Full Name</label>
        <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="fullName"
            type="text"
            value={user.fullName}
            onChange={(e) => setUser({...user, fullName: e.target.value})}
            placeholder="Full Name"
            />
        <label htmlFor="username">Username</label>
        <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="username"
            type="text"
            value={user.username}
            onChange={(e) => setUser({...user, username: e.target.value})}
            placeholder="username"
            />
        <label htmlFor="email">email</label>
        <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            placeholder="email"
            />
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="phoneNumber"
            type="number"
            value={user.phoneNumber}
            onChange={(e) => setUser({...user, phoneNumber: e.target.value})}
            placeholder="1234567890"
            />    
        <label htmlFor="password">password</label>
        <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder="password"
            />
        <label htmlFor="status">Status</label>
        <select
            style={{ width: '210px' }}
            id="status"
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black "
            value={user.status}
            onChange={(e) => setUser({...user, status: e.target.value})}
        >
            <option value="">Select Type</option>
            <option value="Student">Student</option>
            <option value="Alumni">Alumni</option>
        </select>
               
                <label htmlFor="major">Major</label>
                <input
                  id="major"
                  type="major"
                  className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                  value={user.major}
                  onChange={(e) => setUser({...user, major: e.target.value})}
                  placeholder="Enter your major"
                />
        <label htmlFor="avatar">Profile Image</label>
        <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="avatar"
            type="file"
            accept="image/png, image/jpeg, image/gif, image/jpeg"
            onChange={handleFileChange}
        />
       
        <button
            onClick={onSignup }
            disabled={buttonDisabled}
            className={`bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out ${buttonDisabled ? 'opacity-50 cursor-not-allowed' : ''} w-full max-w-xs`}
        >
                    {buttonDisabled ? "Please fill all fields" : "Signup"}
                </button>
                <p className="mt-8">Already Have an account? <Link href='/login'><span className="text-blue-600 hover:text-blue-800 cursor-pointer ml-1">Login Here</span></Link></p>
        </div>
        </div>
     </div>
    );


}
