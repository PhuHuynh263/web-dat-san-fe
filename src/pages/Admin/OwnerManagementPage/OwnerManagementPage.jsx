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
  Divider, // Import mới cho việc phân chia
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BusinessIcon from "@mui/icons-material/Business"; // Icon cho Chủ Sân
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
  const [rows, setRows] = useState([]); // Danh sách Sân Bóng (Flat)
  const [listLoaiSan, setListLoaiSan] = useState([]);
  const [listChuSan, setListChuSan] = useState([]); // Danh sách Chủ Sân
  const [expanded, setExpanded] = useState(false); // State quản lý panel mở rộng
  const [isLoading, setIsLoading] = useState(true); // State loading

  // --- API Calls ---

  // Lấy dữ liệu Sân
  const layDataSanQuanTriVien = () => {
    return axios.get("http://127.0.0.1:8000/api/quan-tri-vien/san-bong/data", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token_quan_tri_vien") },
    });
  };

  // Lấy dữ liệu Loại Sân
  const layDataLoaiSan = () => {
    return axios.get("http://127.0.0.1:8000/api/quan-tri-vien/loai-san/data", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token_quan_tri_vien") },
    });
  };

  // Lấy dữ liệu Chủ Sân
  const layDataChuSan = () => {
    // Lưu ý: Đã sửa lại lỗi cú pháp URL giả định từ 127.000.1 -> 127.0.0.1 (Nếu bạn sử dụng 127.0.0.1)
    return axios.get("http://127.0.0.1:8000/api/quan-tri-vien/chu-san/data", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token_quan_tri_vien") },
    });
  };

  useEffect(() => {
    // Gọi tất cả API đồng thời và chờ kết quả
    Promise.all([layDataSanQuanTriVien(), layDataLoaiSan(), layDataChuSan()])
      .then(([sanRes, loaiSanRes, chuSanRes]) => {
        setRows(sanRes.data.data || []);
        setListLoaiSan(loaiSanRes.data.data || []);
        setListChuSan(chuSanRes.data.data || []);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi khi lấy dữ liệu quản trị viên:", err);
        setIsLoading(false); // Dừng loading ngay cả khi có lỗi
      });
  }, []);

  // Hàm xử lý mở rộng/thu gọn Accordion
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // --- Dữ liệu nhóm theo Chủ Sân (Sử dụng useMemo) ---
  const groupedFields = useMemo(() => {
    const groups = {};
    // Trả về Array rỗng nếu chưa có dữ liệu quan trọng
    if (!listChuSan.length && !rows.length) return [];

    // 1. Nhóm Sân (rows) vào Chủ Sân
    rows.forEach((field) => {
      const ownerId = field.id_chu_san;
      if (!groups[ownerId]) {
        // Tìm thông tin Chủ Sân tương ứng
        const ownerInfo = listChuSan.find(c => c.id === Number(ownerId));
        groups[ownerId] = {
          // Sử dụng toán tử nullish coalescing cho các trường có thể bị thiếu
          owner: ownerInfo || {
            id: ownerId,
            ten_chu_san: `Chủ Sân ID ${ownerId} (Không tìm thấy)`,
            so_dien_thoai: 'N/A',
            dia_chi: 'N/A',
            ten_san: 'N/A',
            trang_thai: 0 // Giả định không hoạt động nếu không tìm thấy
          },
          fields: [],
        };
      }
      groups[ownerId].fields.push(field);
    });

    // 2. Chuyển object thành array để dễ map trong JSX
    return Object.values(groups);
  }, [rows, listChuSan]);

  // --- Component hiển thị chi tiết Sân (Thay thế DataGrid) ---
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
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 1
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle1" fontWeight="bold" color="primary">
            {index + 1}. {field.ten_san}
          </Typography>
          <Chip
            label={isActive ? "Hoạt động" : "Tạm khóa"}
            color={isActive ? "success" : "default"}
            size="small"
            variant={isActive ? "filled" : "outlined"}
            sx={{ fontWeight: 'bold' }}
          />
        </Box>
        <Divider sx={{ mb: 1 }} />
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <Chip
            label={`Loại: ${loaiSan ? loaiSan.ten_loai_san : "N/A"}`}
            size="small"
            variant="outlined"
            color="secondary"
          />
          <Chip
            label={`Kích thước: ${KICH_THUOC_SAN_MAP[field.kich_thuoc] || field.kich_thuoc || "N/A"}`}
            size="small"
            variant="outlined"
            color="default"
          />
          <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
            <LocationOnIcon sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'text-bottom' }} />
            Địa chỉ: {field.dia_chi}
          </Typography>
        </Box>
      </Box>
    );
  };
  // --- Kết thúc Component hiển thị chi tiết Sân ---


  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
        <Typography variant="h6" ml={2}>Đang tải dữ liệu...</Typography>
      </Box>
    );
  }

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

      {/* --- Hiển thị theo Accordion/Chủ Sân --- */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto', p: { xs: 0, sm: 1 } }}>
        {groupedFields.length === 0 ? (
          <Paper sx={{ p: 5, textAlign: 'center', borderRadius: 2, boxShadow: 3 }}>
            <BusinessIcon sx={{ fontSize: 40, color: theme.palette.grey[400], mb: 1 }} />
            <Typography color="textSecondary" variant="h6">
              Hiện chưa có dữ liệu Chủ Sân hoặc Sân Bóng nào.
            </Typography>
          </Paper>
        ) : (
          groupedFields.map((group) => {
            const ownerId = group.owner.id;
            const isOwnerActive = group.owner.trang_thai === 1;
            const isExpanded = expanded === `panel-${ownerId}`;

            return (
              <Accordion
                key={ownerId}
                expanded={isExpanded}
                onChange={handleChange(`panel-${ownerId}`)}
                sx={{
                  mb: 2,
                  borderRadius: 2,
                  boxShadow: 5,
                  '&:before': { // Loại bỏ border mặc định
                    display: 'none',
                  },
                  borderLeft: `8px solid ${isOwnerActive ? theme.palette.success.main : theme.palette.error.main}`,
                }}
              >
                {/* PHẦN TÓM TẮT (Chủ Sân) */}
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon color="primary" />}
                  aria-controls={`panel-${ownerId}-content`}
                  id={`panel-${ownerId}-header`}
                  sx={{
                    backgroundColor: theme.palette.common.white,
                    borderRadius: '2px 10px 0 0',
                    padding: { xs: '8px 16px', sm: '12px 24px' },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', flexWrap: 'wrap' }}>
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
                        {group.owner.ten_san || 'Cụm Sân Chưa Đặt Tên'}
                        <Chip
                          label={`${group.fields.length} Sân`}
                          size="small"
                          color="primary"
                          sx={{ ml: 1, fontWeight: 'bold' }}
                        />
                      </Typography>

                      {/* DÒNG 2: TÊN CHỦ SÂN (Người đại diện) và ID */}
                      <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 0.5 }}>
                        Đại diện: {group.owner.ten_chu_san} (ID: {ownerId})
                      </Typography>
                    </Box>

                    {/* Thông tin liên hệ và trạng thái */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: { xs: 1, sm: 0 } }}>
                      <Chip
                        icon={<PhoneIcon />}
                        label={group.owner.so_dien_thoai}
                        size="small"
                        variant="outlined"
                        sx={{ mr: 1, display: { xs: 'none', md: 'flex' } }}
                      />
                      <Chip
                        icon={<LocationOnIcon />}
                        label={group.owner.quan_huyen || 'N/A'}
                        size="small"
                        variant="outlined"
                        sx={{ mr: 1 }}
                      />
                      <Chip
                        label={isOwnerActive ? "Đang hoạt động" : "Bị khóa"}
                        color={isOwnerActive ? "success" : "error"}
                        size="small"
                        variant="filled"
                        sx={{ fontWeight: 'bold' }}
                      />
                    </Box>
                  </Box>
                </AccordionSummary>

                {/* PHẦN CHI TIẾT (Các Sân Bóng) - Sử dụng FieldDetailCard */}
                <AccordionDetails sx={{ pt: 2, pb: 1, backgroundColor: theme.palette.grey[100] }}>
                  <Typography variant="subtitle1" gutterBottom fontWeight="medium" sx={{ mb: 2 }}>
                    Danh sách sân con thuộc {group.owner.ten_san || 'Cụm Sân này'}:
                  </Typography>

                  <Box
                    sx={{
                      maxHeight: 500,
                      overflowY: 'auto',
                      paddingRight: 1
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
    </Box>
  );
}

export default SoccerFieldManagementPage;