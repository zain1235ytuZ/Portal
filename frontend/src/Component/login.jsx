import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Authprovider";
import { useContext } from "react";
function LoginForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { isLoggedIn,setIsLoggedIn } = useContext(AuthContext);
  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/v1/token/", formData);
      if (response.status === 200 || response.status === 201) {
        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);
        toast.success("Login successful!");
        setIsLoggedIn(true);
        navigate("/");  // Redirect to home page after successful login
      } else {
        toast.error("Login failed. Please check your credentials.");
        // Optionally redirect here
      }
    } catch (error) {
      if (error.response) {
        const errorMsg = typeof error.response.data === "string"
          ? error.response.data
          : JSON.stringify(error.response.data);
        toast.error("Login failed: " + errorMsg);
      } else {
        toast.error("Login failed. Please try again.");
      }
    }
  };

  return (
   <div  style={{
          backgroundColor: "white",
        }}
   >
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h3 className="text-center mb-4">Welcome back!</h3>
          <form onSubmit={handleSubmit} className="border p-4 rounded shadow">
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
            <p className="mt-3 text-center">
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
}

export default LoginForm;
