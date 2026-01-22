import React, { useContext } from "react";
import { ProductproviderContext } from "./Productprovider";
import { ProductCard } from "../imports/ProductCard";

export const Productapi = () => {
  const products = useContext(ProductproviderContext);

  return (
    <div className="flex flex-wrap sm:px-0 lg:px-4 py-6">
      {products?.map((product) => {
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
  );
};
    