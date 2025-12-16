import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router";

import { FaEye, FaGoogle } from "react-icons/fa";
 

import { IoEyeOff } from "react-icons/io5";
import toast from "react-hot-toast";
import { AuthContext } from "../Context/AuthContext";

const Login = () => {
  const [show, setShow] = useState(false);
  const { signInUser  } = useContext(AuthContext);
  useEffect(() => {
    document.title = "Login";
  }, []);

  const location = useLocation();
  const navigate = useNavigate();
  // console.log(location);

  const handleLogIn = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    const regExp = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (!regExp.test(password)) {
      toast.error(
        "Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter"
      );
      return;
    }
    // console.log(email, password);
    signInUser(email, password)
      .then((result) => {
        // console.log(result.user);
        event.target.reset();
        toast.success(" Login successfully!", { id: "create-user" });
        navigate(location.state || "/");
      })
      .catch((error) => {
        // console.log(error);
        toast.error(error.message);
      });
  };

 

  return (
    <div className="card bg-base-100  w-full mx-auto max-w-sm shrink-0 shadow-2xl border mt-12 border-gray-200">
      <div className="card-body">
        <h1 className="text-3xl font-bold text-center">Login</h1>
        <form onSubmit={handleLogIn}>
          <fieldset className="fieldset">
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                className="input rounded-full focus:border-0 focus:outline-gray-200"
                placeholder="Email"
              />
            </div>
            <div className="relative">
              <label className="label">Password</label>
              <input
                type={show ? "text" : "password"}
                name="password"
                className="input rounded-full focus:border-0 focus:outline-gray-200"
                placeholder="Password"
              />

              <span
                onClick={() => setShow(!show)}
                className="absolute right-[25px] top-[30px] cursor-pointer z-50"
              >
                {show ? <FaEye size={18} /> : <IoEyeOff size={18} />}
              </span>
            </div>
            <div>
              <NavLink to={"/forgetpassword"} className="link link-hover">
                Forgot password?
              </NavLink>
            </div>
            <button className="btn button text-black  mt-4 rounded-full ">
              Login
            </button>
          </fieldset>
        </form>

 
        <p className="text-center">
          New to our website? Please{" "}
          <Link
            className="text-blue-500 hover:text-blue-800"
            to="/register"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
