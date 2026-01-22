import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Navbar } from "../components/Navbar";
import CartItem from "../imports/CartItem";
import { usecart } from "../context/Cartcontext";
import { Trash2 } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Link } from "react-router-dom";


export const Cart = () => {
  const { cart, clearCart } = usecart();
  const [showLoader, setShowLoader] = useState(true);
  const items = cart?.items || [];
  const [isClearing, setisClearing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);


        useEffect(() => {
              // Show loader for 1 second on mount
              const timer = setTimeout(() => {
                setShowLoader(false);
              }, 500);
          
              return () => clearTimeout(timer); // cleanup
            }, []);
      
  
    const handleClear = async () => {
      setisClearing(true);
      try {
        await clearCart();
        setIsSuccess(true);
  
        // Show animation for 1.5 seconds then revert
        setTimeout(() => {
          setIsSuccess(false);
        }, 1500);
      } finally {
        setisClearing(false);
      }
    };


  const subtotal = items.reduce(
    (sum, item) => sum + Number(item.price) * (item.quantity || 1),
    0
  );

  const shipping = 250;
  const taxes = 8.32;
  const total = subtotal + shipping + taxes;

     if (showLoader) {
      return (
        <div className="flex flex-col justify-center items-center  h-screen">
  
      <img className="h-30 w-27 animate-spin mr-3 " src="/logo.jpg" alt="" />
  
      <div className="m-5 animate-pulse" >Loading . . .</div>
      </div>
      );
    }

  return (
    <>
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-lg">
        <Navbar />
      </div>

      {/* Page content */}
      <div className="max-w-screen mx-auto px-4 py-8 pt-24">
        {/* Header Row */}
       <div className="flex justify-between items-center mb-3 ml-2 mt-7">
  <h1 className="text-3xl font-semibold italic">Your Cart</h1>

<button
  onClick={handleClear}
  disabled={isClearing || items.length === 0}
  className="flex items-center justify-center gap-2 bg-red-500 text-white 
             px-5 py-2 rounded-3xl hover:bg-red-600 cursor-pointer hover:scale-105 
             transition relative overflow-hidden min-w-[150px] h-[44px]"
>
  <div className="flex items-center justify-center w-full">
    {isSuccess ? (
      <DotLottieReact
        src="/animations/Delete.lottie"
        loop={false}
        autoplay
        style={{ width: 40, height: 40 }}
        color="black"
      />
    ) : (
      <>
        <Trash2 size={18} />
        <span>{isClearing ? "Clearing..." : "Clear Cart"}</span>
      </>
    )}
  </div>
</button>
</div>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cart items box */}
          <div className="lg:col-span-2 rounded-4xl p-4 h-[500px] overflow-y-auto bg-gray-800">
            {items.length > 0 ? (
              <div className="space-y-4">
                {items.map((item) => (
                  <CartItem key={item.productId} item={item} />
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-white">Your cart is empty.</p>
              </div>
            )}
          </div>

          {/* Summary */}
          <div
            className="bg-gray-800 text-white rounded-4xl p-6 h-fit 
                          lg:sticky lg:top-1/2 lg:-translate-y-1/2"
          >
            <div className="flex justify-between mb-2">
              <span className="text-lg">Subtotal</span>
              <span className="text-lg mr-2">
                Rs. {subtotal.toFixed(2)} PKR
              </span>
            </div>
            <div className="text-base font-medium text-gray-300 mb-4">
              Shipping and taxes will be calculated at checkout.
            </div>

            <Link
  to="/checkout"
  className="mx-auto block w-full text-center hover:scale-105 transition cursor-pointer bg-teal-600 rounded-3xl text-xl animate-pulse text-white py-2"
>
  Proceed to Checkout
</Link>

            <div className="text-center mt-4 text-sm">
              or{" "}
              <a href="#" className="text-indigo-400 hover:underline">
                Continue Shopping
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
