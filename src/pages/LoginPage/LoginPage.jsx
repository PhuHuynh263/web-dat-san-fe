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
import images from "../../assets/images/images";
import { loginSignUpTheme } from "../../loginSignUpTheme";
import { NavLink } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";

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

  return (
    <ThemeProvider theme={loginSignUpTheme}>
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
              height: "auto",
              minHeight: 700,
              opacity: 0.8,
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
                sx={{ mb: 5, color: "primary.main", fontWeight: "bold" }}
              >
                Login Page
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
              <TextField
                id="filled-email"
                label="Your Email"
                sx={STYLE_TEXTFIELD}
              />
              <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                sx={STYLE_TEXTFIELD}
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
                  Remember me?
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
                  variant="contained"
                  color="primary"
                  sx={{ width: "100%", m: 1, fontWeight: "bold" }}
                >
                  Login
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
                Forget Password?
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
                Sign Up
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
                to="/signup"
                color="white"
                fontWeight="bold"
                onClick={() => {
                  console.log("Create an Account clicked");
                }}
                sx={{ mt: 3, mb: 2, cursor: "pointer" }}
              >
                Create an Account
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default LoginPage;
