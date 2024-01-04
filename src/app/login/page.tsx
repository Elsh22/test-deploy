"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";


export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({ email: "", password: "" });
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);


    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            toast.success("Login success");
        } catch (error: any) {
            console.log("Login failed", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
            router.push("/profile");
        }
    };


    useEffect(() => {
        setButtonDisabled(!(user.email.length > 0 && user.password.length > 0));
    }, [user]);


    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 select-none">
            {loading && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <p className="text-white text-lg">Processing...</p>
                </div>
            )}
            <h1 className="text-2xl font-bold mb-2">{loading ? "Processing" : "Login"}</h1>
            <label htmlFor="email" className="text-lg font-semibold">Email</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:border-gray-600"
                id="email"
                type="text"
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
                placeholder="Email"
            />
            <label htmlFor="password" className="text-lg font-semibold">Password</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:border-gray-600"
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
                placeholder="Password"
            />
            <button
                onClick={onLogin}
                disabled={buttonDisabled}
                className={`bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out ${buttonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                Login here
            </button>
            <p className="mt-8">Don't Have an account? <Link href='/signup'><span className="text-blue-600 hover:text-blue-800 cursor-pointer ml-1">Sign Up</span></Link></p>
        </div>
    );
}
