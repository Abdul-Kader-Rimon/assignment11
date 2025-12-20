import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { Link, useNavigate } from 'react-router';
import { CiLogout } from 'react-icons/ci';
 
import { MdDashboard } from 'react-icons/md';
import { IoLogIn } from 'react-icons/io5';
import { FaRegIdBadge, FaRegUserCircle } from 'react-icons/fa';
import toast from 'react-hot-toast';


const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext)
  const [authOpen , setAuthOpen] = useState(false)
  const navigate = useNavigate();

  const handleDonateClick = () => {
     if (!user) {
       navigate("/login");
     } else {
       navigate("/donate");
     }
  }
  const handleLogout = () => {
    signOutUser()
      .then(() => {
        toast.success("Logout successful");
        navigate("/login");
      })
      .catch(() => {
        toast.error("Logout failed!");
      });
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
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
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
          {!user ? (
            <>
              <div className="hidden md:flex gap-2">
                <Link
                  to={"/login"}
                  className="btn  border-2 border-[#422ad5]   "
                >
                  <IoLogIn color="#422ad5" size={20} strokeWidth={2.5} /> Login
                </Link>
                <Link
                  to={"/register"}
                  className="btn   border-2 border-[#422ad5]    "
                >
                  <FaRegIdBadge color="#422ad5" size={20} strokeWidth={2.5} />{" "}
                  Ragistation
                </Link>
              </div>

              <div className="md:hidden relative">
                <button
                  onClick={() => setAuthOpen(!authOpen)}
                  className="btn btn-ghost btn-circle text-2xl"
                >
                  <FaRegUserCircle
                    color="#422ad5"
                    size={30}
                    strokeWidth={2.5}
                  />
                </button>
                {authOpen && (
                  <div className="absolute space-y-2 right-0 mt-2 w-40 bg-base-100 shadow-lg rounded-lg p-2 z-50">
                    <Link
                      to="/login"
                      className="btn text-black  flex items-center gap-2 py-2 px-3 rounded hover:bg-purple-100  border-2 border-[#422ad5]  "
                      onClick={() => setAuthOpen(false)}
                    >
                      <IoLogIn color="#422ad5" size={20} strokeWidth={2.5} />{" "}
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="btn text-black flex items-center gap-2 py-2 px-3 rounded hover:bg-purple-100  border-2 border-[#422ad5]  "
                      onClick={() => setAuthOpen(false)}
                    >
                      <FaRegIdBadge
                        color="#422ad5"
                        size={20}
                        strokeWidth={2.5}
                      />
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    src={user.photoURL || "https://i.ibb.co/Zm8XKxv/user.png"}
                    alt="user"
                  />
                </div>
              </div>

              <ul className="menu dropdown-content mt-3 p-4 shadow bg-base-100 rounded-box w-64">
                <div className="flex items-center gap-3 border-b border-[#422ad5] pb-3">
                  <img
                    src={user.photoURL || "https://i.ibb.co/Zm8XKxv/user.png"}
                    className="w-12 h-12 rounded-full"
                    alt=""
                  />
                  <div>
                    <p className="font-bold text-lg text-[#422ad5]">
                      {user.displayName}
                    </p>
                    <p className="text-sm">{user.email}</p>
                  </div>
                </div>

                <li className="mt-2">
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-1 text-lg font-bold"
                  >
                    <MdDashboard color="#422ad5" size={20} />
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    className="flex items-center gap-1 text-lg font-bold"
                    onClick={handleLogout}
                  >
                    <CiLogout color="#422ad5" size={20} strokeWidth={2.5} />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    );
};

export default Navbar;