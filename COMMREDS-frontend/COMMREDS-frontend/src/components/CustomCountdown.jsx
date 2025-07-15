import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";

/**
 * A universal countdown timer.
 */
const CustomCountdown = ({ endTime, onEnd, size = "medium", sx = {} }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const diff = new Date(endTime) - new Date();
      if (diff <= 0) {
        clearInterval(timer);
        setTimeLeft("Event Started");
        onEnd && onEnd();
        return;
      }
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    }, 1000);
    return () => clearInterval(timer);
  }, [endTime, onEnd]);

  return (
    <Typography
      variant={size === "small" ? "body2" : "body1"}
      sx={{ ...sx }}
    >
      {timeLeft}
    </Typography>
  );
};

export default CustomCountdown;
