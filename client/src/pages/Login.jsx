import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { Link, useNavigate } from "react-router-dom";

const Login = ({setUser}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Reader",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/auth/login", formData);
      console.log(res.data);
      if (!res.data.success) {
        return alert(res?.data?.message);
      }
      setUser(res.data.user); 
      localStorage.setItem("user", JSON.stringify(res.data.user))
      navigate("/");
    } catch (error) {
      alert(error?.response?.data?.message || "Signup failed");
    }
  };
  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow border border-gray-100">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
       Welcome Back
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <input
          type="email"
          name="email"
          id="email"
          onChange={handleChange}
          required
          placeholder="Full Email"
          className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
          required
          placeholder="Full Password"
          className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-bold py-2 rounded hover:bg-indigo-800 transition"
        >
         Login
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600 ">
        Don't have an Account?{" "}
        <Link to="/signup" className="text-indigo-600 hover:underline">
          SignUP here
        </Link>{" "}
      </p>
    </div>
  );
};

export default Login;
