import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  InputAdornment,
  Chip,
  IconButton,
  Tooltip,
  Tabs,
  Tab,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

// --- Import Icons ---
import SearchIcon from "@mui/icons-material/Search";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import VisibilityIcon from "@mui/icons-material/Visibility";

// --- Dữ liệu giả lập (Mock Data) ---
const initialRows = [
  {
    id: "DH001",
    customerName: "Nguyễn Văn A",
    customerPhone: "0905123456",
    pitchName: "Sân 1 - Loại 5 người",
    bookingDate: "2025-11-20",
    timeSlot: "17:30 - 19:00",
    totalPrice: 350000,
    paymentMethod: "at_pitch",
    status: "pending",
    createdAt: "2025-11-18 10:30",
  },
  {
    id: "DH002",
    customerName: "Trần Thị B",
    customerPhone: "0987654321",
    pitchName: "Sân 2 - Loại 7 người",
    bookingDate: "2025-11-21",
    timeSlot: "19:00 - 20:30",
    totalPrice: 500000,
    paymentMethod: "online",
    status: "confirmed",
    createdAt: "2025-11-19 08:15",
  },
  // Thêm nhiều dòng để test scroll...
  ...Array.from({ length: 15 }, (_, i) => ({
    id: `DH00${i + 3}`,
    customerName: `Khách Hàng ${i + 1}`,
    customerPhone: "090xxxxxxx",
    pitchName: `Sân ${i + 3} - Loại 5 người`,
    bookingDate: "2025-11-22",
    timeSlot: "17:00 - 18:30",
    totalPrice: 300000,
    paymentMethod: i % 2 === 0 ? "online" : "at_pitch",
    status: i % 3 === 0 ? "pending" : "completed",
    createdAt: "2025-11-20 09:00",
  })),
];

