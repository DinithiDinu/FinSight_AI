import Sidebar from "../components/Sidebar";

function DashboardLayout({ children }) {

  return (
    <div className="flex bg-slate-100">

       <Sidebar />

      <main className="flex-1 p-8">

        {children}

      </main>

    </div>
  );
}

export default DashboardLayout;