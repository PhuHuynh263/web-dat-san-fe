import React from "react";
import { Box, CircularProgress } from "@mui/material";

const PageLoading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%", // Chiếm 100% chiều cao của khung nội dung
        width: "100%",
        minHeight: "200px", // Chiều cao tối thiểu để đẹp mắt
      }}
    >
      <CircularProgress color="primary" />
    </Box>
  );
};

export default PageLoading;
