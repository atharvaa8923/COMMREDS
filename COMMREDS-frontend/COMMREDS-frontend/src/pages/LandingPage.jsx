import React from "react";
import { CustomButton, CustomCard } from "../components";

const LandingPage = () => {
  const theme = {
    primary: "#FFD700", // Gold from logo
    secondary: "#1a237e", // Dark blue from logo
    accent: "#4A90E2", // Professional blue
    light: "#F8F9FA",
    gray: "#6C757D",
    dark: "#2C3E50"
  };

  const FeatureCard = ({ icon, title, description }) => (
    <CustomCard
      title={title}
      color={{ main: theme.primary, light: theme.light }}
      hoverEffect
    >
      <div style={{ textAlign: "center", padding: "20px 0" }}>
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>{icon}</div>
        <p style={{ color: theme.gray, fontSize: "14px", lineHeight: "1.6" }}>
          {description}
        </p>
      </div>
    </CustomCard>
  );

  return (
    <div style={{ background: "#FFFFFF" }}>
      {/* Hero Section */}
      <div style={{
        background: `linear-gradient(135deg, ${theme.secondary} 0%, ${theme.accent} 100%)`,
        color: "white",
        padding: "100px 24px",
        textAlign: "center"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h1 style={{
            fontSize: "48px",
            fontWeight: "700",
            margin: "0 0 16px 0",
            lineHeight: "1.2"
          }}>
            Welcome to <span style={{ color: theme.primary }}>COMMREDS</span>
          </h1>
          <p style={{
            fontSize: "20px",
            margin: "0 0 32px 0",
            opacity: 0.9,
            maxWidth: "600px",
            marginLeft: "auto",
            marginRight: "auto"
          }}>
            The complete platform for engineering excellence. Connect with peers, follow structured learning paths, and accelerate your career growth.
          </p>
          <CustomButton 
            size="large"
            style={{
              backgroundColor: theme.primary,
              color: theme.secondary,
              padding: "16px 32px",
              fontSize: "18px",
              fontWeight: "600",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}
          >
            Start Your Journey
          </CustomButton>
        </div>
      </div>

      {/* Stats Section */}
      <div style={{
        background: theme.light,
        padding: "60px 24px",
        borderBottom: "1px solid #E9ECEF"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "40px",
            textAlign: "center"
          }}>
            <div>
              <h3 style={{ fontSize: "36px", color: theme.primary, margin: "0 0 8px 0", fontWeight: "700" }}>50K+</h3>
              <p style={{ color: theme.gray, fontSize: "16px", margin: 0 }}>Active Engineers</p>
            </div>
            <div>
              <h3 style={{ fontSize: "36px", color: theme.primary, margin: "0 0 8px 0", fontWeight: "700" }}>200+</h3>
              <p style={{ color: theme.gray, fontSize: "16px", margin: 0 }}>Learning Roadmaps</p>
            </div>
            <div>
              <h3 style={{ fontSize: "36px", color: theme.primary, margin: "0 0 8px 0", fontWeight: "700" }}>500+</h3>
              <p style={{ color: theme.gray, fontSize: "16px", margin: 0 }}>Hackathons Hosted</p>
            </div>
            <div>
              <h3 style={{ fontSize: "36px", color: theme.primary, margin: "0 0 8px 0", fontWeight: "700" }}>1K+</h3>
              <p style={{ color: theme.gray, fontSize: "16px", margin: 0 }}>Expert Mentors</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <h2 style={{
              fontSize: "36px",
              color: theme.secondary,
              fontWeight: "700",
              margin: "0 0 16px 0"
            }}>
              Why Choose COMMREDS?
            </h2>
            <p style={{
              fontSize: "18px",
              color: theme.gray,
              margin: 0,
              maxWidth: "600px",
              marginLeft: "auto",
              marginRight: "auto"
            }}>
              Everything you need to excel in your engineering career, all in one comprehensive platform.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "32px"
          }}>
            <FeatureCard
              icon="🗺️"
              title="Structured Learning Roadmaps"
              description="Follow expertly crafted learning paths tailored to your career goals. From beginner to advanced, we've got you covered."
            />
            <FeatureCard
              icon="🏆"
              title="Competitive Hackathons"
              description="Test your skills in real-world challenges. Win prizes, build your portfolio, and gain recognition in the engineering community."
            />
            <FeatureCard
              icon="👨‍💼"
              title="Expert Mentorship"
              description="Connect with industry veterans who can guide your career path and provide invaluable insights from their experience."
            />
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div style={{
        background: theme.light,
        padding: "80px 24px"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{
            fontSize: "36px",
            color: theme.secondary,
            fontWeight: "700",
            textAlign: "center",
            margin: "0 0 60px 0"
          }}>
            How It Works
          </h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "40px"
          }}>
            <div style={{ textAlign: "center" }}>
              <div style={{
                background: theme.primary,
                color: theme.secondary,
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                fontWeight: "700",
                margin: "0 auto 20px auto"
              }}>1</div>
              <h3 style={{ color: theme.secondary, fontSize: "20px", margin: "0 0 12px 0" }}>Sign Up</h3>
              <p style={{ color: theme.gray, fontSize: "14px", lineHeight: "1.6" }}>
                Create your account and set up your professional profile
              </p>
            </div>

            <div style={{ textAlign: "center" }}>
              <div style={{
                background: theme.primary,
                color: theme.secondary,
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                fontWeight: "700",
                margin: "0 auto 20px auto"
              }}>2</div>
              <h3 style={{ color: theme.secondary, fontSize: "20px", margin: "0 0 12px 0" }}>Choose Path</h3>
              <p style={{ color: theme.gray, fontSize: "14px", lineHeight: "1.6" }}>
                Select learning roadmaps that align with your career goals
              </p>
            </div>

            <div style={{ textAlign: "center" }}>
              <div style={{
                background: theme.primary,
                color: theme.secondary,
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                fontWeight: "700",
                margin: "0 auto 20px auto"
              }}>3</div>
              <h3 style={{ color: theme.secondary, fontSize: "20px", margin: "0 0 12px 0" }}>Learn & Grow</h3>
              <p style={{ color: theme.gray, fontSize: "14px", lineHeight: "1.6" }}>
                Engage with content, participate in hackathons, and connect with mentors
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div style={{
        background: theme.secondary,
        color: "white",
        padding: "80px 24px",
        textAlign: "center"
      }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2 style={{
            fontSize: "36px",
            fontWeight: "700",
            margin: "0 0 16px 0"
          }}>
            Ready to Accelerate Your Engineering Career?
          </h2>
          <p style={{
            fontSize: "18px",
            margin: "0 0 32px 0",
            opacity: 0.9
          }}>
            Join thousands of engineers who are already advancing their careers with COMMREDS.
          </p>
          <CustomButton 
            size="large"
            style={{
              backgroundColor: theme.primary,
              color: theme.secondary,
              padding: "16px 32px",
              fontSize: "18px",
              fontWeight: "600",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              marginRight: "16px"
            }}
          >
            Get Started Now
          </CustomButton>
          <CustomButton 
            size="large"
            style={{
              backgroundColor: "transparent",
              color: "white",
              padding: "16px 32px",
              fontSize: "18px",
              fontWeight: "600",
              border: "2px solid white",
              borderRadius: "8px",
              cursor: "pointer"
            }}
          >
            Learn More
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;