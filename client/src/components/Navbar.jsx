import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [hideUser, setHideUser] = useState(true);
  const handleMenuToggler = () => {
    setMenuOpen(!isMenuOpen);
  };
  useEffect(() => {
    fetch("http://localhost:8000/protected",{credentials:"include"})
      .then((res) => {
       if(res.status==401)
       {
        setHideUser(true);
       }
       else if(res.status==200)
       {
        setHideUser(false);
       }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handlelogout = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/auth/logout", {
        credentials:"include",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (response.ok) {
        alert("User Logout!");
        setHideUser(true)
      } else {
        setError(result.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Unable to connect to the server.");
    }
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
  aria-label="Job Posting Icon"
>
 <circle cx="14.5" cy="15" r="14" fill="#3575E2" fill-opacity="0.4" />

  <circle cx="14.5" cy="15" r="10" fill="#3575E2" />
 
  <path
    d="M10 9H19C19.5523 9 20 9.44772 20 10V21C20 21.5523 19.5523 22 19 22H10C9.44772 22 9 21.5523 9 21V10C9 9.44772 9.44772 9 10 9Z"
    fill="white"
  />
  <path
    d="M12 11H17V13H12V11ZM12 15H17V17H12V15ZM12 19H15V21H12V19Z"
    fill="#3575E2"
  />
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
{
 hideUser? <div className="text-base text-primary font-medium space-x-5 hidden lg:block">
 <Link to="/login" className="py-2 px-5 border rounded">Log In</Link> 
 <Link to="/signup" className="py-2 px-5 border rounded bg-blue text-white">Sing Up</Link> 
</div>:   <div className="text-base text-primary font-medium space-x-5 hidden lg:block">
   <button className="py-2 px-5 border rounded" onClick={handlelogout}>Log Out</button>
</div>
}

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
      <div className={`x-4 py-5 text-black bg-gray-200 border rounded-sm ${isMenuOpen ? "" : "hidden"}` }>
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