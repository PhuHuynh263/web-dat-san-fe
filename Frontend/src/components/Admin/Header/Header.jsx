import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import { drawerWidth } from '../Sidebar/Sidebar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PersonIcon from '@mui/icons-material/Person';
import { Typography } from '@mui/material';
function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      sx={{
        position: 'fixed',
        width: `calc(100% - ${drawerWidth}px)`,
        height: 80,
        mt: 1,
        mb: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
      }}
    >
      <Toolbar>
        {/* Logo */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            mr: 2,
          }}
        >
          <MenuIcon
            sx={{
              color: '#003C7A',
              fontSize: '2rem',
              display: { xs: 'block', md: 'none' },
              mr: 2,
            }}
          />
          <TextField
            id='outlined-textarea'
            label='Search'
            placeholder='Search...'
            multiline
            sx={{
              '& .MuiOutlinedInput-root': {
                width: 500,
                fontSize: 14,
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#003C7A', // Màu viền bạn muốn khi focus
                  color: '#003C7A', // Màu chữ bạn muốn khi focus
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#003C7A',
              },
              display: { xs: 'none', md: 'block' },
            }}
          />
        </Box>

        {/* Menu */}
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            id='basic-button'
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          >
            <PersonIcon sx={{ color: '#003C7A', mr: 1 }} />
            <Typography variant='body1' sx={{ color: '#003C7A' }}>
              Message
            </Typography>
          </Box>
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
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
