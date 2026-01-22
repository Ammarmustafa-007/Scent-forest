import React, { useState } from "react";
import { Editproduct } from "./Editproduct";

export const Adminpcard = ({
  id = "",
  photo = "",
  name = "",
  price = "",
  gender = "",
  occasion = "",
  notes = "",
  accords = "",
  catagory = "",
}) => {
  const [isEditing, setIsEditing] = useState(false);

  // 🔹 Delete product
  const delbtn = async (id) => {
    try {
      const url = "http://192.168.18.41:5000/products/" + id;
      let response = await fetch(url, { method: "DELETE" });
      response = await response.json();
      if (response) {
        alert("Product deleted ✅");
      }
    } catch (err) {
      console.error("❌ Error deleting:", err);
    }
  };

  return (
    <div
      key={id}
      className={`relative my-2 ml-1.25 flex w-[95%] max-w-xs flex-col overflow-hidden 
              rounded-lg border border-gray-200 bg-gray-100 shadow-md 
              transition-transform duration-300 
              ${isEditing ? "" : "hover:scale-105 hover:z-10"}`}
    >
      {/* Product Image */}
      <div className="relative mx-2 mt-2 flex h-40 sm:h-48 md:h-56 lg:h-60 overflow-hidden rounded-xl">
        <img className="object-contain w-full h-full" src={photo} alt={name} />
      </div>

      {/* Product Info */}
      <div className="mt-3 px-3 pb-4 sm:px-5 sm:pb-5">
        <h5 className="text-lg sm:text-xl font-semibold tracking-tight text-slate-900">
          {name}
        </h5>

        {/* Price */}
        <div className="mt-2 mb-2 sm:mt-3 sm:mb-3 flex items-center justify-between">
          <span className="text-xl sm:text-2xl font-bold text-slate-900">
            ${price}
          </span>
        </div>

        {/* Product Details */}
        <div className="mb-3 sm:mb-4 text-xs sm:text-sm text-gray-600 space-y-1 p-2 bg-gray-50 rounded-md">
          <p>
            <span className="font-semibold">Category:</span> {catagory}
          </p>
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
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="flex-1 rounded-md bg-blue-500 hover:bg-blue-600 
                       px-3 py-2 text-xs sm:text-sm font-medium text-white 
                       transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            EDIT
          </button>

          <button
            onClick={() => delbtn(id)}
            className="flex-1 rounded-md bg-red-500 hover:bg-red-600 
                       px-3 py-2 text-xs sm:text-sm font-medium text-white 
                       transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            DELETE
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/50">
          <div
            className="relative w-[95%] sm:w-[80%] max-h-[90%] overflow-y-auto 
                   bg-white rounded-lg shadow-xl p-4"
          >
            <Editproduct
              product={{
                id,
                photo,
                name,
                price,
                gender,
                occasion,
                notes,
                accords,
                catagory,
              }}
              onSubmit={(data) => {
                console.log("Updated product:", data);
                setIsEditing(false);
              }}
              onCancel={() => setIsEditing(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
