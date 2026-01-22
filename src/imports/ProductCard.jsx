import React, { useState , useContext } from "react";

import { Adminproduct } from "../Admin/Adminproduct";

import { usecart } from "../context/Cartcontext";

import { DotLottieReact } from '@lottiefiles/dotlottie-react';



export const ProductCard = ({ 
 
  id = '',
  photo = '',
  name = '',
  price = '',
  gender = '',
  occasion = '',  
  notes = '',
  accords = '',
  catagory = '',
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const {addtocart}=usecart()
   const [isAdding, setIsAdding] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleAdd = async () => {
    setIsAdding(true);
    try {
      await addtocart(product);
      setIsSuccess(true);

      // Show animation for 1.5 seconds then revert
      setTimeout(() => {
        setIsSuccess(false);
      }, 1500);
    } finally {
      setIsAdding(false);
    }
  };

 const product = { id, photo, name, price, gender, occasion, notes, accords, catagory };


  return (
    <div
      key={id}
      className=" my-2  ml-1.25 flex w-[95%] max-w-xs flex-col overflow-hidden rounded-lg 
                 border border-gray-200 bg-gray-100 shadow-md transition-transform 
                 duration-300 hover:scale-105 hover:z-10"
    >
      {/* Product Image */}
        <div className="relative mt-2 flex h-40 sm:h-48 md:h-56 lg:h-60 overflow-hidden rounded-xl">
        <img className="object-contain scale-115 w-full h-full" src={photo} alt={name} />
      </div>

      {/* Product Info */}
      <div className="mt-3 px-3 pb-4 sm:px-5 sm:pb-5">
        <h5 className="text-lg sm:text-xl font-semibold tracking-tight text-slate-900">
          {name}
        </h5>

        {/* Price Section */}
        <div className="mt-2 mb-2 sm:mt-3 sm:mb-3 flex items-center justify-between">
          <span className="text-xl sm:text-2xl font-bold text-slate-900">
            Rs:{price}
          </span>
        </div>

        {/* Toggle Buttons */}
        {!showDetails ? (
          <button
            onClick={() => setShowDetails(true)}
            className="mb-2 sm:mb-3 w-full rounded-md border border-gray-300 px-3 py-1.5 
                       sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 
                       transition duration-300 hover:bg-gray-100 cursor-pointer "
          >
            Show Details
          </button>
        ) : (
          <button
            onClick={() => setShowDetails(false)}
            className="mb-2 sm:mb-3 w-full rounded-md border border-red-300 px-3 py-1.5 
                       sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-red-600 
                       transition duration-300 hover:bg-red-100"
          >
            Cancel
          </button>
        )}

        {/* Details Section with Transition */}
        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            showDetails ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="mb-3 sm:mb-4 text-xs sm:text-sm text-gray-600 space-y-1 p-2">
            <p>
              <span className="font-semibold">Gender:</span> {gender}
            </p>
            <p>
              <span className="font-semibold">Occasion:</span> {occasion}
            </p>
            <p>
              <span className="font-semibold">Notes:</span> {notes}
            </p>
            <p>
              <span className="font-semibold">Fragrance Accords:</span> {accords}
            </p>
             <p>
              <span className="font-semibold">Catagory:</span> {catagory}
            </p>
          </div>
        </div>

        {/* Add to Cart Button */}
 <button
  className="flex w-full items-center justify-center rounded-md 
             bg-gradient-to-r from-teal-400 to-emerald-500
             hover:from-teal-500 hover:to-emerald-600
             px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm 
             font-medium text-white transition duration-300 
             focus:outline-none focus:ring-4 focus:ring-teal-200 
             cursor-pointer relative overflow-hidden 
             min-w-[150px] h-[44px]"
  onClick={handleAdd}
  disabled={isAdding}
>
  <div className="flex items-center justify-center w-full h-full">
    {isSuccess ? (
      <DotLottieReact
        src="/animations/success.lottie"
        loop={false}
        autoplay
        style={{ width: 35, height: 35 }}
      />
    ) : (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mr-2 h-5 w-5 sm:h-6 sm:w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 
            13l-2.293 2.293c-.63.63-.184 1.707.707 
            1.707H17m0 0a2 2 0 100 4 2 2 
            0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 
            014 0z"
          />
        </svg>
        {isAdding ? "Adding..." : "Add to Cart"}
      </>
    )}
  </div>
</button>

      </div>
    </div>
  );
};
