import * as React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  CssBaseline,
  Button,
  ThemeProvider,
  Container,
} from "@mui/material";
import { darken } from "@mui/material/styles";
import { dashboardTheme } from "../../../dashboardTheme";
import { NavLink } from "react-router-dom";

function SignUpOwnerPage() {
  const STYLE_TEXTFIELD = {
    margin: "8px",
    flexGrow: 1,
    "& .MuiInputLabel-root": {
      color: "white",
      fontWeight: "bold",
      fontSize: 14,
      "&.Mui-focused": {
        color: "white",
        fontWeight: "bold",
        fontSize: 18,
      },
    },
    // --- Style cho khung Input (OutlinedInput) ---
    "& .MuiOutlinedInput-root": {
      fontSize: 14,

      // Style cho chữ bạn gõ vào
      "& .MuiOutlinedInput-input": {
        color: "white",
        backgroundColor: "none",
      },

      // Style cho đường viền (notchedOutline)
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "primary.main", // Viền mặc định
      },

      // Style viền khi hover
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "primary.main",
      },

      // Style viền khi focus (click vào)
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "primary.main",
      },
    },
  };

  const navigate = useNavigate();

  const [name, setName] = React.useState("");
  const [city, setCity] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [reenterPassword, setReenterPassword] = React.useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleCityChange = (event) => {
    setCity(event.target.value);
  };
  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleReenterPasswordChange = (event) => {
    setReenterPassword(event.target.value);
  };

  const signUp = (event) => {
    event.preventDefault();

    const signUpData = {
      name: name,
      city: city,
      phoneNumber: phoneNumber,
      address: address,
      email: email,
      password: password,
      reenterPassword: reenterPassword,
    }

    console.log("Sign Up Data: ", signUpData);

    // Xử lý logic đăng ký ở đây
    axios
      .post("http://localhost:8080/api/owners/signup", signUpData)
      .then((res) => {
        if (res.data.status) {
          const thong_bao = res.data.message;
          toast.success(thong_bao);
          navigate("/owner/login");
        } else {
          const thong_bao = res.data.message;
          toast.error(thong_bao);
        }
      })
      .catch((errors) => {
        // ... (Xử lý .catch như cũ)
        if (
          errors.response &&
          errors.response.data &&
          errors.response.data.errors
        ) {
          const listErrors = errors.response.data.errors;
          Object.values(listErrors).forEach((value) => {
            const errorMessage = Array.isArray(value) ? value[0] : value;
            toast.error(errorMessage);
          });
        } else {
          toast.error("Có lỗi xảy ra, vui lòng thử lại.");
        }
      });
  };

  return (
    <ThemeProvider theme={dashboardTheme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "background.default",
          height: "100vh",
        }}
      >
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: 500,
              height: "auto",
              minHeight: 700,
              backgroundColor: (theme) =>
                darken(theme.palette.primary.minor, 0.2),
              p: 4,
              boxShadow: 5,
              borderRadius: 2,
              border: "1px solid #ccc",
            }}
          >
            <Box sx={{ width: "100%", height: "auto" }}>
              <Typography
                variant="h1"
                align="center"
                sx={{
                  mb: 5,
                  color: "primary.main",
                  fontWeight: "bold",
                }}
              >
                Đăng Ký
              </Typography>
            </Box>
            <Box component="form" onSubmit={signUp} sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  id="filled_name"
                  label="Họ và tên"
                  sx={STYLE_TEXTFIELD}
                  value={name}
                  onChange={handleNameChange}
                />
                <TextField
                  id="city"
                  label="Thành phố"
                  sx={STYLE_TEXTFIELD}
                  value={city}
                  onChange={handleCityChange}
                />
              </Box>
              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  id="filled-phone-number"
                  label="Số điện thoại"
                  sx={STYLE_TEXTFIELD}
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                />
                <TextField
                  id="filled-address"
                  label="Địa chỉ"
                  sx={STYLE_TEXTFIELD}
                  value={address}
                  onChange={handleAddressChange}
                />
              </Box>
              <TextField
                id="filled-email-input"
                label="Email"
                sx={STYLE_TEXTFIELD}
                value={email}
                onChange={handleEmailChange}
              />
              <TextField
                id="outlined-password-input"
                label="Mật khẩu"
                type="password"
                autoComplete="current-password"
                sx={STYLE_TEXTFIELD}
                value={password}
                onChange={handlePasswordChange}
              />
              <TextField
                id="outlined-reenter-password-input"
                label="Nhập lại mật khẩu"
                type="password"
                autoComplete="current-password"
                sx={STYLE_TEXTFIELD}
                value={reenterPassword}
                onChange={handleReenterPasswordChange}
              />
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ width: "100%", m: 1, fontWeight: "bold" }}
                >
                  Đăng Ký
                </Button>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            ></Box>
            <Box sx={{ flex: 1 }}></Box>
            <Box
              sx={{
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="body2"
                component={NavLink}
                to="/owner/login"
                color="white"
                fontWeight="bold"
                onClick={() => {
                  console.log("Create an Account clicked");
                }}
                sx={{ mt: 3, mb: 2, cursor: "pointer" }}
              >
                Quay lại Đăng Nhập
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default SignUpOwnerPage;

//hahahaha