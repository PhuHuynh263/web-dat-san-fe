import React from "react";
import { Box, Button, Typography, CssBaseline } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <>
      <CssBaseline /> {/* Reset margin mặc định của trình duyệt về 0 */}
      <Box
        sx={{
          // 1. Kích thước cố định bằng màn hình
          height: "100vh",
          width: "100vw",

          // 2. Flexbox để căn giữa tuyệt đối
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",

          // 3. QUAN TRỌNG: Cắt bỏ mọi phần thừa để không hiện scroll
          overflow: "hidden",

          backgroundColor: "background.default",
          p: 3, // Padding trong để nội dung không sát mép trên màn hình nhỏ
        }}
      >
        {/* Container nội dung */}
        <Box
          sx={{
            textAlign: "center",
            maxWidth: "600px", // Giới hạn chiều rộng nội dung
            width: "100%",
          }}
        >
          {/* Hình ảnh */}
          <Box
            component="img"
            src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif" // Link ảnh mẫu GIF 404 vui nhộn
            alt="404 Not Found"
            sx={{
              width: "100%",
              maxWidth: "400px", // Giới hạn kích thước ảnh
              height: "auto",
              objectFit: "contain",
              mb: 4,
            }}
          />

          {/* Nội dung chữ */}
          <Typography
            variant="h3"
            sx={{ fontWeight: "bold", mb: 2, color: "text.primary" }}
          >
            404
          </Typography>

          <Typography variant="h5" sx={{ mb: 1, color: "text.primary" }}>
            Không tìm thấy trang này!
          </Typography>

          <Typography variant="body1" sx={{ color: "text.secondary", mb: 4 }}>
            Trang bạn đang tìm kiếm có thể đã bị xóa, đổi tên hoặc tạm thời
            không có sẵn.
          </Typography>

          {/* Nút bấm */}
          <Button
            variant="contained"
            size="large"
            startIcon={<HomeIcon />}
            onClick={() => navigate("/homepage")}
            sx={{
              borderRadius: "50px", // Bo tròn kiểu viên thuốc
              textTransform: "none",
              px: 4,
              py: 1.5,
              fontSize: "1rem",
              fontWeight: "bold",
              boxShadow: 4,
            }}
          >
            Về Trang Chủ
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default NotFoundPage;
