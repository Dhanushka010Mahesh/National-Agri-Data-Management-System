import React from 'react'
import NavBar from "../Components/Header/NavigationBar";
import FooterBar from "../Components/Footer/FooterBar";

function About() {
  return (
    <>
      <NavBar />
      <p className="text-center text-blue-600 font-serif text-lg leading-relaxed">About page</p>
      <FooterBar/>
    </>
  )
}

export default About