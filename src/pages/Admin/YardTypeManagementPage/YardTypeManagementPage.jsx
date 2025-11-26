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

function YardTypeManagementPage() {
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

  // --- HÀM XỬ LÝ KHÓA / MỞ KHÓA ---
  const handleBlock = (id, currentStatus) => {
    // 1. Kiểm tra ID có tồn tại không
    if (!id) {
      toast.error("Lỗi: Không tìm thấy ID của loại sân này!");
      console.error("Lỗi: ID bị undefined hoặc null");
      return;
    }

    console.log("Đang gửi yêu cầu đổi trạng thái cho ID:", id); // Check log xem đúng ID sân 7 chưa

    axios
      .post(
        "http://127.0.0.1:8000/api/quan-tri-vien/loai-san/doi-trang-thai",
        { id: id }, // Chỉ gửi ID
        {
          headers: {
            Authorization:
              "Bearer " + localStorage.getItem("token_quan_tri_vien"),
          },
        }
      )
      .then((res) => {
        if (res.data.status) {
          const msg = currentStatus === 1 ? "Đã khóa thành công!" : "Đã kích hoạt lại!";
          toast.success(msg);
          layDataChuSan();
        } else {
          toast.error(res.data.message || "Thao tác thất bại");
        }
      })
      .catch((err) => {
        console.error("Lỗi đổi trạng thái:", err);
        toast.error("Có lỗi xảy ra khi đổi trạng thái!");
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        p: 2,
        backgroundColor: "#f5f5f5"
      }}
    >
      {/* --- HEADER --- */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          flexShrink: 0,
        }}
      >
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={layDataChuSan}
            sx={{ backgroundColor: "white" }}
          >
            Làm mới
          </Button>
          <Button variant="contained" startIcon={<AddIcon />}>
            Thêm mới
          </Button>
        </Box>
      </Box>

      {/* --- TABLE CONTAINER --- */}
      <TableContainer
        component={Paper}
        sx={{
          flexGrow: 1,
          boxShadow: 3,
          borderRadius: 2,
          overflow: "auto"
        }}
      >
        <Table stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: 'bold', backgroundColor: '#f5f7fa', width: 80 }}>STT</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold', backgroundColor: '#f5f7fa' }}>Tên loại sân</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold', backgroundColor: '#f5f7fa' }}>Slug (Đường dẫn)</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold', backgroundColor: '#f5f7fa', width: 150 }}>Trạng thái</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold', backgroundColor: '#f5f7fa', width: 180 }}>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows && rows.length > 0 ? (
              rows.map((row, index) => {
                const isActive = row.trang_thai === 1;
                return (
                  <TableRow
                    key={row.id || index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { backgroundColor: '#f9f9f9' } }}
                  >
                    <TableCell align="center" component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="center">{row.ten_loai_san}</TableCell>
                    <TableCell align="center">{row.slug_loai_san}</TableCell>
                    <TableCell align="center">
                      <Chip
                        label={isActive ? "Kích hoạt" : "Vô hiệu hóa"}
                        color={isActive ? "success" : "default"}
                        size="small"
                        variant={isActive ? "filled" : "outlined"}
                        sx={{ fontWeight: "bold", minWidth: 100 }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                        {/* Nút Sửa */}
                        <Tooltip title="Chỉnh sửa">
                          <IconButton color="primary" size="small">
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>

                        {/* --- Nút Đổi trạng thái --- */}
                        {/* Truyền trực tiếp ID và Status vào hàm handleBlock */}
                        <Tooltip title={isActive ? "Khóa loại sân này" : "Kích hoạt lại"}>
                          <IconButton
                            color={isActive ? "warning" : "success"}
                            size="small"
                            onClick={() => handleBlock(row.id, row.trang_thai)}
                          >
                            {isActive ? <BlockIcon fontSize="small" /> : <CheckCircleIcon fontSize="small" />}
                          </IconButton>
                        </Tooltip>

                        {/* Nút Xóa */}
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
                <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                  Chưa có dữ liệu
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default YardTypeManagementPage;