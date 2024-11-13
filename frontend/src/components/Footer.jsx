import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            <div >
                <img src={assets.logo} className='mb-5 w-32' alt="" />
                <p className='w-full md:-2/3 text-gray-600'>At TrendAura, we believe that clothing is more than just fabric; it's a reflection of your unique personality and aura. Our mission is to blend the latest trends with timeless elegance, offering a carefully curated collection that caters to all tastes, whether you're looking for bold statements or subtle classics. Each piece at TrendAura is designed to empower you, giving you the confidence to showcase your true self with every wear.
                </p>
            </div>
            <div className=''>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>Home</li>
                    <li>ABOUT US</li>
                    <li>DELIVERY</li>
                    <li>PRIVACY POLICY</li>
                </ul>
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-gray-600'></ul>
                <li>+1-914040-15-20</li>
                <li>pandeyaashish@gmail.com</li>
            </div>
        </div>
        <div>
            <hr className='w-full border-none h-[1px] bg-gray-700 '  />
            <p className='py-5 text-sm text-center'>Copyright 2024@ Trendaura.com-All Right Reserved.</p>
        </div>
    </div>
  )
}

export default Footer