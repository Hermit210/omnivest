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
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 5C15 8 12 12 12 18C12 24 15 28 20 35C25 28 28 24 28 18C28 12 25 8 20 5Z" fill="#6FCF97"/>
              <rect x="18" y="32" width="4" height="3" fill="#6FCF97"/>
            </svg>
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
