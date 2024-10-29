import React, { useState } from "react";
import axios from "axios";
import { FaUser, FaEnvelope, FaLock, FaRedo } from "react-icons/fa";

const Registration = () => {
  // Define state variables
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [gender, setGender] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState(null);


  const handleSubmit = async (event) => {
    event.preventDefault();

    
    if (password !== repeatPassword) {
        
      setError("Passwords do not match.");
      setTimeout(() => {
        setError('');
      }, 2000); // 10000 milliseconds = 10 seconds
    
      return;
    }
    if (!isChecked) {
      setError("You must accept the user agreement.");
      setTimeout(() => {
        setError('');
      }, 2000); // 10000 milliseconds = 10 seconds
    
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/register", {
        username,
        email,
        password,
        gender
      });

      console.log("Registration successful:", response.data);
      setError('UserRegistration Successful');
      setTimeout(() => {
        setError('');
      }, 2000); // 10000 milliseconds = 10 seconds
    
    
    } catch (error) {
      console.error("Error registering user:", error);
      setError(error.response?.data?.message || "An error occurred.");
      setTimeout(() => {
        setError('');
      }, 2000); // 10000 milliseconds = 10 seconds
    }
  };

  return (
    <div className="h-auto bg-[#367DA7] ">
      <div className="bg-[#19455E] flex items-center top-0 cursor-pointer px-6 py-4 h-[80px] w-full fixed">
        <p className="text-[#FFA030] font-normal text-[16px]">
          Betmarci.online
        </p>
      </div>
      <div className="pt-[150px] flex justify-center h-[700px] md:h-[800px] lg:h-[800px]">
        <div className="w-[400px] flex flex-col gap-4 items-center px-4 pt-6 pb-16  h-[550px] bg-white ">
          <h1 className="text-[#3367D1] text-[30px] font-extrabold">
            Registration
          </h1>
          <form className="w-full px-4" onSubmit={handleSubmit}>
            <div className="mb-4 w-full flex items-center ">
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                name="username"
                className="p-2 w-full outline-none rounded-md border border-gray-400"
                placeholder="Name"
                required
              />
              <FaUser size={20} className="text-gray-400 ml-[-24px]" />
            </div>
            <div className="mb-4 w-full flex items-center ">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                className="p-2 w-full outline-none  rounded-md border border-gray-400"
                placeholder="Email"
                required
              />
              <FaEnvelope size={20} className="text-gray-400 ml-[-24px]" />
            </div>
            <div className="mb-4 w-full flex items-center ">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                className="p-2 w-full outline-none   rounded-md border border-gray-400"
                placeholder="Password"
                required
              />
              <FaLock size={20} className="text-gray-400 ml-[-24px]" />
            </div>
            <div className="mb-4 w-full flex items-center ">
              <input
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                type="password"
                name="repeatpassword"
                className="p-2 w-full  outline-none  rounded-md border border-gray-400"
                placeholder="Repeat Password"
                required
              />
              <FaRedo size={20} className="text-gray-400 ml-[-24px]" />
            </div>

            <div className="mb-4 w-full flex gap-4 items-center ">
              <div className="flex gap-4 items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  onChange={(e) => setGender(e.target.value)}
                  className="form-radio h-4 w-4 text-pink-600"
                />
                <p>Male</p>
              </div>
              <div className="flex gap-4 items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  onChange={(e) => setGender(e.target.value)}
                  className="form-radio h-4 w-4 text-pink-600"
                />
                <p>Female</p>
              </div>
            </div>

            <div className="mb-4 w-full flex items-center ">
              <input
                type="checkbox"
                name="checked"
                id="accept-terms"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
              />
              <label htmlFor="accept-terms" className="ml-2">
                I accept{" "}
                <a href="" className="text-blue-600 underline">
                  user agreement
                </a>
              </label>
            </div>
            <div className="w-full flex justify-center">
                
            {error && <p className="text-red-500 mb-4">{error}</p>}
            </div>
            <div className="mb-4 w-full flex items-center ">
              <button
                type="submit"
                className="text-center font-semibold  w-full p-2 border-2 border-gray-200 text-[#3367D1]  rounded-md hover:bg-[] transition-all ease-in-out duration-300 bg-[#f9f9f9]"
              >
                Register
              </button>
            </div>
          </form>
          <div className="mb-4 pb-4">
            <p className="text-gray-700">Already have an account? <span><a href='#' className="text-blue-800 underline ml-1">Login</a></span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
