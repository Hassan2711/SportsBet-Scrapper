import React, { useState } from "react";
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import SureBeats  from './SureBeats';

const Home = ({onSelect, selectedSport}) => {
  // const [selectedSport, setSelectedSport] = useState(null);

  // const handleSelect = (sport) => {
  //   setSelectedSport(sport);
  // };
  // console.log(selectedSport)
  // console.log(onSelect,'home');
  return (
    <div className='flex '>
      
      <div className='flex w-full'>
      <Sidebar onSelect={onSelect} />
      <SureBeats selectedSport={selectedSport}/>
      </div>
    </div>
  )
}

export default Home;
