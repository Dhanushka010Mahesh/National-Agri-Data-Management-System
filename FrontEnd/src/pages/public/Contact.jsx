import React from "react";
import NavBar from "../../components/navigationBar/NavigationBar";
import FooterBar from "../../components/footerBar/FooterBar";

function Contact() {
  return (
    <>
      <NavBar />

      <section className="py-7 px-20 mx-10 my-5">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl text-slate-700">GET IN TOUCH</span>
            <h2 className="text-5xl font-bold pt-2">Lite Fashion Store</h2>
            <p className="text-2xl font-bold text-slate-800">Kandy</p>
            <ul className="list-none py-5 text-slate-700">
              <li className="flex py-2 px-0.5 items-center gap-5">
                <i className="fa-solid fa-location-dot"></i>
                <p>No. 123, Main Street,Kandy, Sri Lanka.</p>
              </li>
              <li className="flex py-2 items-center gap-5">
                <i className="fa-solid fa-envelope"></i>
                <p>litefashion256@gmail.com</p>
              </li>
              <li className="flex py-2 items-center gap-5">
                <i className="fa-solid fa-phone"></i>
                <p>+94 766640384</p>
              </li>
              <li className="flex py-2 items-center gap-5">
                <i className="fa-solid fa-clock"></i>
                <p>Monday to Saturday: 9:00 AM to 7:00 PM</p>
              </li>
            </ul>
          </div>
          <div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1013129.8222267724!2d80.076382965625!3d7.293244200000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae3662bc0efce8d%3A0x72eef83f0635fce0!2sFashion%20Bug%20Kandy%20City!5e0!3m2!1sen!2ssg!4v1726865372035!5m2!1sen!2ssg"
              width="550"
              height="350"
              //style="border: 0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      <section className="py-10 px-20 mx-10">
        <div className="py-8 px-4 mx-auto max-w-screen-md">
          <div className="text-center">
            <p className="text-lg text-slate-700">LEAVE A MESSAGE</p>
            <h2 className="text-4xl font-bold pb-5">
              Let us know what you need
            </h2>
          </div>
          <form id="postForm" className="space-y-2" method="POST">
            <div>
              <label
                //for="name"
                className="block mb-1 font-medium text-gray-900"
              >
                Your Name
              </label>
              <input
                type="text"
                id="clearName"
                name="name"
                className="mb-4 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2"
                placeholder="Alex Martin"
                required
              />
            </div>
            <div>
              <label
                //htmlFor="email"
                className="block mb-1 font-medium text-gray-900"
              >
                Your email
              </label>
              <input
                type="email"
                id="clearEmail" //clearName clearEmail clearSubject
                name="email"
                className="mb-4 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2"
                placeholder="name@gmail.com"
                required
              />
            </div>
            <div>
              <label
                //htmlFor="subject"
                className="block mb-1 font-medium text-gray-900"
              >
                Subject
              </label>
              <input
                type="text"
                id="clearSubject"
                name="subject"
                className="mb-4 block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
                placeholder="Let us know how we can help you"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label
               // htmlFor="message"
                className="block mb-1 font-medium text-gray-900"
              >
                Your message
              </label>
              <textarea
                name="message"
                id="clearMessage"
                rows="6"
                className="block p-2.5 w-full text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 mb-4"
                placeholder="Leave a comment..."
              ></textarea>
            </div>
            <div className="flex items-center mt-4 gap-6">
              <button
                type="submit"
                name="submit"
                className="py-3 px-5 font-medium text-center text-white bg-sky-500 rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300"
              >
                Send message
              </button>

              <h1 className="text-sky-500 font-semibold text-lg" id="show"></h1>
            </div>
          </form>
        </div>
      </section>

      <FooterBar />
    </>
  );
}

export default Contact;
