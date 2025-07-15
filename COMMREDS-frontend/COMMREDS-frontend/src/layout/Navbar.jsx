import React from "react";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}
        >
          <Link
            to="/"
            style={{
              color: "#fff",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              src="public/Logo.jpeg" // <-- Replace with your logo path
              alt="Logo"
              sx={{ height: 50, mr: 1 }}
            />
            COMMREDS
          </Link>
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/roadmaps">
            Roadmaps
          </Button>
          <Button color="inherit" component={Link} to="/hackathons">
            Hackathons
          </Button>
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
