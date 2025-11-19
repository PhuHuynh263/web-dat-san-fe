<<<<<<< HEAD
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// Biến cho hamburger menu
const DRAWER_WIDTH = '60vw';
const HAMBURGER_BREAKPOINT = 'md'; // md trong MUI = 900px

const navLinks = [
  { to: '/homepage', label: 'Trang Chủ', end: true },
  { to: '/about', label: 'Giới Thiệu' },
  { to: '/contact', label: 'Liên Hệ' },
  { to: '/booking', label: 'Đặt Sân' },
  { to: '/news', label: 'Tin Tức' },
];
=======
import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MENU_ITEMS_STYLE = {
  fontSize: "1rem",
  fontWeight: "bold",
  color: "text.primary",
  cursor: "pointer",
  ml: 2,
  ":hover": { color: "primary.main" },
};

const servicesList = ["Đá Banh", "Cầu Lông", "Quần Vợt", "Pickleball"];
>>>>>>> 81a37d0179c94b1a0f4cbe00b4926e92c4cf9766

function Header() {
  const [isLoggedIn, setLogin] = React.useState(false);
<<<<<<< HEAD
  const [clientName, setClientName] = React.useState('');
  const [drawerOpen, setDrawerOpen] = React.useState(false);
=======
  const [clientName, setClientName] = React.useState("");

>>>>>>> 81a37d0179c94b1a0f4cbe00b4926e92c4cf9766
  const navigate = useNavigate();

  const checkLogin = () => {
    axios
      .get("http://127.0.0.1:8000/api/khach-hang/kiem-tra-dang-nhap", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token_khach_hang"),
        },
      })
      .then((res) => {
        if (res.data.status) {
          setLogin(true);
          setClientName(res.data.ten_kh);
        } else {
          setLogin(false);
        }
      })
      .catch((err) => {
        console.error(err);
        setLogin(false);
      });
  };

  const logOut = () => {
    axios
      .post(
        "http://127.0.0.1:8000/api/khach-hang/dang-xuat",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token_khach_hang"),
          },
        }
      )
      .then((res) => {
        const thong_bao = res.data.message;
        if (res.data.status) {
          toast.success(thong_bao);
          localStorage.removeItem("token_khach_hang");
          navigate("/login");
        } else {
          toast.error(thong_bao);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Lỗi kết nối đến máy chủ!");
      });
  };

  React.useEffect(() => {
    checkLogin();
  }, []);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleNavLinkClick = () => {
    setDrawerOpen(false);
  };

  return (
<<<<<<< HEAD
    <AppBar sx={{ position: 'static', backgroundColor: 'white' }}>
      <Container maxWidth={false} sx={{ backgroundColor: 'white', py: 1 }}>
=======
    <AppBar sx={{ position: "static", backgroundColor: "white" }}>
      <Container sx={{ maxWidth: "xl", backgroundColor: "white" }}>
>>>>>>> 81a37d0179c94b1a0f4cbe00b4926e92c4cf9766
        <Toolbar>
          {/* Logo */}
          <Box
            component={NavLink}
            to="/homepage"
<<<<<<< HEAD
            end
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', textDecoration: 'none' }}
=======
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              textDecoration: "none",
            }}
>>>>>>> 81a37d0179c94b1a0f4cbe00b4926e92c4cf9766
          >
            <SportsSoccerIcon
              sx={{
                color: "primary.main",
                fontSize: 40,
                cursor: "pointer",
              }}
            />
            <Typography
              variant="span"
              sx={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                ml: 1,
                color: "primary.main",
                cursor: "pointer",
              }}
            >
              FootyFanatics
            </Typography>
          </Box>

          {/* Action Button Login/Register */}
          {!isLoggedIn ? (
            <Box
              sx={{ flexGrow: 0, ml: 2, color: "text.secondary", fontSize: 14 }}
            >
              <Typography
                variant="span"
                component={NavLink}
                to="/login"
                sx={{
                  cursor: "pointer",
                  textDecoration: "none",
                  color: "inherit",
                  "&:hover": {
                    color: "primary.main",
                  },
                }}
              >
                Đăng nhập
              </Typography>
              {" / "}
              <Typography
                variant="span"
                component={NavLink}
                to="/signup"
                sx={{
                  cursor: "pointer",
                  textDecoration: "none",
                  color: "inherit",
                  "&:hover": {
                    color: "primary.main",
                  },
                }}
              >
                Đăng ký
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{ flexGrow: 0, ml: 2, color: "text.secondary", fontSize: 14 }}
            >
              <Typography
                variant="span"
                sx={{
                  cursor: "pointer",
                  textDecoration: "none",
                  color: "inherit",
                  "&:hover": {
                    color: "primary.main",
                  },
                }}
              >
                {isLoggedIn ? clientName : "User"}
              </Typography>
              {" / "}
              <Typography
                onClick={() => logOut()}
                variant="span"
                component={NavLink}
                to="#"
                sx={{
                  cursor: "pointer",
                  textDecoration: "none",
                  color: "inherit",
                  "&:hover": {
                    color: "primary.main",
                  },
                }}
              >
                Đăng xuất
              </Typography>
            </Box>
          )}

          {/* Menu */}
          <Box sx={{ flexGrow: 1 }} />
