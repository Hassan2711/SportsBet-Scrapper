import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Password = ({ setIsAuthenticated }) => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleClick = () => {
    if (password === "marton123") {
      setIsAuthenticated(true);
      navigate('/home'); // redirect to the home page after successful authentication
    } else {
      alert("Password is incorrect");
    }
  }

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='flex '>
        <input
        type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='border-2 outline-none border-gray-400 p-2'
          placeholder='Enter Password'
          required
        />
        <button onClick={handleClick} className='bg-blue-600 p-2 text-white ml-2'>
          Submit
        </button>
      </div>
    </div>
  )
}

export default Password;
