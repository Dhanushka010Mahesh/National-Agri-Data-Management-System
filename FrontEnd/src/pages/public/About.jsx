import React from "react";
import NavBar from "../../components/navigationBar/NavigationBar";
import FooterBar from "../../components/footerBar/FooterBar";
import WhoWeAreImg from "../../assets/whoWeAre.jpg";
import OurVision from "../../assets/ourVision.jpg";
import OurMission from "../../assets/ourmission.jpg";

function About() {
  return (
    <>
      <NavBar />

      <section className="py-2 px-20 my-3">
        <div className="flex items-center">
          <div className="w-1/2 h-auto">
            <img src={WhoWeAreImg} alt="" width="600px" />
          </div>
          <div className="w-1/2">
            <h2 className="text-5xl font-bold py-3">Who We Are?</h2>
            <p className="text-slate-700">
              We are a dynamic team of passionate designers, artisans, and
              creators committed to crafting high-quality, stylish clothing that
              seamlessly blends comfort and innovation. Our diverse backgrounds
              and experiences fuel our creativity, enabling us to push the
              boundaries of fashion while staying true to our core values. At
              the heart of our work is a dedication to exceptional craftsmanship
              and meticulous attention to detail. We believe that every garment
              tells a story, and we strive to create unique fashion pieces that
              resonate with the modern lifestyle. Each collection is
              thoughtfully designed to cater to your needs, whether you’re
              dressing for a casual outing, a professional setting, or a special
              occasion. Our goal is to offer products that not only enhance your
              wardrobe but also empower you to express your individuality.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-20 my-30">
        <div className="flex items-center justify-between">
          <div className="w-1/2 pr-10">
            <h2 className="text-5xl font-bold py-3">Our Vision</h2>
            <p className="text-slate-700">
              We are a dynamic team of passionate designers, artisans, and
              creators committed to crafting high-quality, stylish clothing that
              seamlessly blends comfort and innovation. Our diverse backgrounds
              and experiences fuel our creativity, enabling us to push the
              boundaries of fashion while staying true to our core values. At
              the heart of our work is a dedication to exceptional craftsmanship
              and meticulous attention to detail. We believe that every garment
              tells a story, and we strive to create unique fashion pieces that
              resonate with the modern lifestyle. Each collection is
              thoughtfully designed to cater to your needs, whether you’re
              dressing for a casual outing, a professional setting, or a special
              occasion. Our goal is to offer products that not only enhance your
              wardrobe but also empower you to express your individuality.
            </p>
          </div>
          <div className="w-1/2">
            <img src={OurVision} alt="" className="w-[600px] h-auto" />
          </div>
        </div>
      </section>

      <section className="py-8 px-20 my-30 mb-10">
        <div className="flex items-center">
          <div className="w-1/2 h-auto">
            <img src={OurMission} alt="" width="500px" />
          </div>
          <div className="w-1/2">
            <h2 className="text-5xl font-bold py-3">Our Mission</h2>
            <p className="text-slate-700">
              We are a dynamic team of passionate designers, artisans, and
              creators committed to crafting high-quality, stylish clothing that
              seamlessly blends comfort and innovation. Our diverse backgrounds
              and experiences fuel our creativity, enabling us to push the
              boundaries of fashion while staying true to our core values. At
              the heart of our work is a dedication to exceptional craftsmanship
              and meticulous attention to detail. We believe that every garment
              tells a story, and we strive to create unique fashion pieces that
              resonate with the modern lifestyle. Each collection is
              thoughtfully designed to cater to your needs, whether you’re
              dressing for a casual outing, a professional setting, or a special
              occasion. Our goal is to offer products that not only enhance your
              wardrobe but also empower you to express your individuality.
            </p>
          </div>
        </div>
      </section>

      <FooterBar />
    </>
  );
}

export default About;
