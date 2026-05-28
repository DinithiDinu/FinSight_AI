import { Link, useLocation } from "react-router-dom";

function Sidebar() {

  const location = useLocation();

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      name: "Transactions",
      path: "/transactions",
    },
  ];

  const handleLogout = () => {

    localStorage.removeItem("token");

    window.location.href = "/";
  };

  return (
    <div className="w-72 min-h-screen bg-white border-r border-slate-200 p-6 flex flex-col">

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

        {navItems.map((item) => (

          <Link
            key={item.path}
            to={item.path}
            className={`block p-4 rounded-2xl transition-all duration-200 font-medium
              
              ${
                location.pathname === item.path
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-700"
              }
            `}
          >
            {item.name}
          </Link>

        ))}

      </div>

      {/* LOGOUT */}
      <div className="mt-auto">

        <button
          onClick={handleLogout}
          className="w-full bg-rose-500 hover:bg-rose-600 text-white p-4 rounded-2xl transition-all duration-200"
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Sidebar;