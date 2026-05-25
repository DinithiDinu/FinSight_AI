function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">

      <h1 className="text-4xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6">

        <div className="bg-gray-900 p-6 rounded-2xl">
          <h2 className="text-gray-400">
            Total Balance
          </h2>

          <p className="text-3xl font-bold mt-2">
            Rs. 25,000
          </p>
        </div>

        <div className="bg-gray-900 p-6 rounded-2xl">
          <h2 className="text-gray-400">
            Income
          </h2>

          <p className="text-3xl font-bold mt-2 text-green-400">
            Rs. 40,000
          </p>
        </div>

        <div className="bg-gray-900 p-6 rounded-2xl">
          <h2 className="text-gray-400">
            Expenses
          </h2>

          <p className="text-3xl font-bold mt-2 text-red-400">
            Rs. 15,000
          </p>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;