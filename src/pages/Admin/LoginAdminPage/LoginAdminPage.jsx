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
import Checkbox from "@mui/material/Checkbox";

function LoginAdminPage() {
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
        borderColor: "secondary.main", // Viền mặc định
      },

      // Style viền khi hover
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "secondary.main",
      },

      // Style viền khi focus (click vào)
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "secondary.main",
      },
    },
  };

  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
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
                sx={{ mb: 5, color: "secondary.main", fontWeight: "bold" }}
              >
                Log In
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
                      color: (theme) => theme.palette.secondary.main, // Màu của dấu tick
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
                  color="secondary"
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
                    backgroundColor: "secondary.main",
                    color: "white",
                    borderColor: "secondary.main",
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
                to="/admin/signup"
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

export default LoginAdminPage;
