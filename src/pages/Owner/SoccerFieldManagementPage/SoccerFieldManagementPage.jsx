import React, { useState } from "react";
import {
  Button,
  Modal,
  Box,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function SoccerFieldManagementPage() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const productTypes = ["5", "7", "9", "11"];
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

  const [row, list_san_cua_toi] = React.useState([]);
  const [list_chu_san, setListChuSan] = React.useState([]);
  const [list_loai_san, setListLoaiSan] = React.useState([]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    bgcolor: "background.default",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const layDataSanCuaToi = () => {
    axios
      .get("http://127.0.0.1:8000/api/chu-san/san-bong/data-chu-san", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token_chu_san"),
        },
      })
      .then((res) => {
        list_san_cua_toi(res.data.data);
      })
      .catch((err) => {
        console.error("Lỗi khi lấy data:", err);
      });
  };

  const layDataChuSan = () => {
    axios
      .get("http://127.0.0.1:8000/api/chu-san/data", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token_chu_san"),
        },
      })
      .then((res) => {
        setListChuSan(res.data.data);
      })
      .catch((err) => {
        console.error("Lỗi khi lấy data:", err);
      });
  };

  const layDataLoaiSan = () => {
    axios
      .get("http://127.0.0.1:8000/api/chu-san/loai-san/data", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token_chu_san"),
        },
      })
      .then((res) => {
        setListLoaiSan(res.data.data);
      })
      .catch((err) => {
        console.error("Lỗi khi lấy data:", err);
      });
  };

  const changeStatus = (value) => {
    axios
      .post("http://127.0.0.1:8000/api/chu-san/san-bong/changeStatus", value, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token_chu_san"),
        },
      })
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message);
          layDataSanCuaToi();
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.error("Lỗi khi thay đổi trạng thái:", err);
      });
  };

  useEffect(() => {
    layDataSanCuaToi();
    layDataChuSan();
    layDataLoaiSan();
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
      renderCell: (params) => {
        const index = params.api.getRowIndexRelativeToVisibleRows(params.id);
        return index + 1;
      },
    },
    {
      field: "id_chu_san",
      headerName: "Tên chủ sân",
      flex: 1,
      headerAlign: "center",
      editable: false,
      renderCell: (params) => {
        const chuSan = list_chu_san.find(
          (c) => c.id === Number(params.row.id_chu_san)
        );
        return chuSan ? chuSan.ten_chu_san : "Chưa xác định";
      },
    },
    {
      field: "id_loai_san",
      headerName: "Loại Sân",
      type: "string",
      flex: 1,
      sortable: false,
      headerAlign: "center",
      editable: false,
      renderCell: (params) => {
        const loaiSan = list_loai_san.find(
          (l) => l.id === Number(params.row.id_loai_san)
        );
        return loaiSan ? loaiSan.ten_loai_san : "Chưa xác định";
      },
    },
    {
      field: "ten_san",
      headerName: "Tên sân",
      type: "string",
      flex: 1,
      sortable: false,
      headerAlign: "center",
      editable: false,
    },
    {
      field: "slug_san",
      headerName: "Slug sân",
      type: "string",
      flex: 1,
      sortable: false,
      headerAlign: "center",
      editable: false,
    },
    {
      field: "hinh_anh",
      headerName: "Hình ảnh",
      type: "image",
      flex: 1,
      sortable: false,
      headerAlign: "center",
      editable: false,
    },
    {
      field: "mo_ta",
      headerName: "Mô tả",
      type: "text",
      flex: 1,
      sortable: false,
      headerAlign: "center",
      editable: false,
    },
    {
      field: "gia_thue",
      headerName: "Giá thuê",
      type: "number",
      flex: 1,
      sortable: false,
      headerAlign: "center",
      editable: false,
    },
    {
      field: "dia_chi",
      headerName: "Địa chỉ",
      type: "string",
      flex: 1,
      sortable: false,
      headerAlign: "center",
      editable: false,
    },
    {
      field: "trang_thai",
      headerName: "Trạng thái",
      flex: 1,
      sortable: false,
      headerAlign: "center",
      renderCell: (params) => {
        const isActive = params.row.trang_thai === 1;
        return (
          <Button
            onClick={() => {
              changeStatus({ id: params.row.id });
            }}
            sx={{
              bgcolor: isActive ? "green" : "gray",
              color: "white",
              padding: "5px 10px",
            }}
          >
            {isActive ? "Hoạt động" : "Tạm khóa"}
          </Button>
        );
      },
    },
  ];
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: 400,
          width: "100%",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Button
            onClick={handleOpen}
            color="primary"
            sx={{ backgroundColor: "primary.minor" }}
          >
            Thêm sân
          </Button>
        </Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography variant="h6" mb={2}>
              Nhập thông tin sản phẩm
            </Typography>
            <Box display="flex" gap={2}>
              <TextField
                fullWidth
                label="Tên chủ sân"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                select
                fullWidth
                label="Loại sân"
                name="fieldType"
                value={formData.fieldType}
                onChange={handleChange}
                margin="normal"
              >
                {productTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            <Box display="flex" gap={2}>
              <TextField
                fullWidth
                label="Tên sân"
                name="fieldName"
                value={formData.fieldName}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Slug sân"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                margin="normal"
              />
            </Box>
            <TextField
              fullWidth
              label="Hình ảnh (URL)"
              name="image"
              value={formData.image}
              onChange={handleChange}
              margin="normal"
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
            <Box mt={2} display="flex" gap={2}>
              <TextField
                fullWidth
                label="Giá thuê"
                name="rentalPrice"
                value={formData.rentalPrice}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Bảo trì"
                name="maintenance"
                value={formData.maintenance}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Trạng thái"
                name="status"
                value={formData.status}
                onChange={handleChange}
                margin="normal"
              />
            </Box>

            <Box mt={2} display="flex" justifyContent="flex-end">
              <Button onClick={() => setOpen(false)} sx={{ mr: 2 }}>
                Hủy
              </Button>
              <Button variant="contained" onClick={handleSubmit}>
                Lưu
              </Button>
            </Box>
          </Box>
        </Modal>
        <DataGrid
          autoHeight
          rows={row}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5 },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          getRowHeight={() => "auto"}
          sx={{
            "& .MuiDataGrid-cell": {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              whiteSpace: "normal",
              wordBreak: "normal",
              overflowWrap: "normal",
              lineHeight: "1.4",
              textAlign: "center",
            },
          }}
        />
      </Box>
    </>
  );
}

export default SoccerFieldManagementPage;
