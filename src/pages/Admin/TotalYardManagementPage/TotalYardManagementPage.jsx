import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  Modal,
  TextField,
  MenuItem,
  IconButton,
  Tooltip,
  Avatar,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

// --- Icons ---
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function TotalYardManagementPage() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const productTypes = ["5", "7", "9", "11"];

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("Dữ liệu sản phẩm:", formData);
    setOpen(false);
  };

  // --- API Calls ---
  const layDataToanBoSan = () => {
    axios
      .get("http://127.0.0.1:8000/api/quan-tri-vien/san-bong/data", {
        headers: {
          Authorization:
            "Bearer " + localStorage.getItem("token_quan_tri_vien"),
        },
      })
      .then((res) => setRows(res.data.data))
      .catch((err) => console.error("Lỗi khi lấy data:", err));
  };

  const layDataChuSan = () => {
    axios
      .get("http://127.0.0.1:8000/api/quan-tri-vien/chu-san/data", {
        headers: {
          Authorization:
            "Bearer " + localStorage.getItem("token_quan_tri_vien"),
        },
      })
      .then((res) => setListChuSan(res.data.data))
      .catch((err) => console.error("Lỗi data chủ sân:", err));
  };

  const layDataLoaiSan = () => {
    axios
      .get("http://127.0.0.1:8000/api/quan-tri-vien/loai-san/data", {
        headers: {
          Authorization:
            "Bearer " + localStorage.getItem("token_quan_tri_vien"),
        },
      })
      .then((res) => setListLoaiSan(res.data.data))
      .catch((err) => console.error("Lỗi data loại sân:", err));
  };

  useEffect(() => {
    layDataToanBoSan();
    layDataChuSan();
    layDataLoaiSan();
  }, []);

  // --- Modal Style ---
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "90%", md: "600px" }, // Responsive width
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
    maxHeight: "90vh",
    overflowY: "auto",
  };

  // --- Columns Definition ---
  const columns = [
    {
      field: "stt",
      headerName: "STT",
      width: 60,
      align: "center",
      headerAlign: "center",
      sortable: false,
      renderCell: (params) =>
        params.api.getRowIndexRelativeToVisibleRows(params.id) + 1,
    },
    {
      field: "id_chu_san",
      headerName: "Tên chủ sân",
      width: 180,
      headerAlign: "center",
      renderCell: (params) => {
        const chuSan = listChuSan.find(
          (c) => c.id === Number(params.row.id_chu_san)
        );
        return (
          <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
            <Typography variant="body2" fontWeight="bold">
              {chuSan ? chuSan.ten_chu_san : "Chưa xác định"}
            </Typography>
          </Box>
        );
      },
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
          <Typography variant="body2">
            {loaiSan ? loaiSan.ten_loai_san : "N/A"}
          </Typography>
        );
      },
    },
    {
      field: "ten_san",
      headerName: "Tên sân",
      width: 180,
      headerAlign: "center",
      renderCell: (params) => (
        <Typography variant="body2" fontWeight="500" color="primary">
          {params.value}
        </Typography>
      ),
    },
    {
      field: "hinh_anh",
      headerName: "Hình ảnh",
      width: 100,
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
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              width: "100%",
            }}
          >
            {params.value}
          </Typography>
        </Tooltip>
      ),
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
      field: "dia_chi",
      headerName: "Địa chỉ",
      width: 200,
      headerAlign: "center",
    },
    {
      field: "actions",
      headerName: "Hành động",
      width: 100,
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
        height: "100%",
        width: "100%",
      }}
    >
      {/* --- Header & Actions --- */}
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
            onClick={layDataToanBoSan}
          >
            Làm mới
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpen}
            sx={{ backgroundColor: "primary.main" }} // Dùng màu chuẩn
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
          rowHeight={70} // Tăng chiều cao hàng để chứa ảnh và nội dung thoải mái
          sx={{
            border: 0,
            height: "100%",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f5f7fa",
              fontWeight: "bold",
              textTransform: "uppercase",
              fontSize: "0.85rem",
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

      {/* --- Modal --- */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography variant="h6" mb={2} fontWeight="bold" color="primary">
            Thêm Sân Bóng Mới
          </Typography>

          <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
            <TextField
              fullWidth
              label="Tên chủ sân"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
              size="small"
            />
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
              label="Slug sân"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              size="small"
            />

            <TextField
              fullWidth
              label="Giá thuê"
              name="rentalPrice"
              type="number"
              value={formData.rentalPrice}
              onChange={handleChange}
              size="small"
            />
            <TextField
              fullWidth
              label="Trạng thái"
              name="status"
              value={formData.status}
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
            label="Địa chỉ"
            name="address"
            // (cần thêm field address vào state nếu chưa có)
            margin="normal"
            size="small"
          />
          <TextField
            fullWidth
            label="Mô tả"
            name="description"
            value={formData.description}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={3}
          />

          <Box mt={3} display="flex" justifyContent="flex-end" gap={1}>
            <Button onClick={handleClose} variant="outlined" color="secondary">
              Hủy
            </Button>
            <Button variant="contained" onClick={handleSubmit}>
              Lưu
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default TotalYardManagementPage;
