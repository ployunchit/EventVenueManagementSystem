import React from 'react';
import './App.css';
import HeroSection from './HeroSection';
import Footer from './Footer';
import Cards from './Cards';
import Navbar from './navbar/navbar';

function Home() {
  return (
    <>
    <Navbar></Navbar>
      <HeroSection />
      <Cards />
      <Footer />
    </>
  );
}

export default Home;