import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {
    Box,
    Typography,
    Container,
    CssBaseline,
    Button,
    Paper,
    CircularProgress,
    Grid,
    Alert,
    Modal,
    TextField,
    Divider,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel
} from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import moment from 'moment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CloseIcon from '@mui/icons-material/Close';
import PaymentIcon from '@mui/icons-material/Payment';

// 🚨 LƯU Ý: Thay thế import này bằng đường dẫn thực tế của bạn
import { clientTheme } from '../../../clientTheme';
import Header from '../../../components/Client/Header/Header';
import { use } from 'react';

const SelectedYard = () => {
    const { yardName, yardId } = useParams();
    // --- STATE DATA ---
    const [subYards, setSubYards] = useState([]);
    const [dates, setDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);

    const [matrixData, setMatrixData] = useState({});
    const [isLoadingMatrix, setIsLoadingMatrix] = useState(false);

    // State lưu các slot đang được chọn
    const [selectedSlots, setSelectedSlots] = useState([]);

    // --- STATE MODAL & BOOKING ---
    const [openConfirmModal, setOpenConfirmModal] = useState(false);
    const [isBooking, setIsBooking] = useState(false);
    const [note, setNote] = useState('');
    const [yardType, setYardType] = useState('');

    // 🚀 STATE PHƯƠNG THỨC THANH TOÁN
    const [paymentMethod, setPaymentMethod] = useState('0'); // Mặc định '0' (Tiền mặt)

    // --- 1. KHỞI TẠO ---
    useEffect(() => {
        const next7Days = [];
        const today = moment();
        for (let i = 0; i < 7; i++) {
            next7Days.push({
                fullDate: today.clone().add(i, 'days').format('YYYY-MM-DD'),
                displayDate: today.clone().add(i, 'days').format('DD/MM'),
                dayOfWeek: today.clone().add(i, 'days').format('dddd'),
            });
        }
        setDates(next7Days);
        setSelectedDate(next7Days[0].fullDate);

        axios.get(`http://127.0.0.1:8000/api/khach-hang/san-bong/${yardId}`, {
            headers: { Authorization: "Bearer " + localStorage.getItem("token_khach_hang") },
        }).then((res) => {
            const data = res.data.data;
            if (Array.isArray(data) && data.length > 0) {
                setSubYards(data);
            }
        }).catch(err => console.error("Lỗi lấy sân con:", err));

        getDataType();
    }, [yardId]);

    // --- 2. LẤY DATA MA TRẬN ---
    useEffect(() => {
        if (!selectedDate || subYards.length === 0) return;

        setSelectedSlots([]); // Reset selection khi đổi ngày

        const fetchMatrixData = async () => {
            setIsLoadingMatrix(true);
            const newMatrix = {};

            await Promise.all(subYards.map(async (san) => {
                try {
                    const resNgay = await axios.get("http://127.0.0.1:8000/api/khach-hang/khung-ngay/data-open", {
                        headers: { Authorization: "Bearer " + localStorage.getItem("token_khach_hang") },
                        params: { id: san.id }
                    });

                    const daysOfSan = resNgay.data.data;
                    const matchingDay = daysOfSan.find(d => d.khung_ngay === selectedDate);

                    if (matchingDay) {
                        const resGio = await axios.get("http://127.0.0.1:8000/api/khach-hang/khung-gio/data-open", {
                            headers: { Authorization: "Bearer " + localStorage.getItem("token_khach_hang") },
                            params: { id: matchingDay.id }
                        });

                        if (resGio.data.status) {
                            newMatrix[san.id] = resGio.data.data.sort((a, b) => a.tu_gio.localeCompare(b.tu_gio));
                        } else {
                            newMatrix[san.id] = [];
                        }
                    } else {
                        newMatrix[san.id] = [];
                    }
                } catch (error) {
                    console.error(`Lỗi data sân ${san.id}:`, error);
                    newMatrix[san.id] = [];
                }
            }));

            setMatrixData(newMatrix);
            setIsLoadingMatrix(false);
        };

        fetchMatrixData();
    }, [selectedDate, subYards]);

    // --- 3. LOGIC TOGGLE SLOT ---
    const getDataType = () => {
        axios
            .get("http://127.0.0.1:8000/api/khach-hang/loai-san/data", {
                headers: {
                    Authorization:
                        "Bearer " + localStorage.getItem("token_khach_hang"),
                },
            })
            .then((res) => {
                setYardType(res.data.data);
            })
            .catch((err) => {
                console.error("Lỗi khi lấy data:", err);
                toast.error("Không thể tải dữ liệu loại sân");
            });
    };

    const handleToggleSlot = (san, gio) => {
        // Chỉ cho phép chọn nếu trạng thái == 1 (1: Còn trống)
        if (gio.trang_thai !== 1) return;

        const isSelected = selectedSlots.some(
            item => item.subYardId === san.id && item.khungGioId === gio.id
        );

        if (isSelected) {
            setSelectedSlots(prev => prev.filter(
                item => !(item.subYardId === san.id && item.khungGioId === gio.id)
            ));
        } else {
            setSelectedSlots(prev => [...prev, {
                subYardId: san.id,
                subYardName: san.ten_san,
                khungGioId: gio.id,
                time: `${gio.tu_gio.substring(0, 5)} - ${gio.den_gio.substring(0, 5)}`,
                price: gio.gia_thue || 0
            }]);
        }
    };

    // --- 4. TÍNH TỔNG TIỀN ---
    const totalPrice = selectedSlots.reduce((sum, item) => sum + Number(item.price), 0);

    // --- 5. XỬ LÝ ĐẶT SÂN ---

    // Hàm này CHỈ ĐỂ MỞ MODAL
    const handleOpenConfirm = () => {
        if (selectedSlots.length === 0) {
            alert("Vui lòng chọn ít nhất một khung giờ để đặt sân.");
            return;
        }
        setOpenConfirmModal(true);
    };

    // Hàm này GỬI API - Chỉ gọi khi bấm nút "Xác nhận đặt" trong Modal
    // Thay thế hàm handleConfirmBooking hiện tại bằng đoạn code này:

    const handleConfirmBooking = () => {
        setIsBooking(true);

        const payload = {
            ngay_dat: selectedDate,
            list_slot: selectedSlots.map(slot => slot.khungGioId),
            tong_tien: totalPrice,
            ghi_chu: note,
            pt_thanh_toan: paymentMethod,
        };

        console.log("--- Sending Booking Request ---", payload);

        axios.post("http://127.0.0.1:8000/api/khach-hang/dat-san", payload, {
            headers: { Authorization: "Bearer " + localStorage.getItem("token_khach_hang") }
        })
            .then((res) => {
                if (res.data.status) {
                    const orderId = res.data.order_id;
                    const methodText = paymentMethod === '0' ? 'Tiền mặt tại sân' : 'Chuyển khoản';

                    setOpenConfirmModal(false);
                    setSelectedSlots([]);
                    setNote('');

                    // Reload trang để cập nhật lịch
                    window.location.reload();
                } else {
                    // ⚠️ TOAST LỖI LOGIC TỪ SERVER
                    toast.warning(`⚠️ Lỗi đặt sân: ${res.data.message}`, {
                        position: "top-right",
                        autoClose: 6000,
                    });
                }
            })
            .catch((err) => {
                // ❌ TOAST LỖI MẠNG HOẶC SERVER HTTP ERROR
                console.error("Lỗi API:", err);

                let msg = "Lỗi kết nối hoặc hệ thống. Vui lòng kiểm tra mạng.";
                if (err.response && err.response.data && err.response.data.message) {
                    msg = err.response.data.message; // Lấy lỗi chi tiết từ BE
                }

                toast.error(`❌ Thất bại: ${msg}`, {
                    position: "top-center",
                    autoClose: 8000,
                });
            })
            .finally(() => {
                setIsBooking(false);
            });
    };

    const yardToType = (payload) => {
        // Kiểm tra an toàn: Nếu yardType không phải mảng hoặc chưa có dữ liệu thì trả về rỗng
        if (!Array.isArray(yardType) || yardType.length === 0) return '';

        // Logic cũ của bạn
        const loaiSan = yardType.find(item => item.id === payload);
        return loaiSan ? loaiSan.ten_loai_san : '';
    }

    return (
        <ThemeProvider theme={clientTheme}>
            <CssBaseline />
            <Header />
            <Container maxWidth="xl" sx={{ backgroundColor: '#f4f6f8', py: 4, minHeight: '90vh' }}>

                {/* 1. THANH CHỌN NGÀY */}
                <Paper elevation={0} sx={{ p: 2, mb: 3, borderRadius: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        {"Tên sân: " + yardName}
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <CalendarMonthIcon color="action" sx={{ mr: 1 }} />
                        <Typography variant="subtitle1" fontWeight="bold">Chọn ngày thi đấu:</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', overflowX: 'auto', gap: 1, pb: 1 }}>
                        {dates.map((day) => (
                            <Button
                                key={day.fullDate}
                                variant={selectedDate === day.fullDate ? "contained" : "outlined"}
                                onClick={() => setSelectedDate(day.fullDate)}
                                sx={{
                                    minWidth: 100, flexDirection: 'column', py: 1,
                                    bgcolor: selectedDate === day.fullDate ? 'primary.main' : 'white',
                                    border: selectedDate === day.fullDate ? 'none' : '1px solid #e0e0e0',
                                    color: selectedDate === day.fullDate ? 'white' : 'text.primary',
                                }}
                            >
                                <Typography variant="caption" sx={{ opacity: 0.8 }}>{day.dayOfWeek}</Typography>
                                <Typography variant="body1" fontWeight="bold">{day.displayDate}</Typography>
                            </Button>
                        ))}
                    </Box>
                </Paper>

                {/* 2. CHÚ THÍCH MÀU SẮC */}
                <Box sx={{ display: 'flex', gap: 3, mb: 2, justifyContent: 'flex-end' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ width: 20, height: 20, bgcolor: '#e8f5e9', border: '1px solid #4caf50', borderRadius: 1 }} />
                        <Typography variant="body2">Còn trống</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ width: 20, height: 20, bgcolor: '#ff9800', borderRadius: 1 }} />
                        <Typography variant="body2">Đang chọn</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ width: 20, height: 20, bgcolor: '#e0e0e0', borderRadius: 1 }} />
                        <Typography variant="body2">Đã đặt / Khóa</Typography>
                    </Box>
                </Box>

                {/* 3. BẢNG MA TRẬN */}
                <Paper elevation={0} sx={{ p: 3, borderRadius: 2, minHeight: 400 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="subtitle1" fontWeight="bold">
                            Lịch sân ngày {moment(selectedDate).format('DD/MM/YYYY')}:
                        </Typography>
                    </Box>

                    {isLoadingMatrix ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {subYards.length > 0 ? subYards.map((san) => (
                                <Box key={san.id} sx={{
                                    display: 'flex', flexDirection: { xs: 'column', md: 'row' },
                                    border: '1px solid #e0e0e0', borderRadius: 2, overflow: 'hidden'
                                }}>
                                    {/* Cột Tên Sân */}
                                    <Box sx={{
                                        width: { xs: '100%', md: 200 }, bgcolor: '#f5f5f5', p: 2,
                                        display: 'flex',flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                        borderRight: { xs: 'none', md: '1px solid #e0e0e0' },
                                        borderBottom: { xs: '1px solid #e0e0e0', md: 'none' }
                                    }}>
                                        <Typography fontWeight="bold" sx={{m : 0, p : 0, fontSize: '2.1rem',fontWeight: '800'}}>{san.ten_san}</Typography>
                                        <Typography fontStyle="italic" sx={{m : 0, p : 0}}>{yardToType(san.id)}</Typography>
                                        
                                    </Box>

                                    {/* Cột Khung Giờ */}
                                    <Box sx={{ flex: 1, p: 2 }}>
                                        {matrixData[san.id] && matrixData[san.id].length > 0 ? (
                                            <Grid container spacing={1}>
                                                {matrixData[san.id].map((gio) => {
                                                    // Nếu trạng thái != 1 thì coi như đã đặt (Disabled)
                                                    const isBooked = gio.trang_thai !== 1;

                                                    const isSelected = selectedSlots.some(
                                                        item => item.subYardId === san.id && item.khungGioId === gio.id
                                                    );

                                                    return (
                                                        <Grid item key={gio.id}>
                                                            <Button
                                                                disabled={isBooked}
                                                                variant={isSelected ? "contained" : "outlined"}
                                                                size="small"
                                                                onClick={() => handleToggleSlot(san, gio)}
                                                                sx={{
                                                                    borderRadius: 2, textTransform: 'none', minWidth: 120,
                                                                    flexDirection: 'column', py: 1,
                                                                    // Style ĐÃ ĐẶT
                                                                    ...(isBooked && { bgcolor: '#e0e0e0 !important', color: '#9e9e9e !important', borderColor: '#e0e0e0 !important' }),
                                                                    // Style CÒN TRỐNG
                                                                    ...(!isSelected && !isBooked && { borderColor: '#4caf50', color: '#2e7d32', bgcolor: '#e8f5e9', '&:hover': { bgcolor: '#4caf50', color: 'white' } }),
                                                                    // Style ĐANG CHỌN
                                                                    ...(isSelected && { bgcolor: '#ff9800', color: 'white', borderColor: '#ff9800', '&:hover': { bgcolor: '#f57c00' } })
                                                                }}
                                                            >
                                                                <Typography variant="body2" fontWeight="bold">
                                                                    {gio.tu_gio.substring(0, 5)} - {gio.den_gio.substring(0, 5)}
                                                                </Typography>
                                                                <Typography variant="caption" sx={{ opacity: 0.9 }}>
                                                                    {Number(gio.gia_thue).toLocaleString()}đ
                                                                </Typography>
                                                            </Button>
                                                        </Grid>
                                                    );
                                                })}
                                            </Grid>
                                        ) : (
                                            <Alert severity="warning" icon={false} sx={{ py: 0, bgcolor: 'transparent' }}>
                                                Hết sân hoặc chưa có lịch mở.
                                            </Alert>
                                        )}
                                    </Box>
                                </Box>
                            )) : (
                                <Typography align="center">Không có dữ liệu sân.</Typography>
                            )}
                        </Box>
                    )}
                </Paper>

                {/* 4. FOOTER ĐẶT SÂN */}
                {selectedSlots.length > 0 && (
                    <Paper
                        elevation={3}
                        sx={{
                            position: 'fixed', bottom: 0, left: 0, right: 0, p: 2,
                            bgcolor: 'white', borderTop: '1px solid #ddd', zIndex: 1000
                        }}
                    >
                        <Container maxWidth="xl" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box>
                                <Typography variant="subtitle1">Tổng cộng:</Typography>
                                <Typography variant="h5" color="error" fontWeight="bold">
                                    {totalPrice.toLocaleString()} VNĐ
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    ({selectedSlots.length} khung giờ đã chọn)
                                </Typography>
                            </Box>
                            {/* Nút này chỉ mở Modal, KHÔNG gửi API */}
                            <Button
                                variant="contained" size="large" color="error"
                                sx={{ px: 6, py: 1.5, fontSize: '1.1rem', fontWeight: 'bold', borderRadius: 2 }}
                                onClick={handleOpenConfirm}
                            >
                                Đặt sân
                            </Button>
                        </Container>
                    </Paper>
                )}

                {/* 🚀 5. MODAL XÁC NHẬN ĐẶT SÂN */}
                <Modal
                    open={openConfirmModal}
                    onClose={() => setOpenConfirmModal(false)}
                    aria-labelledby="modal-confirm-title"
                >
                    <Box sx={{
                        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                        width: { xs: '90%', sm: 500 }, bgcolor: 'background.paper',
                        borderRadius: 2, boxShadow: 24, p: 4, outline: 'none',
                        maxHeight: '90vh', overflowY: 'auto'
                    }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography id="modal-confirm-title" variant="h6" fontWeight="bold">
                                Xác nhận đặt sân
                            </Typography>
                            <Button onClick={() => setOpenConfirmModal(false)} sx={{ minWidth: 0, p: 0.5 }}>
                                <CloseIcon />
                            </Button>
                        </Box>

                        <Divider sx={{ mb: 2 }} />

                        {/* Danh sách slot đã chọn */}
                        <Box sx={{ maxHeight: 200, overflowY: 'auto', mb: 2 }}>
                            {selectedSlots.map((slot, index) => (
                                <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, p: 1, bgcolor: '#f9f9f9', borderRadius: 1 }}>
                                    <Box>
                                        <Typography variant="body2" fontWeight="bold">{slot.subYardName}</Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {moment(selectedDate).format('DD/MM/YYYY')} | {slot.time}
                                        </Typography>
                                    </Box>
                                    <Typography variant="body2" color="error" fontWeight="bold">
                                        {Number(slot.price).toLocaleString()}đ
                                    </Typography>
                                </Box>
                            ))}
                        </Box>

                        <Divider sx={{ mb: 2 }} />

                        {/* 🚀 CHỌN PHƯƠNG THỨC THANH TOÁN */}
                        <Box sx={{ mb: 3 }}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend" sx={{ fontWeight: 'bold', mb: 1, color: '#333', display: 'flex', alignItems: 'center' }}>
                                    <PaymentIcon sx={{ mr: 1, fontSize: 20 }} /> Phương thức thanh toán:
                                </FormLabel>
                                <RadioGroup
                                    aria-label="payment-method"
                                    name="payment-method"
                                    value={paymentMethod}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                >
                                    <FormControlLabel
                                        value="0"
                                        control={<Radio />}
                                        label="Thanh toán tại sân (Tiền mặt)"
                                    />
                                    <FormControlLabel
                                        value="1"
                                        control={<Radio />}
                                        label="Chuyển khoản ngân hàng (QR Code)"
                                    />
                                </RadioGroup>
                            </FormControl>

                            {paymentMethod === '1' && (
                                <Alert severity="info" sx={{ mt: 1, fontSize: '0.85rem' }}>
                                    Sau khi xác nhận, vui lòng chuyển khoản để hoàn tất đặt sân.
                                </Alert>
                            )}
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                            <Typography variant="h6">Tổng thanh toán:</Typography>
                            <Typography variant="h6" color="error" fontWeight="bold">
                                {totalPrice.toLocaleString()} VNĐ
                            </Typography>
                        </Box>

                        <TextField
                            fullWidth label="Ghi chú (tùy chọn)" multiline rows={2}
                            variant="outlined" value={note} onChange={(e) => setNote(e.target.value)}
                            sx={{ mb: 3 }}
                        />

                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button fullWidth variant="outlined" onClick={() => setOpenConfirmModal(false)} disabled={isBooking}>
                                Hủy bỏ
                            </Button>
                            {/* Nút này MỚI GỌI API */}
                            <Button
                                fullWidth variant="contained" color="primary"
                                onClick={handleConfirmBooking} disabled={isBooking}
                                startIcon={isBooking ? <CircularProgress size={20} color="inherit" /> : null}
                            >
                                {isBooking ? 'Đang xử lý...' : 'Xác nhận đặt'}
                            </Button>
                        </Box>
                    </Box>
                </Modal>

            </Container>
            {selectedSlots.length > 0 && <Box sx={{ height: 100 }} />}
        </ThemeProvider>
    );
};

export default SelectedYard;