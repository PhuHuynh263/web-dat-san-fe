import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { toast } from "react-toastify";

// Icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function YardTypeManagementPage() {
  // 1. Đổi tên state cho chuẩn: rows (dữ liệu) và setRows (hàm cập nhật)
  const [rows, setRows] = useState([]);

  const layDataChuSan = () => {
    axios
      .get("http://127.0.0.1:8000/api/quan-tri-vien/loai-san/data", {
        headers: {
          Authorization:
            "Bearer " + localStorage.getItem("token_quan_tri_vien"),
        },
      })
      .then((res) => {
        // Giả sử res.data.data là mảng các object có chứa trường 'id'
        setRows(res.data.data);
      })
      .catch((err) => {
        console.error("Lỗi khi lấy data:", err);
        toast.error("Không thể tải dữ liệu loại sân");
      });
  };

  useEffect(() => {
    layDataChuSan();
  }, []);

  const columns = [
    {
      field: "stt",
      headerName: "STT",
      width: 80,
      align: "center",
      headerAlign: "center",
      sortable: false,
      filterable: false,
      renderCell: (params) =>
        params.api.getRowIndexRelativeToVisibleRows(params.id) + 1,
    },
    {
      field: "ten_loai_san",
      headerName: "Tên loại sân",
      flex: 1, // Tự động giãn
      headerAlign: "center",
      align: "center",
    },
    {
      field: "slug_loai_san",
      headerName: "Slug (Đường dẫn)",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "trang_thai",
      headerName: "Trạng thái",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const isActive = params.value === 1;
        return (
          <Chip
            label={isActive ? "Kích hoạt" : "Vô hiệu hóa"}
            color={isActive ? "success" : "default"}
            size="small"
            variant={isActive ? "filled" : "outlined"}
            sx={{ fontWeight: "bold", minWidth: 100 }}
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
      renderCell: (params) => (
        <Box>
          <Tooltip title="Chỉnh sửa">
            <IconButton color="primary" size="small">
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xóa">
            <IconButton color="error" size="small">
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%", // Chiếm 100% chiều cao container cha
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
          flexShrink: 0, // Không co lại
        }}
      ></Box>

      {/* --- TABLE CONTAINER --- */}
      <Paper
        sx={{
          flexGrow: 1, // Chiếm hết không gian còn lại
          minHeight: 0, // Để scrollbar hoạt động
          width: "100%",
          boxShadow: 3,
          overflow: "hidden", // Bo góc cho đẹp
          borderRadius: 2,
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[5, 10, 20]}
          checkboxSelection
          disableRowSelectionOnClick
          rowHeight={60} // Chiều cao hàng thoáng hơn
          sx={{
            border: 0,
            height: "100%",
            // CSS cho Header
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f5f7fa",
              fontWeight: "bold",
              textTransform: "uppercase",
              fontSize: "0.85rem",
            },
            // CSS cho Cell
            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid #f0f0f0",
            },
            // CSS khi focus (bỏ viền xanh)
            "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus": {
              outline: "none",
            },
          }}
        />
      </Paper>
    </Box>
  );
}

export default YardTypeManagementPage;
