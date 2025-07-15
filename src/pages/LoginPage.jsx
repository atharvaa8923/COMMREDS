import React, { useState } from "react";
import { CustomInput, CustomButton, CustomCard } from "../components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      const res = await axios.post("http://127.0.0.1:8000/user/login/", form);
      localStorage.setItem("access_token", res.data.tokens.access);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #3B82F6 0%, #1E40AF 50%, #1E3A8A 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px"
    }}>
      <CustomCard
      size = {{height: "80%"}}
      sx={{
        maxWidth: "450px",
        width: "100%",
        padding: "48px",
        background: "white",
        borderRadius: "16px",
        boxShadow: "0 25px 50px rgba(0, 0, 0, 0.2)"
      }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "24px"
          }}>
            <span style={{ 
              color: "#FFD700", 
              fontSize: "36px", 
              marginRight: "12px",
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
            }}>⚡</span>
            <span style={{ 
              fontSize: "28px", 
              fontWeight: "700", 
              color: "#1E40AF",
              letterSpacing: "-0.5px"
            }}>COMMREDS</span>
          </div>
          <h1 style={{
            fontSize: "32px",
            fontWeight: "700",
            color: "#1E40AF",
            margin: "0 0 12px 0",
            letterSpacing: "-0.5px"
          }}>
            Welcome Back
          </h1>
          <p style={{ 
            color: "#6B7280", 
            fontSize: "16px", 
            margin: 0,
            fontWeight: "400"
          }}>
            Sign in to your account to continue
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div style={{
            background: "linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%)",
            color: "#DC2626",
            padding: "16px 20px",
            borderRadius: "12px",
            border: "1px solid #FCA5A5",
            marginBottom: "32px",
            fontSize: "14px",
            fontWeight: "500"
          }}>
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ marginBottom: "32px" }}>
          <div style={{ marginBottom: "24px" }}>
            <CustomInput
              label="Email Address"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <CustomInput
              label="Password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>

          <div style={{ textAlign: "right", marginBottom: "32px" }}>
            <a 
              href="/forgot-password"
              style={{
                color: "#3B82F6",
                fontSize: "14px",
                textDecoration: "none",
                fontWeight: "600",
                transition: "color 0.2s ease"
              }}
            >
              Forgot your password?
            </a>
          </div>

          <CustomButton 
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              background: loading ? "#9CA3AF" : "linear-gradient(135deg, #FFD700 0%, #FFC107 100%)",
              color: "#1E40AF",
              fontWeight: "700",
              padding: "16px 24px",
              fontSize: "16px",
              borderRadius: "12px",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.3s ease",
              boxShadow: loading ? "none" : "0 4px 12px rgba(255, 215, 0, 0.3)"
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </CustomButton>
        </form>

        {/* Sign Up Link */}
        <div style={{ textAlign: "center" }}>
          <p style={{ 
            color: "#6B7280", 
            fontSize: "15px", 
            margin: 0,
            fontWeight: "400"
          }}>
            Don't have an account?{" "}
            <a 
              href="/register"
              style={{
                color: "#3B82F6",
                textDecoration: "none",
                fontWeight: "600",
                transition: "color 0.2s ease"
              }}
            >
              Create one here
            </a>
          </p>
        </div>
      </CustomCard>
    </div>
  );
};

export default LoginPage;