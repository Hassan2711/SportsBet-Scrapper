import React,{useState,useEffect, useRef } from "react";
import { FaChevronDown, FaTableTennis,FaRegFileAlt } from "react-icons/fa";
import { GiHockey,GiSoccerBall } from 'react-icons/gi';
import { motion } from "framer-motion";
const Sidebar = ({ onSelectSport, onSelect }) => {
    const [message, setMessage] = useState('');
    const [toggle,setToggle]=useState(true);
    const sidebarRef = useRef(null);
    const [selectedSport, setSelectedSport] = useState('null');

    // console.log(selectedSport)
    const handleSportClick = (sport) => {
      setSelectedSport(sport);
      if (onSelectSport) {
        onSelectSport(sport); // Pass the selected sport to the parent component
      }
    };
    
    // console.log(onSelect,'selected');
  
    useEffect(() => {
        const handleClickOutside = (event) => {
          if (sidebarRef.current && !sidebarRef.current.contains(event.target) && window.innerWidth < 768) {
            setToggle(false);
          }
        };
    
        const handleResize = () => {
          if (window.innerWidth <= 768) {
            setToggle(false);
          }
          else{
            setToggle(true);
          }
        };
    
        // Add event listeners
        document.addEventListener("mousedown", handleClickOutside);
        window.addEventListener("resize", handleResize);
    
        // Cleanup event listeners
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
          window.removeEventListener("resize", handleResize);
        };
      }, [sidebarRef]);

      // const footBall = () => {
      //   onSelect('football');
      //   console.log('football1234');
      // }

      // const Hockey = () => {
      //   setMessage('Hey Hockey');
      // }

  return (
   <div>
  <div className="px-4 py-6 text-white flex md:hidden cursor-pointer h-[20px] z-50  fixed" onClick={()=>setToggle(!toggle)}>  <FaRegFileAlt size={25} className="" /></div>
    {/* <div  >  <FaChevronDown className="  fixed" /></div> */}
     
     {toggle && 
     <div className="mt-[170px] ">
     
  <motion.div
    ref={sidebarRef}
        initial={{ x: '-100%' }}
        animate={{ x: toggle ? '0%' : '-100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30, duration: 1 }}
   className="w-[200px] fixed md:relative  top-[145px] md:top-[-10px] z-50 md:z-0">
        <div className="bg-[#F8F8F8] rounded-lg px-2 py-4 border-2 border-blue-300 cursor-pointer flex justify-between items-center hover:bg-white transition-all ease-in-out duration-300 ">
      
                <div className={`flex gap-2 items-center ${selectedSport === 'football' ? 'active' : ''}`}>
                      <GiSoccerBall size={25}/>
                <button className="text-gray-500 uppercase" onClick={() => {console.log('onSelect',onSelect); return onSelect('football')}}>Football</button></div>
                
        
            <FaChevronDown/>
        </div>
        <div className="bg-[#F8F8F8] rounded-lg  px-2 py-4 border-2 border-blue-300 cursor-pointer flex justify-between items-center hover:bg-white transition-all ease-in-out duration-300 ">
            
            <div className={`flex gap-2 items-center ${selectedSport === 'hockey' ? 'active' : ''}`}>
                  <GiHockey size={25}/>
            <button className="text-gray-500 uppercase" onClick={() => {console.log('onSelect',onSelect); return onSelect('hockey')}}>Hockey</button></div>
    
        <FaChevronDown/>
    </div>
    <div className="bg-[#F8F8F8] rounded-lg px-2 py-4 border-2 border-blue-300 cursor-pointer flex justify-between items-center hover:bg-white transition-all ease-in-out duration-300 "
    onClick={() => handleSportClick('baseball')}
    >
            
                <div className={`flex gap-2 items-center ${selectedSport === 'baseball' ? 'active' : ''}`}>
                      <GiSoccerBall size={25}/>
                <button className="text-gray-500 uppercase" onClick={() => {console.log('onSelect',onSelect); return onSelect('baseball')}}>Baseball</button></div>
        
            <FaChevronDown/>
        </div>
        <div className="bg-[#F8F8F8] rounded-lg px-2 py-4 border-2 border-blue-300 cursor-pointer flex justify-between items-center hover:bg-white transition-all ease-in-out duration-300 "
        onClick={() => handleSportClick('soccer')}
        >
            
                <div className={`flex gap-2 items-center ${selectedSport === 'soccer' ? 'active' : ''}`}>
                      <GiSoccerBall size={25}/>
                <button className="text-gray-500 uppercase" onClick={() => {console.log('onSelect',onSelect); return onSelect('soccer')}}>Soccer</button></div>
        
            <FaChevronDown/>
        </div>
      </motion.div>
    </div>
     }
    </div>
  );
};

export default Sidebar;
