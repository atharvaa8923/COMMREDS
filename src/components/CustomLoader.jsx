import React from "react";
import { CircularProgress, Box } from "@mui/material";

/**
 * A universal loader/spinner component.
 */
const CustomLoader = ({
  size = 40,
  color = "primary",
  sx = {},
  ...props
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...sx,
      }}
      {...props}
    >
      <CircularProgress size={size} color={color} />
    </Box>
  );
};

export default CustomLoader;
