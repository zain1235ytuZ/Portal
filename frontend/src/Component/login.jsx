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
      const response = await axios.post("http://localhost:8000/api/v1/token/", formData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      });
      
      if (response.status === 200) {
        const { access, refresh } = response.data;
        
        if (!access || !refresh) {
          throw new Error("Invalid response from server: Missing tokens");
        }
        
        // Store tokens in localStorage
        localStorage.setItem("access_token", access);
        localStorage.setItem("refresh_token", refresh);
        
        // Set default Authorization header for future requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
        
        // Update auth state
        setIsLoggedIn(true);
        toast.success("Login successful!");
        
        // Redirect to dashboard after successful login
        navigate("/dashboard");
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (error) {
      console.error("Login error:", error);
      
      let errorMessage = "Login failed. Please try again.";
      
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const { status, data } = error.response;
        
        if (status === 401) {
          errorMessage = "Invalid username or password";
        } else if (status === 400) {
          errorMessage = data.detail || "Invalid request";
        } else if (status >= 500) {
          errorMessage = "Server error. Please try again later.";
        }
      } else if (error.request) {
        // The request was made but no response was received
        errorMessage = "No response from server. Please check your connection.";
      }
      
      toast.error(errorMessage);
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
