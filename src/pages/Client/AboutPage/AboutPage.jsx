import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { clientTheme } from "../../../clientTheme";
import Header from "../../../components/Client/Header/Header";
import { useState, useEffect } from "react";

const AboutPage = () => {
  const [visibleItems, setVisibleItems] = useState([false, false, false]);

  useEffect(() => {
    const timings = [0, 500, 1000];
    const timers = timings.map((timing, index) =>
      setTimeout(() => {
        setVisibleItems((prev) => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      }, timing)
    );

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, []);

  const sportTypes = [
    {
      name: "Bóng đá",
      description: "Sân bóng đá 5, 7, 11 người với cơ sở vật chất hiện đại",
      image:
        "https://images.pexels.com/photos/1171084/pexels-photo-1171084.jpeg?cs=srgb&dl=pexels-mike-468229-1171084.jpg&fm=jpg",
    },
    {
      name: "Cầu lông",
      description: "Các sân cầu lông tiêu chuẩn quốc tế, ánh sáng tốt",
      image:
        "https://png.pngtree.com/thumb_back/fh260/background/20220530/pngtree-badminton---badminton-courts-with-two-shuttlecocks-tournament-training-racquet-photo-image_13724376.jpg",
    },
    {
      name: "Quần vợt",
      description: "Sân quần vợt chất lượng cao, phù hợp mọi trình độ",
      image:
        "https://png.pngtree.com/thumb_back/fh260/background/20250401/pngtree-close-up-of-a-tennis-ball-on-padel-court-with-net-image_17161606.jpg",
    },
    {
      name: "Pickleball",
      description:
        "Sân pickleball mới nhất, đang trở nên phổ biến tại Việt Nam",
      image:
        "https://cdn.shopvnb.com/uploads/images/bai_viet/pickleball-wallpaper-7-1750465000.webp",
    },
  ];

  return (
    <ThemeProvider theme={clientTheme}>
      <CssBaseline />
      <Header />

      {/* Hero Section - Combined with Who Are We */}
      <Box
        sx={{
          backgroundImage: `url(https://www.shutterstock.com/image-vector/red-background-special-football-silhouettes-260nw-2468462239.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          py: { xs: 4, md: 6 },
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="md">
          {/* Title */}
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: "2rem", md: "3.5rem" },
              letterSpacing: "-0.02em",
              opacity: visibleItems[0] ? 1 : 0,
              transform: visibleItems[0] ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            Hi5Sport
          </Typography>

          {/* Subtitle */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 300,
              fontSize: { xs: "1rem", md: "1.25rem" },
              opacity: visibleItems[1] ? 0.95 : 0,
              transform: visibleItems[1] ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s",
              mb: 4,
            }}
          >
            Ứng dụng đặt sân thể thao hàng đầu tại Việt Nam
          </Typography>

          {/* Description */}
          <Box
            sx={{
              maxWidth: "800px",
              mx: "auto",
              opacity: visibleItems[2] ? 1 : 0,
              transform: visibleItems[2] ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                lineHeight: 1.8,
                fontSize: { xs: "1.15rem", md: "1.3rem" },
                color: "rgba(255, 255, 255, 0.95)",
              }}
            >
              Hi5Sport – Đặt sân thể thao trực tuyến tiện lợi, nhanh chóng và
              linh hoạt cho mọi người yêu thể thao.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Container sx={{ py: { xs: 6, md: 10 }, px: 0 }}>
        {/* Sports Types Section */}
        <Box sx={{ mb: { xs: 10, md: 14 } }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mb: 8,
              color: "primary.main",
              textAlign: "center",
              fontSize: { xs: "1.8rem", md: "2.5rem" },
            }}
          >
            Các loại hình thể thao
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: 4,
              maxWidth: "100%",
              mx: "auto",
            }}
          >
            {sportTypes.map((sport, index) => (
              <Box
                key={index}
                sx={{
                  width: "100%",
                  minWidth: 0,
                }}
              >
                <Card
                  sx={{
                    p: 5,
                    height: "100%",
                    minHeight: "500px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    borderRadius: 3,
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    border: "2px solid rgba(223, 27, 63, 0.12)",
                    backgroundImage: `url(${sport.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    position: "relative",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: "rgba(0, 0, 0, 0.3)",
                      borderRadius: 3,
                      zIndex: 1,
                    },
                    "&:hover": {
                      transform: "translateY(-12px)",
                      boxShadow: "0 16px 50px rgba(223, 27, 63, 0.2)",
                      borderColor: "rgba(223, 27, 63, 0.3)",
                      "&::before": {
                        backgroundColor: "rgba(0, 0, 0, 0.4)",
                      },
                    },
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      zIndex: 2,
                    }}
                  >
                    <Box
                      sx={{
                        fontSize: "4.5rem",
                        mb: 3,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {sport.icon}
                    </Box>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        mb: 2.5,
                        color: "white",
                        fontSize: "1.5rem",
                        textShadow: "0 2px 8px rgba(0, 0, 0, 0.5)",
                      }}
                    >
                      {sport.name}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "white",
                        lineHeight: 1.8,
                        fontSize: "1.05rem",
                        fontWeight: 500,
                        textShadow: "0 1px 4px rgba(0, 0, 0, 0.5)",
                      }}
                    >
                      {sport.description}
                    </Typography>
                  </Box>
                </Card>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Mission Section */}
        <Box sx={{ mb: { xs: 10, md: 14 }, maxWidth: "900px", mx: "auto" }}>
          <Box
            sx={{
              background:
                "linear-gradient(135deg, rgba(223, 27, 63, 0.08) 0%, rgba(102, 126, 234, 0.08) 100%)",
              borderRadius: "16px",
              p: { xs: 4, md: 6 },
              border: "2px solid rgba(223, 27, 63, 0.2)",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mb: 3,
                color: "#df1b3f",
                textAlign: "center",
              }}
            >
              Sứ mệnh của chúng tôi
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: "1.05rem",
                lineHeight: 1.8,
                color: "text.primary",
                textAlign: "center",
              }}
            >
              Tạo ra một nền tảng công nghệ hiện đại giúp mọi người dễ dàng tìm
              kiếm và đặt sân thể thao ở bất cứ đâu. Chúng tôi cam kết mang đến
              trải nghiệm đặt sân tuyệt vời nhất, kết nối cộng đồng những người
              yêu thích thể thao, và hỗ trợ các chủ sân phát triển kinh doanh
              một cách bền vững.
            </Typography>
          </Box>
        </Box>

        {/* Contact CTA Section */}
        <Box
          sx={{
            background: "linear-gradient(135deg, #df1b3f 0%, #c41535 100%)",
            color: "white",
            p: { xs: 4, md: 6 },
            borderRadius: 3,
            textAlign: "center",
            boxShadow: "0 8px 30px rgba(223, 27, 63, 0.2)",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: "1.5rem", md: "2rem" },
            }}
          >
            Bắt đầu đặt sân ngay hôm nay
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: "1.1rem",
              opacity: 0.95,
              mb: 4,
              lineHeight: 1.6,
            }}
          >
            Khám phá hàng trăm sân thể thao chất lượng cao, đặt chỗ trong giây
            lát, và tận hưởng những trận đấu tuyệt vời cùng bạn bè.
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Typography
              component="a"
              href="/booking"
              sx={{
                display: "inline-block",
                px: 5,
                py: 1.5,
                backgroundColor: "white",
                color: "#df1b3f",
                fontWeight: 700,
                borderRadius: "10px",
                textDecoration: "none",
                fontSize: "1rem",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 25px rgba(0, 0, 0, 0.15)",
                },
              }}
            >
              Đặt sân ngay
            </Typography>
            <Typography
              component="a"
              href="/contact"
              sx={{
                display: "inline-block",
                px: 5,
                py: 1.5,
                border: "2px solid white",
                color: "white",
                fontWeight: 700,
                borderRadius: "10px",
                textDecoration: "none",
                fontSize: "1rem",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              Liên hệ với chúng tôi
            </Typography>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default AboutPage;
