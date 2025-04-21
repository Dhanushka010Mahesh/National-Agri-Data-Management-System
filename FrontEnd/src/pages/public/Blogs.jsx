import React from "react";
import NavBar from "../../components/navigationBar/NavigationBar";
import FooterBar from "../../components/footerBar/FooterBar";

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
