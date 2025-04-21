import React from 'react'
import NavBar from '../../components/navigationBar/NavigationBar'
import FooterBar from '../../components/footerBar/FooterBar'

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