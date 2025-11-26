import React from "react";
import { Box, Container, Grid, Link, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        p: 6,
      }}
      component="footer"
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Hi5sport
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Đặt sân bóng đá online nhanh chóng và tiện lợi.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Liên kết
            </Typography>
            <Link href="#" variant="body2" display="block" color="text.secondary">
              Trang chủ
            </Link>
            <Link href="#" variant="body2" display="block" color="text.secondary">
              Về chúng tôi
            </Link>
            <Link href="#" variant="body2" display="block" color="text.secondary">
              Tin tức
            </Link>
            <Link href="#" variant="body2" display="block" color="text.secondary">
              Liên hệ
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Liên hệ
            </Typography>
            <Typography variant="body2" color="text.secondary">
              123 Đường ABC, Quận 1, TP. HCM
            </Typography>
            <Typography variant="body2" color="text.secondary">
              hi5sport@example.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
              +84 123 456 789
            </Typography>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color="text.secondary" align="center">
            {"© "}
            {new Date().getFullYear()}{" "}
            <Link color="inherit" href="#">
              Hi5sport
            </Link>
            {". All rights reserved."}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
