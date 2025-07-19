"use client";

import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import {
  Button,
  Typography,
  Card,
  Container,
  InputAdornment,
  IconButton,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useState } from "react";
import { TextFieldProps } from "@mui/material/TextField";

type PasswordTextFieldComponentProps = TextFieldProps

export const Search = styled("form")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    width: "auto",
    "&.mobile-collapsed": {
      width: theme.spacing(6),
      "& .MuiInputBase-root": {
        width: 0,
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      },
    },
    "&.mobile-expanded": {
      width: "100%",
      "& .MuiInputBase-root": {
        width: "100%",
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  },
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
      "&:focus": {
        width: "30ch",
      },
    },
  },
}));

export const CustomButton = styled(Button)(({ theme }) => ({
  variant: "contained",
  backgroundColor: "#082f49",
  color: "#faf5ff",
  border: "0.1rem solid #0c4a6e",
  padding: "0.5rem 1rem",
  borderRadius: "0.5rem",
  textAlign: "center",
  cursor: "pointer",
  fontSize: "1rem",
  fontWeight: 600,
  "&:hover": {
    backgroundColor: "#0284c7",
    borderColor: "#0369a1",
    transform: "translateY(-2px)",
  },
  transition:
    "background-color 0.3s ease-in-out, border-color 0.3s ease-in-out, color 0.3s ease-in-out, transform 0.2s ease-in-out",
  "&:focus": {
    outline: "2px solid #0ea5e9",
    outlineOffset: "2px",
  },
  "&:active": {
    backgroundColor: "#0369a1",
    transform: "translateY(0)",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "0.4rem 0.8rem",
    fontSize: "0.9rem",
  },
  [theme.breakpoints.up("lg")]: {
    padding: "0.6rem 1.2rem",
    fontSize: "1.1rem",
  },

  "&:disabled": {
    backgroundColor: "#a1a1aa",
    color: "#e4e4e7",
    borderColor: "#a1a1aa",
    cursor: "not-allowed",
    transform: "none",
    opacity: 0.7,
  },
}));

export const FormTextField = styled(TextField)(() => ({
  width: "100%",
  marginBottom: "1rem",
}));

export const FormButton = styled(Button)(() => ({
  width: "100%",
}));

export const FormTitle = styled(Typography)(() => ({
  fontSize: "1.5rem",
  fontWeight: "bold",
  marginBottom: ".5rem",
  textAlign: "center",
}));

export const FormCard = styled(Card)(({}) => ({
  width: "auto",
  position: "relative",
  zIndex: 1,
  padding: "34px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#0000004d",
  margin: "10rem",
  flexDirection: "column",
  minWidth: "300px",
  border: "0.1rem solid #faf5ff",
}));

export const FormContainer = styled(Container)(() => ({
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export const PasswordTextField = styled(
  ({ ...props }: PasswordTextFieldComponentProps) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
      setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.MouseEvent) => {
      event.preventDefault();
    };

    return (
      <TextField
        {...props}
        type={showPassword ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    );
  },
)(() => ({
  width: "100%",
  marginBottom: "1rem",
}));
