import { Box, Drawer, Toolbar, List, Typography, Button } from "@mui/material";
import { useState } from "react";
import { darken } from "@mui/material/styles";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import PersonIcon from "@mui/icons-material/Person";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SettingsIcon from "@mui/icons-material/Settings";
import CommentIcon from "@mui/icons-material/Comment";
import { NavLink } from "react-router-dom";

export const drawerWidth = 300;
const activeLinkStyle = {
  backgroundColor: "primary.main",
  color: "white",
  "& .MuiListItemIcon-root": {
    color: "white",
  },
};

function Sidebar({ isOpen }) {
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
        open={isOpen}
        variant="permanent"
        sx={{
          width: isOpen ? drawerWidth : 0,
          flexShrink: 0,
          // Style cho paper bên trong Drawer
          "& .MuiDrawer-paper": {
            width: isOpen ? drawerWidth : 0,
            flexShrink: 0,
            boxSizing: "border-box",
            backgroundColor: darken("#003C7A", 0.1),
            color: "white",
            // Thêm hiệu ứng transition cho việc đóng/mở
            transition: (theme) =>
              theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            overflowX: "hidden", // Quan trọng: Ẩn nội dung khi thu nhỏ
          },
          // 3. Style đặc biệt khi Sidebar đóng
          ...(!isOpen && {
            "& .MuiDrawer-paper": {
              transition: (theme) =>
                theme.transitions.create("width", {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.leavingScreen,
                }),
              width: 0, // Chiều rộng bằng 0 khi đóng
            },
          }),
        }}
      >
        <Box sx={{ overflow: "auto" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              height: 64,
              color: "white",
              pl: 2,
              mb: 1,
              boxShadow: 1,
              backgroundColor: "#003C7A",
            }}
          >
            {/* Logo hoặc tiêu đề ở đây */}
            <SportsSoccerIcon sx={{ mr: 1, fontSize: "2rem" }} />
            <Typography
              variant="h5"
              noWrap
              component="div"
              sx={{ fontWeight: "bold" }}
            >
              Quản Lý Sân Bóng
            </Typography>
          </Box>
          <List
            sx={{
              mt: 0,
              width: "100%",
              maxWidth: 360,
              bgcolor: "#003C7A",
              boxShadow: 1,
              "& .MuiListItemButton-root": {
                "&:focus": {
                  backgroundColor: "primary.main",
                  color: "white",
                },
                "&:hover": { bgcolor: "primary.main", color: "white" },
                "& .MuiListItemIcon-root": { color: "inherit" },
                height: 30,
                mb: 2,
              },
            }}
            component="nav"
          >
            <ListItemButton
              component={NavLink}
              to="/admin/dashboard"
              style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="TỔNG QUAN" />
            </ListItemButton>
            <ListItemButton
              component={NavLink}
              to="/admin/pitches"
              style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
            >
              <ListItemIcon>
                <SportsSoccerIcon />
              </ListItemIcon>
              <ListItemText primary="QUẢN LÝ SÂN BÓNG" />
            </ListItemButton>
            <ListItemButton
              component={NavLink}
              to="/admin/bookings"
              style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
            >
              <ListItemIcon>
                <LocalShippingIcon />
              </ListItemIcon>
              <ListItemText primary="QUẢN LÝ ĐƠN ĐẶT" />
            </ListItemButton>
            <ListItemButton
              component={NavLink}
              to="/admin/assessment"
              style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
            >
              <ListItemIcon>
                <CommentIcon />
              </ListItemIcon>
              <ListItemText primary="QUẢN LÝ ĐÁNH GIÁ" />
            </ListItemButton>
            <ListItemButton onClick={handleClickUserManage}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="QUẢN LÝ NGƯỜI DÙNG" />
              {openUserManage ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openUserManage} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  component={NavLink}
                  to="/admin/owners"
                  sx={{ pl: 4 }}
                  style={({ isActive }) =>
                    isActive ? activeLinkStyle : undefined
                  }
                >
                  <ListItemIcon>
                    <PersonOutlineIcon />
                  </ListItemIcon>
                  <ListItemText primary="Quản lý chủ sân" />
                </ListItemButton>
                <ListItemButton
                  component={NavLink}
                  to="/admin/customers"
                  sx={{ pl: 4 }}
                  style={({ isActive }) =>
                    isActive ? activeLinkStyle : undefined
                  }
                >
                  <ListItemIcon>
                    <PersonOutlineIcon />
                  </ListItemIcon>
                  <ListItemText primary="Quản lý khách hàng" />
                </ListItemButton>
              </List>
            </Collapse>
            <ListItemButton onClick={handleClickReportManage}>
              <ListItemIcon>
                <AssessmentIcon />
              </ListItemIcon>
              <ListItemText primary="BÁO CÁO & THỐNG KÊ" />
              {openReportManage ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openReportManage} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  component={NavLink}
                  to="/admin/reports/revenue"
                  sx={{ pl: 4 }}
                  style={({ isActive }) =>
                    isActive ? activeLinkStyle : undefined
                  }
                >
                  <ListItemIcon>
                    <AssessmentIcon />
                  </ListItemIcon>
                  <ListItemText primary="Báo cáo Doanh thu" />
                </ListItemButton>
                <ListItemButton
                  component={NavLink}
                  to="/admin/reports/users"
                  sx={{ pl: 4 }}
                  style={({ isActive }) =>
                    isActive ? activeLinkStyle : undefined
                  }
                >
                  <ListItemIcon>
                    <AssessmentIcon />
                  </ListItemIcon>
                  <ListItemText primary="Báo cáo Người dùng" />
                </ListItemButton>
              </List>
            </Collapse>
            <ListItemButton
              component={NavLink}
              to="/admin/settings"
              style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
            >
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="CÀI ĐẶT" />
            </ListItemButton>
          </List>
        </Box>
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            display: "flex",
            alignItems: "flex-end",
            width: "100%",
            height: 70,
            color: "text.primary",
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
