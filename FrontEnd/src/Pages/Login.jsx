import React from 'react'
import NavBar from '../Components/Header/NavigationBar'
import FooterBar from '../Components/Footer/FooterBar'

function Home() {
  return (
    <>
      <NavBar />
      <p className="text-center text-blue-600 font-serif text-lg leading-relaxed">login page</p>
      <FooterBar/>
    </>
  )
}

export default Home