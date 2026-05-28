import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await API.post(
        "/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        response.data.access_token
      );

      alert("Login successful!");

      navigate("/dashboard");

    } catch (error) {

      alert("Invalid credentials");

      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-slate-800">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">

        <h1 className="text-3xl font-bold mb-6 text-center">
          FinSight AI
        </h1>

        <form
          className="space-y-4"
          onSubmit={handleSubmit}
        >

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-slate-50 border border-slate-200"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-slate-50 border border-slate-200"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-200 p-3 rounded-lg font-semibold"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;