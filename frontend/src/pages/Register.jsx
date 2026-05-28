import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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

      await API.post(
        "/auth/register",
        formData
      );

      alert("Registration successful!");

      navigate("/");

    } catch (error) {

      alert("Registration failed");

      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-slate-800">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Create Account
        </h1>

        <form
          className="space-y-4"
          onSubmit={handleSubmit}
        >

          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-slate-50 border border-slate-200"
          />

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