import React from "react";
import { CustomCard, CustomButton } from "../components";

const DashboardPage = () => {
  const theme = {
    primary: "#FFD700", // Gold from logo
    secondary: "#1a237e", // Dark blue from logo  
    accent: "#4A90E2", // Professional blue
    light: "#F8F9FA", // Clean white
    gray: "#6C757D"
  };

  return (
    <div style={{
      background: "#F8F9FA",
      minHeight: "100vh",
      padding: "32px"
    }}>
      {/* Header */}
      <div style={{ 
        background: "white",
        padding: "24px",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        marginBottom: "32px",
        border: "1px solid #E9ECEF"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h1 style={{ 
            color: theme.secondary, 
            fontSize: "28px",
            fontWeight: "700",
            margin: "0 0 8px 0",
            display: "flex",
            alignItems: "center"
          }}>
            <span style={{ color: theme.primary, marginRight: "12px" }}>⚡</span>
            COMMREDS Dashboard
          </h1>
          <p style={{ 
            color: theme.gray, 
            fontSize: "16px",
            margin: 0,
            fontWeight: "400"
          }}>
            Connect. Learn. Grow. - Your Engineering Journey Starts Here
          </p>
        </div>
      </div>

      {/* Cards Grid */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
        gap: "24px",
        maxWidth: "1200px",
        margin: "0 auto"
      }}>
        <CustomCard
          title="📚 Learning Roadmaps"
          subtitle="Track your progress"
          color={{ main: theme.primary, light: theme.light }}
          hoverEffect
          progress={75}
          size = 'lg'
          actions={
            <CustomButton 
              size="sm" 
              style={{
                backgroundColor: theme.primary,
                color: theme.secondary,
                border: "none",
                padding: "8px 16px",
                borderRadius: "6px",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
                width: "100%"
              }}
            >
              Continue Learning
            </CustomButton>
          }
        >
          Follow structured learning paths designed by industry experts to master essential engineering skills.
        </CustomCard>

        <CustomCard
          title="🏆 Hackathons"
          subtitle="Join competitions"
          color={{ main: theme.accent, light: theme.light }}
          hoverEffect
          progress={60}
          size = 'lg'
          actions={
            <CustomButton 
              size="sm"
              style={{
                backgroundColor: theme.accent,
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "6px",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
                width: "100%"
              }}
            >
              View Challenges
            </CustomButton>
          }
        >
          Participate in coding competitions and hackathons to test your skills and win exciting prizes.
        </CustomCard>

        <CustomCard
          title="👨‍💼 Mentorship"
          subtitle="Get expert guidance"
          color={{ main: theme.secondary, light: theme.light }}
          hoverEffect
          size = 'lg'
          actions={
            <CustomButton 
              size="sm"
              style={{
                backgroundColor: theme.secondary,
                color: theme.primary,
                border: "none",
                padding: "8px 16px",
                borderRadius: "6px",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
                width: "100%"
              }}
            >
              Find a Mentor
            </CustomButton>
          }
        >
          Connect with experienced professionals who can guide your career development and skill growth.
        </CustomCard>

        <CustomCard
          title="🤝 Network Hub"
          subtitle="Professional connections"
          color={{ main: theme.primary, light: theme.light }}
          hoverEffect
          size = 'lg'
          actions={
            <CustomButton 
              size="sm"
              style={{
                backgroundColor: theme.primary,
                color: theme.secondary,
                border: "none",
                padding: "8px 16px",
                borderRadius: "6px",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
                width: "100%"
              }}
            >
              Explore Network
            </CustomButton>
          }
        >
          Build meaningful connections with fellow engineers and expand your professional network.
        </CustomCard>

        <CustomCard
          title="📖 Resources"
          subtitle="Knowledge library"
          color={{ main: theme.accent, light: theme.light }}
          hoverEffect
          progress={40}
          size = 'lg'
          actions={
            <CustomButton 
              size="sm"
              style={{
                backgroundColor: theme.accent,
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "6px",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
                width: "100%"
              }}
            >
              Browse Resources
            </CustomButton>
          }
        >
          Access curated learning materials, documentation, and tools to enhance your engineering knowledge.
        </CustomCard>

        <CustomCard
          title="🎯 Achievements"
          subtitle="Track milestones"
          color={{ main: theme.secondary, light: theme.light }}
          hoverEffect
          progress={85}
          size = 'lg'
          actions={
            <CustomButton 
              size="sm"
              style={{
                backgroundColor: theme.secondary,
                color: theme.primary,
                border: "none",
                padding: "8px 16px",
                borderRadius: "6px",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
                width: "100%"
              }}
            >
              View All
            </CustomButton>
          }
        >
          Monitor your learning progress and celebrate achievements as you advance through your journey.
        </CustomCard>
      </div>
    </div>
  );
};

export default DashboardPage;