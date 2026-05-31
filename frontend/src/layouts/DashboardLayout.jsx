import Sidebar from "../components/Sidebar";

function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-950">
      <Sidebar />

      <main
        className="
          flex-1
          p-4
          md:p-8
          overflow-x-hidden
        "
      >
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;