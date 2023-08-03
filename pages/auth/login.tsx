import React, { BaseSyntheticEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { API_URL } from '@/lib/api';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { setCookie } from 'cookies-next';
import router from 'next/router';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';

interface FormProps {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const validationSchema = object().shape({
    email: string().required('email is required'),
    password: string().required('Password is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: FormProps) => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/auth/login`, {
        email: data.email,
        password: data.password,
      });
      setCookie('token', response.data.accessToken);
      if (response.data) {
        setLoading(false);
        toast.success('Login Successful!', {
          position: 'top-center',
          autoClose: 40000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 2,
          theme: 'colored',
        });
        router.push('/event/my-event').then(() => {
          setTimeout(() => {
        router.reload();
      }, 100); // Adjust the delay as needed
    });
      } else {
        setError('Invalid email or password');
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred during authentication');
      setLoading(false);
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="flex flex-col mt-2 text-base text-center text-white font-poppins">
              Email
              <Input
                className="mt-1 border-[1px] text-black text-sm placeholder:text-gray-400 bg-white border-gray-400 px-2 text-center py-3 rounded-xl font-poppins"
                type="email"
                {...register('email')}
                placeholder="Email"
              />
            </label>
            {errors.email && (
              <p className="text-xs italic text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label className="flex flex-col mt-2 text-base text-center text-white font-poppins">
              {' '}
              Password
              <Input
                className="mt-1 border-[1px] text-black text-sm placeholder:text-gray-400 bg-white border-gray-400 px-2 text-center py-3 rounded-xl font-poppins"
                type="password"
                {...register('password')}
                placeholder="Password"
              />
            </label>
            {errors.password && (
              <p className="text-xs italic text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>
          <Button
            className="mt-4 w-full bg-purple-500 hover:bg-purple-800 hover:text-white cursor-pointer border-none px-6 text-md font-semibold py-3 top-[3px] right-[3px] text-white rounded-xl duration-200"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Submit'}
          </Button>
        </form>
        <p className="flex items-center justify-center mt-2 text-center text-white">
          Don{"'"}t have an account?{' '}
          <Link href="/auth/register" className="ml-1 text-blue-600 underline">
            Register here
          </Link>{' '}
        </p>
        {error && <p className="mb-4 text-center text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
