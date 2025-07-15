import React, { useState } from "react";
import { CustomInput, CustomButton, CustomCard } from "../components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    role: "student", // default role
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      await axios.post("http://127.0.0.1:8000/user/register/", form);
      navigate("/login"); // Redirect to login on success
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
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
        maxWidth: "480px",
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
            Create Account
          </h1>
          <p style={{ 
            color: "#6B7280", 
            fontSize: "16px", 
            margin: 0,
            fontWeight: "400"
          }}>
            Join the engineering community today
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

        {/* Registration Form */}
        <form onSubmit={handleSubmit} style={{ marginBottom: "32px" }}>
          {/* Name Fields Row */}
          <div style={{ 
            display: "flex", 
            gap: "16px", 
            marginBottom: "24px" 
          }}>
            <div style={{ flex: 1 }}>
              <CustomInput
                label="First Name"
                type="text"
                name="first_name"
                value={form.first_name}
                onChange={handleChange}
                required
                placeholder="Enter first name"
              />
            </div>
            <div style={{ flex: 1 }}>
              <CustomInput
                label="Last Name"
                type="text"
                name="last_name"
                value={form.last_name}
                onChange={handleChange}
                required
                placeholder="Enter last name"
              />
            </div>
          </div>

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

          <div style={{ marginBottom: "24px" }}>
            <CustomInput
              label="Password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Create a password"
            />
          </div>

          <div style={{ marginBottom: "32px" }}>
            <label style={{
              display: "block",
              marginBottom: "8px",
              color: "#374151",
              fontSize: "14px",
              fontWeight: "600"
            }}>
              Role *
            </label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "2px solid #E5E7EB",
                borderRadius: "8px",
                fontSize: "16px",
                color: "#374151",
                background: "white",
                cursor: "pointer",
                transition: "border-color 0.2s ease"
              }}
              onFocus={(e) => e.target.style.borderColor = "#3B82F6"}
              onBlur={(e) => e.target.style.borderColor = "#E5E7EB"}
            >
              <option value="student">Student</option>
              <option value="mentor">Mentor</option>
            </select>
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
            {loading ? "Creating Account..." : "Create Account"}
          </CustomButton>
        </form>

        {/* Login Link */}
        <div style={{ textAlign: "center" }}>
          <p style={{ 
            color: "#6B7280", 
            fontSize: "15px", 
            margin: 0,
            fontWeight: "400"
          }}>
            Already have an account?{" "}
            <a 
              href="/login"
              style={{
                color: "#3B82F6",
                textDecoration: "none",
                fontWeight: "600",
                transition: "color 0.2s ease"
              }}
            >
              Sign in here
            </a>
          </p>
        </div>
      </CustomCard>
    </div>
  );
};

export default RegisterPage;