import { useState } from "react";
import Header from "../../components/Admin/Header/Header";
import { Box, Toolbar } from "@mui/material";
import Sidebar from "../../components/Admin/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

function DashBoard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Header isOpen={isSidebarOpen} onToggleSidebar={handleToggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} />

      {/* --- MAIN CONTENT (Đã đơn giản hóa) --- */}
      <Box
        component="main"
        sx={{
          flexGrow: 1, // Chỉ cần thuộc tính này để nó tự co giãn
          height: "100vh",
          overflow: "auto",
          p: 1,
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

export default DashBoard;
