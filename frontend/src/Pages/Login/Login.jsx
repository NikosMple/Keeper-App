import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/PasswordInput";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";

const Login = () => {
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

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }
    setError("");

    // Login API Call
    try {
      const response = await axiosInstance.post("/login", {
        email: email,
        password: password,
      });

      // Handle successful login response
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      // Handle Login error
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again");
      }
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-500 to-blue-400">
        <div className="w-full max-w-md border rounded-lg bg-white px-8 py-10 shadow-2xl bg-opacity-90">
          <form onSubmit={handleLogin}>
            <h4 className="text-3xl font-semibold mb-6 text-center text-gray-800">Login</h4>

            <input
              type="text"
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300 mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition-all duration-300 mt-4"
            >
              Login
            </button>

            <p className="text-center pt-6 text-gray-600 text-sm">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-500 hover:text-blue-600 font-semibold transition-all"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
