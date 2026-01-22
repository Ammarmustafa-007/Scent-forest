import React from 'react'
import { Carousel } from '../components/Carousel'
import { ProductCard } from '../imports/ProductCard'
import { Productapi } from '../context/Productapi'
import { Navbar } from '../components/Navbar'


export const Home = () => {
  return (
    <>
    <Navbar/>
    <Carousel/>
     <Productapi/>
    </>
  )
}
