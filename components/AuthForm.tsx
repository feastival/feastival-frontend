import React, { useRef, useEffect, useState } from 'react';
import Modal from 'react-modal';
import Link from 'next/link';
import axios from 'axios';
import { API_URL } from '@/lib/api';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/router';

interface AuthFormProps {
  initialFormType: 'login' | 'register';
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => Promise<void | (() => void) | undefined>;
}

const AuthForm: React.FC<AuthFormProps> = ({ initialFormType, isOpen, onClose, onSuccess }) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
  });
  const [emailError, setEmailError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const [isLoginForm, setIsLoginForm] = useState(true); // State to track whether the login form is currently shown
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose(); // Close the modal on outside click
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    // Save the modal state in local storage whenever it changes
    localStorage.setItem('modalState', isOpen ? 'open' : 'close');
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (initialFormType === 'register') {
        // Handle Register Form
        await axios.post(`${API_URL}/auth/register`, {
          email: formData.email,
          username: formData.username,
          password: formData.password,
        });
        alert('Registration Successful');
        setIsLoginForm(true); // After successful registration, switch to login form
      } else {
        // Handle login form
        const response = await axios.post(`${API_URL}/auth/login`, {
          email: formData.email || formData.username,
          password: formData.password,
        });

        // Set the cookie on the server
        setCookie('token', response.data.accessToken);

        // Redirect to the home page or do something else
        alert('Login Successful');
        router.push('/');
      }

      onSuccess(); // Call the onSuccess function when the form submission is successful
    } catch (error) {
      alert(error);
    }
  };

  const handleSwitchForm = () => {
    setIsLoginForm((prevValue) => !prevValue); // Switch between login and register form
  };

  return (
    <Modal
      isOpen={isModalOpen}
      className="fixed inset-0 flex items-center justify-center bg-transparent bg:opacity-0 backdrop-blur-lg"
    >
      <div ref={popupRef} className="max-w-[600px] min-h-[300px] rounded-lg flex flex-col items-center justify-center">
        <button className="absolute text-gray-500 top-4 right-4 hover:text-gray-700" onClick={onClose}>
          {/* Close button */}
        </button>
        {isLoginForm ? (
          // Login Form
          <>
            <form onSubmit={handleSubmit}>
              {/* ... (login form fields) ... */}
              <button className="mt-4 w-full bg-purple-500 cursor-pointer border-grey px-6 py-1 text-md font-semibold top-[3px] right-[3px] text-white rounded-xl duration-200" type="submit">
                Login
              </button>
            </form>
            <div className="flex items-center justify-center mt-2 text-center text-white">
              Don{"'"}t have an account?{' '}
              <Link href="#" passHref>
                <button className="ml-1 text-blue-600 underline" onClick={handleSwitchForm}>
                  Register
                </button>
              </Link>
            </div>
          </>
        ) : (
          // Register Form
          <>
            <form onSubmit={handleSubmit}>
              {/* ... (register form fields) ... */}
              <button className="mt-4 w-full bg-purple-500 cursor-pointer border-grey px-6 py-1 text-md font-semibold top-[3px] right-[3px] text-white rounded-xl duration-200" type="submit">
                Register
              </button>
            </form>
            <div className="flex items-center justify-center mt-2 text-center text-white">
              Already have an account?{' '}
              <Link href="#" passHref>
                <button className="ml-1 text-blue-600 underline" onClick={handleSwitchForm}>
                  Login
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default AuthForm;
