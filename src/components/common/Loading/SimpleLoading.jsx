import React from "react";
import { Box, LinearProgress, Typography } from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer"; // Hoặc Logo của bạn

function SplashLoading() {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff", // Hoặc màu thương hiệu của bạn
        zIndex: 9999, // Luôn nằm trên cùng
      }}
    >
      {/* Logo và Hiệu ứng nảy (Bounce animation) */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          animation: "bounce 2s infinite",
          "@keyframes bounce": {
            "0%, 20%, 50%, 80%, 100%": { transform: "translateY(0)" },
            "40%": { transform: "translateY(-20px)" },
            "60%": { transform: "translateY(-10px)" },
          },
        }}
      >
        <SportsSoccerIcon sx={{ fontSize: 80, color: "#003C7A" }} />
        <Typography
          variant="h4"
          sx={{ mt: 2, fontWeight: "bold", color: "#003C7A", letterSpacing: 2 }}
        >
          FootyFanatics
        </Typography>
      </Box>

      {/* Thanh chạy (Progress Bar) */}
      <Box sx={{ width: "200px", mt: 4 }}>
        <LinearProgress
          color="primary"
          sx={{
            height: 6,
            borderRadius: 3,
            backgroundColor: "#e0e0e0",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#003C7A", // Màu chủ đạo
            },
          }}
        />
      </Box>

      <Typography variant="body2" sx={{ mt: 2, color: "gray" }}>
        Vui lòng chờ trong giây lát...
      </Typography>
    </Box>
  );
}

export default SplashLoading;
