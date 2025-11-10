// src/layouts/Admin/DashBoard.jsx
// (Bạn có thể đổi tên file này thành `DashboardLayout.jsx` cho chung chung hơn)

import { useState } from "react";
import Header from "../../components/Admin/Header/Header";
import { Box, CssBaseline, ThemeProvider, Toolbar } from "@mui/material";
import Sidebar from "../../components/Admin/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { dashboardTheme } from "../../dashboardTheme";
// import { useAuth } from '../../hooks/useAuth'; // (Cách chuẩn)

function DashBoard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // --- LẤY VAI TRÒ NGƯỜI DÙNG ---
  // (Cách 1: Dùng hook - Cách chuẩn nhất)
  // const { user } = useAuth(); // Giả sử user = { role: 'admin' }
  // const userRole = user ? user.role : null;
  
  // (Cách 2: Giả lập để test)
  // Thay đổi giá trị này thành 'owner' để xem Sidebar thay đổi
  const userRole = 'admin'; 

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  return (
    <ThemeProvider theme={dashboardTheme}>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
      {/* Truyền userRole xuống Header (nếu Header cũng cần) */}
      <Header isOpen={isSidebarOpen} onToggleSidebar={handleToggleSidebar} />

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