<<<<<<< HEAD
          
          {/* Desktop Menu - Hidden on md and below */}
          <Box sx={{ display: { xs: 'none', [HAMBURGER_BREAKPOINT]: 'flex' }, alignItems: 'center' }}>
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                style={({ isActive }) => ({
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  marginLeft: link.to === '/homepage' ? 0 : 16,
                  transition: 'color 0.3s ease',
                  color: isActive ? '#df1b3f' : '#000000',
                })}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#df1b3f';
                }}
                onMouseLeave={(e) => {
                  const href = e.currentTarget.getAttribute('href');
                  const isCurrentPath = window.location.pathname === href || (href === '/homepage' && window.location.pathname === '/');
                  e.currentTarget.style.color = isCurrentPath ? '#df1b3f' : '#000000';
                }}
              >
                {link.label}
              </NavLink>
            ))}
          </Box>

          {/* Hamburger Menu Icon - Shown only on md and below */}
          <Box sx={{ display: { xs: 'flex', [HAMBURGER_BREAKPOINT]: 'none' }, ml: 2 }}>
            <IconButton
              onClick={handleDrawerOpen}
              sx={{ p: 0 }}
            >
              <MenuIcon sx={{ color: 'black', fontSize: 30 }} />
            </IconButton>
=======
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* Home */}
            <Typography
              variant="span"
              component={NavLink}
              to="/"
              sx={{
                fontSize: "1rem",
                fontWeight: "bold",
                color: "primary.main",
                cursor: "pointer",
                textDecoration: "none",
                "&:hover": { color: "primary.main" },
              }}
            >
              Trang Chủ
            </Typography>

            {/* About */}
            <Typography
              variant="span"
              component={NavLink}
              to="/about"
              sx={{
                ...MENU_ITEMS_STYLE,
                textDecoration: "none",
              }}
            >
              Giới Thiệu
            </Typography>

            {/* Contact */}
            <Typography
              variant="span"
              component={NavLink}
              to="/contact"
              sx={{
                ...MENU_ITEMS_STYLE,
                textDecoration: "none",
              }}
            >
              Liên Hệ
            </Typography>

            {/* Services */}
            <Typography
              variant="span"
              sx={{
                ...MENU_ITEMS_STYLE,
              }}
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              Dịch Vụ
            </Typography>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              slotProps={{
                list: {
                  "aria-labelledby": "basic-button",
                },
              }}
            >
              {servicesList.map((service) => (
                <MenuItem key={service} onClick={handleClose}>
                  {service}
                </MenuItem>
              ))}
            </Menu>

            {/* Booking */}
            <Typography
              variant="span"
              component={NavLink}
              to="/booking"
              sx={{
                ...MENU_ITEMS_STYLE,
                textDecoration: "none",
              }}
            >
              Đặt Sân
            </Typography>

            {/* News */}
            <Typography
              variant="span"
              component={NavLink}
              to="/news"
              sx={{
                ...MENU_ITEMS_STYLE,
                textDecoration: "none",
              }}
            >
              Tin Tức
            </Typography>
>>>>>>> 81a37d0179c94b1a0f4cbe00b4926e92c4cf9766
          </Box>
        </Toolbar>
      </Container>

      {/* Drawer Menu */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerClose}
        sx={{
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            backgroundColor: 'white',
          },
        }}
      >
        <Box
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={handleNavLinkClick}
              style={({ isActive }) => ({
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                textDecoration: 'none',
                marginTop: 30,
                marginBottom: 0,
                transition: 'color 0.3s ease',
                color: isActive ? '#df1b3f' : '#000000',
              })}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#df1b3f';
              }}
              onMouseLeave={(e) => {
                const href = e.currentTarget.getAttribute('href');
                const isCurrentPath = window.location.pathname === href || (href === '/homepage' && window.location.pathname === '/');
                e.currentTarget.style.color = isCurrentPath ? '#df1b3f' : '#000000';
              }}
            >
              {link.label}
            </NavLink>
          ))}
        </Box>
      </Drawer>
    </AppBar>
  );
}

export default Header;
