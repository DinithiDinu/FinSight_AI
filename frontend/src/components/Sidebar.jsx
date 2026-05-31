import {
  LayoutDashboard,
  Receipt,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useState } from "react";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Transactions",
      path: "/transactions",
      icon: Receipt,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      {/* MOBILE MENU BUTTON */}
      <button
        onClick={() =>
          setMobileOpen(!mobileOpen)
        }
        className="
          md:hidden
          fixed
          top-4
          left-4
          z-50
          bg-white
          p-3
          rounded-xl
          shadow
          border
        "
      >
        {mobileOpen ? (
          <X size={20} />
        ) : (
          <Menu size={20} />
        )}
      </button>

      {/* SIDEBAR */}
      <div
        className={`
          fixed
          md:relative
          z-40
          w-72
          min-h-screen
          bg-white
          border-r
          border-slate-200
          p-6
          flex
          flex-col
          transition-transform
          duration-300
          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        {/* LOGO */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-blue-600">
            FinSight AI
          </h1>

          <p className="text-slate-500 mt-2">
            Finance Intelligence
          </p>
        </div>

        {/* NAVIGATION */}
        <div className="space-y-3">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() =>
                  setMobileOpen(false)
                }
                className={`block p-4 rounded-2xl transition-all duration-200 font-medium
                  ${
                    location.pathname === item.path
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <Icon size={20} />
                  <span>{item.name}</span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* LOGOUT */}
        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="w-full bg-rose-500 hover:bg-rose-600 text-white p-4 rounded-2xl transition-all duration-200"
          >
            <div className="flex items-center justify-center gap-2">
              <LogOut size={18} />
              <span>Logout</span>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;