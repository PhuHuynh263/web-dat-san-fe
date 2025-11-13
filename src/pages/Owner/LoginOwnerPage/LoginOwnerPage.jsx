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
import Checkbox from "@mui/material/Checkbox";

function LoginOwnerPage() {
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

  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const logIn = (event) => {
    event.preventDefault();

    const loginData = {
      email: email,
      password: password,
    }
    console.log("Login data:", loginData);

    axios
      .post("http://127.0.0.1:8000/api/chu-san/dang-nhap", loginData)
      .then((res) => {
        if (res.data.status) {
          const thong_bao = res.data.message;
          toast.success(thong_bao);
          // ... (Lưu localStorage như cũ)
          localStorage.setItem(
            "token_chu_san",
            res.data.token_chu_san
          );
          localStorage.setItem("ten_cs", res.data.anh_cs);
          localStorage.setItem("anh_cs", res.data.anh_cs);

          navigate("/owner/dashboard");
        } else {
          // ... (Xử lý lỗi như cũ)
          toast.error(res.data.message);
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
  }

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
              backgroundColor: (theme) =>
                darken(theme.palette.primary.minor, 0.2),
              minHeight: 700,
              p: 4,
              boxShadow: 5,
              borderRadius: 2,
            }}
          >
            <Box sx={{ width: "100%", height: "auto" }}>
              <Typography
                variant="h1"
                align="center"
                sx={{ mb: 5, color: "primary.main", fontWeight: "bold" }}
              >
                Đăng Nhập
              </Typography>
            </Box>
            <Box
              component="form"
              onSubmit={logIn}
              sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
              <TextField
                id="filled-username-input"
                label="Tên đăng nhập"
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
              <Box>
                <Checkbox
                  checked={checked}
                  onChange={handleChange}
                  slotProps={{
                    input: { "aria-label": "controlled" },
                  }}
                  sx={{
                    color: "white",
                    "&.Mui-checked": {
                      color: (theme) => theme.palette.primary.main, // Màu của dấu tick
                    },
                  }}
                />
                <Typography
                  variant="body2"
                  color="#ccc"
                  component="span"
                  onClick={() => setChecked(!checked)}
                  sx={{ cursor: "pointer" }}
                >
                  Nhớ đăng nhập?
                </Typography>
              </Box>
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
                  Đăng Nhập
                </Button>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <Typography
                variant="body2"
                color="white"
                fontWeight="bold"
                onClick={() => {
                  console.log("Forget Password clicked");
                }}
                sx={{ mt: 3, mb: 2, cursor: "pointer" }}
              >
                Quên mật khẩu?
              </Typography>
              <Button
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
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
                Đăng Ký
              </Button>
            </Box>
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
                to="/owner/signup"
                color="white"
                fontWeight="bold"
                onClick={() => {
                  console.log("Create an Account clicked");
                }}
                sx={{ mt: 3, mb: 2, cursor: "pointer" }}
              >
                Tạo tài khoản mới
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default LoginOwnerPage;
