import React from "react";
import MenuLinks from "../navigationBar/MenuLinks";

function FooterBar() {
  return (
    <>
      <footer className="bg-white rounded-lg shadow-sm dark:bg-gray-900 m-4">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <a
              href="https://www.agrarian.lk/"
              className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
            >
              <img
                src="agridata.png"
                className="h-32"
                alt="Agriculture Logo"
              />
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
                <MenuLinks
                    menu_link="/"
                    menu_css="hover:underline me-4 md:me-6"
                    menu_name="Home"
                  />
              </li>
              <li>
                <MenuLinks
                    menu_link="/about"
                    menu_css="hover:underline me-4 md:me-6"
                    menu_name="About"
                  />
              </li>
              <li>
                <MenuLinks
                    menu_link="/policy"
                    menu_css="hover:underline me-4 md:me-6"
                    menu_name="Privacy Policy"
                  />
              </li>
              <li>
                <MenuLinks
                    menu_link="/contact"
                    menu_css="hover:underline me-4 md:me-6"
                    menu_name="Contact"
                  />
              </li>
            </ul>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2025{" "}
            <a href="https://www.agrarian.lk/" className="hover:underline">
              DM™
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </>
  );
}

export default FooterBar;
