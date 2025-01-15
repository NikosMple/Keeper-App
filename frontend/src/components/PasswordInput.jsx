import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const PasswordInput = ({ value, onChange, placeholder }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div className="relative w-full mb-4">
      <input
        value={value}
        onChange={onChange}
        type={isShowPassword ? "text" : "password"}
        placeholder={placeholder || "Password"}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
      />
      <div
        className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
        onClick={toggleShowPassword}
      >
        {isShowPassword ? (
          <FaRegEye size={22} className="text-blue-500" />
        ) : (
          <FaRegEyeSlash size={22} className="text-gray-400" />
        )}
      </div>
    </div>
  );
};

export default PasswordInput;
