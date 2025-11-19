import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { clientTheme } from "../../../clientTheme";
import Header from "../../../components/Client/Header/Header";

const AboutPage = () => {
  return (
    <ThemeProvider theme={clientTheme}>
      <CssBaseline />
      <Header />
      <Container maxWidth={false} sx={{ backgroundColor: 'white', py: 1 }}>
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h1"
            sx={{
              color: "primary.main",
              fontWeight: "bold",
              mb: 2,
              textAlign: "center",
            }}
          >
            Giới Thiệu
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "text.secondary",
              textAlign: "center",
              mb: 4,
            }}
          >
            Về Hi5port - Ứng dụng đặt sân thể thao hàng đầu
          </Typography>
        </Box>

        <Box sx={{ mb: 6 }}>
          <Typography variant="h2" sx={{ color: "primary.main", mb: 3 }}>
            Chúng tôi là ai?
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
            Hi5port là nền tảng đặt sân thể thao trực tuyến hàng đầu tại Việt
            Nam, được xây dựng với mục tiêu mang đến trải nghiệm đặt sân thuận
            tiện, nhanh chóng và linh hoạt cho người chơi thể thao.
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
            Chúng tôi kết nối người chơi với các sân thể thao chất lượng trên
            khắp cả nước, giúp bạn dễ dàng tìm kiếm, so sánh và đặt sân chỉ với
            vài cú click.
          </Typography>
        </Box>

        <Box sx={{ mb: 6 }}>
          <Typography variant="h2" sx={{ color: "primary.main", mb: 3 }}>
            Sứ mệnh của chúng tôi
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
            TÔI LÀ DUYY KHOA ĐẠI ĐẾ
          </Typography>
        </Box>

        <Box sx={{ mb: 6 }}>
          <Typography variant="h2" sx={{ color: "primary.main", mb: 3 }}>
            Giá trị cốt lõi
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box>
              <Typography variant="h4" sx={{ color: "primary.main", mb: 1 }}>
                ✓ Tiện lợi
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                Đặt sân mọi lúc, mọi nơi chỉ với điện thoại hoặc máy tính
              </Typography>
            </Box>
            <Box>
              <Typography variant="h4" sx={{ color: "primary.main", mb: 1 }}>
                ✓ Nhanh chóng
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                Xác nhận đặt sân ngay lập tức, không cần chờ đợi
              </Typography>
            </Box>
            <Box>
              <Typography variant="h4" sx={{ color: "primary.main", mb: 1 }}>
                ✓ Đáng tin cậy
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                Kết nối với các sân thể thao uy tín, chất lượng cao
              </Typography>
            </Box>
            <Box>
              <Typography variant="h4" sx={{ color: "primary.main", mb: 1 }}>
                ✓ Linh hoạt
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                Hỗ trợ nhiều loại sân: sân 5, 7, 9, 11 người và các môn thể thao
                khác
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box>
          <Typography variant="h2" sx={{ color: "primary.main", mb: 3 }}>
            Liên hệ với chúng tôi
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
            Nếu bạn có bất kỳ câu hỏi hoặc góp ý nào, vui lòng liên hệ với chúng
            tôi qua trang{" "}
            <Typography
              component="span"
              sx={{ color: "primary.main", fontWeight: "bold" }}
            >
              Liên Hệ
            </Typography>
            . Chúng tôi luôn sẵn sàng hỗ trợ bạn!
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default AboutPage;
