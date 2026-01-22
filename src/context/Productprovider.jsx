import React from 'react'
import { useState, useEffect , createContext } from 'react'
import { Productapi } from './Productapi'
import { CatagoryProducts } from './CatagoryProducts';
import { Adminproduct } from '../Admin/Adminproduct';

export const ProductproviderContext=createContext();

export const Productprovider = ({children}) => {

     const [proddata, setproddata] = useState([]);

       const getproducts = async () => {
    const url = "http://192.168.18.41:5000/products";
    let response = await fetch(url);
    response = await response.json();
    setproddata(response);
    // console.log("Dataincomming" , proddata);
    
  };


//   

   useEffect(() => {
    getproducts();
  }, []);

// json-server --watch db.json --host 192.168.18.41 --port 5000  ofc

// json-server --watch cart.json --host 192.168.18.41 --port 5001
// json-server --watch orders.json --host 192.168.18.41 --port 5002


// json-server --watch db.json --host 192.168.1.8 --port 5000 karr



  return (

    <>
     {/* <div>PRODUCT PROVIDER IS WORKING</div> */}

    <ProductproviderContext.Provider value={proddata} >

      {children}

    </ProductproviderContext.Provider>

    
    
    </>

   



  )
}
