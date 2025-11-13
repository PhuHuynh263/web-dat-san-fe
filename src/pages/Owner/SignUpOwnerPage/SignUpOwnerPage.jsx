import * as React from "react";
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
            <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  id="filled-first-name"
                  label="Họ"
                  sx={STYLE_TEXTFIELD}
                />
                <TextField
                  id="filled-last-name"
                  label="Tên"
                  sx={STYLE_TEXTFIELD}
                />
              </Box>
              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  id="filled-phone-number"
                  label="Số điện thoại"
                  sx={STYLE_TEXTFIELD}
                />
                <TextField
                  id="filled-address"
                  label="Địa chỉ"
                  sx={STYLE_TEXTFIELD}
                />
              </Box>
              <TextField
                id="filled-username-input"
                label="Tên đăng nhập"
                sx={STYLE_TEXTFIELD}
              />
              <TextField
                id="outlined-password-input"
                label="Mật khẩu"
                type="password"
                autoComplete="current-password"
                sx={STYLE_TEXTFIELD}
              />
              <TextField
                id="outlined-reenter-password-input"
                label="Nhập lại mật khẩu"
                type="password"
                autoComplete="current-password"
                sx={STYLE_TEXTFIELD}
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
