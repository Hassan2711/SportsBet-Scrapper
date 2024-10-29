import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaQuestionCircle,
  FaSearch,
  FaBars,
  FaRegFileAlt,
} from "react-icons/fa";
import { FaChevronDown, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";

const Navbar = ({setSelectedSport}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [toggle, setToggle] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.status === 201) {
      alert(data.message);
    } else {
      alert('Error: ' + data.message);
    }
  };

  const handleMatchesSelect = (number) => {
    setActiveIndex(number);
    setSelectedSport('null');
  }

  return (
    <div className=" w-full  fixed z-50 ">
      <nav className="bg-[#367DA7] w-full flex gap-[100px] justify-between md:justify-start items-center  px-8 py-6 ">
        <div>
          <Link to="/home">
            <p
              className="text-[#FFA030] text-[16px] md:text-[22px] ml-[40px] md:ml-[0px] cursor-pointer"
              onClick={() => setActiveIndex(0)}
            >
              Betmarci.online
            </p>
          </Link>
        </div>
        <div
          className="flex md:hidden text-white "
          onClick={() => setToggle(!toggle)}
        >
          {!toggle ? <FaBars size={25} /> : <FaTimes size={25} />}
        </div>
        {toggle && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: toggle ? "0%" : "-100%" }}
            animate1={{ y: !toggle ? "-100%" : "0%" }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 1,
            }}
            className="bg-[#183B50] px-2 md:hidden  py-2  fixed top-[73px] w-full left-0"
          >
            <div className="flex flex-col justify-center items-center">
              <div className="bg-[#183B50]  border py-1 border-blue-200 w-[90%] rounded-md flex justify-center">
                <p className="text-[18px] text-white uppercase">
                  Live arbitrage
                </p>
              </div>
              <div className="bg-[#183B50]  border py-1 border-blue-200 w-[90%] rounded-md flex justify-center">
                <p className="text-[18px] text-white uppercase">
                  Pre Match arbitrage
                </p>
              </div>
              <div className="bg-[#183B50]  border py-1 border-blue-200 w-[90%] rounded-md flex justify-center">
                <p className="text-[18px] text-white uppercase">
                  Pre Match POSITIVE EV
                </p>
              </div>
              <div className="bg-[#183B50]  border py-1 border-blue-200 w-[90%] rounded-md flex justify-center">
                <p className="text-[18px] text-white uppercase">
                  LIVE POSITIVE EV
                </p>
              </div>
             

              
            </div>
          </motion.div>
        )}
        <div className="hidden  text-center text-[14px] md:flex gap-36 ">
          <div className="flex gap-10 ">
          <Link to="/prematch" onClick={() => handleMatchesSelect(1)}>
            <p
              className={`${
                activeIndex === 1
                  ? "text-white uppercase border-b-4 border-blue-800"
                  : "text-white uppercase"
              }`}
            >
              PRE-match <br /> arbitrage
            </p>
          </Link>
          <Link to="/livearbitrage" onClick={() => handleMatchesSelect(2)}>
            <p
              className={`${
                activeIndex === 2
                  ? "text-white uppercase border-b-4 border-blue-800"
                  : "text-white uppercase"
              }`}
            >
              Live
              <br /> arbitrage
            </p>
          </Link>
          <Link to="/preMatchpositiveEV" onClick={() => handleMatchesSelect(3)}>
            <p
              className={`${
                activeIndex === 3
                  ? "text-white uppercase border-b-4 border-blue-800"
                  : "text-white uppercase"
              }`}
            >
              PRE-match <br /> positive ev
            </p>
          </Link>
          <Link to="/livepositiveEV" onClick={() => handleMatchesSelect(4)}>
            <p
              className={`${
                activeIndex === 4
                  ? "text-white uppercase border-b-4 border-blue-800"
                  : "text-white uppercase"
              }`}
            >
              LIVE <br />
              positive ev
            </p>
          </Link>
          </div>
          <div className=" hidden md:flex items-center ">
            <FaSearch size={25} className="text-white z-50 mr-[-30px]" />
            <input
              placeholder="Search"
              className=" bg-[#2D6281] text-[18px] outline-none border-none rounded-lg py-2 px-8"
            />
          </div>
        </div>
       
      </nav>
      
    </div>
  );
};

export default Navbar;
