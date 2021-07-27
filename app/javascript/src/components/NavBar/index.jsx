import React from "react";

import NavItem from "./NavItem";
import { Link } from "react-router-dom";

const NavBar = ({ isLoggedIn, user }) => {
  return (
    <nav className="bg-white shadow">
      <div className="container px-2 mx-auto max-w-7xl sm:px-4 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex px-2 lg:px-0">
            <div className="hidden lg:flex">
              <NavItem name="Quizzy" path="/" />
            </div>
          </div>
          {isLoggedIn && (
            <div className="flex items-center justify-end">
              <Link
                to="/reports"
                className="inline-flex items-center px-6 pt-1 text-base font-regular leading-5 text-bb-gray-600
                text-opacity-50 transition duration-150 ease-in-out border-b-2 border-transparent focus:outline-none
                focus:text-bb-gray-700 cursor-pointer"
              >
                Reports
              </Link>
              <span
                className="inline-flex items-center px-6 pt-1 text-base font-regular leading-5 text-bb-gray-600
            text-opacity-50 transition duration-150 ease-in-out border-b-2 border-transparent focus:outline-none
            focus:text-bb-gray-700"
              >
                {user.userName}
              </span>
              <a
                className="inline-flex items-center px-6 pt-1 text-base
           font-semibold leading-5 text-bb-gray-600 text-opacity-50
           transition duration-150 ease-in-out border-b-2
           border-transparent hover:text-bb-gray-600 focus:outline-none
            focus:text-bb-gray-700 cursor-pointer"
              >
                LogOut
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
