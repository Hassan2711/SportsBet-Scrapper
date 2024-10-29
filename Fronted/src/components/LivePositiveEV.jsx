// import React from "react";
import React,{useState,useEffect} from "react";
import {
  FaStar,
  FaDollarSign,
  FaChevronUp,
  FaTableTennis,
} from "react-icons/fa";
import bets from "../assets/bets.png";
import bets1 from "../assets/bets1.png";
import image from "../assets/Image.png";
import { FaChevronDown } from "react-icons/fa";
import Sidebar from "./Sidebar";
import axios from 'axios';
const sportEndpoints = {
  football: 'http://127.0.0.1:8000/MartonApp/live-matches-ev/football',
  hockey: 'http://127.0.0.1:8000/MartonApp/live-matches-ev/hockey',
  baseball: 'http://127.0.0.1:8000/MartonApp/live-matches-ev/baseball',
  soccer: 'http://127.0.0.1:8000/MartonApp/live-matches-ev/soccer'
};
const LivePositiveEV= ({ selectedSport, onSelect  }) => {
  const [livematchesev, setLiveMatchEV] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [totalPages, setTotalPages] = useState(1);  // Track total pages
  const [pageSize, setPageSize] = useState(10);
  let [loading, setLoading] = useState(true);
  const [livematchesBookmakers, setLiveMatchBookmakers] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');

    useEffect(() => {
      async function getAllLivematchesEV(page, size, selectedSport){
        try{
          if (selectedSport==='null'){
            setLoading(true);
            try{
              const bookmakerResponse = await axios.get(`http://127.0.0.1:8000/MartonApp/live-matches-bookmakers`);
              const livematchesBookmakers = bookmakerResponse.data;
              setLiveMatchBookmakers(livematchesBookmakers);            
            } catch (error){
              console.log(error);
          setLoading(false);
            }
            const response = await axios.get(`http://127.0.0.1:8000/MartonApp/live-matches-ev/?page=${page}&page_size=${size}`);
            const livematchesev = response.data.results;
            console.log(livematchesev)
            setLiveMatchEV(livematchesev);
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
            const livematchesev = response.data.results;
            console.log(livematchesev)
            setLiveMatchEV(livematchesev);
            setTotalPages(Math.ceil(response.data.count / pageSize)); // Calculate total pages
            setLoading(false);
          }
        } catch (error){
          console.log(error);
        setLoading(false);
        }
      }
      getAllLivematchesEV(currentPage, pageSize, selectedSport);
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
      axios.post(`http://127.0.0.1:8000/MartonApp/live-matches/`, {selectedOption: event.target.value})
      .then(response => {
        console.log('Data posted successfully:', response.data);
        const livematches = response.data.results;
        setLiveMatch(livematches);
      })
    };
  return (
    <div className="flex w-full">
    <Sidebar onSelect={onSelect}/>
    <div className="mt-[170px] w-full ">
      <div className="flex flex-wrap lg:flex-nowrap gap-14 w-full px-2 lg:px-4">
        <div className="w-full flex flex-col gap-4">
          <p className="pt-[20px] text-[#2679B5]  text-[22px] pb-[35px] border-b border-blue-300">
           Live Postive EV
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
                    {livematchesBookmakers.map((item, index) => (
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
                </div>
                <div className="flex gap-4 px-3 items-center">
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

          {/* Data Retiverial Section Started */}
{livematchesev.map((item,index)=>(
          // <div>
          //       <p className="font-bold text-[24px]">Live bet Information</p>
          //     </div>

              <div key={index} className="grid lg:grid-cols-2  sm:grid-cols-1 mb-4">
                <div>
                  <div className="flex items-center bg-[#E8EBF1]">
                    <FaTableTennis size={25} className="py-1" />
                    <p className="bg-[#E8EBF1] py-1 text-[#468CC8] ">
                    {item.sport} » {item.region} 
                    </p>
                  </div>

                  <div className="flex gap-4 items-center mt-4">
                    <div className="ps-3">
                    <p>{item.date}</p>
                    <p>{item.time}</p>
                    </div>

                    <div>
                      <p className="text-[18px] font-medium">
                      {item.team1} - {item.team2}
                      </p>
                      <p className="text-[#837f7f]">Odd/Even</p>
                      <p className="text-[12px] mt-2 text-[#a5a0a0]">
                        Another 5 combinations »{" "}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="grid ">
                    <table>
                      <thead className="bg-[#E8EBF1]">
                        <tr>
                          <th className="py-1 text-[#6f7174]">Odds</th>
                          <th className="text-[#979a9e]">Probability</th>
                          <th className="bg-[#dbdee3] text-[#6f7174]">Edge</th>
                          <th className="text-[#979a9e]">Kelly Stack</th>
                          <th className="bg-[#dbdee3] text-[##7a7171]">
                            Profit
                          </th>
                        </tr>
                      </thead>
                      <tbody className="w-full">
                      <tr className="text-center">
                          <td  className="p-5">
                            {item.odds}
                          </td>
                          <td className="font-semibold">{item.prob}</td>
                          <td>{item.edge}</td>
                          <td className="font-bold">$1</td>
                          <td className="text-[#367da7] font-bold">{item.profit}</td>
                        </tr>
                        <tr className="text-center  ">
                        <td></td>
                          <td className="inline-block"><img src={bets} className="w-auto"/><p>{item.bookmaker}</p></td>
                          <td></td>
                          
                          <td className="items-center "><img src={bets1} /><p>pinnacle</p> </td>
                          <td className="inline-block"><img src={image} className="w-[40px]"/></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
))}

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
          {/* Data Retiverial Section Ended */}
          
        </div>

        {/* Top Events Section Started */}
        <div className=" w-full  lg:px-0 lg:w-[350px] flex flex-col gap-12 lg:mt-[90px] sm:mt-[30px]">
          <div>
            <div className="flex bg-[#FFA030] gap-4 px-2 rounded-lg">
              <div className="flex items-center mb-2 mt-2 p-2 border-2 border-white rounded-full">
                <FaStar className="text-white " size={25} />
              </div>
              <div className="px-1 bg-[#D48426]"></div>
              <div className="text-white text-[24px] font-bold flex items-center">
                <p>Top Events</p>
              </div>
            </div>
            <p className="text-[#478FB7] textt-[12px] py-2 cursor-pointer border-b border-blue-400 hover:border-4  ">
              Premier League
            </p>
            <p className="text-[#478FB7] textt-[12px] py-2 cursor-pointer border-b border-blue-400 hover:border-4  ">
              FA Community Shield
            </p>
            <p className="text-[#478FB7] textt-[12px] py-2 cursor-pointer border-b border-blue-400 hover:border-4  ">
              Ligue 1
            </p>
            <p className="text-[#478FB7] textt-[12px] py-2 cursor-pointer border-b border-blue-400 hover:border-4  ">
              Serie A
            </p>
          </div>

          <div className="flex bg-[#FFA030] gap-4 px-2 rounded-lg">
            <div className="flex items-center mb-2 mt-2 p-2 border-2 border-white rounded-full">
              <FaDollarSign className="text-white " size={25} />
            </div>
            <div className="px-1 bg-[#D48426]"></div>
            <div className="text-white text-[24px] font-bold flex items-center">
              <p>Bonuses</p>
            </div>
          </div>

          <div className="flex bg-[#FFA030] gap-4 px-2 rounded-lg">
            <div className="flex items-center mb-2 mt-2 p-2 border-2 border-white rounded-full">
              <FaDollarSign className="text-white " size={25} />
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
    </div>
  );
};

export default LivePositiveEV;