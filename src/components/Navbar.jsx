  import React, { useState, useEffect, useRef } from "react";
  import { Link, NavLink, useLocation } from "react-router-dom";
  import { MapPin, Menu, X } from "lucide-react";
  import { IoCartOutline } from "react-icons/io5";
  import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
  import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
  import PermIdentityIcon from '@mui/icons-material/PermIdentity';
  import axios from 'axios'
  import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
 import { usecart } from "../context/Cartcontext";

  const navItems = [
    { name: "Home", path: "/" },
    {
      name: "Products",
      dropdown: true,
      items: [
        { catagory: "Men", path: "/products/men" },
        { catagory: "Women", path: "/products/women" },
        { catagory: "Elevate Series", path: "/products/elevate" },
        { catagory: "100 ML Perfumes", path: "/products/100ml" },
      ],
    },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  export const Navbar = () => {
    const [desktopOpen, setDesktopOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [showLocation, setShowLocation] = useState(false);
     const [loc , setloc ]= useState();
     const {cart}=usecart()
     const itemCount = cart?.items?.length || 0;
     


     const getlocation = async () => {
  navigator.geolocation.getCurrentPosition(async (pos) => {
    const { latitude, longitude } = pos.coords;
    console.log("Latitude:", latitude, "Longitude:", longitude);

    const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=f5b42ea49711458ba7ad8bcd92513ece`;

    try {
      const location = await axios.get(url);
      // console.log("Location is:", location);
      const exactloc=location.data.results[0];
      setloc(exactloc);
      // console.log(exactloc);
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  });
};
    useEffect(() => {
      
      getlocation();
      
    }, [])

     
const locationRef = useRef(null);

    const location = useLocation();
    const menuRef = useRef(null);

    const isProductsActive = location.pathname.startsWith("/products");

    useEffect(() => {
  const handleClickOutside = (e) => {
    if (locationRef.current && !locationRef.current.contains(e.target)) {
      setShowLocation(false);
    }
  };
  if (showLocation) document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, [showLocation]);

    // Lock/unlock scroll on mobile menu
    useEffect(() => {
      document.body.classList.toggle("overflow-hidden", menuOpen);
    }, [menuOpen]);

    // Close menu on outside click
    useEffect(() => {
      const handleClickOutside = (e) => {
        if (menuRef.current && !menuRef.current.contains(e.target)) {
          setMenuOpen(false);
        }
      };
      if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [menuOpen]);

    return (

      <div className="bg-black text-white py-3 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-3 items-center">
          
          {/* LEFT - Desktop Nav */}
          <nav className="hidden [@media(min-width:880px)]:block">
            <ul className="flex gap-6 items-center text-lg font-semibold">
              {navItems.map((item) =>
                !item.dropdown ? (
                  <li key={item.name}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `transition duration-300 hover:scale-105 hover:text-gray-500 ${
                          isActive ? "border-b-2 border-yellow-500" : "text-white"
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ) : (
                  <li key={item.name} className="relative">
                    <button
                      onClick={() => setDesktopOpen((prev) => !prev)}
                      aria-expanded={desktopOpen}
                      className={`flex items-center gap-1 transition duration-300 hover:scale-105 hover:text-gray-500 ${
                        isProductsActive ? "border-b-2 border-yellow-500" : "text-white"
                      }`}
                    >
                      {item.name} <span>{desktopOpen ? <ArrowDropUpIcon/> : <ArrowDropDownIcon/>}</span>
                    </button>

                    <ul
                      className={`absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50 
                        transform origin-top transition-all duration-300 ${
                          desktopOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 invisible"
                        }`}
                    >
                      {item.items.map((sub) => (
                        <li key={sub.catagory}>
                          <NavLink
                            to={sub.path}
                            onClick={() => setDesktopOpen(false)}
                            className={({ isActive }) =>
                              `block px-4 py-2 text-sm hover:bg-gray-100 ${
                                isActive ? "text-yellow-500 font-semibold" : "text-gray-700"
                              }`
                            }
                          >
                            {sub.catagory}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </li>
                )
              )}
            </ul>
          </nav>

          {/* MOBILE - Hamburger Button */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="[@media(min-width:880px)]:hidden inline-flex items-center  hover:scale-105 cursor-pointer "
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* MOBILE - Slide Menu */}
          <div
            ref={menuRef}
            className={`fixed top-0 left-0 w-1/2 h-screen bg-black z-40 flex flex-col  items-center justify-start mt-26 p-5 space-y-6 transition-all duration-300 hover:scale-101 @media(min-width:880px)]:hidden  ${
    menuOpen ? "translate-x-0 opacity-100 pointer-events-auto" : "translate-x-full opacity-0 pointer-events-none"
  }`}
          >
            <ul className="flex flex-col space-y-8 text-xl">
  {navItems.map((item) =>
    !item.dropdown ? (
      <li key={item.name}>
        <NavLink
          to={item.path}
          onClick={() => setMenuOpen(false)}
          className={({ isActive }) =>
            `transition duration-300 transform hover:scale-115 hover:text-gray-400 ${
              isActive ? "text-yellow-500 font-semibold" : "text-white"
            }`
          }
        >
          {item.name}
        </NavLink>
      </li>
    ) : (
      <li key={item.name}>
        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          className="flex items-center gap-1 transition duration-300 transform hover:scale-115 hover:text-gray-400"
        >
          {item.name} <span>{mobileOpen ? <ArrowDropUpIcon/> :<ArrowDropDownIcon/>}</span>
        </button>

        {mobileOpen && (
          <ul className="mt-2 flex flex-col gap-2">
            {item.items.map((sub) => (
              <li key={sub.catagory}>
                <NavLink
                  to={sub.path}
                  onClick={() => {
                    setMobileOpen(false);
                    setMenuOpen(false);
                  }}
                  className={({ isActive }) =>
                    `block px-4 py-2 text-sm rounded-md transition duration-300 transform hover:scale-110 hover:bg-gray-800 ${
                      isActive ? "text-yellow-500 font-semibold" : "text-gray-300"
                    }`
                  }
                >
                  {sub.catagory}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </li>
    )
  )}
</ul>

          </div>

          {/* CENTER - Logo */}
          <div className="flex justify-center">
            <Link to="/">
              <img
                className="h-20 w-auto object-contain hover:scale-110 transition-transform"
                src="\forest copy.jpg"
                alt="Scent Forest"
              />
            </Link>
          </div>

{/* RIGHT - Cart + Location + Auth */}
{/* RIGHT - Profile Dropdown (User + Location) */}
<div className="flex justify-end items-center gap-3 sm:gap-6 flex-shrink max-w-full text-xs sm:text-sm md:text-base">
  <div ref={locationRef} className="relative flex-shrink-0">
    {/* Trigger Button */}
    <button
      onClick={() => setShowLocation((prev) => !prev)}
      className="flex-shrink-0"
    >
      <PermIdentityIcon className="cursor-pointer h-12 w-12 sm:h-10 sm:w-10 md:h-10 md:w-10 font-bold relative hover:scale-110 transition-transform"
 />
    </button>

    {/* Dropdown */}
    <div
      className={`absolute top-full right-0 mt-3 w-56 bg-white text-black rounded-lg shadow-xl border border-gray-200 transform transition-all duration-300 origin-top-right z-50
        ${showLocation ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}`}
    >
      <div className="p-4 space-y-3">
        {/* LOCATION INFO */}
        <div className="border-b border-gray-200 pb-2">
          <p className="font-medium truncate">
            {loc?.city || loc?.county || "Unknown Area"}
          </p>
          <p className="text-yellow-600 text-sm truncate">
            {loc?.neighbourhood || "Unknown Area"}
          </p>
        </div>

        {/* AUTH SECTION */}
        <div className="pt-2 ">
          <SignedOut>
            <SignInButton className="w-full text-center bg-yellow-500 rounded-md text-white px-3 py-1 hover:scale-105 transition-transform text-sm" />
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </div>
  </div>

  {/* CART ICON */}
  <Link
    to="/cart"
    className="relative flex-shrink-0 hover:scale-110 transition-transform"
  >
    <IoCartOutline className="h-6 w-6 sm:h-10 sm:w-10 md:h-10 md:w-10 font-bold" />
    <span className="bg-yellow-600  px-1.5 sm:px-2 rounded-full absolute -top-2 -right-3 text-white text-[10px] sm:text-xs md:text-sm">
      {itemCount}
    </span>
  </Link>
</div>




        </div>
      </div>
    );
  };
