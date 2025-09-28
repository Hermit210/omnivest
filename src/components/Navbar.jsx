import { useState, useEffect } from 'react';
import { Button } from "./ui/button";
// import { Menu, X } from "lucide-react";
import FadeIn from './FadeIn';
import { Link } from 'react-router-dom';
import UserProfileIcon from './ui/UserProfileIcon';
import useAuth from '@/utils/auth';
import Sidebar from './Sidebar';

function Navbar() {
  const { isLoggedIn, user } = useAuth();

  return (
    <FadeIn direction="down" delay={0.1} fullWidth zIndex={10}>
      <div className="relative flex flex-row w-full h-[10vh] min-h-[60px] bg-[#05140D] items-center justify-between px-4 md:px-5 lg:px-10">
        {/* Hamburger Menu for Mobile */}
        <div className="sm:hidden flex items-center cursor-pointer">
          <Sidebar />
        </div>

        {/* Logo */}
        <Link to="/" className="flex flex-row items-center justify-center cursor-pointer">
          <div className="md:h-[50px] h-[30px] md:pr-3 flex items-center justify-center">
            <img
              className="md:h-[50px] h-[30px] md:pr-3"
              src="https://res.cloudinary.com/djoebsejh/image/upload/v1721187808/srktgdcijec0zqmlgvbh.png"
              alt="Logo"
            />
          </div>
          <h1 className="md:text-3xl text-2xl font-bold text-white cursor-pointer">OmniVest</h1>
        </Link>

        {/* Navigation Links */}
        <ul className={`hidden sm:static sm:flex flex-col sm:flex-row items-center sm:top-0 left-0 md:left-auto md:w-auto`}>
          <li className="text-lg text-white p-4 cursor-pointer hover-effect">
            <Link to="/">Home</Link>
          </li>
          <li className="text-lg text-white p-4 cursor-pointer hover-effect">
            <Link to="/omnivest">Platform</Link>
          </li>
          <li className="text-lg text-white p-4 cursor-pointer hover-effect">
            <a href="https://docs.zetachain.com/" target="_blank" rel="noopener noreferrer">
              Documentation
            </a>
          </li>
          <li className="text-lg text-white p-4 cursor-pointer hover-effect">
            <a href="https://labs.zetachain.com/get-zeta" target="_blank" rel="noopener noreferrer">
              Faucet
            </a>
          </li>
        </ul>

        {/* Login Button or Profile Icon */}
        {isLoggedIn ? (
          <FadeIn direction="left" delay={0.2}>
            <UserProfileIcon />
          </FadeIn>
        ) : null}
      </div>
    </FadeIn>
  );
}

export default Navbar;
