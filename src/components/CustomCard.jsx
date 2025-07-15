import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Box,
  LinearProgress,
  Fade,
} from "@mui/material";

/**
 * A universal and highly customizable Card component.
 * Supports title, subtitle, icons, progress bars, hover effects, and dynamic sizing.
 */
const CustomCard = ({
  title,
  subtitle,
  icon: Icon,
  progress,
  color = { main: "#2196f3", light: "#64b5f6" }, // main + light variant
  delay = 0,
  children,
  actions,
  size = "md", // 'sm' | 'md' | 'lg' | { height, width }
  elevation = 1,
  hoverEffect = true,
  border = true,
  onClick,
  headerPadding = true,
  contentPadding = true,
  contentStyle = {},
  style = {},
  sx = {},
  ...props
}) => {
  const sizeStyles = {
    sm: { height: 120, width: 240 },
    md: { height: 180, width: 320 },
    lg: { height: 240, width: 400 },
  };

  const resolvedSize = typeof size === "string" ? sizeStyles[size] || {} : size;

  return (
    <Fade in={true} timeout={600} style={{ transitionDelay: `${delay}ms` }}>
      <Card
        elevation={elevation}
        onClick={onClick}
        sx={{
          ...resolvedSize,
          border: border ? `1px solid ${color.main}20` : "none",
          borderRadius: 3,
          transition: "all 0.3s ease",
          cursor: onClick ? "pointer" : "default",
          background: `linear-gradient(135deg, ${color.main}15, ${color.light}08)`,
          ...(hoverEffect && {
            "&:hover": {
              transform: "translateY(-3px)",
              boxShadow: `0px 6px 15px ${color.main}25`,
              border: `1px solid ${color.main}40`,
            },
          }),
          position: "relative",
          overflow: "hidden",
          ...sx,
        }}
        style={style}
        {...props}
      >
        {(title || subtitle) && (
          <CardHeader
            title={
              <Typography
                variant="subtitle1"
                sx={{ fontSize: 22, fontWeight: 700, color: color.main }}
              >
                {title}
              </Typography>
            }
            subheader={
              subtitle && (
                <Typography
                  variant="h6"
                  sx={{ fontSize: 14, fontWeight: 500, color: color.main }}
                >
                  {subtitle}
                </Typography>
              )
            }
            sx={{
              p: headerPadding ? 2 : 0,
              pb: 0,
            }}
            action={
              Icon && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: `${color.main}15`,
                    border: `2px solid ${color.main}20`,
                  }}
                >
                  <Icon sx={{ fontSize: 20, color: color.main }} />
                </Box>
              )
            }
          />
        )}

        <CardContent sx={{ p: contentPadding ? 2 : 0, pt: title ? 0 : 2 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              ...contentStyle,
            }}
          >
            {children}
            {progress !== undefined && (
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  mt: 1,
                  height: 3,
                  borderRadius: 2,
                  backgroundColor: `${color.main}20`,
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: color.main,
                    borderRadius: 2,
                  },
                }}
              />
            )}
          </Box>
        </CardContent>

        {actions && (
          <CardActions sx={{ justifyContent: "center", pb: 2 }}>
            {actions}
          </CardActions>
        )}

        {/* Optional decorative dots */}
        <Box
          sx={{
            position: "absolute",
            top: -10,
            right: -10,
            width: 30,
            height: 30,
            borderRadius: "50%",
            background: `${color.main}10`,
            opacity: 0.6,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: -5,
            left: -5,
            width: 20,
            height: 20,
            borderRadius: "50%",
            background: `${color.light}20`,
            opacity: 0.4,
          }}
        />
      </Card>
    </Fade>
  );
};

export default CustomCard;
