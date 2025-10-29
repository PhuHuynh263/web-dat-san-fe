import { useState } from 'react';
import Header from '../../components/Admin/Header/Header';
import { Box } from '@mui/material';
import Sidebar from '../../components/Admin/Sidebar/Sidebar';

function DashBoard() {
  // 1. Quản lý trạng thái đóng/mở sidebar ở đây
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // 2. Hàm để thay đổi trạng thái, sẽ được truyền xuống Header
  const handleToggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };
  return (
    <Box sx={{ display: 'flex' }}>
      {/* --- SIDEBAR --- */}
      <Sidebar isOpen={isSidebarOpen} />

      {/* --- MAIN CONTENT --- */}
      <Box
        component='main'
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        {/* --- HEADER --- */}
        <Header isOpen={isSidebarOpen} onToggleSidebar={handleToggleSidebar} />

        {/* --- CONTENT GRID --- */}
      </Box>
    </Box>
  );
}

export default DashBoard;
