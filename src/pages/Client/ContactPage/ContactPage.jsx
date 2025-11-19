import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { clientTheme } from '../../../clientTheme';
import Header from '../../../components/Client/Header/Header';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useState } from 'react';
import { toast } from 'react-toastify';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement API call to send contact form
    toast.success('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
    });
  };

  const STYLE_TEXTFIELD = {
    '& .MuiInputLabel-root': {
      color: 'text.primary',
    },
    '& .MuiOutlinedInput-root': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'primary.main',
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'primary.main',
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: 'primary.main',
      },
    },
  };

  return (
    <ThemeProvider theme={clientTheme}>
      <CssBaseline />
      <Header />
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography
            variant="h1"
            sx={{
              color: 'primary.main',
              fontWeight: 'bold',
              mb: 2,
            }}
          >
            Liên Hệ
          </Typography>
          <Typography variant="h6" sx={{ color: 'text.secondary' }}>
            Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Contact Information */}
          <Grid item xs={12} md={4}>
            <Box>
              <Typography variant="h3" sx={{ color: 'primary.main', mb: 4 }}>
                Thông tin liên hệ
              </Typography>

              <Box sx={{ mb: 3, display: 'flex', alignItems: 'flex-start' }}>
                <LocationOnIcon
                  sx={{ color: 'primary.main', fontSize: 30, mr: 2, mt: 0.5 }}
                />
                <Box>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    Địa chỉ
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    123 Đường ABC, Quận XYZ
                    <br />
                    Thành phố Đà Nẵng, Việt Nam
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ mb: 3, display: 'flex', alignItems: 'flex-start' }}>
                <PhoneIcon
                  sx={{ color: 'primary.main', fontSize: 30, mr: 2, mt: 0.5 }}
                />
                <Box>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    Điện thoại
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    +84 123 456 789
                    <br />
                    +84 987 654 321
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <EmailIcon
                  sx={{ color: 'primary.main', fontSize: 30, mr: 2, mt: 0.5 }}
                />
                <Box>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    Email
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    support@hi5port.com
                    <br />
                    info@hi5port.com
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={8}>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                p: 4,
                borderRadius: 2,
                boxShadow: 3,
                backgroundColor: 'background.paper',
              }}
            >
              <Typography variant="h3" sx={{ color: 'primary.main', mb: 3 }}>
                Gửi tin nhắn cho chúng tôi
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="name"
                    label="Họ và tên"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    sx={STYLE_TEXTFIELD}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="email"
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    sx={STYLE_TEXTFIELD}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="phone"
                    label="Số điện thoại"
                    value={formData.phone}
                    onChange={handleChange}
                    sx={STYLE_TEXTFIELD}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="message"
                    label="Tin nhắn"
                    multiline
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    sx={STYLE_TEXTFIELD}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ px: 4, py: 1.5 }}
                  >
                    Gửi tin nhắn
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default ContactPage;

