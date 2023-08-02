import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { object, string } from "yup";
import { API_URL } from '@/lib/api';
import { yupResolver } from "@hookform/resolvers/yup";
import router from "next/router";
import axios from "axios";
import { toast } from 'react-toastify';
import { Button } from "@/components/ui/button";
import Link from "next/link";
const Register: React.FC = () => {
  const validationSchema = object().shape({
    username: string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters"),
    email: string()
      .required("Email is required")
      .email("Invalid email address"),
    password: string()
      .required("Password is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        'Password must contain at least 8 characters, including at least one letter and one number'
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<{ username: string; email: string; password: string; }> = async (data) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, data);
      console.log(response.data);
      router.push("/auth/login"); 
      toast.success('Register Successful!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    } catch (error: any) {
        if (error.response && error.response.status === 409) {
          const errorMessage = "Email or Username already exists"; 
          toast.error(errorMessage, {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          });
        } else {
          console.error(error);
        }
      }
    };

  return (
    <div className="flex flex-col pb-20 pt-36 bg-gradient-to-r from-violet-500 to-fuchsia-500">
    <div className="md:w-[500px] bg-black min-h-[300px]  mx-auto px-12 py-6 rounded-3xl">
    <h2 className="text-2xl font-bold text-center text-purple-500 font-poppins">
       Login to
    </h2>
    <h1 className="text-center text-[60px] text-white font-bold font-bebasNeue">
      FEASTIVAL
    </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
            <label className="flex flex-col mt-2 text-base text-center text-white font-poppins"> Username
              <input className="mt-1 text-black border-[1px] text-sm border-gray-400 px-2 text-center py-3 rounded-xl font-poppins" type="text" {...register("username")} placeholder="Username"/>
              </label>
              {errors.username && (
                <p className="text-xs italic text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div>
            <label className="flex flex-col mt-2 text-base text-center text-white font-poppins"> Email
              <input className="mt-1 text-black border-[1px] text-sm border-gray-400 px-2 text-center py-3 rounded-xl font-poppins" type="email" {...register("email")} placeholder="Email"/>
              </label>
              {errors.email && (
                <p className="text-xs italic text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
            <label className="flex flex-col mt-2 text-base text-center text-white font-poppins"> Password
              <input className="mt-1 text-black border-[1px] text-sm border-gray-400 px-2 text-center py-3 rounded-xl font-poppins" type="password" {...register("password")} placeholder="Password"/>
             </label>
              {errors.password && (
                <p className="text-xs italic text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            <Button className="mt-4 text-white w-full bg-purple-500 hover:bg-purple-800 hover:text-white cursor-pointer border-none px-6 text-md font-semibold py-3 top-[3px] right-[3px] rounded-xl duration-200" type="submit">Submit</Button>
          </form>
            <p className="flex items-center justify-center mt-2 text-center text-white">  Already registered? <Link className="ml-1 text-blue-600 underline" href="/auth/login"> Login here</Link>
                        </p>
        </div>
      </div>
  );
};

export default Register