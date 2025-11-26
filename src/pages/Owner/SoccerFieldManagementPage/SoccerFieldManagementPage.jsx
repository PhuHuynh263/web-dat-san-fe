import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Paper,
  Chip,
  IconButton,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Modal,
  Typography,
} from "@mui/material";

import axios from "axios";
import { toast } from "react-toastify";

// Icons
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

function YardTypeManagementPage() {
  const [rows, setRows] = useState([]);

  // --- STATE KHUNG GIỜ ---
  const [openModalTime, setOpenModalTime] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  // --- FORM THÊM KHUNG GIỜ ---
  const [showAddTimeForm, setShowAddTimeForm] = useState(false);
  const [newStart, setNewStart] = useState("");
  const [newEnd, setNewEnd] = useState("");

  // --- LIST KHUNG GIỜ TĨNH ---
  const [khungGioList, setKhungGioList] = useState([
    { id: 1, start: "07:00", end: "08:00", status: 1 },
    { id: 2, start: "08:00", end: "09:00", status: 1 },
    { id: 3, start: "09:00", end: "10:00", status: 1 },
    { id: 4, start: "10:00", end: "11:00", status: 0 },
    { id: 5, start: "11:00", end: "12:00", status: 1 },
    { id: 6, start: "12:00", end: "13:00", status: 1 },
    { id: 7, start: "13:00", end: "14:00", status: 1 },
    { id: 8, start: "14:00", end: "15:00", status: 1 },
    { id: 9, start: "15:00", end: "16:00", status: 1 },
    { id: 10, start: "16:00", end: "17:00", status: 1 },
    { id: 11, start: "17:00", end: "18:00", status: 0 },
    { id: 12, start: "18:00", end: "19:00", status: 1 },
    { id: 13, start: "19:00", end: "20:00", status: 1 },
    { id: 14, start: "20:00", end: "21:00", status: 1 },
    { id: 15, start: "21:00", end: "22:00", status: 1 },
    { id: 16, start: "22:00", end: "23:00", status: 1 },
  ]);

  const layDataChuSan = () => {
    axios
      .get("http://127.0.0.1:8000/api/quan-tri-vien/loai-san/data", {
        headers: {
          Authorization:
            "Bearer " + localStorage.getItem("token_quan_tri_vien"),
        },
      })
      .then((res) => {
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

  // --- KHÓA / MỞ KHÓA (GỬI NGUYÊN OBJECT) ---
  const handleBlock = (row) => {
    if (!row || !row.id) {
      toast.error("Không tìm thấy ID!");
      return;
    }

    axios
      .post(
        "http://127.0.0.1:8000/api/quan-tri-vien/loai-san/doi-trang-thai",
        row,
        {
          headers: {
            Authorization:
              "Bearer " + localStorage.getItem("token_quan_tri_vien"),
          },
        }
      )
      .then((res) => {
        if (res.data.status) {
          toast.success("Đổi trạng thái thành công!");
          layDataChuSan();
        } else {
          toast.error(res.data.message || "Thao tác thất bại");
        }
      })
      .catch((err) => {
        console.error("Lỗi đổi trạng thái:", err);
        toast.error("Có lỗi xảy ra!");
      });
  };

  // --- MỞ MODAL KHUNG GIỜ ---
  const openTimeModal = (row) => {
    setSelectedRow(row);
    setOpenModalTime(true);
    setShowAddTimeForm(false);
    setNewStart("");
    setNewEnd("");
  };

  return (
    <Box sx={{ p: 2, backgroundColor: "#f5f5f5", height: "100%" }}>
      {/* HEADER */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={layDataChuSan}
          >
            Làm mới
          </Button>
          <Button variant="contained" startIcon={<AddIcon />}>
            Thêm mới
          </Button>
        </Box>
      </Box>

      {/* TABLE */}
      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                STT
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Tên loại sân
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Slug
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Trạng thái
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Hành động
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.length > 0 ? (
              rows.map((row, index) => {
                const isActive = row.trang_thai === 1;

                return (
                  <TableRow key={row.id}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{row.ten_loai_san}</TableCell>
                    <TableCell align="center">{row.slug_loai_san}</TableCell>

                    <TableCell align="center">
                      <Chip
                        label={isActive ? "Kích hoạt" : "Vô hiệu hóa"}
                        color={isActive ? "success" : "default"}
                      />
                    </TableCell>

                    <TableCell align="center">
                      <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                        {/* KHUNG GIỜ */}
                        <Tooltip title={isActive ? "Khung giờ" : "Sân đang khóa"}>
                          <span>
                            <IconButton
                              color="secondary"
                              size="small"
                              onClick={() => {
                                if (!isActive) {
                                  toast.warning(
                                    "Sân đang khóa, không thể chỉnh khung giờ"
                                  );
                                  return;
                                }
                                openTimeModal(row);
                              }}
                              disabled={!isActive}
                            >
                              <AccessTimeIcon />
                            </IconButton>
                          </span>
                        </Tooltip>

                        <Tooltip title="Chỉnh sửa">
                          <IconButton color="primary" size="small">
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title={isActive ? "Khóa" : "Kích hoạt"}>
                          <IconButton
                            color={isActive ? "warning" : "success"}
                            size="small"
                            onClick={() => handleBlock(row)}
                          >
                            {isActive ? (
                              <BlockIcon fontSize="small" />
                            ) : (
                              <CheckCircleIcon fontSize="small" />
                            )}
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Xóa">
                          <IconButton color="error" size="small">
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  Không có dữ liệu
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ================= MODAL KHUNG GIỜ ================= */}
      <Modal open={openModalTime} onClose={() => setOpenModalTime(false)}>
        <Box
          sx={{
            width: 650,
            bgcolor: "white",
            p: 3,
            borderRadius: 2,
            mx: "auto",
            mt: "10vh",
            boxShadow: 4,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
            Khung giờ của: {selectedRow?.ten_loai_san}
          </Typography>

          {/* NÚT THÊM KHUNG GIỜ */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
            <Button
              variant="contained"
              size="small"
              onClick={() => setShowAddTimeForm(!showAddTimeForm)}
            >
              Thêm khung giờ
            </Button>
          </Box>

          {/* FORM THÊM KHUNG GIỜ */}
          {showAddTimeForm && (
            <Box sx={{ display: "flex", gap: 1, mb: 2, alignItems: "center" }}>
              <input
                type="time"
                value={newStart}
                onChange={(e) => setNewStart(e.target.value)}
              />
              <input
                type="time"
                value={newEnd}
                onChange={(e) => setNewEnd(e.target.value)}
              />
              <Button
                variant="outlined"
                onClick={() => {
                  if (!newStart || !newEnd) {
                    toast.error("Vui lòng nhập đầy đủ giờ bắt đầu và kết thúc");
                    return;
                  }
                  setKhungGioList([
                    ...khungGioList,
                    {
                      id: Date.now(),
                      start: newStart,
                      end: newEnd,
                      status: 1,
                    },
                  ]);
                  setShowAddTimeForm(false);
                  setNewStart("");
                  setNewEnd("");
                  toast.success("Đã thêm khung giờ mới");
                }}
              >
                Thêm
              </Button>
            </Box>
          )}

          {/* GRID KHUNG GIỜ */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
              gap: 1.5,
              maxHeight: "420px",
              overflowY: "auto",
            }}
          >
            {khungGioList.map((kg) => (
              <Box
                key={kg.id}
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  border: "1px solid #ddd",
                  textAlign: "center",
                  backgroundColor: "#fafafa",
                }}
              >
                <Typography sx={{ fontSize: "15px", fontWeight: "bold" }}>
                  {kg.start} - {kg.end}
                </Typography>

                <Chip
                  label={kg.status === 1 ? "Hoạt động" : "Khóa"}
                  color={kg.status === 1 ? "success" : "default"}
                  size="small"
                  sx={{ mt: 1 }}
                />
              </Box>
            ))}
          </Box>

          <Box sx={{ textAlign: "right", mt: 2 }}>
            <Button onClick={() => setOpenModalTime(false)}>Đóng</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default YardTypeManagementPage;