function ManageOrdersPage() {
  const [rows, setRows] = useState(initialRows);
  const [searchText, setSearchText] = useState("");
  const [tabValue, setTabValue] = useState("all");

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleConfirm = (id) => {
    setRows(
      rows.map((row) => (row.id === id ? { ...row, status: "confirmed" } : row))
    );
  };

  const handleReject = (id) => {
    if (window.confirm("Bạn có chắc muốn từ chối đơn này?")) {
      setRows(
        rows.map((row) =>
          row.id === id ? { ...row, status: "cancelled" } : row
        )
      );
    }
  };

  const filteredRows = rows.filter((row) => {
    const matchesSearch =
      row.customerName.toLowerCase().includes(searchText.toLowerCase()) ||
      row.id.toLowerCase().includes(searchText.toLowerCase()) ||
      row.customerPhone.includes(searchText);

    const matchesTab = tabValue === "all" || row.status === tabValue;
    return matchesSearch && matchesTab;
  });

  const columns = [
    {
      field: "id",
      headerName: "Mã Đơn",
      width: 90,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "customerInfo",
      headerName: "Khách hàng",
      width: 220,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Typography
            variant="body2"
            fontWeight="bold"
            sx={{ lineHeight: 1.2 }}
          >
            {params.row.customerName}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {params.row.customerPhone}
          </Typography>
        </Box>
      ),
    },
    {
      field: "pitchName",
      headerName: "Sân bóng",
      flex: 1, // Tự động co giãn
      minWidth: 180,
    },
    {
      field: "bookingInfo",
      headerName: "Lịch đá",
      width: 160,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Typography variant="body2" sx={{ lineHeight: 1.2 }}>
            {params.row.bookingDate}
          </Typography>
          <Typography variant="caption" color="primary" fontWeight="bold">
            {params.row.timeSlot}
          </Typography>
        </Box>
      ),
    },
    {
      field: "totalPrice",
      headerName: "Tổng tiền",
      width: 120,
      align: "right",
      headerAlign: "right",
      renderCell: (params) => (
        <Typography variant="body2" fontWeight="bold" color="error">
          {params.value.toLocaleString()} đ
        </Typography>
      ),
    },
    {
      field: "paymentMethod",
      headerName: "Thanh toán",
      width: 110,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Chip
          label={params.value === "online" ? "Online" : "Tại sân"}
          color={params.value === "online" ? "success" : "default"}
          size="small"
          variant="outlined"
          sx={{ fontSize: "0.75rem", height: 24 }}
        />
      ),
    },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 130,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        let color = "default";
        let label = "";
        switch (params.value) {
          case "confirmed":
            color = "success";
            label = "Đã xác nhận";
            break;
          case "pending":
            color = "warning";
            label = "Chờ xác nhận";
            break;
          case "cancelled":
            color = "error";
            label = "Đã hủy";
            break;
          case "completed":
            color = "info";
            label = "Hoàn thành";
            break;
          default:
            label = params.value;
        }
        return (
          <Chip
            label={label}
            color={color}
            size="small"
            sx={{ fontWeight: "500", minWidth: 90 }}
          />
        );
      },
    },
    {
      field: "actions",
      headerName: "Hành động",
      width: 120,
      sortable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Box>
          {params.row.status === "pending" ? (
            <>
              <Tooltip title="Xác nhận">
                <IconButton
                  color="success"
                  size="small"
                  onClick={() => handleConfirm(params.row.id)}
                >
                  <CheckCircleIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Từ chối">
                <IconButton
                  color="error"
                  size="small"
                  onClick={() => handleReject(params.row.id)}
                >
                  <CancelIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </>
          ) : (
            <Tooltip title="Xem chi tiết">
              <IconButton size="small" color="primary">
                <VisibilityIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      ),
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%", // Chiếm 100% chiều cao của Main Content
        width: "100%",
      }}
    >
      {/* --- HEADER & TOOLBAR --- */}
      <Box sx={{ flexShrink: 0, mb: 2 }}>
        <Typography
          variant="h5"
          sx={{ mb: 2, fontWeight: "bold", color: "primary.main" }}
        >
          QUẢN LÝ ĐƠN ĐẶT
        </Typography>

        <Paper sx={{ mb: 2, borderRadius: 2 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            textColor="primary"
            indicatorColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            sx={{ minHeight: 48 }}
          >
            <Tab label="Tất cả" value="all" sx={{ fontWeight: 600 }} />
            <Tab
              label="Chờ xác nhận"
              value="pending"
              sx={{ fontWeight: 600 }}
            />
            <Tab
              label="Đã xác nhận"
              value="confirmed"
              sx={{ fontWeight: 600 }}
            />
            <Tab
              label="Hoàn thành"
              value="completed"
              sx={{ fontWeight: 600 }}
            />
            <Tab label="Đã hủy" value="cancelled" sx={{ fontWeight: 600 }} />
          </Tabs>
        </Paper>

        <Paper
          sx={{
            p: 1.5,
            display: "flex",
            gap: 2,
            alignItems: "center",
            borderRadius: 2,
            boxShadow: 1,
          }}
        >
          <TextField
            size="small"
            placeholder="Tìm theo tên, SĐT, mã đơn..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
            sx={{ width: 350 }}
          />
          {/* Có thể thêm DatePicker lọc ngày ở đây */}
        </Paper>
      </Box>

      {/* --- DATA GRID --- */}
      <Paper
        sx={{
          flexGrow: 1, // Quan trọng: Chiếm hết không gian còn lại
          minHeight: 0, // Quan trọng: Để scrollbar hoạt động đúng
          width: "100%",
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: 2,
        }}
      >
        <DataGrid
          rows={filteredRows}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[10, 20, 50]}
          disableRowSelectionOnClick
          rowHeight={60} // Tăng chiều cao dòng để nội dung thoáng hơn
          sx={{
            border: 0,
            height: "100%", // DataGrid chiếm 100% chiều cao của Paper cha
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f5f7fa", // Màu nền header nhẹ nhàng
              color: "#333",
              fontWeight: 600,
              fontSize: "0.9rem",
              borderBottom: "1px solid #e0e0e0",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid #f0f0f0", // Viền mờ giữa các dòng
              display: "flex",
              alignItems: "center", // Căn giữa dọc nội dung trong cell
            },
            "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus": {
              outline: "none", // Bỏ viền xanh khi click
            },
          }}
        />
      </Paper>
    </Box>
  );
}

export default ManageOrdersPage;
