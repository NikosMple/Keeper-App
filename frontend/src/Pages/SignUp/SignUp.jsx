import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/PasswordInput";
import { validateEmail } from '../../utils/helper';
import axiosInstance from "../../utils/axiosInstance";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Disable scrolling when component mounts
    document.body.style.overflow = "hidden";

    // Enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("Please enter your name");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter the password");
      return;
    }
    setError('');

    // SignUp API Call
    try {
      const response = await axiosInstance.post("/create-account", {
        fullName: name,
        email: email,
        password: password,
      });

      if (response.data && response.data.error) {
        setError(response.data.message);
        return;
      }

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate('/dashboard');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-500 to-blue-400">
        <div className="w-96 border border-gray-300 shadow-md rounded-lg bg-white px-7 py-10 bg-opacity-90 transition-transform duration-300 hover:scale-105">
          <form onSubmit={handleSignUp}>
            <h4 className="text-3xl font-semibold mb-6 text-center text-gray-800">Sign Up</h4>

            <input
              type="text"
              placeholder="Name"
              className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Email"
              className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />

            {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300 mt-4"
            >
              Create Account
            </button>

            <p className="text-sm text-center mt-4 text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-blue-500 underline hover:text-blue-600 transition-all">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
