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
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  // Thêm các thành phần Table tiêu chuẩn
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
// Đã loại bỏ import DataGrid

import axios from "axios";
import { toast } from "react-toastify";

// --- Icons ---
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from "@mui/icons-material/Block";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from '@mui/icons-material/Cancel';

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

const initialKhungGioForm = { tu_gio: '', den_gio: '' };

function SoccerFieldManagementPage() {
  // --- State ---
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [openStatusConfirmModal, setOpenStatusConfirmModal] = useState(false);
  const [openKhungNgayModal, setOpenKhungNgayModal] = useState(false);
  const [openKhungGioModal, setOpenKhungGioModal] = useState(false);

  const [deleteItem, setDeleteItem] = useState(null);
  const [statusItem, setStatusItem] = useState(null);
  const [khungNgayItem, setKhungNgayItem] = useState(null);
  const [khungNgayIdDangChon, setKhungNgayIdDangChon] = useState(null);
  const [khungNgayTenDangChon, setKhungNgayTenDangChon] = useState(''); // Thêm tên ngày

  const [rows, setRows] = useState([]);
  const [listChuSan, setListChuSan] = useState([]);
  const [listLoaiSan, setListLoaiSan] = useState([]);
  const [listKhung, setListKhungNgay] = useState([]);
  const [listKhungGio, setListKhungGio] = useState([]);
  const [formData, setFormData] = useState(initialFormData);

  const [isEditMode, setIsEditMode] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);

  // State cho Form Khung Giờ
  const [newKhungGio, setNewKhungGio] = useState(initialKhungGioForm);
  const [isGioEditMode, setIsGioEditMode] = useState(false);
  const [currentGioEditId, setCurrentGioEditId] = useState(null);


  // --- Modal handlers ---
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

  const handleOpenKhungNgay = (rowData) => {
    setKhungNgayItem(rowData);
    layDataKhungNgay(rowData.id);
    setOpenKhungNgayModal(true);
  };
  const handleCloseKhungNgay = () => {
    setKhungNgayItem(null);
    setListKhungNgay([]);
    setOpenKhungNgayModal(false);
  };

  // --- HANDLER MỚI CHO KHUNG GIỜ ---
  const handleOpenKhungGio = (rowData) => {
    setKhungNgayTenDangChon(rowData.khung_ngay); // Set tên ngày để hiển thị
    layDataKhungGio(rowData.id);
  };

  const handleCloseKhungGio = () => {
    setKhungNgayIdDangChon(null);
    setKhungNgayTenDangChon('');
    setListKhungGio([]);
    setNewKhungGio(initialKhungGioForm);
    setIsGioEditMode(false);
    setCurrentGioEditId(null);
    setOpenKhungGioModal(false);
  };

  const handleEditKhungGio = (rowData) => {
    setNewKhungGio({
      tu_gio: rowData.tu_gio.substring(0, 5), // Chỉ lấy HH:MM
      den_gio: rowData.den_gio.substring(0, 5)
    });
    setCurrentGioEditId(rowData.id);
    setIsGioEditMode(true);
  };

  const handleCancelEditGio = () => {
    setNewKhungGio(initialKhungGioForm);
    setIsGioEditMode(false);
    setCurrentGioEditId(null);
  };

  const handleKhungGioChange = (e) => {
    const { name, value } = e.target;
    setNewKhungGio(prev => ({ ...prev, [name]: value }));
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
    slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, "");
    slug = slug.replace(/ /gi, "-");
    slug = slug.replace(/\-\-+/gi, "-");
    slug = "@" + slug + "@";
    slug = slug.replace(/\@\-|\-\@|\@/gi, "");
    return slug;
  }, []);

  const taoSlug = () => {
    if (formData.ten_san) {
      const newSlug = toSluggg(formData.ten_san);
      setFormData((prev) => ({ ...prev, slug_san: newSlug }));
      toast.info("Slug đã được tạo/cập nhật.");
    } else {
      toast.warn("Vui lòng nhập Tên sân trước khi tạo Slug.");
    }
  };

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

  const layDataKhungNgay = (payload) => {
    axios.get("http://127.0.0.1:8000/api/chu-san/khung-ngay/data-open", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token_chu_san") },
      params: { id: payload }
    }).then((res) => setListKhungNgay(res.data.data))
      .catch((err) => console.error("Lỗi khi lấy data khung ngày:", err));
  };

  // --- HÀM LAY DATA KHUNG GIỜ HOÀN THIỆN AXIOS ---
  const layDataKhungGio = (payload) => {
    const apiEndpoint = "http://127.0.0.1:8000/api/chu-san/khung-gio/data-open";
    const authToken = localStorage.getItem("token_chu_san");

    setKhungNgayIdDangChon(payload);

    axios.get(apiEndpoint, {
      headers: {
        Authorization: "Bearer " + authToken
      },
      params: {
        id: payload
      }
    }).then((res) => {
      if (res.data.status) {
        // Sắp xếp dữ liệu theo tu_gio (Thời gian)
        const sortedData = res.data.data.sort((a, b) => (a.tu_gio > b.tu_gio) ? 1 : -1);
        setListKhungGio(sortedData);
        setOpenKhungGioModal(true);
      } else {
        toast.error(res.data.message || "Không thể lấy dữ liệu khung giờ.");
      }
    })
      .catch((err) => {
        const errorMessage = err.response?.data?.message || "Lỗi kết nối hoặc máy chủ.";
        toast.error("Lỗi: " + errorMessage);
      });
  };

  // --- Các hàm CRUD Khung Giờ (Dùng console log tạm thời) ---
  const handleSubmitKhungGio = () => {
    if (!newKhungGio.tu_gio || !newKhungGio.den_gio) {
      toast.warn("Vui lòng nhập đầy đủ Từ Giờ và Đến Giờ.");
      return;
    }

    const dataToSubmit = {
      ...newKhungGio,
      id_khung_ngay: khungNgayIdDangChon,
      id: isGioEditMode ? currentGioEditId : undefined,
    };

    console.log("Dữ liệu Khung Giờ gửi đi:", dataToSubmit);
    toast.success(isGioEditMode ? "Cập nhật Khung Giờ thành công (DEMO)" : "Thêm Khung Giờ thành công (DEMO)");

    // Cập nhật lại listKhungGio tạm thời (chỉ cho demo UI)
    if (!isGioEditMode) {
      // Chuyển giờ sang định dạng HH:MM:SS để đồng nhất với DB
      const newItem = {
        id: Date.now(),
        ...dataToSubmit,
        tu_gio: dataToSubmit.tu_gio + ':00',
        den_gio: dataToSubmit.den_gio + ':00'
      };
      setListKhungGio(prev => [...prev, newItem].sort((a, b) => (a.tu_gio > b.tu_gio) ? 1 : -1));
    } else {
      setListKhungGio(prev => prev.map(item => item.id === currentGioEditId ? {
        ...item,
        tu_gio: newKhungGio.tu_gio + ':00',
        den_gio: newKhungGio.den_gio + ':00'
      } : item).sort((a, b) => (a.tu_gio > b.tu_gio) ? 1 : -1));
    }

    handleCancelEditGio();
  };

  const handleDeleteKhungGio = (id) => {
    console.log("Xóa Khung Giờ ID:", id);
    toast.success("Xóa Khung Giờ thành công (DEMO)");
    setListKhungGio(prev => prev.filter(item => item.id !== id));
  };
  // -----------------------------------------------------------


  const xoaSanBong = (id) => {
    axios.post("http://127.0.0.1:8000/api/chu-san/san-bong/delete", { id }, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token_chu_san"),
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      if (res.data.status) {
        toast.success(res.data.message);
        layDataSanCuaToi();
        handleCloseConfirmDelete();
      } else {
        toast.error(res.data.message || "Không thể xóa sân.");
      }
    }).catch(err => {
      toast.error("Lỗi: " + (err.response?.data?.message || "Lỗi kết nối"));
      handleCloseConfirmDelete();
    });
  };

  const handleConfirmChangeStatus = (rowData) => {
    const newStatus = rowData.trang_thai === 1 ? 0 : 1;
    axios.post("http://127.0.0.1:8000/api/chu-san/san-bong/doi-trang-thai",
      { id: rowData.id, trang_thai: newStatus },
      { headers: { Authorization: "Bearer " + localStorage.getItem("token_chu_san") } }
    ).then((res) => {
      if (res.data.status) {
        toast.success(res.data.message);
        layDataSanCuaToi();
        handleCloseStatusConfirm();
      } else toast.error(res.data.message || "Không thể thay đổi trạng thái.");
    }).catch(err => {
      toast.error("Lỗi: " + (err.response?.data?.message || "Lỗi kết nối"));
      handleCloseStatusConfirm();
    });
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    axios.post("http://127.0.0.1:8000/api/chu-san/san-bong/update", { ...formData, id: currentEditId },
      { headers: { Authorization: "Bearer " + localStorage.getItem("token_chu_san") } }
    ).then((res) => {
      if (res.data.status) {
        toast.success(res.data.message);
        layDataSanCuaToi();
        handleCloseAdd();
      } else toast.error(res.data.message || "Lỗi cập nhật.");
    }).catch(err => {
      toast.error("Lỗi: " + (err.response?.data?.message || "Không thể kết nối"));
    });
  };

  const handleSubmitAdd = (e) => {
    e.preventDefault();
    axios.post("http://127.0.0.1:8000/api/chu-san/san-bong/create", formData,
      { headers: { Authorization: "Bearer " + localStorage.getItem("token_chu_san") } }
    ).then((res) => {
      if (res.data.status) {
        toast.success(res.data.message);
        layDataSanCuaToi();
        handleCloseAdd();
      } else toast.error(res.data.message || "Lỗi thêm mới.");
    }).catch(err => {
      toast.error("Lỗi: " + (err.response?.data?.message || "Không thể kết nối"));
    });
  };

  const handleGeneralSubmit = (e) => {
    if (isEditMode) handleSubmitEdit(e);
    else handleSubmitAdd(e);
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

  const khungNgayModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: "95%", sm: 650, md: 700, lg: 900 }, // Rộng hơn cho Khung Ngày
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 3,
    maxHeight: '80vh',
    overflowY: 'auto'
  };

  // --- COLUMNS CHO TABLE CHÍNH ---
  // Sử dụng cấu trúc cho Table Cell để thay thế DataGrid Columns
  const tableColumns = [
    { id: "stt", label: "STT", width: 50, align: "center" },
    { id: "ten_san", label: "Tên sân", width: 180, align: "left" },
    { id: "id_loai_san", label: "Loại Sân", width: 120, align: "center" },
    { id: "kich_thuoc", label: "Kích thước", width: 120, align: "right" },
    { id: "dia_chi", label: "Địa chỉ", width: 250, align: "left" },
    { id: "trang_thai", label: "Trạng thái", width: 130, align: "center" },
    { id: "actions", label: "Hành động", width: 180, align: "center" },
  ];

  // --- Render logic cho Main Table Cell ---
  const renderCellContent = (columnId, row) => {
    switch (columnId) {
      case "stt":
        return rows.findIndex(r => r.id === row.id) + 1;
      case "ten_san":
        return <Typography fontWeight="bold">{row.ten_san}</Typography>;
      case "id_loai_san":
        const loaiSan = listLoaiSan.find(l => l.id === Number(row.id_loai_san));
        return <Chip label={loaiSan ? loaiSan.ten_loai_san : "N/A"} size="small" color="primary" variant="outlined" />;
      case "trang_thai":
        const isActive = row.trang_thai === 1;
        return <Chip label={isActive ? "Hoạt động" : "Tạm khóa"} color={isActive ? "success" : "default"} size="small" variant={isActive ? "filled" : "outlined"} />;
      case "actions":
        return (
          <Box>
            <Tooltip title="Sửa">
              <IconButton size="small" color="primary" onClick={() => handleOpenEdit(row)}>
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Xóa">
              <IconButton size="small" color="error" onClick={() => handleOpenConfirmDelete(row.id, row.ten_san)}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title={row.trang_thai === 1 ? "Tạm khóa" : "Mở khóa"}>
              <IconButton size="small" color={row.trang_thai === 1 ? "warning" : "success"} onClick={() => handleOpenStatusConfirm(row)}>
                <BlockIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Xem Khung Ngày">
              <IconButton size="small" color="info" onClick={() => handleOpenKhungNgay(row)}>
                <CalendarTodayIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        );
      default:
        return row[columnId] || 'N/A';
    }
  };

  // --- COLUMNS CHO DATAGRID KHUNG NGÀY ---
  // Cột này không còn dùng vì đã chuyển sang Grid Card nhưng giữ lại định nghĩa
  const columnsKhungNgay = [
    {
      field: "khung_ngay",
      headerName: "Ngày",
      flex: 1,
      align: "left",
      headerAlign: "left",
      renderCell: (params) => (
        <Typography fontWeight="medium">{params.value}</Typography>
      ),
    },
    {
      field: "trang_thai",
      headerName: "Trạng thái",
      width: 120,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const isActive = params.value === 1;
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
      headerName: "Xem Giờ",
      width: 150,
      align: "center",
      headerAlign: "center",
      sortable: false,
      renderCell: (params) => (
        <Tooltip title="Quản lý Khung Giờ">
          <Button
            variant="contained"
            size="small"
            color="info"
            endIcon={<AccessTimeIcon />}
            onClick={() => handleOpenKhungGio(params.row)}
          >
            Quản lý
          </Button>
        </Tooltip>
      )
    }
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%", width: "100%" }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenAdd}>Thêm sân</Button>
      </Box>

      {/* Bảng Sân Bóng Chính (Giữ nguyên UI Table đã sửa lỗi) */}
      <Paper sx={{ flexGrow: 1, width: "100%", overflow: "auto", boxShadow: 3, minHeight: 0, borderRadius: 2 }}>
        <TableContainer>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                {tableColumns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.width, backgroundColor: "#3f51b5", color: "white", fontWeight: "bold", textTransform: "uppercase", fontSize: "0.85rem" }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={tableColumns.length} align="center">
                    Không có dữ liệu sân bóng nào.
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((row) => (
                  <TableRow hover key={row.id}>
                    {tableColumns.map((column) => (
                      <TableCell key={column.id} align={column.align}>
                        {renderCellContent(column.id, row)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Modal Thêm/Sửa (Giữ nguyên) */}
      <Modal open={openAddModal} onClose={handleCloseAdd}>
        <Box sx={modalStyle} component="form" onSubmit={handleGeneralSubmit}>
          <Typography variant="h6" fontWeight="bold" mb={2} color="primary">{isEditMode ? "Sửa Sân" : "Thêm Sân"}</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Tên sân" name="ten_san" value={formData.ten_san} onChange={handleChange} margin="normal" size="small" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Slug" name="slug_san" value={formData.slug_san} onChange={handleChange} margin="normal" size="small" disabled={true} />
              <Button size="small" onClick={taoSlug} sx={{ mb: 2, mt: -1 }}>Tạo Slug</Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField select fullWidth label="Loại Sân" name="id_loai_san" value={formData.id_loai_san} onChange={handleChange} margin="normal" size="small">
                {listLoaiSan.map((loai) => (
                  <MenuItem key={loai.id} value={loai.id}>{loai.ten_loai_san}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField select fullWidth label="Kích thước" name="kich_thuoc" value={formData.kich_thuoc} onChange={handleChange} margin="normal" size="small">
                {KICH_THUOC_SAN.map((kt) => <MenuItem key={kt.value} value={kt.value}>{kt.label}</MenuItem>)}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Địa chỉ" name="dia_chi" value={formData.dia_chi} onChange={handleChange} margin="normal" multiline rows={2} size="small" />
            </Grid>
          </Grid>

          <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button variant="outlined" onClick={handleCloseAdd}>Hủy</Button>
            <Button variant="contained" type="submit" startIcon={<SaveIcon />}>{isEditMode ? "Cập nhật" : "Thêm mới"}</Button>
          </Box>
        </Box>
      </Modal>

      {/* Modal Xác nhận xóa (Giữ nguyên) */}
      <Modal open={openConfirmModal} onClose={handleCloseConfirmDelete}>
        <Box sx={confirmModalStyle}>
          <Typography variant="h6" color="error">Xác nhận xóa</Typography>
          <Divider sx={{ my: 1 }} />
          <Typography>Bạn có chắc muốn xóa sân <strong>{deleteItem?.ten_san}</strong> không?</Typography>
          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button variant="outlined" onClick={handleCloseConfirmDelete}>Hủy</Button>
            <Button variant="contained" color="error" onClick={() => xoaSanBong(deleteItem.id)}>Xóa</Button>
          </Box>
        </Box>
      </Modal>

      {/* Modal Xác nhận đổi trạng thái (Giữ nguyên) */}
      <Modal open={openStatusConfirmModal} onClose={handleCloseStatusConfirm}>
        <Box sx={confirmModalStyle}>
          <Typography variant="h6" color="warning">Xác nhận thay đổi trạng thái</Typography>
          <Divider sx={{ my: 1 }} />
          <Typography>Bạn có chắc muốn {statusItem?.trang_thai === 1 ? "tạm khóa" : "mở khóa"} sân <strong>{statusItem?.ten_san}</strong> không?</Typography>
          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button variant="outlined" onClick={handleCloseStatusConfirm}>Hủy</Button>
            <Button variant="contained" color={statusItem?.trang_thai === 1 ? "warning" : "success"} onClick={() => handleConfirmChangeStatus(statusItem)}>
              {statusItem?.trang_thai === 1 ? "Khóa" : "Mở khóa"}
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Modal Khung Ngày (UI Cải tiến: Grid Card) */}
      <Modal open={openKhungNgayModal} onClose={handleCloseKhungNgay}>
        <Box sx={khungNgayModalStyle}>
          <Typography variant="h5" fontWeight="bold" mb={3} color="primary">
            <CalendarTodayIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Khung Ngày Mở Cửa - {khungNgayItem?.ten_san || "Sân bóng"}
          </Typography>

          <Divider sx={{ mb: 3 }} />

          {listKhung.length === 0 ? (
            <Typography align="center" color="text.secondary" sx={{ py: 4 }}>
              Chưa có khung ngày nào được thiết lập cho sân này.
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {listKhung.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.id}>
                  <Paper
                    elevation={3}
                    sx={{
                      p: 3,
                      borderRadius: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      height: '100%',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-3px)',
                        boxShadow: 6,
                      }
                    }}
                  >
                    <Box>
                      <Typography variant="h6" fontWeight="bold" color="text.primary" mb={1}>
                        {item.khung_ngay}
                      </Typography>
                      <Chip
                        label={item.trang_thai === 1 ? "Hoạt động" : "Tạm khóa"}
                        color={item.trang_thai === 1 ? "success" : "default"}
                        size="small"
                        variant="filled"
                        sx={{ mb: 1 }}
                      />
                    </Box>

                    <Tooltip title="Quản lý và thiết lập khung giờ chi tiết">
                      <Button
                        variant="contained"
                        color="info"
                        size="small"
                        startIcon={<AccessTimeIcon />}
                        onClick={() => handleOpenKhungGio(item)}
                        sx={{ mt: 2 }}
                      >
                        Quản lý Giờ
                      </Button>
                    </Tooltip>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}

          <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
            <Button variant="outlined" onClick={handleCloseKhungNgay} startIcon={<CancelIcon />}>
              Đóng
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* --- MODAL KHUNG GIỜ MỚI (UI Cải tiến: Form và List) --- */}
      <Modal open={openKhungGioModal} onClose={handleCloseKhungGio}>
        <Box sx={{ ...khungNgayModalStyle, width: { xs: "95%", sm: 500, md: 600 } }}>
          <Typography variant="h5" fontWeight="bold" mb={1} color="primary">
            <AccessTimeIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Quản lý Khung Giờ
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" mb={3}>
            Ngày: <Chip label={khungNgayTenDangChon} color="default" size="small" />
          </Typography>
          <Divider sx={{ mb: 3 }} />

          {/* 1. KHU VỰC THÊM/SỬA MỚI */}
          <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold" mb={2} color="secondary">
              {isGioEditMode ? "Sửa Khung Giờ" : "Thêm Khung Giờ Mới"}
            </Typography>
            <Grid container spacing={2} component="form" onSubmit={(e) => { e.preventDefault(); handleSubmitKhungGio(); }}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Từ Giờ (HH:MM)"
                  name="tu_gio"
                  value={newKhungGio.tu_gio}
                  onChange={handleKhungGioChange}
                  placeholder="07:00"
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Đến Giờ (HH:MM)"
                  name="den_gio"
                  value={newKhungGio.den_gio}
                  onChange={handleKhungGioChange}
                  placeholder="07:30"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                {isGioEditMode && (
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleCancelEditGio}
                    startIcon={<CancelIcon />}
                  >
                    Hủy Sửa
                  </Button>
                )}
                <Button
                  variant="contained"
                  color={isGioEditMode ? "success" : "primary"}
                  type="submit"
                  startIcon={<SaveIcon />}
                >
                  {isGioEditMode ? "Cập nhật" : "Thêm"}
                </Button>
              </Grid>
            </Grid>
          </Paper>

          {/* 2. DANH SÁCH QUẢN LÝ KHUNG GIỜ */}
          <Typography variant="subtitle1" fontWeight="bold" mb={1}>
            Danh sách Khung Giờ Đã Có
          </Typography>

          {listKhungGio.length === 0 ? (
            <Typography color="text.secondary" align="center" sx={{ py: 2 }}>
              Chưa có khung giờ nào được thiết lập cho ngày này.
            </Typography>
          ) : (
            <List component={Paper} elevation={1} sx={{ maxHeight: 250, overflowY: 'auto', borderRadius: 2 }}>
              {listKhungGio.map((item, index) => (
                <Box key={item.id}>
                  <ListItem
                    secondaryAction={
                      <Box>
                        <Tooltip title="Sửa">
                          <IconButton size="small" color="primary" onClick={() => handleEditKhungGio(item)}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Xóa">
                          <IconButton size="small" color="error" onClick={() => handleDeleteKhungGio(item.id)}>
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    }
                  >
                    <ListItemText
                      primary={<Chip label={`${item.tu_gio.substring(0, 5)} - ${item.den_gio.substring(0, 5)}`} color="info" variant="outlined" />}
                      secondary={`ID: ${item.id} | Ngày: ${item.id_khung_ngay}`}
                    />
                  </ListItem>
                  {index < listKhungGio.length - 1 && <Divider component="li" />}
                </Box>
              ))}
            </List>
          )}

          <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" onClick={handleCloseKhungGio}>
              Đóng
            </Button>
          </Box>
        </Box>
      </Modal>

    </Box>
  );
}

export default SoccerFieldManagementPage;