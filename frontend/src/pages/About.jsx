import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div className='text-2xl text-start pt-8 border-t'>
      <Title text1={"ABOUT"} text2={"US"}/>
      <div>
           <div className='my-10 flex flex-col md:flex-row gap-16'>
            <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
            <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
            <p className=''>Welcome to TrendAura – Where Style Meets Soul! At TrendAura, we believe that clothing is more than just fabric; it's a reflection of your unique personality and aura. Our mission is to blend the latest trends with timeless elegance, offering a carefully curated collection that caters to all tastes, whether you're looking for bold statements or subtle classics. Each piece at TrendAura is designed to empower you, giving you the confidence to showcase your true self with every wear</p>
             <b className='text-gray-800'>Our Mission</b>
             <p>At TrendAura, our mission is to inspire confidence and individuality through fashion. We strive to provide high-quality, trendsetting apparel that empowers each of our customers to express their unique aura.</p>
            </div>
           </div>
           <div className='text-xl py-4'>
            <Title text1={'WHY'} text2={'CHOOSE US'}/>
           </div>
           <div className='flex flex-col md:flex-row text-sm mb-20'>
            <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
              <b >Quality Assurance:</b>
              <p className='text-gray-600'>At TrendAura, quality is at the heart of everything we do. We are committed to delivering exceptional products that meet the highest standards of craftsmanship, durability, and design.</p>
            </div>
            <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
              <b>Convenience:</b>
              <p className='text-gray-600'>At TrendAura, we prioritize a seamless and enjoyable shopping experience for our customers. From easy navigation on our website to fast and reliable delivery, our goal is to make style accessible with just a few clicks</p>
            </div>
            <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
              <b>Exceptional Customer Service:</b>
              <p className='text-gray-600'>Our commitment to exceptional customer service means we’re here to support you at every stage. Whether you need styling advice, help with an order, or have questions about our products, our dedicated team is always ready to assist.</p>
            </div>
           </div>
           <NewsletterBox/>
      </div>
    </div>
  )
}

export default About