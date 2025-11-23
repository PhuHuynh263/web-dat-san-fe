import React, { useEffect, useState, useCallback } from "react";
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
  Chip,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { toast } from "react-toastify";

// --- Icons ---
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from "@mui/icons-material/Block";

// --- Danh sách cố định cho Kích thước Sân ---
const KICH_THUOC_SAN = [
  { value: '20x40', label: 'Sân 5 người', size_detail: '20m x 40m' },
  { value: '30x50', label: 'Sân 7 người', size_detail: '30m x 50m' },
  { value: '40x60', label: 'Sân 9 người', size_detail: '40m x 60m' },
  { value: '50x90', label: 'Sân 11 người', size_detail: '50m x 90m' },
];

// --- Giá trị khởi tạo cho Form Thêm Mới ---
const initialFormData = {
  ten_san: '',
  slug_san: '',
  id_loai_san: '',
  kich_thuoc: '',
  dia_chi: '',
};

function SoccerFieldManagementPage() {
  // --- State ---
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false); // Xóa
  const [openStatusConfirmModal, setOpenStatusConfirmModal] = useState(false); // Trạng thái

  const [deleteItem, setDeleteItem] = useState(null);
  const [statusItem, setStatusItem] = useState(null); // Dữ liệu cho Modal Trạng thái

  const [rows, setRows] = useState([]);
  const [listChuSan, setListChuSan] = useState([]);
  const [listLoaiSan, setListLoaiSan] = useState([]);
  const [formData, setFormData] = useState(initialFormData);

  const [isEditMode, setIsEditMode] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);

  // --- Handlers Modal ---
  const handleOpenAdd = () => {
    setFormData(initialFormData);
    setIsEditMode(false);
    setOpenAddModal(true);
  };
  const handleCloseAdd = () => setOpenAddModal(false);

  const handleOpenEdit = (rowData) => {
    setFormData({
      ten_san: rowData.ten_san,
      slug_san: rowData.slug_san,
      id_loai_san: rowData.id_loai_san || '',
      kich_thuoc: rowData.kich_thuoc || '',
      dia_chi: rowData.dia_chi || '',
    });
    setCurrentEditId(rowData.id);
    setIsEditMode(true);
    setOpenAddModal(true);
  };

  const handleOpenConfirmDelete = (id, ten_san) => {
    setDeleteItem({ id, ten_san });
    setOpenConfirmModal(true);
  };
  const handleCloseConfirmDelete = () => {
    setDeleteItem(null);
    setOpenConfirmModal(false);
  };

  const handleOpenStatusConfirm = (rowData) => {
    setStatusItem(rowData);
    setOpenStatusConfirmModal(true);
  };
  const handleCloseStatusConfirm = () => {
    setStatusItem(null);
    setOpenStatusConfirmModal(false);
  };

  // --- Logic Slug ---
  const toSluggg = useCallback((title) => {
    if (!title) return '';
    let slug = title.toLowerCase();
    slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, "a");
    slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, "e");
    slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, "i");
    slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, "o");
    slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, "u");
    slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, "y");
    slug = slug.replace(/đ/gi, "d");
    slug = slug.replace(
      /\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi,
      ""
    );
    slug = slug.replace(/ /gi, "-");
    slug = slug.replace(/\-\-\-\-\-/gi, "-");
    slug = slug.replace(/\-\-\-\-/gi, "-");
    slug = slug.replace(/\-\-\-/gi, "-");
    slug = slug.replace(/\-\-/gi, "-");
    slug = "@" + slug + "@";
    slug = slug.replace(/\@\-|\-\@|\@/gi, "");
    return slug;
  }, []);

  const taoSlug = () => {
    if (formData.ten_san) {
      const newSlug = toSluggg(formData.ten_san);
      setFormData((prev) => ({
        ...prev,
        slug_san: newSlug,
      }));
      toast.info("Slug đã được tạo/cập nhật.");
    } else {
      toast.warn("Vui lòng nhập Tên sân trước khi tạo Slug.");
    }
  };

  // --- Handlers ---
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      let newFormData = { ...prev, [name]: value };

      if (name === "ten_san" && prev.ten_san !== value) {
        newFormData.slug_san = toSluggg(value);
      }

      return newFormData;
    });
  };

  // --- API Calls ---
  const layDataSanCuaToi = () => {
    axios.get("http://127.0.0.1:8000/api/chu-san/san-bong/data-chu-san", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token_chu_san") },
    }).then((res) => setRows(res.data.data))
      .catch((err) => console.error("Lỗi khi lấy data sân:", err));
  };

  const layDataChuSan = () => {
    axios.get("http://127.0.0.1:8000/api/chu-san/data", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token_chu_san") },
    }).then((res) => setListChuSan(res.data.data))
      .catch((err) => console.error("Lỗi khi lấy data chủ sân:", err));
  };

  const layDataLoaiSan = () => {
    axios.get("http://127.0.0.1:8000/api/chu-san/loai-san/data", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token_chu_san") },
    }).then((res) => setListLoaiSan(res.data.data))
      .catch((err) => console.error("Lỗi khi lấy data loại sân:", err));
  };

  const xoaSanBong = (id) => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token_chu_san"),
        'Content-Type': 'application/json'
      }
    };
    const dataToSend = { id: id };

    axios
      .post(`http://127.0.0.1:8000/api/chu-san/san-bong/delete`, dataToSend, config)
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message);
          layDataSanCuaToi();
          handleCloseConfirmDelete();
        } else {
          toast.error(res.data.message || "Không thể xóa sân.");
        }
      })
      .catch(err => {
        const errorMessage = err.response?.data?.message || "Lỗi kết nối khi xóa sân.";
        toast.error("Lỗi: " + errorMessage);
        console.error("Lỗi Axios Delete:", err);
        handleCloseConfirmDelete();
      });
  };

  const handleConfirmChangeStatus = (rowData) => {
    const newStatus = rowData.trang_thai === 1 ? 0 : 1;
    const action = newStatus === 1 ? "mở khóa" : "tạm khóa";

    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token_chu_san"),
        'Content-Type': 'application/json'
      }
    };

    axios
      .post("http://127.0.0.1:8000/api/chu-san/san-bong/doi-trang-thai", { id: rowData.id, trang_thai: newStatus }, config)
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message || `Đã ${action} sân thành công.`);
          layDataSanCuaToi();
          handleCloseStatusConfirm();
        } else {
          toast.error(res.data.message || `Không thể ${action} sân.`);
        }
      })
      .catch(err => {
        const errorMessage = err.response?.data?.message || `Lỗi kết nối khi ${action} sân.`;
        toast.error("Lỗi: " + errorMessage);
        console.error("Lỗi Axios Change Status:", err);
        handleCloseStatusConfirm();
      });
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();

    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token_chu_san"),
        'Content-Type': 'application/json'
      }
    };

    const dataToSend = { ...formData, id: currentEditId };

    axios
      .post("http://127.0.0.1:8000/api/chu-san/san-bong/update", dataToSend, config)
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message);
          layDataSanCuaToi();
          handleCloseAdd();
        } else {
          toast.error(res.data.message || "Đã xảy ra lỗi khi cập nhật sân.");
        }
      })
      .catch(err => {
        const errorMessage = err.response?.data?.message || "Không thể kết nối đến máy chủ.";
        toast.error("Lỗi: " + errorMessage);
        console.error("Lỗi Axios Update:", err);
      });
  };

  const handleSubmitAdd = (e) => {
    e.preventDefault();

    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token_chu_san"),
        'Content-Type': 'application/json'
      }
    };

    axios
      .post("http://127.0.0.1:8000/api/chu-san/san-bong/create", formData, config)
      .then((res => {
        if (res.data.status) {
          toast.success(res.data.message);
          layDataSanCuaToi();
          handleCloseAdd();
        } else {
          toast.error(res.data.message || "Đã xảy ra lỗi khi thêm sân.");
        }
      }))
      .catch(err => {
        const errorMessage = err.response?.data?.message
          || "Không thể kết nối đến máy chủ.";
        toast.error("Lỗi: " + errorMessage);
        console.error("Lỗi Axios:", err);
      });
  };

  const handleGeneralSubmit = (e) => {
    if (isEditMode) {
      handleSubmitEdit(e);
    } else {
      handleSubmitAdd(e);
    }
  };

  useEffect(() => {
    layDataSanCuaToi();
    layDataChuSan();
    layDataLoaiSan();
  }, []);

  // --- Styles & Columns ---
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "95%", md: "700px" },
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
    maxHeight: "90vh",
    overflowY: "auto",
  };

  const confirmModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 1,
    boxShadow: 24,
    p: 4,
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
      field: "kich_thuoc",
      headerName: "Kích thước",
      width: 120,
      align: "right",
      headerAlign: "right",
    },
    {
      field: "dia_chi",
      headerName: "Địa chỉ",
      width: 200,
      headerAlign: "center",
      flex: 1
    },
    {
      field: "trang_thai",
      headerName: "Trạng thái",
      width: 130,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const isActive = params.row.trang_thai === 1;
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
            <IconButton
              size="small"
              color="primary"
              onClick={() => handleOpenEdit(params.row)}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Xóa">
            <IconButton
              size="small"
              color="error"
              onClick={() => handleOpenConfirmDelete(params.row.id, params.row.ten_san)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title={params.row.trang_thai === 1 ? "Tạm khóa" : "Mở khóa"}>
            <IconButton
              size="small"
              color={params.row.trang_thai === 1 ? "warning" : "success"}
              onClick={() => handleOpenStatusConfirm(params.row)}
            >
              <BlockIcon fontSize="small" />
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
      {/* --- Header (Nút Thêm Sân) --- */}
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
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenAdd}
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
          getRowId={(row) => row.id}
          sx={{
            border: 0,
            height: "100%",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f5f7fa",
              fontWeight: "bold",
              textTransform: "uppercase",
              fontSize: "0.85rem",
              color: "#555",
              alignItems: "center",
              justifyContent: "center",
            },
            "& .MuiDataGrid-cell": {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderBottom: "1px solid #f0f0f0",
            },
            "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus": {
              outline: "none",
            },
          }}
        />
      </Paper>

      {/* --- Modal Thêm/Sửa Sân --- */}
      <Modal
        open={openAddModal}
        onClose={handleCloseAdd}
        aria-labelledby="add-modal-title"
        aria-describedby="add-modal-description"
      >
        <Box sx={modalStyle} component="form" onSubmit={handleGeneralSubmit}>
          <Typography
            variant="h6"
            mb={3}
            fontWeight="bold"
            color={isEditMode ? "warning" : "primary"}
            align="center"
          >
            {isEditMode ? `CẬP NHẬT SÂN: ${formData.ten_san}` : "THÊM SÂN BÓNG MỚI"}
          </Typography>

          <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
            {/* 1. Tên Sân */}
            <TextField
              fullWidth
              label="Tên sân"
              name="ten_san"
              value={formData.ten_san || ""}
              onChange={handleChange}
              size="small"
              required
            />

            {/* 2. Loại Sân */}
            <TextField
              select
              fullWidth
              label="Loại sân"
              name="id_loai_san"
              value={formData.id_loai_san || ""}
              onChange={handleChange}
              size="small"
              required
            >
              {listLoaiSan.map((loai) => (
                <MenuItem key={loai.id} value={loai.id}>
                  {loai.ten_loai_san}
                </MenuItem>
              ))}
            </TextField>

            {/* 3. Kích Thước Sân */}
            <TextField
              select
              fullWidth
              label="Kích thước"
              name="kich_thuoc"
              value={formData.kich_thuoc || ""}
              onChange={handleChange}
              size="small"
              required
            >
              {KICH_THUOC_SAN.map((size) => (
                <MenuItem key={size.value} value={size.value}>
                  {size.label} ({size.size_detail})
                </MenuItem>
              ))}
            </TextField>

            {/* 4. Slug (URL) */}
            <Box display="flex" gap={1} alignItems="flex-start">
              <TextField
                fullWidth
                label="Slug (URL)"
                name="slug_san"
                value={formData.slug_san || ""}
                onChange={handleChange}
                size="small"
                helperText="Tự động điền hoặc tạo/chỉnh sửa"
                required
              />
              <Tooltip title="Tạo slug từ Tên sân">
                <Button
                  variant="contained"
                  onClick={taoSlug}
                  size="small"
                  sx={{ flexShrink: 0, mt: '6px' }}
                >
                  Tạo Slug
                </Button>
              </Tooltip>
            </Box>
          </Box>

          {/* 5. Địa chỉ chi tiết */}
          <TextField
            fullWidth
            label="Địa chỉ chi tiết"
            name="dia_chi"
            value={formData.dia_chi || ""}
            onChange={handleChange}
            margin="normal"
            size="small"
            multiline
            rows={2}
            required
          />

          <Box mt={3} display="flex" justifyContent="flex-end" gap={1}>
            <Button onClick={handleCloseAdd} variant="outlined" color="inherit">
              Hủy bỏ
            </Button>
            <Button variant="contained" type="submit" size="large" color={isEditMode ? "warning" : "primary"}>
              {isEditMode ? "Lưu Cập Nhật" : "Lưu thông tin"}
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* --- Modal Xác Nhận Xóa --- */}
      <Modal
        open={openConfirmModal}
        onClose={handleCloseConfirmDelete}
        aria-labelledby="confirm-delete-title"
        aria-describedby="confirm-delete-description"
      >
        <Box sx={confirmModalStyle}>
          <Typography id="confirm-delete-title" variant="h6" component="h2" color="error">
            Xác nhận xóa sân
          </Typography>
          <Typography id="confirm-delete-description" sx={{ mt: 2 }}>
            Bạn có chắc chắn muốn

            {/* THAY ĐỔI Ở ĐÂY: Highlight chữ "xóa" */}
            <Typography component="strong" color="error" fontWeight="bold" display="inline">
              {" "}XÓA{" "}
            </Typography>

            sân bóng
            <Typography component="strong" color="error" fontWeight="bold" display="inline">
              {" "}"{deleteItem?.ten_san}"{" "}
            </Typography>
            không? Hành động này không thể hoàn tác.
          </Typography>
          <Box mt={3} display="flex" justifyContent="flex-end" gap={1}>
            <Button onClick={handleCloseConfirmDelete} variant="outlined" color="inherit">
              Hủy bỏ
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => xoaSanBong(deleteItem.id)}
            >
              Xác nhận Xóa
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* --- Modal Xác Nhận Đổi Trạng thái --- */}
      <Modal
        open={openStatusConfirmModal}
        onClose={handleCloseStatusConfirm}
        aria-labelledby="confirm-status-title"
      >
        <Box sx={confirmModalStyle}>
          <Typography id="confirm-status-title" variant="h6" component="h2" color="warning">
            Xác nhận Đổi Trạng thái
          </Typography>
          <Typography sx={{ mt: 2 }}>
            {statusItem && statusItem.trang_thai === 1 ? (
              <>
                Bạn có chắc chắn muốn
                <Typography component="strong" color="warning" fontWeight="bold" display="inline">
                  {" "}TẠM KHÓA{" "}
                </Typography>
                sân bóng
                <Typography component="strong" color="primary" fontWeight="bold" display="inline">
                  "{statusItem.ten_san}"
                </Typography>
                không?
              </>
            ) : (
              <>
                Bạn có chắc chắn muốn
                <Typography component="strong" color="success" fontWeight="bold" display="inline">
                  {" "}MỞ KHÓA{" "}
                </Typography>
                sân bóng
                <Typography component="strong" color="primary" fontWeight="bold" display="inline">
                  "{statusItem?.ten_san}"
                </Typography>
                để hoạt động lại không?
              </>
            )}
          </Typography>
          <Box mt={3} display="flex" justifyContent="flex-end" gap={1}>
            <Button onClick={handleCloseStatusConfirm} variant="outlined" color="inherit">
              Hủy bỏ
            </Button>
            <Button
              variant="contained"
              color={statusItem && statusItem.trang_thai === 1 ? "warning" : "success"}
              onClick={() => handleConfirmChangeStatus(statusItem)}
            >
              {statusItem && statusItem.trang_thai === 1 ? "Xác nhận Tạm khóa" : "Xác nhận Mở khóa"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default SoccerFieldManagementPage;