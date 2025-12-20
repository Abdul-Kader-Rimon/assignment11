import { useState } from "react";
import { Outlet } from "react-router";
import Aside from "../components/Aside/Aside";
import { Menu, X } from "lucide-react";

const DashboardLayOut = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen relative">
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}
      <div
        className={`fixed md:static z-50 transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >
        <Aside />
      </div>
      <div className="flex-1 p-5">
        <div className="md:hidden mb-4">
          <button
            onClick={() => setOpen(!open)}
            className="btn btn-sm bg-[#422ad5] text-white"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayOut;
