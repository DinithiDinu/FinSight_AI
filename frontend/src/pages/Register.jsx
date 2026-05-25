function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">

      <div className="bg-gray-900 p-8 rounded-2xl shadow-lg w-96">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Create Account
        </h1>

        <form className="space-y-4">

          <input
            type="text"
            placeholder="Name"
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700"
          />

          <button
            className="w-full bg-purple-600 hover:bg-purple-700 p-3 rounded-lg font-semibold"
          >
            Register
          </button>

        </form>

      </div>

    </div>
  );
}

export default Register;