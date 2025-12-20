import { BookOpen, LayoutDashboard, LogOut, Settings, Users } from "lucide-react";
import { useContext } from "react";
import { Link, useLocation } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import toast from "react-hot-toast";
import { IoIosHome } from "react-icons/io";
 

function Aside() {
  const location = useLocation();
  const { role } = useContext(AuthContext);
   

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logout successful");
         
      })
      .catch(() => {
        toast.error("Logout failed!");
      });
  }

  const linkBase =
    "flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-300 text-sm font-medium";

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="min-h-screen w-64 bg-slate-900 text-slate-100 flex flex-col shadow-xl">
      <div className="px-6 py-5 text-2xl md:text-4xl font-bold tracking-wide border-b border-slate-700">
        BloodCare
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        <Link
          to="/dashboard"
          className={`${linkBase} ${
            isActive("/dashboard")
              ? "bg-indigo-600 text-white shadow-lg"
              : "text-slate-300 hover:bg-slate-800 hover:text-white"
          }`}
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        {role == "Donor" && (
          <Link
            to="/dashboard/add-request"
            className={`${linkBase} ${
              isActive("/dashboard/add-request")
                ? "bg-indigo-600 text-white shadow-lg"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <BookOpen size={20} />
            Add Request
          </Link>
        )}
        {role == "Donor" && (
          <Link
            to="/dashboard/my-request"
            className={`${linkBase} ${
              isActive("/dashboard/my-request")
                ? "bg-indigo-600 text-white shadow-lg"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <BookOpen size={20} />
            My Request
          </Link>
        )}

        {role == "admin" && (
          <Link
            to="/dashboard/all-users"
            className={`${linkBase} ${
              isActive("/dashboard/all-users")
                ? "bg-indigo-600 text-white shadow-lg"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <BookOpen size={20} />
            All Users
          </Link>
        )}
        {role == "admin" && (
          <Link
            to="/dashboard/all-request"
            className={`${linkBase} ${
              isActive("/dashboard/my-request")
                ? "bg-indigo-600 text-white shadow-lg"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <BookOpen size={20} />
            ALL Request
          </Link>
        )}

        {role == "volunteer" && (
          <Link
            to="/dashboard/all-request-volunteer"
            className={`${linkBase} ${
              isActive("/dashboard/my-request")
                ? "bg-indigo-600 text-white shadow-lg"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <BookOpen size={20} />
            ALL Request
          </Link>
        )}

        <Link
          to="/dashboard/my-profile"
          className={`${linkBase} ${
            isActive("/dashboard/my-profile")
              ? "bg-indigo-600 text-white shadow-lg"
              : "text-slate-300 hover:bg-slate-800 hover:text-white"
          }`}
        >
          <Users size={20} />
          Profile
        </Link>
      </nav>

      <div className="px-4 py-4 border-t border-slate-700 space-y-2">
        <Link
          to={"/"}
          className="flex w-full items-center gap-3 px-4 py-2 rounded-xl text-slate-300 hover:bg-red-600 hover:text-white transition"
        >
          <IoIosHome />
          Home
        </Link>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-4 py-2 rounded-xl text-slate-300 hover:bg-red-600 hover:text-white transition"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Aside;
