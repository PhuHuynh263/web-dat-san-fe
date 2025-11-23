import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Box,
  CssBaseline,
  Typography,
  Button,
  Grid,
  IconButton,
  Drawer,
  useTheme,
  useMediaQuery,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";

import { ThemeProvider } from "@emotion/react";
import TuneIcon from "@mui/icons-material/Tune";
import CloseIcon from "@mui/icons-material/Close";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { clientTheme } from "../../../clientTheme";
import Header from "../../../components/Client/Header/Header";
import ReUseableCard from "../../../components/Client/ReUseableCard";

const dataAddress = {
  "Hà Nội": ["Ba Đình", "Hoàn Kiếm", "Thanh Xuân", "Cầu Giấy"],
  "Thành phố Hồ Chí Minh": ["Quận 1", "Quận 3", "Gò Vấp", "Tân Bình"],
  "Đà Nẵng": ["Hải Châu", "Thanh Khê", "Liên Chiểu"],
};

const BookingPage = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const [yard, setYard] = useState([]);
  const [filterOpen, setFilterOpen] = useState(true);

  // Filter state
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [districts, setDistricts] = useState([]);
  const [fieldType, setFieldType] = useState("");

  // GET DATA SÂN
  const getDaTaChuSan = () => {
    axios
      .get("http://127.0.0.1:8000/api/khach-hang/chu-san/data")
      .then((res) => {
        if (res.data.status) {
          setYard(res.data.data);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch(() => toast.error("Lỗi khi tải dữ liệu sân bóng"));
  };

  useEffect(() => {
    getDaTaChuSan();
  }, []);

  const handleChangeCity = (value) => {
    setCity(value);
    setDistrict("");
    setDistricts(dataAddress[value] || []);
  };

  const handleSearch = () => {
    const searchData = {
      city,
      district,
      // fieldType,
    };
    console.log("Thông tin search:", searchData);
    axios
        .get()
    if (!isDesktop) setFilterOpen(false);
  };

  // Filter Panel JSX
  const FilterPanel = ({ isMobile }) => (
    <Box sx={{ p: 3, minHeight: isMobile ? "auto" : "100%" }}>
      {/* Header */}
      {isMobile ? (
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Lọc Tìm Kiếm
          </Typography>
          <IconButton onClick={() => setFilterOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
      ) : (
        <Box sx={{ textAlign: "right", mb: 2 }}>
          <IconButton onClick={() => setFilterOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
      )}

      {/* Thành phố */}
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ mb: 1, fontWeight: "bold" }}>Thành Phố</Typography>
        <FormControl fullWidth size="small">
          <InputLabel>Chọn thành phố</InputLabel>
          <Select
            value={city}
            label="Chọn thành phố"
            onChange={(e) => handleChangeCity(e.target.value)}
          >
            <MenuItem value="">-- Chọn thành phố --</MenuItem>
            {Object.keys(dataAddress).map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Quận/Huyện */}
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ mb: 1, fontWeight: "bold" }}>Quận/Huyện</Typography>
        <FormControl fullWidth size="small">
          <InputLabel>Chọn quận/huyện</InputLabel>
          <Select
            value={district}
            label="Chọn quận/huyện"
            onChange={(e) => setDistrict(e.target.value)}
            disabled={!city}
          >
            <MenuItem value="">-- Chọn quận/huyện --</MenuItem>
            {districts.map((d, i) => (
              <MenuItem key={i} value={d}>
                {d}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Loại sân */}
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ mb: 1, fontWeight: "bold" }}>Loại Sân</Typography>
        <FormControl fullWidth size="small">
          <InputLabel>Chọn loại sân</InputLabel>
          <Select
            value={fieldType}
            label="Chọn loại sân"
            onChange={(e) => setFieldType(e.target.value)}
          >
            <MenuItem value="">-- Chọn --</MenuItem>
            <MenuItem value="5v5">Sân 5v5</MenuItem>
            <MenuItem value="7v7">Sân 7v7</MenuItem>
            <MenuItem value="11v11">Sân 11v11</MenuItem>
            <MenuItem value="futsal">Sân Futsal</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Button
        variant="contained"
        fullWidth
        sx={{ py: 1.5, fontWeight: "bold" }}
        onClick={handleSearch}
      >
        Tìm Kiếm
      </Button>
    </Box>
  );

  return (
    <ThemeProvider theme={clientTheme}>
      <CssBaseline />
      <Header />

      <Box sx={{ display: "flex", minHeight: "calc(100vh - 73px)" }}>
        {/* Desktop Sidebar */}
        {isDesktop && filterOpen && (
          <Box
            sx={{
              width: "30vw",
              backgroundColor: "white",
              boxShadow: 3,
              transition: "width 0.3s ease",
              borderRight: "1px solid #eee",
              overflow: "hidden",
            }}
          >
            <FilterPanel />
          </Box>
        )}

        {/* Toggle Button Desktop */}
        {isDesktop && !filterOpen && (
          <IconButton
            onClick={() => setFilterOpen(true)}
            sx={{
              position: "fixed",
              left: 16,
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "primary.main",
              color: "white",
              zIndex: 1100,
            }}
          >
            <ChevronRightIcon />
          </IconButton>
        )}

        {/* Results */}
        <Box
          sx={{
            width: isDesktop ? (filterOpen ? "70vw" : "100%") : "100%",
            p: 3,
            overflowY: "auto",
            transition: "width 0.3s ease",
          }}
        >
          {!isDesktop && (
            <Box sx={{ mb: 3 }}>
              <Button
                startIcon={<TuneIcon />}
                onClick={() => setFilterOpen(true)}
                sx={{ color: "primary.main", fontWeight: "bold", textTransform: "none" }}
              >
                Lọc
              </Button>
            </Box>
          )}

          <Typography variant="h6" sx={{ mb: 3, fontWeight: "bold" }}>
            Kết Quả Tìm Kiếm
          </Typography>

          <Grid container spacing={3}>
            {yard.map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                <ReUseableCard
                  id={item.id}
                  name={item.ten_san}
                  district={item.quan_huyen}
                  rating={5}
                  openingHours="5:00 - 23:00"
                  isHot={item.trang_thai === 1}
                  image={item.hinh_anh}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Mobile Drawer */}
        <Drawer
          anchor="bottom"
          open={!isDesktop && filterOpen}
          onClose={() => setFilterOpen(false)}
          sx={{ "& .MuiDrawer-paper": { borderRadius: "16px 16px 0 0", maxHeight: "90vh" } }}
        >
          <FilterPanel isMobile />
        </Drawer>
      </Box>
    </ThemeProvider>
  );
};

export default BookingPage;
