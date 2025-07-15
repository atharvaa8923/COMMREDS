import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        textAlign: "center",
        py: 2,
        backgroundColor: "#f5f5f5",
        mt: "auto",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} COMMREDS. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
