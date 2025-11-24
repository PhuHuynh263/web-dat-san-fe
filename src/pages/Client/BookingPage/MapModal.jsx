import React from "react";
import { Dialog, DialogContent, IconButton, Box, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const MapModal = ({ open, onClose, address }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            sx={{ "& .MuiDialog-paper": { borderRadius: 2, overflow: "hidden" } }}
        >
            <Box sx={{ position: "relative", height: "500px", width: "100%", bgcolor: "#f0f0f0" }}>
                <IconButton
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        bgcolor: "white",
                        boxShadow: 1,
                        zIndex: 10,
                        "&:hover": { bgcolor: "#f5f5f5" },
                    }}
                >
                    <CloseIcon />
                </IconButton>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                        flexDirection: "column",
                    }}
                >
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        Google Map Placeholder
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {address || "Địa chỉ chưa được cung cấp"}
                    </Typography>
                    {/* 
                TODO: Integrate actual Google Maps API here.
                Example iframe:
                <iframe
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(address)}`}
                ></iframe>
            */}
                </Box>
            </Box>
        </Dialog>
    );
};

export default MapModal;
