import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const handleMenuToggler = () => {
    setMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { path: "/", title: "Start a search" },
    { path: "/my-job", title: "My Job" },
    // { path: "/salary", title: "Salary Estimate" },
    { path: "/post-job", title: "Post A Job" },
  ];

  return (
    <header className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <nav className="flex justify-between items-center py-6">
        <NavLink to="/" className="flex items-center gap-2 text-2xl text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="29"
            height="30"
            viewBox="0 0 29 30"
            fill="none"
            aria-label="Job Portal Logo"
          >
            <circle cx="12.0143" cy="12.5143" r="12.0143" fill="#3575E2" fillOpacity="0.4" />
            <circle cx="16.9857" cy="17.4857" r="12.0143" fill="#3575E2" />
          </svg>
          <span>Job Portal</span>
        </NavLink>
        {/* Nav items for large device */}
        <ul className="hidden md:flex gap-12">
          {navItems.map(({ path, title }) => (
            <li key={path} className="text-base text-primary">
              <NavLink  to={path} className={({ isActive}) => isActive ? "active" :  ""}> 
                 {title}
              </NavLink>
            </li>
          ))}
        </ul>
        {/* singup and signin */}
        <div className="text-base text-primary font-medium space-x-5 hidden lg:block">
            <Link to="/login" className="py-2 px-5 border rounded">Log In</Link> 
            <Link to="/signup" className="py-2 px-5 border rounded bg-blue text-white">Sing Up</Link> 
        </div>

        {/* {moible menu} */}
        <div className="md:hidden block">
        <button onClick={handleMenuToggler}>          
            {
            isMenuOpen? <FaXmark className="w-5 h-5 text-primary"/>: <FaBarsStaggered className="w-5 h-5 text-primary"/>
            }
        </button>
          
        </div>
      </nav>
      {/* {navitems for mobile view } */}
      <div className={`x-4 py-5 text-white bg-black rounded-sm ${isMenuOpen ? "" : "hidden"}` }>
        <ul className="">
          {navItems.map(({ path, title }) => (
              <li key={path} className="text-base text-white first:text-white py-1 px-3">
                <NavLink  to={path} className={({ isActive}) => isActive ? "active" :  ""}> 
                  {title}
                </NavLink>
              </li>
            ))}
            <li className="px-3"><Link to="/login" >Log In</Link></li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;