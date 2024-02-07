"use client";

import { EmailOutlined, LockOutlined, PersonOutline,} from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react"


const Form = ({ type }) => {
  const {register,handleSubmit, watch,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const onSubmit = async (data) => {
    if (type === "register") {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push("/api/auth/signin");
      }

      if (res.error) {
        toast.error("Something went wrong");
      }
    }

    if (type === "login") {
      const res = await signIn("credentials", {
        ...data,
        redirect: false,
      })

      if (res.ok) {
        router.push("/chats");
      }

      if (res.error) {
        toast.error("Invalid email or password");
      }
    }
  };
  

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-1/3 py-7 px-4 sm:w-5/6 lg:w-2/3 xl:w-1/2 flex flex-col items-center justify-center gap-6 bg-white rounded-3xl">


        <form className="flex flex-col items-center gap-5" onSubmit={handleSubmit(onSubmit)}>
          {type === "register" && (
            <div>
              <div className="flex items-center justify-between px-5 py-3 rounded-2xl cursor-pointer shadow-2xl">
                <input
                  defaultValue=""
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
                  className="w-[300px] sm:w-full bg-transparent outline-none"
                />
                <PersonOutline sx={{ color: "#737373" }} />
              </div>
              {errors.username && (
                <p className="text-red-500">{errors.username.message}</p>
              )}
            </div>
          )}

          <div>
            <div className="flex items-center justify-between px-5 py-3 rounded-2xl cursor-pointer shadow-2xl">
              <input
                defaultValue=""
                {...register("email", { required: "Email is required" })}
                type="email"
                placeholder="Email"
                className="w-[300px] sm:w-full bg-transparent outline-none"
              />
              <EmailOutlined sx={{ color: "#737373" }} />
            </div>
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between px-5 py-3 rounded-2xl cursor-pointer shadow-2xl">
              <input
                defaultValue=""
                {...register("password", {
                  required: "Password is required",
                  validate: (value) => {
                    if (
                      value.length < 5 ||
                      !value.match(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/)
                    ) {
                      return "Password must be at least 5 characters and contain at least one special character";
                    }
                  },
                })}
                type="password"
                placeholder="Password"
                className="w-[300px] sm:w-full bg-transparent outline-none"
              />
              <LockOutlined sx={{ color: "#737373" }} />
            </div>
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>

          <button className="w-full px-5 py-3 mt-5 mb-7 rounded-xl cursor-pointer bg-blue-500 hover:bg-red-500 text-white font-bold" type="submit">
            {type === "register" ? "Join Free" : "Let's Chat"}
          </button>
        </form>

        {type === "register" ? (
          <Link href="/api/auth/signin" className="text-base font-medium hover:text-red-500">
            <p className="text-center">Already have an account? Sign In Here</p>
          </Link>
        ) : (
          <Link href="/register" className="text-base font-medium hover:text-red-500">
            <p className="text-center">Don't have an account? Register Here</p>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Form;