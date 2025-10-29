import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import Typography from '@mui/material/Typography';

const MENU_ITEMS_STYLE = {
  fontSize: '1rem',
  fontWeight: 'bold',
  color: 'text.primary',
  cursor: 'pointer',
  ml: 2,
  ':hover': { color: 'primary.main' },
};

const servicesList = ['Đá Banh', 'Cầu Lông', 'Quần Vợt', 'Pickleball'];

function AppBarComponent() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar sx={{ position: 'static', backgroundColor: 'white' }}>
      <Container sx={{ maxWidth: 'xl', backgroundColor: 'white' }}>
        <Toolbar>
          {/* Logo */}
          <Box
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          >
            <SportsSoccerIcon
              sx={{ color: 'primary.main', fontSize: 40, cursor: 'pointer' }}
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
          <Box
            sx={{ flexGrow: 0, ml: 2, color: 'text.secondary', fontSize: 14 }}
          >
            <Typography variant='span' sx={{ cursor: 'pointer' }}>
              Login
            </Typography>
            {' / '}
            <Typography variant='span' sx={{ cursor: 'pointer' }}>
              Register
            </Typography>
          </Box>

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

export default AppBarComponent;
