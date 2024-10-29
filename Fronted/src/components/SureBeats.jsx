import React, { useEffect, useState } from "react";
import { FaStar, FaDollarSign, FaChevronUp, FaTableTennis, FaChevronDown } from "react-icons/fa";
import bets from '../assets/bets.png';
import bets1 from '../assets/bets1.png';
import image from '../assets/Image.png';
import axios from 'axios';
import { TailSpin } from 'react-loader-spinner';
const sportEndpoints = {
  football: 'http://127.0.0.1:8000/MartonApp/pre-matches/football',
  hockey: 'http://127.0.0.1:8000/MartonApp/pre-matches/hockey',
  baseball: 'http://127.0.0.1:8000/MartonApp/pre-matches/baseball',
  soccer: 'http://127.0.0.1:8000/MartonApp/pre-matches/soccer'
};
const SureBeats = ({ selectedSport }) => {
  // console.log(selectedSport)
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [totalPages, setTotalPages] = useState(1);  // Track total pages
  const [pageSize, setPageSize] = useState(10);
  let [loading, setLoading] = useState(true);
  const months = [
    "Jan", "Feb", "March", "April", "May", "June",
    "July", "Aug", "Sept", "Oct", "Nov", "Dec"
  ]; 

  // Function to format date-time without updating state
  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return {
      monthDay: `${months[date.getMonth()]}-${day}`,
      time: `${hours}:${minutes < 10 ? '0' + minutes : minutes}` // Add leading zero to minutes if needed
    };
  };

  const [prematches, setPreMatch] = useState([]);
  const [prematchesBookmakers, setPreMatchBookmakers] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');

    useEffect(() => {
      async function getAllPrematches(page, size, selectedSport){
        try{
          setLoading(true);
          try{
            const bookmakerResponse = await axios.get(`http://127.0.0.1:8000/MartonApp/pre-matches-bookmakers`);
            const prematchesBookmakers = bookmakerResponse.data;
            setPreMatchBookmakers(prematchesBookmakers);            
          } catch (error){
            console.log(error);
        setLoading(false);
          }
          if (selectedSport==='null'){
            const response = await axios.get(`http://127.0.0.1:8000/MartonApp/pre-matches/?page=${page}&page_size=${size}`);
        const prematches = response.data.results;
        setPreMatch(prematches);
        console.log(prematches)
        setTotalPages(Math.ceil(response.data.count / pageSize)); // Calculate total pages
        setLoading(false);
          }else{
              const endpoint = sportEndpoints[selectedSport]; // Get the URL for the selected sport
            const response = await axios.get(endpoint, {
            params: {
              page: page,
              page_size: size
            }
            });
            const prematches = response.data.results;
            setPreMatch(prematches);
            setTotalPages(Math.ceil(response.data.count / pageSize)); // Calculate total pages
            setLoading(false);
          }
        } catch (error){
          console.log(error);
        setLoading(false);
        }
      };
        getAllPrematches(currentPage, pageSize,  selectedSport);
        // setLoading(false);
    }, [currentPage, pageSize, selectedSport]);

    const handleNextPage = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    };

    const handlePreviousPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };

    const handleSelectChange = (event) => {
      setSelectedOption(event.target.value);
      axios.post(`http://127.0.0.1:8000/MartonApp/pre-matches/`, {selectedOption: event.target.value})
      .then(response => {
        console.log('Data posted successfully:', response.data);
        const prematches = response.data.results;
        setPreMatch(prematches);
      })
    };

  return (
    <div className="mt-[170px] w-full">
      <div className="flex flex-wrap lg:flex-nowrap gap-14 w-full px-2 lg:px-4">
        <div className="w-full flex flex-col gap-4">
          <p className="pt-[20px] text-[#2679B5] text-[22px] pb-[35px] border-b border-blue-300">
            Surebets
          </p>

          {/* Filter section started */}
          <div className="border rounded-lg border-gray-[#D9D9D9]">
            <div className="flex items-center bg-[#F1F1F1] justify-between">
              <div className="flex gap-4 items-center   px-6 py-2">
                <FaChevronUp size={20} />
                <p className="text-[26px] font-semibold">Filter</p>
              </div>

              {/* <div className="pe-4 flex items-center gap-4 ">
                <p className="text-[18px] text-[#555555]">Saved Filters</p>
                <FaChevronDown className="text-[#555555]" size={20} />
              </div> */}
            </div>

            <div className="p-4 grid  sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
              {/* <div className="mx-3 my-3 text-[#999999]">
                <p className="bg-[#f4f4f4] border-2 rounded-xl px-2 py-2 ">
                  Select include Bookmakers
                </p>
              </div> */}
              <div className="mx-3 my-3 text-[#999999]">
                {/* <p className="bg-[#f4f4f4] border-2 rounded-xl px-2 py-2 "> */}
                <label htmlFor="dropdown" className="mr-2 bg-[#f4f4f4] border-2 rounded-xl px-2 py-2 ">Select to Exclude Bookmaker:</label>
                <select
                  id="dropdown"
                  value={selectedOption} 
                  onChange={handleSelectChange}
                  className="border rounded px-2 py-1"
                >
                  <option value="" disabled>Select an option</option>
                    {prematchesBookmakers.map((item, index) => (
                      <option key={index} value={item.bookmaker} >
                        {item.bookmaker}
                      </option>
                    ))}
                </select>
                {/* </p> */}
              </div>
              <div>
                {/* <div className="flex gap-4 px-3 items-center">
                  <div className="h-5 w-5 bg-[#DDD] border rounded-full"></div>
                  <p className="text-[#DDD] text-[20px]">
                    Include All Selected
                  </p>
                </div> */}
                {/* <div className="flex gap-4 px-3 items-center">
                  <div className="h-5 w-5 bg-[#DDD] border rounded-full"></div>
                  <p className="text-[#DDD] text-[20px]">
                    Include At Least One
                  </p>
                </div> */}
              </div>
              {/* <div className="mx-3 my-3 text-[#999999]">
                <p className="bg-[#f4f4f4] border-2 rounded-xl px-2 py-2  ">
                  Select Surebet Type
                </p>
              </div> */}
              {/* <div className="mx-3 my-3">
                <p className="bg-[#f4f4f4] border-2 rounded-xl px-2 py-2 ">
                  Volleyball, Table Tennis
                </p>
              </div> */}
            </div>

            <div className="grid  p-6  xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3">
              {/* <div className=" items-center gap-4 justify-end  sm:flex-none md:flex-none lg:flex">
                <div className="text-[#428bd4] text-[20px]">Time period</div>
                <div className="pe-20 px-2 py-2 border-2 rounded-lg bg-[#F4F4F4]">
                  All
                </div>
              </div> */}

              {/* <div className=" items-center gap-4 justify-end sm:flex-none md:flex-none lg:flex ">
                <div className="text-[#428bd4] text-[20px]">Min. Profit</div>
                <div className="pe-20 px-2 py-2 border-2 rounded-lg bg-[#F4F4F4]">
                  No Set
                </div>
              </div> */}

              {/* <div className=" items-center gap-4 justify-end sm:flex-none md:flex-none lg:flex">
                <div className="text-[#428bd4]  lg:text-[20px]  ">
                  Max. Profit
                </div>
                <div className="pe-20 px-2 py-2 border-2 rounded-lg bg-[#F4F4F4]">
                  No Set
                </div>
              </div> */}
            </div>

            {/* <div className="flex gap-2 justify-end mr-2 px-3 mb-4">
              <button className="border-2 rounded-lg px-8 py-2 bg-[#f7f7f7] text-[#dddddd]">
                Save
              </button>
              <button className="border-2 rounded-lg px-8 py-2 bg-[#ffb359] text-white">
                Apply
              </button>
            </div> */}
          </div>

          {/* Filter section Ended */}

          {/* Data Retrieval Section Started */}
        {
          loading ? (
            <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-75 z-50">
    <TailSpin
      height="100"
      width="100"
      color="#428BCA"
      ariaLabel="loading"
    />
  </div>
          ) : (

prematches.map((item, index) => {
              const { monthDay, time } = formatDateTime([item.date, item.time]);
              return (
              
            <div key={index} className="grid lg:grid-cols-2  sm:grid-cols-1 mb-4">
              <div>
                <div className="flex items-center bg-[#E8EBF1]">
                  <FaTableTennis size={25} className="py-1" />
                  <p className="bg-[#E8EBF1] py-1 text-[#468CC8]">
                    {item.sport} » {item.region} 
                  </p>
                </div>

                <div className="flex gap-4 items-center mt-4">
                  <div className="ps-3">
                    <p>{monthDay}</p>
                    <p>{time}</p>
                  </div>

                  <div>
                    <p className="text-[18px]">
                      {item.team1} - {item.team2} </p>
                    <p className="text-[#837f7f]">Odd/Even</p>
                    {/* <p className="text-[12px] mt-2 text-[#a5a0a0]">
                      Another 5 combinations »{" "}
                    </p> */}
                  </div>
                </div>
              </div>

              <div>
                <div className="justify-between text-center bg-[#E8EBF1] pe-3 grid grid-cols-4">
                  <div className="py-1 ">
                    <p>Odd</p>
                  </div>

                  <div className="py-1">
                    
                  </div>

                  <div className="py-1  ">
                    <p>Even</p>
                  </div>

                  <div className="py-1 ">
                    <p>Profit</p>
                  </div>
                </div>

                <div>
                  <div className=" justify-between pe-2 text-center grid grid-cols-4 mt-4">
                    <div>
                      <p>{item.odds1}</p>
                    </div>
                    <div>
                      
                    </div>
                    <div>
                      <p>{item.odds2}</p>
                    </div>
                    <div>
                      <p  className="text-[blue]">{item.profit}%</p>
                    </div>
                  </div>

                  <div className=" justify-between pe-3 flex mt-4 ">
                    
                    <div>
                      <p>{item.bookmaker1}</p>
                      <img
                        src={bets1}
                        className="w-[auto] h-[25px] "
                        alt=""
                      />
                    </div>

                    <div>  
                     </div>

                    <div> 
                      <p>{item.bookmaker2}</p>
                      <img
                        src={bets}
                        className="w-[auto] h-[25px] "
                        alt=""
                      />
                    </div>

                    
                    <div >
                      <img
                        src={image}
                        className="w-[auto]  h-[25px] "
                        alt=""
                      />
                    </div>

                  </div>
                </div>
              </div>
            </div>

              )})
              )}


{/* Pagination Controls */}
<div className="flex justify-between mt-4">
            <button
              className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${currentPage === 1 && 'opacity-50 cursor-not-allowed'}`}
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="px-4 py-2 bg-gray-100 rounded-lg">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${currentPage === totalPages && 'opacity-50 cursor-not-allowed'}`}
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>






          {/* <div>
            {sureBets.map((bet, index) => {
              const { monthDay, time } = formatDateTime(bet.lastUpdate[0]);
              return (
                <div key={index} className="bg-white flex justify-between items-center py-1">
                  <div className="flex gap-4">
                    <p className="text-[#67696C] text-[14px]">{monthDay}</p>
                    <p className="py-1">
                      {bet.team1} - {bet.team2}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="ml-[200px] text-[#67696C] text-[16px]">{bet.odds[0]}</p>
                    <p className="w-[100px] p-4 ml-[20px] bg-[#dddbe3]"></p>
                    <p className="ml-[20px] text-[#67696C] text-[16px]">{bet.odds[1]}</p>
                    <p className="p-1 px-4 ml-[60px] text-[#67696C] text-[16px]">{bet.profit.toFixed(2)}%</p>
                  </div>
                </div>
              );
            })}
          </div> */}



          {/* Data Retrieval Section Ended */}

        </div>

        {/* Top Events Section Started */}
        <div className="w-full lg:px-0 lg:w-[350px] flex flex-col gap-12 mt-[150px]">
          <div>
            <div className="flex bg-[#FFA030] gap-4 px-2 rounded-lg">
              <div className="flex items-center mb-2 mt-2 p-2 border-2 border-white rounded-full">
                <FaStar className="text-white" size={25} />
              </div>
              <div className="px-1 bg-[#D48426]"></div>
              <div className="text-white text-[24px] font-bold flex items-center">
                <p>Top Events</p>
              </div>
            </div>
            <p className="text-[#478FB7] text-[12px] py-2 cursor-pointer border-b border-blue-400 hover:border-4">
              Premier League
            </p>
            <p className="text-[#478FB7] text-[12px] py-2 cursor-pointer border-b border-blue-400 hover:border-4">
              FA Community Shield
            </p>
            <p className="text-[#478FB7] text-[12px] py-2 cursor-pointer border-b border-blue-400 hover:border-4">
              Ligue 1
            </p>
            <p className="text-[#478FB7] text-[12px] py-2 cursor-pointer border-b border-blue-400 hover:border-4">
              Serie A
            </p>
          </div>

          <div className="flex bg-[#FFA030] gap-4 px-2 rounded-lg">
            <div className="flex items-center mb-2 mt-2 p-2 border-2 border-white rounded-full">
              <FaDollarSign className="text-white" size={25} />
            </div>
            <div className="px-1 bg-[#D48426]"></div>
            <div className="text-white text-[24px] font-bold flex items-center">
              <p>Bonuses</p>
            </div>
          </div>

          <div className="flex bg-[#FFA030] gap-4 px-2 rounded-lg">
            <div className="flex items-center mb-2 mt-2 p-2 border-2 border-white rounded-full">
              <FaDollarSign className="text-white" size={25} />
            </div>
            <div className="px-1 bg-[#D48426]"></div>
            <div className="text-white text-[24px] font-bold flex items-center">
              <p>Partners</p>
            </div>
          </div>
        </div>
        {/* Top Events Section Ended */}
      </div>
    </div>
  );
};

export default SureBeats;
