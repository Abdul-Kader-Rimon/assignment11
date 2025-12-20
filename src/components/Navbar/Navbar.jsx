import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { Link, useNavigate } from 'react-router';

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext)
  
  const navigate = useNavigate();

  const handleDonateClick = () => {
     if (!user) {
       navigate("/login");
     } else {
       navigate("/donate");
     }
  }
  
    return (
      <div className="navbar  mb-5 border-b-1 border-[#422ad5] ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to={"/all-pending-request"}>All Request</Link>
              </li>

              <li>
                <Link to={"/search"}>Search</Link>
              </li>
              <li>
                <button onClick={handleDonateClick}>Donate</button>
              </li>
            </ul>
          </div>
          <Link
            to={"/"}
            className="btn btn-ghost text-2xl font-bold text-[#422ad5]"
          >
            BloodCare
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/all-pending-request"}>All Request</Link>
            </li>

            <li>
              <Link to={"/search"}>Search</Link>
            </li>
            <li>
              <button onClick={handleDonateClick}>Donate</button>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <Link to={"dashboard"} className="btn mr-2">
            Deshboard
          </Link>
          {user ? (
            <button onClick={signOutUser} className="btn">
              LogOut
            </button>
          ) : (
            <Link to={"/login"} className="btn">
              LogIn
            </Link>
          )}
        </div>
      </div>
    );
};

export default Navbar;