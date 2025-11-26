import React from "react";
import { Dialog, IconButton, Box, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const MapModal = ({ open, onClose, address, lat, lng }) => {
    // Ưu tiên dùng tọa độ nếu có
    const query = lat && lng
        ? `${lat},${lng}`
        : address || "";

    const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=16&output=embed`;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            sx={{ "& .MuiDialog-paper": { borderRadius: 2, overflow: "hidden" } }}
        >
            <Box sx={{ position: "relative", height: "500px", width: "100%" }}>
                <IconButton
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        bgcolor: "white",
                        boxShadow: 1,
                        zIndex: 10,
                    }}
                >
                    <CloseIcon />
                </IconButton>

                {query ? (
                    <iframe
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        loading="lazy"
                        allowFullScreen
                        src={mapUrl}
                    ></iframe>
                ) : (
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "100%",
                            flexDirection: "column",
                            bgcolor: "#f5f5f5",
                        }}
                    >
                        <Typography variant="h6">Không có địa chỉ hợp lệ</Typography>
                    </Box>
                )}
            </Box>
        </Dialog>
    );
};

export default MapModal;
