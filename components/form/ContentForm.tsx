import React, { useState } from 'react';
import Link from 'next/link';

interface ContentFormProps {
  formData: {
    email: string;
    username: string;
    password: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  emailError: string;
}

const ContentForm: React.FC<ContentFormProps> = ({
  formData,
  onChange,
  onSubmit,
  emailError,
}) => {
  const [isRegisterForm, setIsRegisterForm] = useState(true); // Use useState for the form type

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="md:w-[500px] bg-black min-h-[300px] fixed z-50 mt-10 px-12 py-6 rounded-xl">
      <h2 className="text-2xl font-bold text-center text-purple-500 font-poppins">
        {isRegisterForm ? 'Register' : 'Login'} to
      </h2>
      <h1 className="text-center text-[60px] text-white font-bold font-bebasNeue">
        FEASTIVAL
      </h1>
      <div>
        <form onSubmit={handleSubmit}>
          <label className="flex flex-col mt-2">
            <input
              className="mt-1 border-[1px] text-sm border-gray-400 px-2 text-center py-3 rounded-xl font-poppins"
              type="text"
              name="username"
              placeholder="Insert your username"
              value={formData.username}
              onChange={onChange}
              required
            />
            <span className="mt-1 ml-2 text-sm text-red-600"></span>
          </label>
          {isRegisterForm && (
            // Render email input only for the login form
            <label className="flex flex-col mt-2">
              <input
                className="mt-1 border-[1px] text-center text-sm border-gray-400 px-2 py-3 rounded-xl font-poppins"
                type="email"
                name="email"
                placeholder="Insert your email"
                value={formData.email}
                onChange={onChange}
                required
              />
              <span className="mt-1 ml-2 text-sm text-red-600">
                {emailError}
              </span>
            </label>
          )}
          <label className="flex flex-col mt-2">
            <input
              className="mt-1 border-[1px] text-center text-sm border-gray-400 px-2 py-3 rounded-xl"
              type="password"
              name="password"
              placeholder="Insert your password"
              value={formData.password}
              onChange={onChange}
              required
            />
            <span className="mt-1 ml-2 text-sm text-red-600"></span>
          </label>
          <button
            className="mt-4 w-full bg-purple-500 cursor-pointer border-grey px-6 py-1 text-md font-semibold top-[3px] right-[3px] text-white rounded-xl duration-200"
            type="submit"
          >
            {isRegisterForm ? 'Register' : 'Login'}
          </button>
        </form>
        <div className="flex items-center justify-center mt-2 text-center text-white">
          {isRegisterForm ? (
            <>
              Already have an account?{' '}
              <button
                className="ml-1 text-blue-600 underline"
                onClick={() => setIsRegisterForm(false)} // Use setIsRegisterForm to toggle to login form
              >
                Login
              </button>
            </>
          ) : (
            <>
              Don{"'"}t have an account?{' '}
              <button
                className="ml-1 text-blue-600 underline"
                onClick={() => setIsRegisterForm(true)} // Use setIsRegisterForm to toggle to register form
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentForm;
