import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  MenuItem,
  InputAdornment,
  Avatar,
  Rating,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

// --- Import Icons ---
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import DeleteIcon from "@mui/icons-material/Delete";

// --- Dữ liệu giả lập (Mock Data) ---
const initialRows = [
  {
    id: 1,
    user: { name: "Nguyễn Văn A", avatar: "" },
    pitchName: "Sân bóng Duy Tân - Sân 1",
    rating: 5,
    comment: "Sân cỏ rất đẹp, chủ sân thân thiện. Sẽ quay lại!",
    status: "pending",
    createdAt: "2025-11-10",
  },
  {
    id: 2,
    user: { name: "Trần Thị B", avatar: "" },
    pitchName: "Sân bóng Hòa Xuân",
    rating: 2,
    comment: "Đèn sân quá tối, không đá được vào buổi tối.",
    status: "approved",
    createdAt: "2025-11-09",
  },
  {
    id: 3,
    user: { name: "Lê Văn C", avatar: "" },
    pitchName: "Sân Tuyên Sơn",
    rating: 1,
    comment: "Thái độ phục vụ kém, không bao giờ quay lại.",
    status: "hidden",
    createdAt: "2025-11-08",
  },
  // Thêm nhiều dòng để test scroll
  ...Array.from({ length: 20 }, (_, i) => ({
    id: i + 4,
    user: { name: `User ${i + 4}`, avatar: "" },
    pitchName: `Sân Test ${i + 4}`,
    rating: 4,
    comment: "Test comment...",
    status: "approved",
    createdAt: "2025-11-01",
  })),
];

function AssessmentManagementPage() {
  const [rows, setRows] = useState(initialRows);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const handleStatusChange = (id, newStatus) => {
    const updatedRows = rows.map((row) =>
      row.id === id ? { ...row, status: newStatus } : row
    );
    setRows(updatedRows);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa đánh giá này?")) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const filteredRows = rows.filter((row) => {
    const matchesSearch =
      row.user.name.toLowerCase().includes(searchText.toLowerCase()) ||
      row.pitchName.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = filterStatus === "all" || row.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "user",
      headerName: "Người dùng",
      width: 180,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Avatar src={params.value.avatar} sx={{ width: 32, height: 32 }}>
            {params.value.name.charAt(0)}
          </Avatar>
          <Typography variant="body2" fontWeight="500">
            {params.value.name}
          </Typography>
        </Box>
      ),
    },
    { field: "pitchName", headerName: "Tên sân bóng", width: 200 },
    {
      field: "rating",
      headerName: "Điểm",
      flex: 1,
      renderCell: (params) => (
        <Rating value={params.value} readOnly size="small" />
      ),
    },
    {
      field: "comment",
      headerName: "Nội dung đánh giá",
      flex: 1,
      minWidth: 250,
      renderCell: (params) => (
        <Tooltip title={params.value} placement="top-start">
          <Typography variant="body2" noWrap sx={{ width: "100%" }}>
            {params.value}
          </Typography>
        </Tooltip>
      ),
    },
    {
      field: "status",
      headerName: "Trạng thái",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const statusMap = {
          approved: { color: "success", label: "Đã duyệt" },
          pending: { color: "warning", label: "Chờ duyệt" },
          hidden: { color: "default", label: "Đã ẩn" },
        };
        const { color, label } = statusMap[params.value] || {
          color: "default",
          label: params.value,
        };
        return (
          <Chip
            label={label}
            color={color}
            size="small"
            variant={params.value === "hidden" ? "outlined" : "filled"}
          />
        );
      },
    },
    {
      field: "createdAt",
      headerName: "Ngày",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "actions",
      headerName: "Hành động",
      flex: 1,
      sortable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Box>
          {params.row.status !== "approved" && (
            <Tooltip title="Duyệt">
              <IconButton
                color="success"
                size="small"
                onClick={() => handleStatusChange(params.row.id, "approved")}
              >
                <CheckCircleIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
          {params.row.status !== "hidden" && (
            <Tooltip title="Ẩn">
              <IconButton
                color="warning"
                size="small"
                onClick={() => handleStatusChange(params.row.id, "hidden")}
              >
                <VisibilityOffIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title="Xóa">
            <IconButton
              color="error"
              size="small"
              onClick={() => handleDelete(params.row.id)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    // 1. Container chính: Dùng Flex column và calc() chiều cao để vừa khít màn hình
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%", // 1. Quan trọng: Chiếm 100% chiều cao của cha (Box main trong Dashboard)
        width: "100%",
      }}
    >
      {/* 2. Phần Tiêu đề và Toolbar: Kích thước tự động (flex-shrink: 0) */}
      <Box sx={{ flexShrink: 0, mb: 2 }}>
        <Paper sx={{ p: 2, display: "flex", gap: 2, alignItems: "center" }}>
          <TextField
            size="small"
            placeholder="Tìm kiếm đánh giá..."
            variant="outlined"
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
          <TextField
            select
            size="small"
            label="Trạng thái"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FilterListIcon color="action" />
                </InputAdornment>
              ),
            }}
            sx={{ width: 200 }}
          >
            <MenuItem value="all">Tất cả</MenuItem>
            <MenuItem value="pending">Chờ duyệt</MenuItem>
            <MenuItem value="approved">Đã duyệt</MenuItem>
            <MenuItem value="hidden">Đã ẩn</MenuItem>
          </TextField>
        </Paper>
      </Box>

      {/* 3. Phần Bảng dữ liệu: flexGrow: 1 để chiếm hết khoảng trống còn lại */}
      <Paper
        sx={{
          flexGrow: 1, // Tự động chiếm hết không gian còn lại
          minHeight: 0, // Rất quan trọng: Cho phép flex item thu nhỏ hơn nội dung của nó (để hiện scrollbar)
          width: "100%",
          display: "flex",
          flexDirection: "column",
          boxShadow: 2,
        }}
      >
        <DataGrid
          rows={filteredRows}
          columns={columns}
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          pageSizeOptions={[10, 20, 50]}
          checkboxSelection
          disableRowSelectionOnClick
          // Đảm bảo DataGrid tự cuộn bên trong nó
          sx={{
            border: 0,
            "& .MuiDataGrid-columnHeader": {
              backgroundColor: "#f5f5f5",
              fontWeight: "bold",
            },
            // Đảm bảo DataGrid chiếm hết chiều cao của Paper cha
            height: "100%",
            width: "100%",
          }}
        />
      </Paper>
    </Box>
  );
}

export default AssessmentManagementPage;
