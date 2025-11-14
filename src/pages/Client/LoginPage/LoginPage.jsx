import * as React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, NavLink } from "react-router-dom";
import { useState } from "react";

import {
  Box,
  Typography,
  TextField,
  CssBaseline,
  Button,
  ThemeProvider,
  Container,
  Checkbox,
} from "@mui/material";

import images from "../../../assets/images/images";
import { clientTheme } from "../../../clientTheme";

function LoginPage() {
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
    "& .MuiOutlinedInput-root": {
      fontSize: 14,
      "& .MuiOutlinedInput-input": {
        color: "white",
        backgroundColor: "transparent", // Sửa từ "none"
      },
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "primary.main",
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "primary.main",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "primary.main",
      },
    },
  };

  const [checked, setChecked] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };

  const logIn = (event) => {
    event.preventDefault(); // Chặn reload trang

    const loginData = { email, password };

    axios
      .post("http://127.0.0.1:8000/api/khach-hang/dang-nhap", loginData)
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message);

          localStorage.setItem("token_khach_hang", res.data.token_khach_hang);
          localStorage.setItem("ten_kh", res.data.ten_kh);
          localStorage.setItem("anh_kh", res.data.anh_kh);

          navigate("/");
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((errors) => {
        if (
          errors.response &&
          errors.response.data &&
          errors.response.data.errors
        ) {
          const listErrors = errors.response.data.errors;
          Object.values(listErrors).forEach((value) => {
            toast.error(Array.isArray(value) ? value[0] : value);
          });
        } else if (
          errors.response &&
          errors.response.data &&
          errors.response.data.message
        ) {
          toast.error(errors.response.data.message);
        } else {
          toast.error("Có lỗi xảy ra, vui lòng thử lại.");
        }
      });
  };

  return (
    <ThemeProvider theme={clientTheme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: `url(${images.bgLogin})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
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
              minHeight: 700,
              opacity: 0.8,
              p: 4,
              boxShadow: 5,
              borderRadius: 2,
              border: "1px solid #ccc",
            }}
          >
            <Typography
              variant="h4"
              align="center"
              sx={{ mb: 5, color: "primary.main", fontWeight: "bold" }}
            >
              Login Page
            </Typography>

            <Box
              component="form"
              onSubmit={logIn}
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <TextField
                name="email"
                label="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={STYLE_TEXTFIELD}
              />
              <TextField
                name="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                sx={STYLE_TEXTFIELD}
              />

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Checkbox
                  checked={checked}
                  onChange={handleCheckboxChange}
                  sx={{
                    color: "white",
                    "&.Mui-checked": {
                      color: (theme) => theme.palette.primary.main,
                    },
                  }}
                />
                <Typography
                  variant="body2"
                  color="#ccc"
                  sx={{ cursor: "pointer" }}
                  onClick={() => setChecked(!checked)}
                >
                  Remember me?
                </Typography>
              </Box>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ width: "100%", m: 1, fontWeight: "bold" }}
              >
                Login
              </Button>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 3,
              }}
            >
              <Typography
                variant="body2"
                color="white"
                sx={{ cursor: "pointer" }}
              >
                Forget Password?
              </Typography>
              <Button
                variant="contained"
                sx={{
                  fontWeight: "bold",
                  color: "black",
                  border: "2px solid white",
                  backgroundColor: "white",
                  "&:hover": {
                    backgroundColor: "primary.main",
                    color: "white",
                    borderColor: "primary.main",
                  },
                }}
              >
                Sign Up
              </Button>
            </Box>

            <Box sx={{ mt: 3, textAlign: "center" }}>
              <Typography
                variant="body2"
                component={NavLink}
                to="/admin/login"
                color="white"
                sx={{ mx: 1, cursor: "pointer" }}
              >
                Bạn là chủ sân
              </Typography>
              <Typography variant="body2" color="white">
                /
              </Typography>
              <Typography
                variant="body2"
                component={NavLink}
                to="/owner/login"
                color="white"
                sx={{ mx: 1, cursor: "pointer" }}
              >
                quản trị viên?
              </Typography>

              <Typography
                variant="body2"
                component={NavLink}
                to="/signup"
                color="white"
                sx={{ display: "block", mt: 2, cursor: "pointer" }}
              >
                Tạo tài khoản mới?
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default LoginPage;
