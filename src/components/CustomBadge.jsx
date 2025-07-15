import React from "react";
import { Chip } from "@mui/material";

/**
 * A universal badge/tag component.
 */
const CustomBadge = ({
  label,
  color = "primary", // primary | secondary | success | error
  variant = "filled", // filled | outlined
  size = "medium", // small | medium
  onDelete,
  sx = {},
  ...props
}) => {
  return (
    <Chip
      label={label}
      color={color}
      variant={variant === "outlined" ? "outlined" : "filled"}
      size={size}
      onDelete={onDelete}
      sx={{
        borderRadius: 1,
        ...sx,
      }}
      {...props}
    />
  );
};

export default CustomBadge;
