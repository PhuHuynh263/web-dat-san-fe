import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const MENU_ITEMS_STYLE = {
  fontSize: '1rem',
  fontWeight: 'bold',
  color: 'text.primary',
  cursor: 'pointer',
  ml: 2,
  ':hover': { color: 'primary.main' },
};

const servicesList = ['Đá Banh', 'Cầu Lông', 'Quần Vợt', 'Pickleball'];

function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [isLoggedIn, setLogin] = React.useState(false);
  const [clientName, setClientName] = React.useState('');

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
        setLogIn(false);
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

  return (
    <AppBar sx={{ position: 'static', backgroundColor: 'white' }}>
      <Container sx={{ maxWidth: 'xl', backgroundColor: 'white' }}>
        <Toolbar>
          {/* Logo */}
          <Box
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          >
            <SportsSoccerIcon
              sx={{
                color: 'primary.main',
                fontSize: 40,
                cursor: 'pointer',
              }}
            />
            <Typography
              variant='span'
              sx={{
                fontSize: '1.2rem',
                fontWeight: 'bold',
                ml: 1,
                color: 'primary.main',
                cursor: 'pointer',
              }}
            >
              FootyFanatics
            </Typography>
          </Box>

          {/* Action Button Login/Register */}

          {!isLoggedIn ? (
            <Box
              sx={{ flexGrow: 0, ml: 2, color: 'text.secondary', fontSize: 14 }}
            >
              <Typography
                variant="span"
                component={NavLink}
                to="/login"
                sx={{
                  cursor: 'pointer',
                  textDecoration: 'none',
                  color: 'inherit',
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              >
                Đăng nhập
              </Typography>
              {' / '}
              <Typography
                variant="span"
                component={NavLink}
                to="/signup"
                sx={{
                  cursor: 'pointer',
                  textDecoration: 'none',
                  color: 'inherit',
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              >
                Đăng ký
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{ flexGrow: 0, ml: 2, color: 'text.secondary', fontSize: 14 }}
            >
              <Typography
                variant="span"
                sx={{
                  cursor: 'pointer',
                  textDecoration: 'none',
                  color: 'inherit',
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              >
                {isLoggedIn ? clientName : 'User'}
              </Typography>
              {' / '}
              <Typography
                onClick={() => logOut()}
                variant="span"
                component={NavLink}
                to="#"
                sx={{
                  cursor: 'pointer',
                  textDecoration: 'none',
                  color: 'inherit',
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              >
                Đăng xuất
              </Typography>
            </Box>
          )}
          {/* Menu */}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Home */}
            <Typography
              variant='span'
              sx={{
                fontSize: '1rem',
                fontWeight: 'bold',
                color: 'primary.main',
                cursor: 'pointer',
              }}
            >
              Trang Chủ
            </Typography>

            {/* About */}
            <Typography
              variant='span'
              sx={{
                ...MENU_ITEMS_STYLE,
              }}
            >
              Giới Thiệu
            </Typography>

            {/* Contact */}
            <Typography
              variant='span'
              sx={{
                ...MENU_ITEMS_STYLE,
              }}
            >
              Liên Hệ
            </Typography>

            {/* Services */}
            <Typography
              variant='span'
              sx={{
                ...MENU_ITEMS_STYLE,
              }}
              id='basic-button'
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              Dịch Vụ
            </Typography>
            <Menu
              id='basic-menu'
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              slotProps={{
                list: {
                  'aria-labelledby': 'basic-button',
                },
              }}
            >
              {servicesList.map((service) => (
                <MenuItem key={service} onClick={handleClose}>
                  {service}
                </MenuItem>
              ))}
            </Menu>

            {/* News */}
            <Typography
              variant='span'
              sx={{
                ...MENU_ITEMS_STYLE,
              }}
            >
              Tin Tức
            </Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
