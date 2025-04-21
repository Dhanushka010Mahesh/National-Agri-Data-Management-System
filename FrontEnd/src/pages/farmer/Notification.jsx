import React from 'react'
import NavBar from "../../components/navigationBar/NavigationBar";
import FooterBar from "../../components/footerBar/FooterBar";

function Notification() {
  return (
    <>
      <NavBar />
      <p className="text-center text-blue-600 font-serif text-lg leading-relaxed">notification page</p>
      <FooterBar/>
    </>
  )
}

export default Notification