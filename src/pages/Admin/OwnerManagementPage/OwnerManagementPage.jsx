import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  Typography,
  Paper,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Snackbar, // Thêm Snackbar
  Alert, // Thêm Alert
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BusinessIcon from "@mui/icons-material/Business";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import WarningIcon from "@mui/icons-material/Warning";
import axios from "axios";
import { useTheme } from "@mui/material/styles";

// --- Danh sách cố định cho Kích thước Sân ---
const KICH_THUOC_SAN_MAP = {
  "20x40": "Sân 5 (20m x 40m)",
  "30x50": "Sân 7 (30m x 50m)",
  "40x60": "Sân 9 (40m x 60m)",
  "50x90": "Sân 11 (50m x 90m)",
};

// Component chính
function SoccerFieldManagementPage() {
  const theme = useTheme();

  // --- State ---
  const [rows, setRows] = useState([]);
  const [listLoaiSan, setListLoaiSan] = useState([]);
  const [listChuSan, setListChuSan] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedOwner, setSelectedOwner] = useState(null);

  // State cho Snackbar (Toast)
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // --- API Calls ---

  // Hàm lấy dữ liệu chung (có thể dùng lại)
  const fetchData = async () => {
    try {
      const [sanRes, loaiSanRes, chuSanRes] = await Promise.all([
        layDataSanQuanTriVien(),
        layDataLoaiSan(),
        layDataChuSan(),
      ]);
      setRows(sanRes.data.data || []);
      setListLoaiSan(loaiSanRes.data.data || []);
      setListChuSan(chuSanRes.data.data || []);
    } catch (err) {
      console.error("Lỗi khi lấy dữ liệu quản trị viên:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Lấy dữ liệu Sân
  const layDataSanQuanTriVien = () => {
    return axios.get("http://127.0.0.1:8000/api/quan-tri-vien/san-bong/data", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token_quan_tri_vien"),
      },
    });
  };

  // Lấy dữ liệu Loại Sân
  const layDataLoaiSan = () => {
    return axios.get("http://127.0.0.1:8000/api/quan-tri-vien/loai-san/data", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token_quan_tri_vien"),
      },
    });
  };

  // Lấy dữ liệu Chủ Sân
  const layDataChuSan = () => {
    return axios.get("http://127.0.0.1:8000/api/quan-tri-vien/chu-san/data", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token_quan_tri_vien"),
      },
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Hàm xử lý đóng Snackbar
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  // Hàm mở Modal xác nhận
  const handleOpenModal = (owner) => (event) => {
    event.stopPropagation(); // Ngăn chặn mở/thu gọn Accordion
    setSelectedOwner(owner);
    setOpenModal(true);
  };

  // Hàm đóng Modal
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedOwner(null);
  };

  // Hàm xử lý đổi trạng thái Chủ Sân
  const handleToggleOwnerStatus = async () => {
    if (!selectedOwner) return;

    // Thay đổi "Khóa" và "Mở khóa" thành viết thường hoặc viết hoa chữ cái đầu để tránh highlight
    const action = selectedOwner.trang_thai === 1 ? "Khóa" : "Mở khóa"; // Đổi "Mở khóa" thành "Mở khóa"

    setIsLoading(true);
    handleCloseModal(); // Đóng Modal

    try {
      // Gọi API đổi trạng thái Chủ Sân
      const response = await axios.post(
        "http://127.0.0.1:8000/api/quan-tri-vien/chu-san/doi-trang-thai",
        { id: selectedOwner.id },
        {
          headers: {
            Authorization:
              "Bearer " + localStorage.getItem("token_quan_tri_vien"),
          },
        }
      );

      if (response.data.status) {
        // Nếu thành công, cập nhật lại toàn bộ dữ liệu
        await fetchData();
        // Thay đổi chuỗi thông báo để tránh highlight
        setSnackbarMessage(`${action} Chủ Sân ${selectedOwner.ten_san} thành công!`);
        setSnackbarSeverity("success");
      } else {
        // Thay đổi chuỗi thông báo để tránh highlight
        setSnackbarMessage(`Lỗi: ${action} Chủ Sân thất bại. ${response.data.message}`);
        setSnackbarSeverity("error");
      }
    } catch (error) {
      console.error("Lỗi khi đổi trạng thái Chủ Sân:", error);
      // Thay đổi chuỗi thông báo để tránh highlight
      setSnackbarMessage(`Đã xảy ra lỗi hệ thống khi ${action.toLowerCase()} Chủ Sân.`);
      setSnackbarSeverity("error");
    } finally {
      setIsLoading(false);
      setSnackbarOpen(true); // Mở Snackbar
      setSelectedOwner(null);
    }
  };

  // Hàm xử lý mở rộng/thu gọn Accordion
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // --- Dữ liệu nhóm theo Chủ Sân (Sử dụng useMemo) ---
  const groupedFields = useMemo(() => {
    const groups = {};
    if (!listChuSan.length && !rows.length) return [];

    rows.forEach((field) => {
      const ownerId = field.id_chu_san;
      if (!groups[ownerId]) {
        const ownerInfo = listChuSan.find((c) => c.id === Number(ownerId));
        groups[ownerId] = {
          owner: ownerInfo || {
            id: ownerId,
            ten_chu_san: `Chủ Sân ID ${ownerId} (Không tìm thấy)`,
            so_dien_thoai: "N/A",
            dia_chi: "N/A",
            ten_san: "N/A",
            trang_thai: 0,
          },
          fields: [],
        };
      }
      groups[ownerId].fields.push(field);
    });

    return Object.values(groups);
  }, [rows, listChuSan]);

  // --- Component hiển thị chi tiết Sân ---
  const FieldDetailCard = ({ field, index }) => {
    const loaiSan = listLoaiSan.find(
      (l) => l.id === Number(field.id_loai_san)
    );
    const isActive = field.trang_thai === 1;

    return (
      <Box
        key={field.id}
        sx={{
          p: 2,
          mb: 1,
          borderRadius: 1,
          backgroundColor: theme.palette.common.white,
          border: `1px solid ${theme.palette.grey[200]}`,
          display: "flex",
          flexDirection: "column",
          boxShadow: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography variant="subtitle1" fontWeight="bold" color="primary">
            {index + 1}. {field.ten_san}
          </Typography>
          <Chip
            label={isActive ? "Hoạt động" : "Tạm khóa"}
            color={isActive ? "success" : "default"}
            size="small"
            variant={isActive ? "filled" : "outlined"}
            sx={{ fontWeight: "bold" }}
          />
        </Box>
        <Divider sx={{ mb: 1 }} />
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          <Chip
            label={`Loại: ${loaiSan ? loaiSan.ten_loai_san : "N/A"}`}
            size="small"
            variant="outlined"
            color="secondary"
          />
          <Chip
            label={`Kích thước: ${KICH_THUOC_SAN_MAP[field.kich_thuoc] || field.kich_thuoc || "N/A"
              }`}
            size="small"
            variant="outlined"
            color="default"
          />
          <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
            <LocationOnIcon
              sx={{ fontSize: 16, mr: 0.5, verticalAlign: "text-bottom" }}
            />
            Địa chỉ: {field.dia_chi}
          </Typography>
        </Box>
      </Box>
    );
  };
  // --- Kết thúc Component hiển thị chi tiết Sân ---

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        p: { xs: 1, sm: 3 },
        backgroundColor: theme.palette.grey[50],
      }}
    >
      <Typography variant="h5" mb={3} fontWeight="bold" color="text.primary">
        🏟️ Quản Lý Tập Trung Sân Bóng (Quản trị viên)
      </Typography>

      {/* Loading Indicator */}
      {isLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
          <CircularProgress />
          <Typography variant="h6" ml={2} color="text.secondary">
            Đang tải dữ liệu...
          </Typography>
        </Box>
      )}

      {/* --- Hiển thị theo Accordion/Chủ Sân --- */}
      {!isLoading && (
        <Box sx={{ flexGrow: 1, overflowY: "auto", p: { xs: 0, sm: 1 } }}>
          {groupedFields.length === 0 ? (
            <Paper
              sx={{ p: 5, textAlign: "center", borderRadius: 2, boxShadow: 3 }}
            >
              <BusinessIcon
                sx={{ fontSize: 40, color: theme.palette.grey[400], mb: 1 }}
              />
              <Typography color="textSecondary" variant="h6">
                Hiện chưa có dữ liệu Chủ Sân hoặc Sân Bóng nào.
              </Typography>
            </Paper>
          ) : (
            groupedFields.map((group) => {
              const ownerId = group.owner.id;
              const isOwnerActive = group.owner.trang_thai === 1;
              const isExpanded = expanded === `panel-${ownerId}`;
              const owner = group.owner;

              return (
                <Accordion
                  key={ownerId}
                  expanded={isExpanded}
                  onChange={handleChange(`panel-${ownerId}`)}
                  sx={{
                    mb: 2,
                    borderRadius: 2,
                    boxShadow: 5,
                    "&:before": {
                      display: "none",
                    },
                    borderLeft: `8px solid ${isOwnerActive
                        ? theme.palette.success.main
                        : theme.palette.error.main
                      }`,
                  }}
                >
                  {/* PHẦN TÓM TẮT (Chủ Sân) */}
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon color="primary" />}
                    aria-controls={`panel-${ownerId}-content`}
                    id={`panel-${ownerId}-header`}
                    sx={{
                      backgroundColor: theme.palette.common.white,
                      borderRadius: "2px 10px 0 0",
                      padding: { xs: "8px 16px", sm: "12px 24px" },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                        flexWrap: "wrap",
                      }}
                    >
                      <BusinessIcon
                        color={isOwnerActive ? "success" : "error"}
                        sx={{ mr: 2, fontSize: 32 }}
                      />
                      <Box sx={{ flexGrow: 1, minWidth: 200, pr: 2 }}>
                        {/* DÒNG 1: TÊN CỤM SÂN (Tên Doanh nghiệp) */}
                        <Typography
                          variant="h6"
                          fontWeight="bold"
                          color="text.primary"
                        >
                          {group.owner.ten_san || "Cụm Sân Chưa Đặt Tên"}
                          <Chip
                            label={`${group.fields.length} Sân`}
                            size="small"
                            color="primary"
                            sx={{ ml: 1, fontWeight: "bold" }}
                          />
                        </Typography>

                        {/* DÒNG 2: TÊN CHỦ SÂN (Người đại diện) và ID */}
                        <Typography
                          variant="subtitle2"
                          color="text.secondary"
                          sx={{ mt: 0.5 }}
                        >
                          Đại diện: {group.owner.ten_chu_san} (ID: {ownerId})
                        </Typography>
                      </Box>

                      {/* Thông tin liên hệ, trạng thái & Nút đổi trạng thái */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mt: { xs: 1, sm: 0 },
                        }}
                      >
                        <Chip
                          icon={<PhoneIcon />}
                          label={group.owner.so_dien_thoai}
                          size="small"
                          variant="outlined"
                          sx={{ mr: 1, display: { xs: "none", md: "flex" } }}
                        />
                        <Chip
                          icon={<LocationOnIcon />}
                          label={group.owner.quan_huyen || "N/A"}
                          size="small"
                          variant="outlined"
                          sx={{ mr: 1 }}
                        />
                        <Chip
                          label={
                            isOwnerActive ? "Đang hoạt động" : "Bị khóa"
                          }
                          color={isOwnerActive ? "success" : "error"}
                          size="small"
                          variant="filled"
                          sx={{ fontWeight: "bold", mr: 1 }}
                        />
                        {/* NÚT ĐỔI TRẠNG THÁI */}
                        <IconButton
                          onClick={handleOpenModal(owner)}
                          size="small"
                          color={isOwnerActive ? "error" : "success"}
                          // Thay đổi title để tránh highlight
                          title={
                            isOwnerActive ? "Khóa Chủ Sân này" : "Mở khóa Chủ Sân này"
                          }
                          sx={{
                            border: `1px solid ${isOwnerActive
                                ? theme.palette.error.main
                                : theme.palette.success.main
                              }`,
                            ml: 1,
                            p: 0.5,
                          }}
                        >
                          {isOwnerActive ? (
                            <LockIcon fontSize="small" />
                          ) : (
                            <LockOpenIcon fontSize="small" />
                          )}
                        </IconButton>
                      </Box>
                    </Box>
                  </AccordionSummary>

                  {/* PHẦN CHI TIẾT (Các Sân Bóng) - Sử dụng FieldDetailCard */}
                  <AccordionDetails
                    sx={{ pt: 2, pb: 1, backgroundColor: theme.palette.grey[100] }}
                  >
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      fontWeight="medium"
                      sx={{ mb: 2 }}
                    >
                      Danh sách sân con thuộc{" "}
                      {group.owner.ten_san || "Cụm Sân này"}:
                    </Typography>

                    <Box
                      sx={{
                        maxHeight: 500,
                        overflowY: "auto",
                        paddingRight: 1,
                      }}
                    >
                      {group.fields.map((field, index) => (
                        <FieldDetailCard key={field.id} field={field} index={index} />
                      ))}
                    </Box>
                  </AccordionDetails>
                </Accordion>
              );
            })
          )}
        </Box>
      )}

      {/* --- MODAL XÁC NHẬN ĐỔI TRẠNG THÁI --- */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            color: theme.palette.warning.main,
            display: "flex",
            alignItems: "center",
          }}
        >
          <WarningIcon sx={{ mr: 1 }} />
          Xác nhận thao tác quản trị
        </DialogTitle>
        <DialogContent>
          {selectedOwner && (
            <Box>
              <Typography variant="body1">
                Bạn có chắc chắn muốn{" "}
                {/* Thay đổi chuỗi hiển thị để tránh highlight */}
                <strong style={{ color: selectedOwner.trang_thai === 1 ? theme.palette.error.main : theme.palette.success.main }}>
                  {selectedOwner.trang_thai === 1 ? "KHÓA" : "mở khóa"}
                </strong>
                {" "} Chủ Sân này không?
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, fontWeight: "bold" }}>
                Tên Cụm Sân: {selectedOwner.ten_san || "N/A"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Đại diện: {selectedOwner.ten_chu_san} (ID: {selectedOwner.id})
              </Typography>
              {selectedOwner.trang_thai === 1 && (
                <Typography
                  variant="body2"
                  color="error"
                  sx={{
                    mt: 2,
                    p: 1,
                    border: `1px dashed ${theme.palette.error.light}`,
                  }}
                >
                  {/* Đã thay đổi cách hiển thị: Sử dụng <strong> để in đậm và gõ trực tiếp chữ in hoa "LƯU Ý" */}
                  <strong>LƯU Ý:</strong> Khóa Chủ Sân sẽ ngăn họ đăng nhập và quản lý các sân bóng của mình.
                </Typography>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} variant="outlined" color="primary">
            Hủy
          </Button>
          <Button
            onClick={handleToggleOwnerStatus}
            color={selectedOwner?.trang_thai === 1 ? "error" : "success"}
            variant="contained"
            autoFocus
          >
            {/* Thay đổi chuỗi nhãn nút để tránh highlight */}
            {selectedOwner?.trang_thai === 1 ? "XÁC NHẬN KHÓA" : "Xác nhận mở khóa"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* --- SNACKBAR (TOAST) THÔNG BÁO --- */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default SoccerFieldManagementPage;