import {
  Box,
  Drawer,
  Toolbar,
  List,
  Typography,
  Button,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  darken,
} from '@mui/material';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

// 1. IMPORT TẤT CẢ ROUTE TỪ FILE CHUNG
import { dashboardRoutes } from '../../../routes/dashboardRoutes.jsx';

// Import các Icons (Đã đầy đủ)
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';
import CommentIcon from '@mui/icons-material/Comment';
import BarChartIcon from '@mui/icons-material/BarChart';
import QueryStatsIcon from '@mui/icons-material/QueryStats';

export const drawerWidth = 300;

// === COMPONENT CON ĐỂ RENDER MENU ===
// Component này sẽ tự render NavLink hoặc Collapse dựa trên dữ liệu route
function SidebarMenuItem({ route }) {
  const [open, setOpen] = useState(false);

  // Style cho NavLink khi active
  const navLinkSx = {
    color: 'white',
    '&.active': {
      backgroundColor: 'secondary.main',
      '& .MuiListItemIcon-root': {
        color: 'white',
      },
    },
  };

  const handleClick = () => {
    setOpen(!open);
  };

  // CASE 1: MỤC CHA CÓ MENU CON (có children)
  if (route.children) {
    return (
      <>
        <ListItemButton onClick={handleClick} sx={{ mb: 1 }}>
          <ListItemIcon>{route.meta.icon}</ListItemIcon>
          <ListItemText primary={route.meta.title} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            {route.children.map((childRoute) => (
              <ListItemButton
                key={childRoute.path}
                component={NavLink}
                to={childRoute.path}
                sx={{ ...navLinkSx, pl: 4, mb: 1 }}
              >
                <ListItemIcon>{childRoute.meta.icon}</ListItemIcon>
                <ListItemText primary={childRoute.meta.title} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      </>
    );
  }

  // CASE 2: MỤC CHA LÀ LINK TRỰC TIẾP (không có children)
  return (
    <ListItemButton
      component={NavLink}
      to={route.path}
      sx={{ ...navLinkSx, mb: 1 }}
    >
      <ListItemIcon>{route.meta.icon}</ListItemIcon>
      <ListItemText primary={route.meta.title} />
    </ListItemButton>
  );
}

// === COMPONENT SIDEBAR CHÍNH ===
function Sidebar({ isOpen, userRole }) {
  // 2. Lọc danh sách route dựa trên vai trò (role)
  // Chỉ hiển thị các route mà 'userRole' được phép xem
  const accessibleRoutes = dashboardRoutes.filter((route) =>
    route.meta.roles.includes(userRole)
  );

  return (
    <Drawer
      variant='permanent'
      open={isOpen}
      sx={{
        width: drawerWidth, // Chiều rộng container thay đổi theo 'isOpen'
        flexShrink: 0,
        transition: (theme) =>
          theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: isOpen
              ? theme.transitions.duration.enteringScreen
              : theme.transitions.duration.leavingScreen,
          }),

        '& .MuiDrawer-paper': {
          width: drawerWidth, // Chiều rộng của paper bên trong
          boxSizing: 'border-box',
          backgroundColor: (theme) => darken(theme.palette.primary.minor, 0.2),
          color: 'white',
          overflowX: 'hidden', // Quan trọng
          // Style đóng/mở cho paper
          transition: (theme) =>
            theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: isOpen
                ? theme.transitions.duration.enteringScreen
                : theme.transitions.duration.leavingScreen,
            }),
          ...(!isOpen && {
            width: 0, // Thu paper về 0 khi đóng
          }),
        },
      }}
    >
      <Box sx={{ overflow: 'auto' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            height: 64,
            color: 'white',
            pl: 2,
            backgroundColor: 'primary.minor',
            boxShadow: 1,
          }}
        >
          <SportsSoccerIcon sx={{ mr: 1, fontSize: '2rem' }} />
          <Typography
            variant='h5'
            noWrap
            component='div'
            sx={{ fontWeight: 'bold' }}
          >
            Quản Lý Sân Bóng
          </Typography>
        </Box>

        {/* 3. Render động các mục menu */}
        <List
          component='nav'
          sx={{
            p: 1, // Thêm padding cho List
            '& .MuiListItemIcon-root': { color: 'inherit', minWidth: '40px' }, // Căn chỉnh icon
            '& .MuiListItemButton-root': {
              borderRadius: '8px',
              '&:hover': { bgcolor: 'secondary.main', color: 'white' },
            },
          }}
        >
          {accessibleRoutes.map((route) => (
            <SidebarMenuItem key={route.meta.title} route={route} />
          ))}
        </List>
      </Box>

      <Box
        sx={{
          position: 'absolute',
          bottom: 16,
          width: '100%',
          textAlign: 'center',
        }}
      >
        <Button sx={{ width: 250 }} variant='contained' color='error'>
          Đăng Xuất
        </Button>
      </Box>
    </Drawer>
  );
}

export default Sidebar;
