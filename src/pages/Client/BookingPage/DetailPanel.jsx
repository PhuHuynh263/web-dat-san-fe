import React from "react";
import { Box, Typography, Button, IconButton, Grid, Chip, Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import PersonIcon from "@mui/icons-material/Person";

const DetailPanel = ({ yard, onClose, onOpenMap, onBooking }) => {
    if (!yard) return null;

    return (
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column", bgcolor: "white" }}>
            {/* Header Actions */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    p: 2,
                    borderBottom: "1px solid #eee",
                    gap: 1,
                }}
            >
                <Button
                    variant="outlined"
                    startIcon={<LocationOnIcon />}
                    onClick={onOpenMap}
                    size="small"
                >
                    Địa chỉ
                </Button>
                <Button
                    variant="contained"
                    startIcon={<CalendarMonthIcon />}
                    onClick={onBooking}
                    size="small"
                    color="primary"
                >
                    Đặt sân
                </Button>
                <IconButton onClick={onClose} size="small" sx={{ bgcolor: "#f5f5f5" }}>
                    <CloseIcon />
                </IconButton>
            </Box>

            {/* Content */}
            <Box sx={{ p: 3, overflowY: "auto", flex: 1 }}>
                {/* Image */}
                <Box
                    component="img"
                    src={
                        yard.hinh_anh ||
                        "https://fpt123.net/uploads/images/san-co-nhan-tao/san-bong-5-nguoi.jpg"
                    }
                    alt={yard.ten_san}
                    sx={{
                        width: "100%",
                        height: 250,
                        objectFit: "cover",
                        borderRadius: 2,
                        mb: 3,
                    }}
                />

                {/* Title & Address */}
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
                    {yard.ten_san}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2, color: "text.secondary" }}>
                    <LocationOnIcon fontSize="small" sx={{ mr: 0.5 }} />
                    <Typography variant="body2">
                        {yard.dia_chi}, {yard.quan_huyen}, {yard.thanh_pho}
                    </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Owner Info */}
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2, fontSize: "1.1rem" }}>
                    Thông tin liên hệ
                </Typography>

                <Grid container spacing={2}>
                    <Grid size={{ xs: 12 }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <PersonIcon color="action" sx={{ mr: 2 }} />
                            <Box>
                                <Typography variant="caption" color="text.secondary">
                                    Chủ sân
                                </Typography>
                                <Typography variant="body1" fontWeight={500}>
                                    {yard.ten_chu_san}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <PhoneIcon color="action" sx={{ mr: 2 }} />
                            <Box>
                                <Typography variant="caption" color="text.secondary">
                                    Số điện thoại
                                </Typography>
                                <Typography variant="body1" fontWeight={500}>
                                    {yard.so_dien_thoai}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <EmailIcon color="action" sx={{ mr: 2 }} />
                            <Box>
                                <Typography variant="caption" color="text.secondary">
                                    Email
                                </Typography>
                                <Typography variant="body1" fontWeight={500}>
                                    {yard.email}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                {/* Description or other info can go here */}
                <Typography variant="body2" color="text.secondary" sx={{ fontStyle: "italic" }}>
                    * Vui lòng liên hệ trực tiếp hoặc đặt lịch online để giữ chỗ.
                </Typography>
            </Box>
        </Box>
    );
};

export default DetailPanel;
