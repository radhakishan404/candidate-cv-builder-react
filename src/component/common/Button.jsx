// import { Button as MuiButton } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import React from "react";

const Button = (props) => {
  const {
    children,
    color = "primary",
    variant = "contained",
    onClick,
    className,
    size = "medium",
    type = "button",
    fullWidth = true,
    loading = false,
    ...other
  } = props;
  return (
    <LoadingButton
      fullWidth={fullWidth}
      className={className || ""}
      variant={variant || "contained"}
      size={size}
      color={color}
      loading={loading}
      onClick={onClick}
      type={type}
      {...other}
    >
      {children}
    </LoadingButton>
  );
};

export default Button;
