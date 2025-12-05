import React, { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Header from "../../../components/Client/Header/Header"; // Đã khôi phục import Header gốc của bạn
import {
    CssBaseline,
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Chip,
    Paper,
    Avatar,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    MenuItem,
    InputAdornment,
    IconButton,
    Badge,
    Slider,
    FormControlLabel,
    Checkbox,
    Rating
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// Thêm icons từ MUI Material
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import CloseIcon from '@mui/icons-material/Close';

// --- MOCK DATA & THEME ---

// 1. Theme (Màu đỏ chủ đạo)
const clientTheme = createTheme({
    palette: {
        primary: {
            main: "#D32F2F",
            light: "#EF5350",
            contrastText: "#fff"
        },
        secondary: {
            main: "#FF6D00",
            contrastText: "#fff"
        },
        background: {
            default: "#f5f5f5",
        },
        text: { primary: "#1a1a1a", secondary: "#666666" }
    },
    components: {
        MuiButton: { styleOverrides: { root: { borderRadius: 8, textTransform: 'none', fontWeight: 600 } } },
        MuiCard: { styleOverrides: { root: { borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', transition: '0.3s', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' } } } },
        MuiPaper: { styleOverrides: { root: { borderRadius: 12 } } }
    }
});

// 2. Mock Data Sản phẩm
const MOCK_PRODUCTS = [
    { id: 'PROD-001', name: 'Giày Nike Mercurial Superfly 9', category: 'Giày Thể Thao', price: 3200000, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', rating: 4.8, sold: 120, tag: 'Bán chạy' },
    { id: 'PROD-002', name: 'Áo Đấu Man Utd Home 2024/25', category: 'Áo Đấu', price: 1850000, image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', rating: 5.0, sold: 450, tag: 'Mới' },
    { id: 'PROD-003', name: 'Bóng Động Lực FIFA Quality Pro', category: 'Dụng Cụ', price: 1250000, image: 'https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', rating: 4.5, sold: 85, tag: '' },
    { id: 'PROD-004', name: 'Găng Tay Thủ Môn Adidas Predator', category: 'Phụ Kiện', price: 950000, image: 'https://images.unsplash.com/photo-1626224583764-847890e058f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', rating: 4.2, sold: 32, tag: 'Giảm giá' },
    { id: 'PROD-005', name: 'Giày Adidas X Speedportal', category: 'Giày Thể Thao', price: 2800000, image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', rating: 4.7, sold: 98, tag: '' },
    { id: 'PROD-006', name: 'Bộ Quần Áo Đội Tuyển Việt Nam', category: 'Áo Đấu', price: 450000, image: 'https://images.unsplash.com/photo-1552066344-2464c494e755?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', rating: 4.9, sold: 1200, tag: 'Hot' },
    { id: 'PROD-007', name: 'Tất Chống Trượt Hi5port', category: 'Phụ Kiện', price: 50000, image: 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', rating: 4.6, sold: 5000, tag: '' },
    { id: 'PROD-008', name: 'Bình Nước Thể Thao 1L', category: 'Phụ Kiện', price: 120000, image: 'https://images.unsplash.com/photo-1602143407151-011141950038?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', rating: 4.3, sold: 150, tag: '' },
];

const CATEGORIES = ['Tất cả', 'Giày Thể Thao', 'Áo Đấu', 'Dụng Cụ', 'Phụ Kiện'];

const HomePage = () => {
    // --- STATE ---
    const [openOrderModal, setOpenOrderModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('Tất cả');
    const [priceRange, setPriceRange] = useState([0, 5000000]);
    const [searchQuery, setSearchQuery] = useState('');

    // State form đặt hàng
    const [orderForm, setOrderForm] = useState({
        id: '',
        productName: '',
        categoryId: '',
        price: 0,
        image: '',
        quantity: 1,
        customerName: '',
        phone: '',
        address: '',
        note: ''
    });

    // --- HANDLERS ---

    // Mở modal khi bấm "Đặt ngay"
    const handleOpenOrder = (product) => {
        setOrderForm({
            ...orderForm,
            id: product.id,
            productName: product.name,
            categoryId: product.category,
            price: product.price,
            image: product.image,
            quantity: 1,
        });
        setOpenOrderModal(true);
    };

    const handleCloseOrder = () => setOpenOrderModal(false);

    const handleOrderChange = (e) => {
        const { id, value } = e.target;
        setOrderForm(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmitOrder = () => {
        alert(`Đã đặt hàng thành công!\nSản phẩm: ${orderForm.productName}\nTổng tiền: ${(orderForm.price * orderForm.quantity).toLocaleString()}đ`);
        setOpenOrderModal(false);
    };

    // Filter Products
    const filteredProducts = MOCK_PRODUCTS.filter(product => {
        const matchCat = selectedCategory === 'Tất cả' || product.category === selectedCategory;
        const matchPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
        const matchSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCat && matchPrice && matchSearch;
    });

    return (
        <ThemeProvider theme={clientTheme}>
            <CssBaseline />
            <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                {/* Sử dụng Header được import từ dự án của bạn */}
                <Header />

                {/* --- HERO BANNER --- */}
                <Box sx={{
                    bgcolor: 'primary.main',
                    color: 'white',
                    py: 8,
                    backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(https://images.unsplash.com/photo-1517466787929-bc90951d0974?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}>
                    <Container>
                        <Grid container alignItems="center" spacing={4}>
                            <Grid item xs={12} md={7}>
                                <Chip label="Khuyến mãi mùa hè" color="secondary" sx={{ mb: 2, fontWeight: 'bold' }} />
                                <Typography variant="h2" fontWeight="800" sx={{ mb: 2 }}>
                                    Trang bị đẳng cấp <br /> Bứt phá giới hạn
                                </Typography>
                                <Typography variant="h6" sx={{ mb: 4, opacity: 0.9, fontWeight: 400 }}>
                                    Hàng ngàn sản phẩm thể thao chính hãng giảm giá đến 50%.
                                </Typography>
                                <Button variant="contained" color="secondary" size="large" sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}>
                                    Xem Khuyến Mãi
                                </Button>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>

                {/* --- MAIN CONTENT --- */}
                <Container sx={{ py: 6, flex: 1 }}>
                    <Grid container spacing={4}>

                        {/* SIDEBAR FILTER */}
                        <Grid item xs={12} md={3}>
                            <Paper elevation={0} sx={{ p: 3, border: '1px solid #eee' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                                    <FilterListIcon color="primary" />
                                    <Typography variant="h6" fontWeight="bold">Bộ lọc tìm kiếm</Typography>
                                </Box>

                                {/* Danh mục */}
                                <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 2 }}>Danh mục</Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 4 }}>
                                    {CATEGORIES.map(cat => (
                                        <Box
                                            key={cat}
                                            onClick={() => setSelectedCategory(cat)}
                                            sx={{
                                                p: 1,
                                                borderRadius: 1,
                                                cursor: 'pointer',
                                                bgcolor: selectedCategory === cat ? 'primary.50' : 'transparent',
                                                color: selectedCategory === cat ? 'primary.main' : 'text.secondary',
                                                fontWeight: selectedCategory === cat ? 'bold' : 'normal',
                                                '&:hover': { bgcolor: 'primary.50', color: 'primary.main' }
                                            }}
                                        >
                                            {cat}
                                        </Box>
                                    ))}
                                </Box>

                                {/* Mức giá */}
                                <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 2 }}>Khoảng giá</Typography>
                                <Slider
                                    value={priceRange}
                                    onChange={(e, newValue) => setPriceRange(newValue)}
                                    valueLabelDisplay="auto"
                                    min={0}
                                    max={5000000}
                                    step={100000}
                                    sx={{ mb: 2 }}
                                />
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                                    <Typography variant="caption">{priceRange[0].toLocaleString()}đ</Typography>
                                    <Typography variant="caption">{priceRange[1].toLocaleString()}đ</Typography>
                                </Box>

                                {/* Tiện ích khác */}
                                <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1 }}>Dịch vụ</Typography>
                                <FormControlLabel control={<Checkbox defaultChecked size="small" />} label={<Typography variant="body2">Giao hàng nhanh 2h</Typography>} />
                                <FormControlLabel control={<Checkbox size="small" />} label={<Typography variant="body2">Freeship Xtra</Typography>} />
                            </Paper>
                        </Grid>

                        {/* PRODUCT GRID */}
                        <Grid item xs={12} md={9}>
                            {/* Toolbar */}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                <Typography variant="h6" fontWeight="bold">
                                    Sản phẩm ({filteredProducts.length})
                                </Typography>
                                <TextField
                                    size="small"
                                    placeholder="Tìm tên sản phẩm..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment>,
                                    }}
                                    sx={{ width: 250, bgcolor: 'white' }}
                                />
                            </Box>

                            <Grid container spacing={3}>
                                {filteredProducts.map((product) => (
                                    <Grid item xs={12} sm={6} lg={4} key={product.id}>
                                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                                            {product.tag && (
                                                <Chip
                                                    label={product.tag}
                                                    color={product.tag === 'Giảm giá' ? 'error' : 'secondary'}
                                                    size="small"
                                                    sx={{ position: 'absolute', top: 10, left: 10, zIndex: 1, fontWeight: 'bold' }}
                                                />
                                            )}
                                            <CardMedia
                                                component="img"
                                                height="200"
                                                image={product.image}
                                                alt={product.name}
                                                sx={{ objectFit: 'cover' }}
                                            />
                                            <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                                                <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 0.5 }}>
                                                    {product.category}
                                                </Typography>
                                                <Typography gutterBottom variant="subtitle1" component="div" fontWeight="bold" sx={{ lineHeight: 1.3, mb: 1, height: '2.6em', overflow: 'hidden' }}>
                                                    {product.name}
                                                </Typography>

                                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                    <Rating value={product.rating} readOnly size="small" precision={0.1} />
                                                    <Typography variant="caption" sx={{ ml: 0.5, color: 'text.secondary' }}>
                                                        ({product.sold} đã bán)
                                                    </Typography>
                                                </Box>

                                                <Typography variant="h6" color="primary" fontWeight="bold">
                                                    {product.price.toLocaleString('vi-VN')}₫
                                                </Typography>
                                            </CardContent>
                                            <CardActions sx={{ p: 2, pt: 0 }}>
                                                <Button
                                                    variant="contained"
                                                    fullWidth
                                                    startIcon={<AddShoppingCartIcon />}
                                                    onClick={() => handleOpenOrder(product)}
                                                >
                                                    Mua Ngay
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>

                            {filteredProducts.length === 0 && (
                                <Box sx={{ textAlign: 'center', py: 8, width: '100%' }}>
                                    <Typography variant="h6" color="text.secondary">Không tìm thấy sản phẩm nào.</Typography>
                                    <Button onClick={() => { setSearchQuery(''); setSelectedCategory('Tất cả'); }} sx={{ mt: 1 }}>
                                        Xóa bộ lọc
                                    </Button>
                                </Box>
                            )}
                        </Grid>
                    </Grid>
                </Container>

                {/* --- POLICY SECTION --- */}
                <Box sx={{ bgcolor: 'white', py: 6, borderTop: '1px solid #eee' }}>
                    <Container>
                        <Grid container spacing={4}>
                            {[
                                { icon: <LocalShippingIcon fontSize="large" color="primary" />, title: "Giao Hàng Toàn Quốc", desc: "Miễn phí vận chuyển đơn từ 500k" },
                                { icon: <VerifiedUserIcon fontSize="large" color="primary" />, title: "Chính Hãng 100%", desc: "Cam kết chất lượng, hoàn tiền gấp đôi" },
                                { icon: <SupportAgentIcon fontSize="large" color="primary" />, title: "Hỗ Trợ 24/7", desc: "Đội ngũ tư vấn chuyên nghiệp" },
                            ].map((item, index) => (
                                <Grid item xs={12} md={4} key={index}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                        <Box sx={{ p: 2, bgcolor: 'primary.50', borderRadius: '50%', mb: 2 }}>
                                            {item.icon}
                                        </Box>
                                        <Typography variant="h6" fontWeight="bold">{item.title}</Typography>
                                        <Typography variant="body2" color="text.secondary">{item.desc}</Typography>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Box>

                {/* --- ORDER MODAL (TÍCH HỢP TỪ YÊU CẦU TRƯỚC) --- */}
                <Dialog open={openOrderModal} onClose={handleCloseOrder} maxWidth="md" fullWidth>
                    <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                            <Typography variant="h6" fontWeight="bold">ĐẶT HÀNG NHANH</Typography>
                            <Typography variant="caption" sx={{ opacity: 0.8 }}>Mã SP: {orderForm.id}</Typography>
                        </Box>
                        <IconButton onClick={handleCloseOrder} sx={{ color: 'white' }}><CloseIcon /></IconButton>
                    </DialogTitle>

                    <DialogContent sx={{ p: 0 }}>
                        <Grid container>
                            {/* Product Info Column */}
                            <Grid item xs={12} md={5} sx={{ bgcolor: '#f9f9f9', p: 3, borderRight: '1px solid #eee' }}>
                                <Typography variant="subtitle2" color="text.secondary" fontWeight="bold" sx={{ mb: 2 }}>SẢN PHẨM ĐANG CHỌN</Typography>

                                <Box sx={{ width: '100%', height: 250, bgcolor: 'white', borderRadius: 2, overflow: 'hidden', mb: 2, border: '1px solid #eee' }}>
                                    <img src={orderForm.image} alt="Product" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                </Box>

                                <Typography variant="h6" fontWeight="bold" sx={{ lineHeight: 1.2, mb: 1 }}>
                                    {orderForm.productName}
                                </Typography>
                                <Chip label={orderForm.categoryId} size="small" sx={{ mb: 2 }} />

                                <Typography variant="h5" color="primary" fontWeight="bold" sx={{ mb: 3 }}>
                                    {orderForm.price.toLocaleString('vi-VN')}₫
                                </Typography>

                                <TextField
                                    id="quantity"
                                    label="Số lượng"
                                    type="number"
                                    fullWidth
                                    size="small"
                                    value={orderForm.quantity}
                                    onChange={handleOrderChange}
                                    InputProps={{ inputProps: { min: 1 } }}
                                    sx={{ bgcolor: 'white' }}
                                />

                                <Box sx={{ mt: 3, pt: 2, borderTop: '1px dashed #ccc' }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                        <Typography>Tạm tính:</Typography>
                                        <Typography fontWeight="bold">{(orderForm.price * orderForm.quantity).toLocaleString()}đ</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                        <Typography>Phí vận chuyển:</Typography>
                                        <Typography fontWeight="bold" color="success.main">Miễn phí</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                                        <Typography variant="h6" fontWeight="bold">TỔNG CỘNG:</Typography>
                                        <Typography variant="h6" fontWeight="bold" color="primary">{(orderForm.price * orderForm.quantity).toLocaleString()}đ</Typography>
                                    </Box>
                                </Box>
                            </Grid>

                            {/* Customer Info Column */}
                            <Grid item xs={12} md={7} sx={{ p: 3 }}>
                                <Typography variant="h6" color="primary" fontWeight="bold" sx={{ mb: 3 }}>
                                    THÔNG TIN GIAO HÀNG
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="customerName"
                                            label="Họ và Tên"
                                            fullWidth
                                            required
                                            variant="outlined"
                                            value={orderForm.customerName}
                                            onChange={handleOrderChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            id="phone"
                                            label="Số điện thoại"
                                            fullWidth
                                            required
                                            variant="outlined"
                                            value={orderForm.phone}
                                            onChange={handleOrderChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            id="email"
                                            label="Email (Tùy chọn)"
                                            fullWidth
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="address"
                                            label="Địa chỉ nhận hàng"
                                            fullWidth
                                            required
                                            multiline
                                            rows={2}
                                            variant="outlined"
                                            placeholder="Số nhà, đường, phường/xã..."
                                            value={orderForm.address}
                                            onChange={handleOrderChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="note"
                                            label="Ghi chú (Size, Màu sắc...)"
                                            fullWidth
                                            multiline
                                            rows={2}
                                            variant="outlined"
                                            placeholder="VD: Size 42, Giao giờ hành chính..."
                                            value={orderForm.note}
                                            onChange={handleOrderChange}
                                        />
                                    </Grid>
                                </Grid>

                                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                                    <Button onClick={handleCloseOrder} color="inherit">Hủy bỏ</Button>
                                    <Button
                                        onClick={handleSubmitOrder}
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        sx={{ px: 4, py: 1 }}
                                        startIcon={<LocalShippingIcon />}
                                    >
                                        Xác nhận đặt hàng
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </DialogContent>
                </Dialog>

            </Box>
        </ThemeProvider>
    );
};

export default HomePage;