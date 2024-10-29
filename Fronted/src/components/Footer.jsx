import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className='bg-[#1A455F] py-16 flex mt-[50px]  items-center px-4  '>
      <div className='flex flex-wrap-reverse  md:flex-nowrap lg:flex-nowrap gap-16 items-center'>
        <div>
          <p className='text-white text-[18px] '>Copyright © 2010-{currentYear} Betmarci.online</p>
        </div>
        <div className='flex flex-wrap md:flex-nowrap lg:flex-nowrap gap-6'>
        <p className='text-white text-[18px] cursor-pointer'>WIDGETS</p>
        <p className='text-white text-[18px] cursor-pointer'>LINKS</p>
        <p className='text-white text-[18px] cursor-pointer'>TERM OF USE</p>
        <p className='text-white text-[18px] cursor-pointer'>PRIVACY POLICY</p>
        <p className='text-white text-[18px] cursor-pointer'>TERM OF USE</p>
        <p className='text-white text-[18px] cursor-pointer'>ABOUT</p>
        <p className='text-white text-[18px] cursor-pointer'>CONTACT</p>
        </div>
      </div>
    </div>
  )
}

export default Footer;
