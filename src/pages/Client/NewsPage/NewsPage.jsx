import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { clientTheme } from '../../../clientTheme';
import Header from '../../../components/Client/Header/Header';

const NewsPage = () => {
  // Sample news data - replace with API data later
  const newsItems = [
    {
      id: 1,
      title: 'Giải đấu bóng đá phủi mùa hè 2024',
      excerpt:
        'Giải đấu bóng đá phủi mùa hè 2024 sẽ được tổ chức tại các sân bóng trên toàn thành phố...',
      date: '15/06/2024',
      image: 'https://via.placeholder.com/400x250',
    },
    {
      id: 2,
      title: 'Cập nhật tính năng mới: Đặt sân theo nhóm',
      excerpt:
        'Hi5port vừa ra mắt tính năng đặt sân theo nhóm, giúp bạn dễ dàng tổ chức trận đấu với bạn bè...',
      date: '10/06/2024',
      image: 'https://via.placeholder.com/400x250',
    },
    {
      id: 3,
      title: 'Top 5 sân bóng đẹp nhất Đà Nẵng',
      excerpt:
        'Khám phá những sân bóng đẹp nhất, chất lượng nhất tại thành phố Đà Nẵng...',
      date: '05/06/2024',
      image: 'https://via.placeholder.com/400x250',
    },
    {
      id: 4,
      title: 'Hướng dẫn chọn sân bóng phù hợp',
      excerpt:
        'Làm thế nào để chọn được sân bóng phù hợp với nhu cầu và ngân sách của bạn?...',
      date: '01/06/2024',
      image: 'https://via.placeholder.com/400x250',
    },
    {
      id: 5,
      title: 'Chương trình khuyến mãi tháng 6',
      excerpt:
        'Nhiều ưu đãi hấp dẫn đang chờ đón bạn trong tháng 6 này. Đặt sân ngay để không bỏ lỡ...',
      date: '28/05/2024',
      image: 'https://via.placeholder.com/400x250',
    },
    {
      id: 6,
      title: 'Lịch thi đấu giải bóng đá cộng đồng',
      excerpt:
        'Cập nhật lịch thi đấu mới nhất của giải bóng đá cộng đồng Đà Nẵng...',
      date: '25/05/2024',
      image: 'https://via.placeholder.com/400x250',
    },
  ];

  return (
    <ThemeProvider theme={clientTheme}>
      <CssBaseline />
      <Header />
      <Container maxWidth={false} sx={{ backgroundColor: 'white', py: 1 }}>
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography
            variant="h1"
            sx={{
              color: 'primary.main',
              fontWeight: 'bold',
              mb: 2,
            }}
          >
            Tin Tức
          </Typography>
          <Typography variant="h6" sx={{ color: 'text.secondary' }}>
            Cập nhật những tin tức mới nhất về thể thao và sân bóng
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {newsItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={item.image}
                  alt={item.title}
                />
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography
                    variant="caption"
                    sx={{ color: 'text.secondary', mb: 1 }}
                  >
                    {item.date}
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      color: 'primary.main',
                      mb: 2,
                      fontWeight: 'bold',
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      mb: 2,
                      flexGrow: 1,
                    }}
                  >
                    {item.excerpt}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{ alignSelf: 'flex-start' }}
                  >
                    Đọc thêm
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Load More Button */}
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button variant="contained" color="primary" size="large" sx={{ px: 4 }}>
            Xem thêm tin tức
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default NewsPage;

