import React, { useState } from 'react';
import {
    Box,
    Typography,
    Container,
    CssBaseline,
    Tooltip,
    Button,
} from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { clientTheme } from '../../../clientTheme';
import Header from '../../../components/Client/Header/Header';

const SelectedYard = () => {
    const yards = [
        { id: 1, name: 'Sân A' },
        { id: 2, name: 'Sân B' },
        { id: 3, name: 'Sân C' },
        { id: 4, name: 'Sân D' },
    ];

    const timeSlots = [
        '07:00-08:00', '08:00-09:00', '09:00-10:00', '10:00-11:00',
        '11:00-12:00', '12:00-13:00', '13:00-14:00', '14:00-15:00',
        '15:00-16:00', '16:00-17:00', '17:00-18:00', '18:00-19:00',
        '19:00-20:00', '20:00-21:00', '21:00-22:00', '22:00-23:00',
    ];

    // 1 = available, 0 = khóa
    // mỗi slot có thêm giá
    const [schedule] = useState(() => {
        const init = {};
        yards.forEach(yard => {
            init[yard.id] = {};
            timeSlots.forEach(slot => {
                init[yard.id][slot] = {
                    status: Math.random() < 0.8 ? 1 : 0,
                    price: 100000 + Math.floor(Math.random() * 50000), // ví dụ giá 100k - 150k
                };
            });
        });
        return init;
    });

    const [selectedSlots, setSelectedSlots] = useState([]);

    const handleSelectSlot = (yardId, slot) => {
        if (schedule[yardId][slot].status === 0) return;

        const exists = selectedSlots.find(s => s.yardId === yardId && s.slot === slot);
        if (exists) {
            setSelectedSlots(selectedSlots.filter(s => !(s.yardId === yardId && s.slot === slot)));
        } else {
            setSelectedSlots([...selectedSlots, { yardId, slot }]);
        }
    };

    const getSlotColor = (yardId, slot) => {
        const isSelected = selectedSlots.find(s => s.yardId === yardId && s.slot === slot);
        if (isSelected) return '#FFA500';
        return schedule[yardId][slot].status === 1 ? '#4CAF50' : '#E0E0E0';
    };

    const totalPrice = selectedSlots.reduce(
        (sum, s) => sum + schedule[s.yardId][s.slot].price,
        0
    );

    return (
        <ThemeProvider theme={clientTheme}>
            <CssBaseline />
            <Header />
            <Container maxWidth={false} sx={{ backgroundColor: 'white', py: 3 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                    Đặt sân theo khung giờ
                </Typography>

                {/* Chú thích */}
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <Box sx={{ width: 20, height: 20, backgroundColor: '#4CAF50', borderRadius: 1 }} />
                    <Typography>Có thể đặt</Typography>
                    <Box sx={{ width: 20, height: 20, backgroundColor: '#E0E0E0', borderRadius: 1 }} />
                    <Typography>Khóa</Typography>
                    <Box sx={{ width: 20, height: 20, backgroundColor: '#FFA500', borderRadius: 1 }} />
                    <Typography>Đang chọn</Typography>
                </Box>

                <Box sx={{ overflowX: 'auto', border: '1px solid #ddd', borderRadius: 2 }}>
                    {/* Header */}
                    <Box sx={{ display: 'grid', gridTemplateColumns: `120px repeat(${timeSlots.length}, 100px)` }}>
                        <Box sx={{ p: 1, fontWeight: 'bold', borderRight: '1px solid #ddd' }}>Sân/Khung giờ</Box>
                        {timeSlots.map(slot => (
                            <Box
                                key={slot}
                                sx={{
                                    p: 1,
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                    borderRight: '1px solid #ddd',
                                    backgroundColor: '#f5f5f5',
                                }}
                            >
                                {slot}
                            </Box>
                        ))}
                    </Box>

                    {/* Body */}
                    {yards.map(yard => (
                        <Box key={yard.id} sx={{ display: 'grid', gridTemplateColumns: `120px repeat(${timeSlots.length}, 100px)`, borderTop: '1px solid #ddd' }}>
                            <Box sx={{ p: 1, fontWeight: 'bold', borderRight: '1px solid #ddd' }}>{yard.name}</Box>
                            {timeSlots.map(slot => (
                                <Tooltip
                                    key={slot}
                                    title={`Sân: ${yard.name} | Khung giờ: ${slot} | Trạng thái: ${schedule[yard.id][slot].status === 1 ? 'Có thể đặt' : 'Khóa'} | Giá: ${schedule[yard.id][slot].price.toLocaleString()} VNĐ`}
                                >
                                    <Box
                                        onClick={() => handleSelectSlot(yard.id, slot)}
                                        sx={{
                                            height: 40,
                                            m: 0,
                                            borderRadius: 1,
                                            backgroundColor: getSlotColor(yard.id, slot),
                                            cursor: schedule[yard.id][slot].status === 1 ? 'pointer' : 'not-allowed',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            border: '1px solid #ddd',
                                            transition: '0.2s',
                                            '&:hover': {
                                                opacity: schedule[yard.id][slot].status === 1 ? 0.8 : 1,
                                            },
                                        }}
                                    />
                                </Tooltip>
                            ))}
                        </Box>
                    ))}
                </Box>

                {/* Tổng tiền & Nút đặt */}
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                    <Typography variant="subtitle1">
                        {selectedSlots.length > 0
                            ? `Bạn đã chọn ${selectedSlots.length} khung giờ, tổng tiền: ${totalPrice.toLocaleString()} VNĐ`
                            : 'Chưa chọn khung giờ nào'}
                    </Typography>
                    <Button
                        variant="contained"
                        disabled={selectedSlots.length === 0}
                        onClick={() => alert(`Đặt thành công ${selectedSlots.length} khung giờ! Tổng: ${totalPrice.toLocaleString()} VNĐ`)}
                    >
                        Đặt sân
                    </Button>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default SelectedYard;
