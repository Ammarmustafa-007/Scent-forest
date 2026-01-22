import React, { useState, useContext , useEffect } from "react";
import { ProductproviderContext } from "../context/Productprovider";
import { Adminpcard } from "./Adminpcard";
import {Sucessalert} from "../imports/SucessAlert"
import { motion, AnimatePresence } from "framer-motion";


export const Adminproduct = () => {
  const products = useContext(ProductproviderContext);
  const [showForm, setShowForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  const [formData, setFormData] = useState({
    photo: "",
    name: "",
    price: "",
    gender: "",
    occasion: "",
    notes: "",
    accords: "",
    catagory: "",
  });

  // ✅ handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ submit new product
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = {
      id: String(Date.now()),  // unique ID
      photo: formData.photo,
      name: formData.name,
      price: formData.price,
      catagory: formData.catagory,
      details: {
        gender: formData.gender,
        occasion: formData.occasion,
        notes: formData.notes,
        accords: formData.accords,
      },
    };

    console.log("✅ Submitting:", newProduct);

    try {
      const url = "http://192.168.18.41:5000/products"; // your API
      let response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      response = await response.json();
      console.log("✅ Server response:", response);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
   

    } catch (err) {
      console.error("❌ Error posting product:", err);
    }

    // reset form
    setFormData({
      photo: "",
      name: "",
      price: "",
      gender: "",
      occasion: "",
      notes: "",
      accords: "",
      catagory: "",
    });
    setShowForm(false);
  };

    useEffect(() => {
    // Show loader for 1 second on mount
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 300);

    return () => clearTimeout(timer); // cleanup
  }, []);


  if (showLoader) {
    return (
      <div className="flex  flex-col mt-40 items-center  h-screen">

    <img className="h-30 w-27 animate-spin mr-3 " src="/logo.jpg" alt="" />

    <div className="m-5 animate-pulse" >Loading . . .</div>
    </div>
    );
  }


  if (!products || products.length === 0) {
    return(
    <div className="flex  flex-col mt-40 items-center  h-screen">

    <img className="h-30 w-27 animate-spin mr-3 " src="/logo.jpg" alt="" />

    <div className="m-5 animate-pulse" >Loading . . .</div>
    </div>
     );
  }

  return (
    <>
      {/* Header with button */}
      <div className="flex justify-between items-center mt-4 mx-5">
        <h2 className="text-3xl font-bold italic capitalize fade-in-up">
          All Products
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 rounded-lg bg-green-700 text-white hover:bg-green-600 shadow"
        >
          {showForm ? "Close" : "Add New Product"}
        </button>
      </div>

      {/* Add product form */}
      <AnimatePresence>
      {showForm && (
        <motion.form
          key="productForm"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: -30 }}   // start hidden & above
          animate={{ opacity: 1, y: 0 }}     // drop into view
          exit={{ opacity: 0, y: -30 }}      // wrap up and fade out
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="bg-gray-100 p-6 rounded-lg shadow-lg mx-5 mt-4 space-y-4 fade-in-up"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
  type="text"
  name="photo"
  value={formData.photo.replace(/\.jpg$/, "")}   // show only base name in typing
  onChange={(e) => {
    const baseValue = e.target.value.replace(/\.jpg$/, ""); // remove accidental ".jpg"
    setFormData((prev) => ({...prev, photo: baseValue + ".jpg" }));
  }}
  placeholder="Photo name"
  className="border p-2 rounded w-full"
  required
/>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Product Name"
              className="border p-2 rounded w-full"
              required
            />
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              className="border p-2 rounded w-full"
              required
            />  
           <select
              name="gender"
             value={formData.gender}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            >
              <option value="">-- Select Gender --</option>
              <option value="MALE">MALE</option>
              <option value="FEMALE">Women</option>
              <option value="UNISEX">Unisex</option>
              
            </select>
           <select
              name="occasion"
             value={formData.occasion}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            >
              <option value="">-- occassion --</option>
              <option value="All Rounder">All Rounder</option>
              <option value="Formal">Formal</option>
              <option value="Casual">Casual</option>
              <option value="Party wear">Party Wear</option>
              <option value="Sports">Sports</option>
             
              
            </select>
            <input
              type="text"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Notes"
              className="border p-2 rounded w-full"
            />
            <input
              type="text"
              name="accords"
              value={formData.accords}
              onChange={handleChange}
              placeholder="Accords"
              className="border p-2 rounded w-full"
            />
            <select
              name="catagory"
              value={formData.catagory}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            >
              <option value="">-- Select Category --</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="elevate">Elevate Series</option>
              <option value="100ml">100 ML Perfumes</option>
            </select>
          </div>

          <button
            type="submit"
            className="mt-4 w-full rounded-lg bg-green-600 text-white py-2 hover:bg-green-500"
          >
            Submit Product
          </button>
        </motion.form>
      )}
</AnimatePresence>
         <Sucessalert show={showSuccess} onClose={() => setShowSuccess(false)} />


      {/* Products Grid */}
      <div className="flex flex-wrap sm:px-2 lg:px-4 py-6 fade-in-up">
        {products?.map((product) => {
          const { id, photo, name, price, details, catagory } = product;
          const { gender, occasion, notes, accords } = details || {};

          return (
            <div key={id} className="w-1/2 lg:w-1/4">
              <Adminpcard
                id={id}
                photo={photo}
                name={name}
                price={price}
                gender={gender}
                occasion={occasion}
                notes={notes}
                accords={accords}
                catagory={catagory}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};
