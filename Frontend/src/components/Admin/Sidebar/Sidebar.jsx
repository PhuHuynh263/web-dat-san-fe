import { Box, Drawer, Toolbar, List, Typography, Button } from '@mui/material';
import { useState } from 'react';
import { darken } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';

export const drawerWidth = 300;

function Sidebar() {
  const [openUserManage, setOpenUserManage] = useState(false);
  const [openReportManage, setOpenReportManage] = useState(false);
  const handleClickUserManage = () => {
    setOpenUserManage(!openUserManage);
  };
  const handleClickReportManage = () => {
    setOpenReportManage(!openReportManage);
  };
  return (
    <>
      <Drawer
        variant='permanent'
        sx={{
          position: 'relative',
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: darken('#003C7A', 0.1),
            color: 'white',
          },
        }}
      >
        <Box sx={{ overflow: 'auto' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              height: 80,
              color: 'white',
              pl: 2,
              mt: 1,
              mb: 1,
              boxShadow: 1,
              backgroundColor: '#003C7A',
            }}
          >
            {/* Logo hoặc tiêu đề ở đây */}
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
          <List
            sx={{
              mt: 0,
              width: '100%',
              maxWidth: 360,
              bgcolor: '#003C7A',
              boxShadow: 1,
              '& .MuiListItemButton-root': {
                '&:focus': { backgroundColor: 'primary.main', color: 'white' },
                '&:hover': { bgcolor: 'primary.main', color: 'white' },
                '& .MuiListItemIcon-root': { color: 'inherit' },
                mb: 2,
              },
            }}
            component='nav'
          >
            <ListItemButton>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary='TỔNG QUAN' />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <SportsSoccerIcon />
              </ListItemIcon>
              <ListItemText primary='QUẢN LÝ SÂN BÓNG' />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <LocalShippingIcon />
              </ListItemIcon>
              <ListItemText primary='QUẢN LÝ ĐƠN ĐẶT' />
            </ListItemButton>
            <ListItemButton onClick={handleClickUserManage}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary='QUẢN LÝ NGƯỜI DÙNG' />
              {openUserManage ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openUserManage} timeout='auto' unmountOnExit>
              <List component='div' disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <PersonOutlineIcon />
                  </ListItemIcon>
                  <ListItemText primary='Quản lý chủ sân' />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <PersonOutlineIcon />
                  </ListItemIcon>
                  <ListItemText primary='Quản lý khách hàng' />
                </ListItemButton>
              </List>
            </Collapse>
            <ListItemButton onClick={handleClickReportManage}>
              <ListItemIcon>
                <AssessmentIcon />
              </ListItemIcon>
              <ListItemText primary='BÁO CÁO & THỐNG KÊ' />
              {openReportManage ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openReportManage} timeout='auto' unmountOnExit>
              <List component='div' disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <AssessmentIcon />
                  </ListItemIcon>
                  <ListItemText primary='Báo cáo Doanh thu' />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <AssessmentIcon />
                  </ListItemIcon>
                  <ListItemText primary='Báo cáo Người dùng' />
                </ListItemButton>
              </List>
            </Collapse>
            <ListItemButton>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary='CÀI ĐẶT' />
            </ListItemButton>
          </List>
        </Box>
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            display: 'flex',
            alignItems: 'flex-end',
            width: '100%',
            height: 70,
            color: 'text.primary',
            marginBottom: 2,
          }}
        >
          <Button sx={{ m: 2 }}>Đăng Xuất</Button>
        </Box>
      </Drawer>
    </>
  );
}

export default Sidebar;
