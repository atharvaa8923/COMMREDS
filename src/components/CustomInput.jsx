import React from "react";
import { TextField, InputAdornment } from "@mui/material";

/**
 * A universal input field supporting adornments and dynamic styles.
 */
const CustomInput = ({
  label,
  type = "text",
  size = "medium", // small | medium
  startIcon,
  endIcon,
  fullWidth = true,
  sx = {},
  ...props
}) => {
  return (
    <TextField
      label={label}
      type={type}
      size={size}
      fullWidth={fullWidth}
      InputProps={{
        startAdornment: startIcon && (
          <InputAdornment position="start">{startIcon}</InputAdornment>
        ),
        endAdornment: endIcon && (
          <InputAdornment position="end">{endIcon}</InputAdornment>
        ),
      }}
      sx={{
        borderRadius: 2,
        ...sx,
      }}
      {...props}
    />
  );
};

export default CustomInput;
