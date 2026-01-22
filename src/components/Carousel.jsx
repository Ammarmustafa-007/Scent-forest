import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { motion } from "framer-motion";

export const Carousel = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
 
  };

  return (
    <Slider {...settings}>
 <div className=" my-1 bg-gradient-to-r from-[#5d5d84] via-[#24395b] to-black -z-10">
  <div className=" max-w-5xl mx-auto flex flex-row h-[380px] sm:h-[370px] items-center justify-center px-4 sm:px-8 gap-5 sm:gap-6">
    {/* IMAGE BOX */}
    <motion.div
      className="w-[180px] h-[260px] sm:w-[240px] sm:h-[300px] md:w-[300px] md:h-[360px] 
                 bg-white rounded-xl shadow  overflow-hidden flex justify-center items-center ml-2"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <img
        className="w-full h-full object-cover"
        src="/WhatsApp Image 2025-09-17 at 12.30.58_ae3c9478.jpg"
        alt="Signature Scent"
      />
    </motion.div>

    {/* TEXT BOX */}
<motion.div
  className="flex-1 m-2 flex flex-col justify-center items-center md:items-start text-white 
             border-l-4 border-yellow-500 
             p-4 sm:p-6 md:p-8 bg-black/30 rounded-xl shadow-lg h-full"
  initial={{ y: 60, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 1 }}
>
  <motion.h3
    className="text-yellow-400 italic font-semibold text-sm sm:text-base md:text-lg "
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.2 }}
  >
    Elevate Your Presence
  </motion.h3>

  <motion.h1
    className="text-xl sm:text-2xl md:text-4xl font-extrabold uppercase italic leading-tight text-center md:text-left"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, delay: 0.4 }}
  >
    Signature by Scentforest
  </motion.h1>

  <motion.p
    className="text-gray-300 mt-3 sm:mt-4 max-w-md text-xs sm:text-sm md:text-base text-center md:text-left"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, delay: 0.6 }}
  >
    A Top Seller by ScentForest – consistent, dominating, and truly unforgettable.
  </motion.p>

  <motion.button
    className="mt-4 sm:mt-6 bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold shadow-md transform transition duration-300 hover:scale-105 text-sm sm:text-base animate-bounce"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, delay: 0.8 }}
  >
    Shop Now
  </motion.button>
</motion.div>

  </div>

</div>

 <div className=" my-1 bg-gradient-to-r from-[#5d5d84] via-[#24395b] to-black -z-10">
  <div className=" max-w-5xl mx-auto flex flex-row h-[380px] sm:h-[370px] items-center justify-center px-4 sm:px-8 gap-5 sm:gap-6">
    {/* IMAGE BOX */}
    <motion.div
      className="w-[180px] h-[260px] sm:w-[240px] sm:h-[300px] md:w-[300px] md:h-[360px] 
                 bg-white rounded-xl  shadow-xl  overflow-hidden flex justify-center items-center ml-2"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <img
        className="w-full h-full object-cover"
        src="/WhatsApp Image 2025-09-17 at 12.30.58_ae3c9478.jpg"
        alt="Signature Scent"
      />
    </motion.div>

    {/* TEXT BOX */}
<motion.div
  className="flex-1 m-2 flex flex-col justify-center items-center md:items-start text-white 
             border-l-4 border-yellow-500 
             p-4 sm:p-6 md:p-8 bg-black/30 rounded-xl shadow-lg h-full"
  initial={{ y: 60, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 1 }}
>
  <motion.h3
    className="text-yellow-400 italic font-semibold text-sm sm:text-base md:text-lg"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.2 }}
  >
    Elevate Your Presence
  </motion.h3>

  <motion.h1
    className="text-xl sm:text-2xl md:text-4xl font-extrabold uppercase italic leading-tight text-center md:text-left"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, delay: 0.4 }}
  >
    Signature by Scentforest
  </motion.h1>

  <motion.p
    className="text-gray-300 mt-3 sm:mt-4 max-w-md text-xs sm:text-sm md:text-base text-center md:text-left"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, delay: 0.6 }}
  >
    A Top Seller by ScentForest – consistent, dominating, and truly unforgettable.
  </motion.p>

  <motion.button
    className="mt-4 sm:mt-6 bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold shadow-md transform transition duration-300 hover:scale-105 text-sm sm:text-base animate-bounce"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, delay: 0.8 }}
  >
    Shop Now
  </motion.button>
</motion.div>

  </div>
</div>


    </Slider>
  );
};
