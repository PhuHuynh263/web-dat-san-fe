import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { clientTheme } from "../../../clientTheme";
import Header from "../../../components/Client/Header/Header";
import { useState, useEffect } from "react";

const NewsPage = () => {
  const [visibleItems, setVisibleItems] = useState([false, false]);

  // Sample news data
  const newsItems = [
    {
      id: 1,
      title: "Giải đấu bóng đá phủi mùa hè 2024",
      excerpt:
        "Mùa hè sôi động đã đến, và giải đấu bóng đá phủi được mong chờ nhất năm đã chính thức khởi tranh...",
      date: "15/06/2024",
      image:
        "https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 2,
      title: "Cập nhật tính năng mới: Đặt sân theo nhóm",
      excerpt:
        "Hi5port vừa ra mắt tính năng đặt sân theo nhóm, giúp bạn dễ dàng tổ chức trận đấu với bạn bè...",
      date: "10/06/2024",
      image:
        "https://images.pexels.com/photos/1618269/pexels-photo-1618269.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 4,
      title: "Hướng dẫn chọn sân bóng phù hợp",
      excerpt:
        "Làm thế nào để chọn được sân bóng phù hợp với nhu cầu và ngân sách của bạn?...",
      date: "01/06/2024",
      image:
        "https://images.pexels.com/photos/47730/the-ball-stadion-football-the-pitch-47730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 5,
      title: "Chương trình khuyến mãi tháng 6",
      excerpt:
        "Nhiều ưu đãi hấp dẫn đang chờ đón bạn trong tháng 6 này. Đặt sân ngay để không bỏ lỡ...",
      date: "28/05/2024",
      image:
        "https://images.pexels.com/photos/209956/pexels-photo-209956.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];

  useEffect(() => {
    const timings = [0, 300]; // Timings for hero section animations
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

  return (
    <ThemeProvider theme={clientTheme}>
      <CssBaseline />
      <Header />
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ mb: 6, textAlign: "center" }}>
          <Typography
            variant="h1"
            sx={{
              color: "primary.main",
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: "2.5rem", md: "3.5rem" },
              opacity: visibleItems[0] ? 1 : 0,
              transform: visibleItems[0] ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            Tin Tức
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "text.secondary",
              fontWeight: 300,
              fontSize: { xs: "1rem", md: "1.25rem" },
              opacity: visibleItems[1] ? 0.95 : 0,
              transform: visibleItems[1] ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s",
            }}
          >
            Cập nhật những tin tức mới nhất về thể thao và sân bóng
          </Typography>
        </Box>

        <Grid container spacing={5}>
          {newsItems.map((item, index) => (
            <Grid key={item.id} size={{ xs: 12, sm: 6, md: 6 }}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  minHeight: { md: "460px" }, // Adjust minimum height for the cards
                  flexDirection: "column",
                  borderRadius: "16px",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 6,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="220"
                  image={item.image}
                  alt={item.title}
                />
                <CardContent
                  sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
                >
                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary", mb: 1 }}
                  >
                    {item.date}
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      color: "primary.main",
                      mb: 2,
                      fontWeight: 600,
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      mb: 3, // Increase margin bottom for better spacing
                      flexGrow: 1,
                    }}
                  >
                    {item.excerpt}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{
                      alignSelf: "flex-start",
                      fontWeight: 600,
                      borderRadius: "8px",
                      mt: "auto", // Push button to the bottom
                      "&:hover": {
                        backgroundColor: "rgba(223, 27, 63, 0.04)",
                      },
                    }}
                  >
                    Đọc thêm
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Load More Button */}
        <Box sx={{ textAlign: "center", mt: 6 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              px: 5,
              py: 1.5,
              borderRadius: "12px",
              fontWeight: 600,
              background: "linear-gradient(135deg, #df1b3f 0%, #c41535 100%)",
              boxShadow: "0 4px 15px rgba(223, 27, 63, 0.3)",
              transition: "all 0.3s ease",
            }}
          >
            Xem thêm tin tức
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default NewsPage;