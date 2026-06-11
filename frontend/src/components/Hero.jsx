// this file is responsible for the hero section of the website, which is the first thing that users see when they visit the site. It is a large banner that typically contains a background image, a headline, and a call-to-action button. The hero section is designed to grab the user's attention and encourage them to explore the site further.

// basically jisme ladki hai, wo hero section hai.

// in this file we are using tailwind css to style the hero section. We are using flexbox to create a responsive layout that adjusts to different screen sizes. We are also using the assets from the assets folder to display the hero image.

import React from 'react'
import { assets } from '../assets/assets';

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-400'>

       {/* HERO LEFT SIDE */}
      <div className='w-full sm:w-1/2 flex flex-col items-center justify-center py-10 sm:py-0 text-[#414141]'>
            <div className='flex items-center gap-2'>
                <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                <p className='font-medium text-sm md:text-base'>OUR BESTSELLERS</p>
            </div>

            <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>
                Latest Arrivals
            </h1>

            <div className='flex items-center gap-2'>
                <p className='font-medium text-sm md:text-base'>SHOP NOW</p>
                <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
            </div>
     </div>

      {/* HERO RIGHT SIDE */}
      <img className='w-full sm:w-1/2' src = {assets.hero_img}></img>
    </div>
  )
}

export default Hero;