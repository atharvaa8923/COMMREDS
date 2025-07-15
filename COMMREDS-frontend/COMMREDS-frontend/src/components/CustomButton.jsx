import React from "react";
import { Button as MuiButton, CircularProgress } from "@mui/material";

/**
 * A universal button with full customization support.
 */
const CustomButton = ({
  children,
  variant = "contained", // 'contained' | 'outlined' | 'text'
  color = "primary", // primary | secondary | error | etc.
  size = "medium", // small | medium | large
  startIcon,
  endIcon,
  loading = false,
  fullWidth = false,
  hoverEffect = true,
  sx = {},
  ...props
}) => {
  return (
    <MuiButton
      variant={variant}
      color={color}
      size={size}
      startIcon={startIcon}
      endIcon={endIcon}
      fullWidth={fullWidth}
      sx={{
        borderRadius: 2,
        textTransform: "none",
        transition: "all 0.3s ease",
        ...(hoverEffect && {
          "&:hover": {
            transform: "translateY(-1px)",
            boxShadow: "0 3px 6px rgba(0,0,0,0.2)",
          },
        }),
        ...sx,
      }}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? <CircularProgress size={20} color="inherit" /> : children}
    </MuiButton>
  );
};

export default CustomButton;