import React from "react";
import { Box, Typography } from "@mui/material";
import { CustomButton } from "../components";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        p: 3,
      }}
    >
      <Typography variant="h2" color="error" gutterBottom>
        ❌ 404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Oops! The page you're looking for doesn't exist.
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={3}>
        Maybe you mistyped the URL or followed a broken link.
      </Typography>

      <CustomButton
        size="large"
        color="primary"
        onClick={() => navigate("/")}
      >
        🔙 Go Back Home
      </CustomButton>
    </Box>
  );
};

export default NotFoundPage;
