import React from "react";
import NavBar from "../Components/Header/NavigationBar";
import FooterBar from "../Components/Footer/FooterBar";

function Blogs() {
  return (
    <>
      <NavBar />
      <p className="text-center text-blue-600 font-serif text-lg leading-relaxed">blogs page</p>
      <FooterBar/>
    </>
  );
}

export default Blogs;
