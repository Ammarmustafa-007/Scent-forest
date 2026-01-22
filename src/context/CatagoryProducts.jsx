import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { ProductproviderContext } from "./Productprovider";
import { ProductCard } from "../imports/ProductCard";// import your ProductCard
import { Navbar } from "../components/Navbar";
import { useState , useEffect } from "react";


export const CatagoryProducts = () => {
  const { catagory } = useParams();
   const [showLoader, setShowLoader] = useState(true);
  const products = useContext(ProductproviderContext);

   useEffect(() => {
      // Show loader for 1 second on mount
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 300);
  
      return () => clearTimeout(timer); // cleanup
    }, []);

    
  if (showLoader) {
    return (
      <div className="flex flex-col justify-center items-center  h-screen">

    <img className="h-30 w-27 animate-spin mr-3 " src="/logo.jpg" alt="" />

    <div className="m-5 animate-pulse" >Loading . . .</div>
    </div>
    );
  }

  

 if (!products || products.length === 0) {
    return(
    <div className="flex  flex-col justify-center items-center  h-screen">

    <img className="h-30 w-27 animate-spin mr-3 " src="/logo.jpg" alt="" />

    <div className="m-5 animate-pulse" >Loading . . .</div>
    </div>
     );
  }

  // Filter products by category safely
  const filteredProducts = products.filter(
    (prod) => prod.catagory?.trim().toLowerCase() === catagory?.trim().toLowerCase()
  );

  if (filteredProducts.length === 0) {
    return <h2 className="text-center text-xl mt-10">No products found!</h2>;
  }

return (
     
  <>
  <Navbar/>

  <div className="fade-in-up">

    
    
    <h2 className="text-2xl font-bold mb-1 mt-4 ml-5 capitalize fade-in-up">{catagory} Products</h2>
    <div className="flex flex-wrap sm:px-2 lg:px-4 py-6">
      {filteredProducts?.map((product) => {
              const { id, photo, name, price, details, catagory } = product;
              const { gender, occasion, notes, accords } = details || {};
      
              return (
                <div
                  key={id}
                  className="w-1/2 lg:w-1/4"
                >
                  <ProductCard
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
  </div>
  </>
);

};
