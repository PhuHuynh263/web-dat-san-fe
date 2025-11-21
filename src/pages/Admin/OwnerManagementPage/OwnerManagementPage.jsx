import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  Chip,
  IconButton,
  Tooltip,
  Avatar,
  TextField,
  InputAdornment,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { toast } from "react-toastify";

// --- Icons ---
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function OwnerManagementPage() {
  // 1. Đổi tên state cho chuẩn
  const [rows, setRows] = useState([]);
  const [searchText, setSearchText] = useState("");

  // --- API ---
  const layDataChuSan = () => {
    axios
      .get("http://127.0.0.1:8000/api/quan-tri-vien/chu-san/data", {
        headers: {
          Authorization:
            "Bearer " + localStorage.getItem("token_quan_tri_vien"),
        },
      })
      .then((res) => {
        setRows(res.data.data); // Cập nhật state rows
      })
      .catch((err) => {
        console.error("Lỗi khi lấy data:", err);
        toast.error("Lỗi kết nối server");
      });
  };

  const changeStatus = (id) => {
    axios
      .post(
        "http://127.0.0.1:8000/api/quan-tri-vien/chu-san/changeStatus",
        { id },
        {
          headers: {
            Authorization:
              "Bearer " + localStorage.getItem("token_quan_tri_vien"),
          },
        }
      )
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message);
          layDataChuSan(); // Load lại dữ liệu sau khi đổi trạng thái
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.error("Lỗi đổi trạng thái:", err);
        toast.error("Có lỗi xảy ra");
      });
  };

  useEffect(() => {
    layDataChuSan();
  }, []);

  // --- Search Filter ---
  // (Nếu API chưa hỗ trợ search, ta filter ở client)
  const filteredRows = rows.filter((row) => {
    if (!searchText) return true;
    const text = searchText.toLowerCase();
    return (
      row.ten_chu_san?.toLowerCase().includes(text) ||
      row.email?.toLowerCase().includes(text) ||
      row.so_dien_thoai?.toLowerCase().includes(text)
    );
  });

  const columns = [
    {
      field: "stt",
      headerName: "STT",
      width: 70,
      align: "center",
      headerAlign: "center",
      sortable: false,
      renderCell: (params) =>
        params.api.getRowIndexRelativeToVisibleRows(params.id) + 1,
    },
    {
      field: "ten_chu_san",
      headerName: "Tên chủ sân",
      width: 180,
      headerAlign: "center",
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar src={params.row.avatar} sx={{ width: 32, height: 32 }} />
          <Typography variant="body2" fontWeight="bold">
            {params.value}
          </Typography>
        </Box>
      ),
    },
    // {
    //   field: 'ten_san', // Nếu 1 chủ sân có nhiều sân, cột này có thể gây rối. Cân nhắc hiển thị dạng list hoặc bỏ qua.
    //   headerName: 'Tên sân',
    //   width: 150,
    //   headerAlign: 'center',
    // },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      minWidth: 200,
      headerAlign: "center",
    },
    {
      field: "so_dien_thoai",
      headerName: "SĐT",
      width: 120,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "dia_chi",
      headerName: "Địa chỉ",
      flex: 1,
      minWidth: 200,
      headerAlign: "center",
    },
    {
      field: "trang_thai",
      headerName: "Trạng thái",
      width: 140,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const isActive = params.value === 1;
        return (
          <Chip
            label={isActive ? "Hoạt động" : "Tạm khóa"}
            color={isActive ? "success" : "default"}
            size="small"
            variant={isActive ? "filled" : "outlined"}
            sx={{ fontWeight: 500, minWidth: 90 }}
          />
        );
      },
    },
    {
      field: "actions",
      headerName: "Hành động",
      width: 120,
      headerAlign: "center",
      align: "center",
      sortable: false,
      renderCell: (params) => {
        const isActive = params.row.trang_thai === 1;
        return (
          <Box>
            <Tooltip title={isActive ? "Khóa tài khoản" : "Mở khóa"}>
              <IconButton
                color={isActive ? "error" : "success"}
                size="small"
                onClick={() => changeStatus(params.row.id)}
              >
                {isActive ? (
                  <BlockIcon fontSize="small" />
                ) : (
                  <CheckCircleIcon fontSize="small" />
                )}
              </IconButton>
            </Tooltip>
            <Tooltip title="Xem chi tiết / Sửa">
              <IconButton color="primary" size="small">
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
      }}
    >
      {/* --- HEADER --- */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          flexShrink: 0,
        }}
      >
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            size="small"
            placeholder="Tìm kiếm..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
            sx={{ width: 300, bgcolor: "white" }}
          />
          <Button
            variant="contained"
            startIcon={<RefreshIcon />}
            onClick={layDataChuSan}
          >
            Làm mới
          </Button>
        </Box>
      </Box>

      {/* --- TABLE --- */}
      <Paper
        sx={{
          flexGrow: 1,
          minHeight: 0,
          width: "100%",
          boxShadow: 3,
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <DataGrid
          rows={filteredRows}
          columns={columns}
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          pageSizeOptions={[10, 20, 50]}
          disableRowSelectionOnClick
          rowHeight={60}
          sx={{
            border: 0,
            height: "100%",
            width: "100%",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f5f7fa",
              fontWeight: "bold",
              textTransform: "uppercase",
              fontSize: "0.85rem",
              color: "#555",
            },
            "& .MuiDataGrid-row": {
              alignItems: "center",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid #f0f0f0",
              display: 'flex',
              alignItems: 'center',
            },
            "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus": {
              outline: "none",
            },
          }}
        />
      </Paper>
    </Box>
  );
}

export default OwnerManagementPage;
