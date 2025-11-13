// src/layouts/Admin/DashBoard.jsx
// (Bạn có thể đổi tên file này thành `DashboardLayout.jsx` cho chung chung hơn)

import { useState } from "react";
import AdminHeader from "../../components/Admin/Header/AdminHeader";
import OwnerHeader from "../../components/Owner/Header/OwnerHeader";
import { Box, CssBaseline, ThemeProvider, Toolbar } from "@mui/material";
import Sidebar from "../../components/Admin/Sidebar/Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { dashboardTheme } from "../../dashboardTheme";
// import { useAuth } from '../../hooks/useAuth'; // (Cách chuẩn)

function DashBoard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // --- LẤY VAI TRÒ NGƯỜI DÙNG ---
  // (Cách 1: Dùng hook - Cách chuẩn nhất)
  // const { user } = useAuth(); // Giả sử user = { role: 'admin' }
  // const userRole = user ? user.role : null;

  // --- LẤY VAI TRÒ THEO ĐƯỜNG DẪN ---
  // Lấy segment đầu tiên của pathname: '/owner/xxx' -> 'owner'
  const location = useLocation();
  const firstSegment = location.pathname.split("/").filter(Boolean)[0] || null;

  // Map segment sang role (chỉ hỗ trợ 'owner' và 'admin' ở đây)
  const userRole =
    firstSegment === "owner" ? "owner" : firstSegment === "admin" ? "admin" : null;

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  return (
    <ThemeProvider theme={dashboardTheme}>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        {/* Render Header theo userRole */}
        {userRole === "admin" && (
          <AdminHeader isOpen={isSidebarOpen} onToggleSidebar={handleToggleSidebar} />
        )}
        {userRole === "owner" && (
          <OwnerHeader isOpen={isSidebarOpen} onToggleSidebar={handleToggleSidebar} />
        )}

        {/* 1. Truyền userRole xuống Sidebar */}
        <Sidebar isOpen={isSidebarOpen} userRole={userRole} />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            bgcolor: "background.default",
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default DashBoard;
