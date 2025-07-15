import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

/**
 * A universal modal with support for custom size and dynamic actions.
 */
const CustomModal = ({
  open,
  onClose,
  title,
  size = "md", // 'sm' | 'md' | 'lg'
  children,
  actions,
  sx = {},
  ...props
}) => {
  const maxWidth = size === "sm" ? "xs" : size === "lg" ? "md" : "sm";

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={maxWidth}
      sx={{
        "& .MuiDialog-paper": { borderRadius: 3, ...sx },
      }}
      {...props}
    >
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>{children}</DialogContent>
      {actions && <DialogActions>{actions}</DialogActions>}
    </Dialog>
  );
};

export default CustomModal;
