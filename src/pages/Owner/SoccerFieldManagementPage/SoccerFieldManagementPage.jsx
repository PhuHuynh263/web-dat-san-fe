import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Box,
  TextField,
  Typography,
  MenuItem,
  Paper,
  IconButton,
  Tooltip,
  Avatar,
  Chip,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { toast } from "react-toastify";

// --- Icons ---
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

function SoccerFieldManagementPage() {
  // --- State ---
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const productTypes = ["5", "7", "9", "11"];

  // Đổi tên cho chuẩn convention
  const [rows, setRows] = useState([]);
  const [listChuSan, setListChuSan] = useState([]);
  const [listLoaiSan, setListLoaiSan] = useState([]);

  const [formData, setFormData] = useState({
    ownerName: "",
    fieldType: "",
    fieldName: "",
    slug: "",
    image: "",
    description: "",
    rentalPrice: "",
    maintenance: "",
    status: "",
  });

  // --- Handlers ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("Dữ liệu sản phẩm:", formData);
    setOpen(false);
    toast.success("Thêm sân thành công (Demo)");
  };

  // --- API Calls ---
  const layDataSanCuaToi = () => {
    axios
      .get("http://127.0.0.1:8000/api/chu-san/san-bong/data-chu-san", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token_chu_san"),
        },
      })
      .then((res) => setRows(res.data.data))
      .catch((err) => console.error("Lỗi khi lấy data sân:", err));
  };

  const layDataChuSan = () => {
    axios
      .get("http://127.0.0.1:8000/api/chu-san/data", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token_chu_san"),
        },
      })
      .then((res) => setListChuSan(res.data.data))
      .catch((err) => console.error("Lỗi khi lấy data chủ sân:", err));
  };

  const layDataLoaiSan = () => {
    axios
      .get("http://127.0.0.1:8000/api/chu-san/loai-san/data", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token_chu_san"),
        },
      })
      .then((res) => setListLoaiSan(res.data.data))
      .catch((err) => console.error("Lỗi khi lấy data loại sân:", err));
  };

  // (Hàm changeStatus nếu cần dùng)
  const changeStatus = (value) => {
    // ... logic change status
  };

  useEffect(() => {
    layDataSanCuaToi();
    layDataChuSan();
    layDataLoaiSan();
  }, []);

  // --- Styles ---
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "95%", md: "700px" }, // Responsive width
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
    maxHeight: "90vh", // Để không bị tràn màn hình dọc
    overflowY: "auto", // Cuộn nếu form dài
  };

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
      field: "hinh_anh",
      headerName: "Ảnh",
      width: 80,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Avatar
          src={params.value}
          variant="rounded"
          sx={{ width: 50, height: 50 }}
        />
      ),
    },
    {
      field: "ten_san",
      headerName: "Tên sân",
      width: 180,
      headerAlign: "center",
      renderCell: (params) => (
        <Typography variant="body2" fontWeight="bold">
          {params.value}
        </Typography>
      ),
    },
    {
      field: "id_loai_san",
      headerName: "Loại Sân",
      width: 120,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const loaiSan = listLoaiSan.find(
          (l) => l.id === Number(params.row.id_loai_san)
        );
        return (
          <Chip
            label={loaiSan ? loaiSan.ten_loai_san : "N/A"}
            size="small"
            color="primary"
            variant="outlined"
          />
        );
      },
    },
    {
      field: "gia_thue",
      headerName: "Giá thuê",
      width: 120,
      align: "right",
      headerAlign: "right",
      renderCell: (params) => (
        <Typography variant="body2" fontWeight="bold" color="error">
          {Number(params.value).toLocaleString()} đ
        </Typography>
      ),
    },
    {
      field: "mo_ta",
      headerName: "Mô tả",
      flex: 1,
      minWidth: 200,
      headerAlign: "center",
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <Typography
            variant="body2"
            sx={{
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2, // Giới hạn 2 dòng
            }}
          >
            {params.value}
          </Typography>
        </Tooltip>
      ),
    },
    {
      field: "dia_chi",
      headerName: "Địa chỉ",
      width: 200,
      headerAlign: "center",
    },
    {
      field: "trang_thai",
      headerName: "Trạng thái",
      width: 130,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const isActive = params.row.trang_thai === 1; // Giả sử 1 là active
        return (
          <Chip
            label={isActive ? "Hoạt động" : "Tạm khóa"}
            color={isActive ? "success" : "default"}
            size="small"
            variant={isActive ? "filled" : "outlined"}
          />
        );
      },
    },
    {
      field: "actions",
      headerName: "Hành động",
      width: 120,
      align: "center",
      headerAlign: "center",
      sortable: false,
      renderCell: (params) => (
        <Box>
          <Tooltip title="Sửa">
            <IconButton size="small" color="primary">
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xóa">
            <IconButton size="small" color="error">
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
        height: "100%", // Full chiều cao
        width: "100%",
      }}
    >
      {/* --- Header --- */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          flexShrink: 0,
        }}
      >
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={layDataSanCuaToi}
          >
            Làm mới
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpen}
          >
            Thêm sân
          </Button>
        </Box>
      </Box>

      {/* --- DataGrid --- */}
      <Paper
        sx={{
          flexGrow: 1,
          width: "100%",
          overflow: "hidden",
          boxShadow: 2,
          minHeight: 0,
          borderRadius: 2,
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          pageSizeOptions={[10, 20, 50]}
          disableRowSelectionOnClick
          rowHeight={70}
          sx={{
            border: 0,
            height: "100%",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f5f7fa",
              fontWeight: "bold",
              textTransform: "uppercase",
              fontSize: "0.85rem",
              color: "#555",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid #f0f0f0",
            },
            "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus": {
              outline: "none",
            },
          }}
        />
      </Paper>

      {/* --- Modal Thêm Sân --- */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography
            variant="h6"
            mb={3}
            fontWeight="bold"
            color="primary"
            align="center"
          >
            THÊM SÂN BÓNG MỚI
          </Typography>

          <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
            <TextField
              select
              fullWidth
              label="Loại sân"
              name="fieldType"
              value={formData.fieldType}
              onChange={handleChange}
              size="small"
            >
              {productTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              fullWidth
              label="Tên sân"
              name="fieldName"
              value={formData.fieldName}
              onChange={handleChange}
              size="small"
            />

            <TextField
              fullWidth
              label="Giá thuê (VNĐ)"
              name="rentalPrice"
              type="number"
              value={formData.rentalPrice}
              onChange={handleChange}
              size="small"
            />
            <TextField
              fullWidth
              label="Slug (URL)"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              size="small"
            />
          </Box>

          <TextField
            fullWidth
            label="Hình ảnh (URL)"
            name="image"
            value={formData.image}
            onChange={handleChange}
            margin="normal"
            size="small"
          />
          <TextField
            fullWidth
            label="Địa chỉ chi tiết"
            name="address"
            margin="normal"
            size="small"
          />
          <TextField
            fullWidth
            label="Mô tả & Tiện ích"
            name="description"
            value={formData.description}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={4}
          />

          <Box mt={3} display="flex" justifyContent="flex-end" gap={1}>
            <Button onClick={handleClose} variant="outlined" color="inherit">
              Hủy bỏ
            </Button>
            <Button variant="contained" onClick={handleSubmit} size="large">
              Lưu thông tin
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default SoccerFieldManagementPage;
