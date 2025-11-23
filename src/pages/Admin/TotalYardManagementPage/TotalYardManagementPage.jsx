import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Grid,
  TextField,
  Button,
  Tab,
  Tabs,
  Stack,
  IconButton,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Fade,
  Tooltip,
  useTheme,
  Divider,
} from "@mui/material";
import { toast } from "react-toastify";

// Icons
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import SaveIcon from "@mui/icons-material/Save";
import PersonIcon from "@mui/icons-material/Person";
import LockResetIcon from "@mui/icons-material/LockReset";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BadgeIcon from "@mui/icons-material/Badge";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

// --- Helper: TabPanel ---
function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      {...other}
      style={{ width: "100%", height: "100%" }}
    >
      {value === index && (
        <Fade in={true} timeout={500}>
          <Box sx={{ p: 3, height: "100%", overflowY: "auto" }}>{children}</Box>
        </Fade>
      )}
    </div>
  );
}

function SettingsAdminPage() {
  const theme = useTheme();

  // --- State ---
  const [tabValue, setTabValue] = useState(0);
  const [isEditing, setIsEditing] = useState(false); // Trạng thái chỉnh sửa
  const [isLoading, setIsLoading] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [showPass, setShowPass] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // Dữ liệu gốc (Backup để hoàn tác khi nhấn Hủy)
  const [originalProfile, setOriginalProfile] = useState({});

  // Dữ liệu đang thao tác (Draft)
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    avatar: "", // URL hiển thị (có thể là URL server hoặc Blob preview)
    avatarFile: null, // File object thực tế để upload
  });

  // Password State
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  // --- 1. Giả lập Fetch Data ---
  useEffect(() => {
    const dataFromAPI = {
      fullName: "Nguyễn Quản Trị",
      email: "admin@system.com",
      phone: "0905123456",
      address: "123 Nguyễn Văn Linh, Đà Nẵng",
      avatar: "https://i.pravatar.cc/300?img=12", // Ảnh từ server
    };
    setProfile({ ...dataFromAPI, avatarFile: null });
    setOriginalProfile({ ...dataFromAPI, avatarFile: null });
  }, []);

  // --- 2. Clean up Blob URL khi component unmount ---
  useEffect(() => {
    return () => {
      if (profile.avatar && profile.avatar.startsWith("blob:")) {
        URL.revokeObjectURL(profile.avatar);
      }
    };
  }, [profile.avatar]);

  // --- Handlers ---

  const handleChangeTab = (e, v) => {
    if (isEditing) handleCancel(); // Tự động hủy sửa khi chuyển tab
    setTabValue(v);
  };

  const handleInfoChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // --- LOGIC CẬP NHẬT AVATAR ---
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate kích thước (VD: < 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File ảnh quá lớn (Tối đa 5MB)");
      return;
    }

    // Validate loại file
    if (!file.type.startsWith("image/")) {
      toast.error("Vui lòng chọn file ảnh");
      return;
    }

    // Tạo URL preview
    const previewUrl = URL.createObjectURL(file);

    setProfile((prev) => ({
      ...prev,
      avatar: previewUrl, // Cập nhật giao diện ngay lập tức
      avatarFile: file, // Lưu file để gửi lên server
    }));
  };

  // Bật chế độ sửa
  const handleEditMode = () => setIsEditing(true);

  // Hủy: Quay về dữ liệu gốc
  const handleCancel = () => {
    setIsEditing(false);
    // Nếu đang có avatar preview (blob), revoke nó đi để giải phóng bộ nhớ
    if (profile.avatar.startsWith("blob:")) {
      URL.revokeObjectURL(profile.avatar);
    }
    setProfile(originalProfile); // Reset về bản backup
  };

  // Lưu: Giả lập gửi API
  const handleSaveProfile = () => {
    setIsLoading(true);

    // Giả lập tạo FormData để gửi file
    const formData = new FormData();
    formData.append("fullName", profile.fullName);
    formData.append("phone", profile.phone);
    formData.append("address", profile.address);
    if (profile.avatarFile) {
      formData.append("avatar", profile.avatarFile);
    }

    // Call API here... axios.post('/api/update', formData)

    setTimeout(() => {
      setIsLoading(false);
      setIsEditing(false);

      // Sau khi lưu thành công, cập nhật lại bản gốc thành bản mới
      // Lưu ý: Thực tế server sẽ trả về URL ảnh thật, lúc này nên setAvatar bằng URL đó
      setOriginalProfile(profile);

      toast.success("Cập nhật thông tin thành công!");
    }, 1000);
  };

  const toggleShowPass = (field) => {
    setShowPass({ ...showPass, [field]: !showPass[field] });
  };

  return (
    <Box sx={{ width: "100%", height: "100%", overflowY: "auto", p: 2 }}>
      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", mb: 3, color: "primary.main" }}
      >
        Cài Đặt Tài Khoản
      </Typography>

      <Grid container spacing={3} sx={{ height: "calc(100% - 60px)" }}>
        {/* ================= CỘT TRÁI: AVATAR ================= */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              height: "100%",
              p: 0,
              borderRadius: 3,
              overflow: "hidden",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              bgcolor: "background.paper",
            }}
          >
            {/* Decorative Background */}
            <Box
              sx={{
                width: "100%",
                height: "120px",
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              }}
            />

            {/* Avatar Box */}
            <Box sx={{ position: "relative", mt: -6, mb: 2 }}>
              <Avatar
                src={profile.avatar}
                alt={profile.fullName}
                sx={{
                  width: 130,
                  height: 130,
                  border: "4px solid white",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
                  bgcolor: "grey.300",
                }}
              />

              {/* Nút Camera: Chỉ hiện & click được khi isEditing = true */}
              <Tooltip
                title={
                  isEditing ? "Tải ảnh mới" : "Nhấn 'Chỉnh sửa' để đổi ảnh"
                }
              >
                <Box>
                  {" "}
                  {/* Bọc Box để Tooltip hoạt động khi button disabled */}
                  <IconButton
                    component="label"
                    disabled={!isEditing} // Disable khi không sửa
                    sx={{
                      position: "absolute",
                      bottom: 5,
                      right: 5,
                      bgcolor: "white",
                      boxShadow: 2,
                      "&:hover": { bgcolor: "#f5f5f5" },
                      // Làm mờ nút khi không ở chế độ sửa
                      opacity: isEditing ? 1 : 0,
                      transform: isEditing ? "scale(1)" : "scale(0.8)",
                      pointerEvents: isEditing ? "auto" : "none",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <input
                      hidden
                      accept="image/*"
                      type="file"
                      onChange={handleAvatarChange}
                    />
                    <PhotoCamera color="primary" fontSize="small" />
                  </IconButton>
                </Box>
              </Tooltip>
            </Box>

            <Box sx={{ px: 3, textAlign: "center", width: "100%" }}>
              <Typography variant="h6" fontWeight="bold">
                {profile.fullName}
              </Typography>

              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.5,
                  mt: 1,
                  px: 1.5,
                  py: 0.5,
                  bgcolor: "primary.light",
                  borderRadius: 2,
                  color: "primary.contrastText",
                }}
              >
                <AdminPanelSettingsIcon fontSize="small" />
                <Typography variant="caption" fontWeight="bold">
                  ADMIN
                </Typography>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Stack
                spacing={2}
                sx={{ textAlign: "left", color: "text.secondary" }}
              >
                <Box display="flex" alignItems="center" gap={1.5}>
                  <EmailIcon fontSize="small" />
                  <Typography variant="body2" noWrap>
                    {profile.email}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1.5}>
                  <PhoneIcon fontSize="small" />
                  <Typography variant="body2">
                    {profile.phone || "Chưa cập nhật"}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1.5}>
                  <LocationOnIcon fontSize="small" />
                  <Typography variant="body2">
                    {profile.address || "Chưa cập nhật"}
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Paper>
        </Grid>

        {/* ================= CỘT PHẢI: FORM ================= */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper
            sx={{
              height: "100%",
              borderRadius: 3,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Tabs */}
            <Box
              sx={{ borderBottom: 1, borderColor: "divider", bgcolor: "white" }}
            >
              <Tabs value={tabValue} onChange={handleChangeTab} sx={{ px: 2 }}>
                <Tab
                  icon={<PersonIcon />}
                  iconPosition="start"
                  label="Thông tin chung"
                  sx={{ py: 2, minHeight: 60, fontWeight: 600 }}
                />
                <Tab
                  icon={<LockResetIcon />}
                  iconPosition="start"
                  label="Mật khẩu"
                  sx={{ py: 2, minHeight: 60, fontWeight: 600 }}
                />
              </Tabs>
            </Box>

            {/* Nội dung Tabs - Chiếm hết phần còn lại */}
            <Box sx={{ flexGrow: 1, overflow: "hidden", bgcolor: "#fafafa" }}>
              {/* TAB 1: THÔNG TIN */}
              <TabPanel value={tabValue} index={0}>
                <Box sx={{ maxWidth: "900px", mx: "auto" }}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={3}
                  >
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Chi tiết hồ sơ
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Thông tin hiển thị với người dùng khác
                      </Typography>
                    </Box>

                    {!isEditing ? (
                      <Button
                        variant="outlined"
                        startIcon={<EditIcon />}
                        onClick={handleEditMode}
                      >
                        Chỉnh sửa
                      </Button>
                    ) : (
                      <Stack direction="row" spacing={1}>
                        <Button
                          variant="text"
                          color="inherit"
                          startIcon={<CancelIcon />}
                          onClick={handleCancel}
                        >
                          Hủy
                        </Button>
                        <Button
                          variant="contained"
                          startIcon={<SaveIcon />}
                          onClick={handleSaveProfile}
                          disabled={isLoading}
                        >
                          {isLoading ? "Đang lưu..." : "Lưu thay đổi"}
                        </Button>
                      </Stack>
                    )}
                  </Box>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Họ tên"
                        name="fullName"
                        value={profile.fullName}
                        onChange={handleInfoChange}
                        disabled={!isEditing}
                        variant={isEditing ? "outlined" : "filled"}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <BadgeIcon color="action" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email"
                        value={profile.email}
                        disabled
                        variant="filled"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <EmailIcon color="action" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Số điện thoại"
                        name="phone"
                        value={profile.phone}
                        onChange={handleInfoChange}
                        disabled={!isEditing}
                        variant={isEditing ? "outlined" : "filled"}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PhoneIcon color="action" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Địa chỉ"
                        name="address"
                        value={profile.address}
                        onChange={handleInfoChange}
                        disabled={!isEditing}
                        variant={isEditing ? "outlined" : "filled"}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LocationOnIcon color="action" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>

                  <Box
                    sx={{
                      mt: 5,
                      p: 2,
                      border: "1px dashed",
                      borderColor: "error.main",
                      borderRadius: 2,
                      bgcolor: "#fff5f5",
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      color="error"
                      fontWeight="bold"
                      gutterBottom
                    >
                      Khu vực nguy hiểm
                    </Typography>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      flexWrap="wrap"
                      gap={2}
                    >
                      <Typography variant="caption" color="text.secondary">
                        Sau khi xóa, tài khoản không thể khôi phục.
                      </Typography>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        startIcon={<DeleteForeverIcon />}
                        onClick={() => setOpenDeleteDialog(true)}
                      >
                        Xóa tài khoản
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </TabPanel>

              {/* TAB 2: MẬT KHẨU */}
              <TabPanel value={tabValue} index={1}>
                <Box sx={{ maxWidth: "600px", mx: "auto" }}>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    gutterBottom
                  >
                    Đổi mật khẩu
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    display="block"
                    mb={3}
                  >
                    Mật khẩu mạnh giúp bảo vệ tài khoản của bạn an toàn hơn.
                  </Typography>

                  <Stack spacing={3}>
                    <TextField
                      fullWidth
                      label="Mật khẩu hiện tại"
                      type={showPass.current ? "text" : "password"}
                      value={passwords.current}
                      onChange={(e) =>
                        setPasswords({ ...passwords, current: e.target.value })
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => toggleShowPass("current")}
                            >
                              {showPass.current ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TextField
                      fullWidth
                      label="Mật khẩu mới"
                      type={showPass.new ? "text" : "password"}
                      value={passwords.new}
                      onChange={(e) =>
                        setPasswords({ ...passwords, new: e.target.value })
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => toggleShowPass("new")}>
                              {showPass.new ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TextField
                      fullWidth
                      label="Xác nhận mật khẩu"
                      type={showPass.confirm ? "text" : "password"}
                      value={passwords.confirm}
                      onChange={(e) =>
                        setPasswords({ ...passwords, confirm: e.target.value })
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => toggleShowPass("confirm")}
                            >
                              {showPass.confirm ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />

                    <Box display="flex" justifyContent="flex-end">
                      <Button variant="contained" startIcon={<SaveIcon />}>
                        Cập nhật mật khẩu
                      </Button>
                    </Box>
                  </Stack>
                </Box>
              </TabPanel>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Dialog Xóa */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle
          sx={{
            color: "error.main",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <DeleteForeverIcon /> Xác nhận xóa?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn xóa tài khoản <b>{profile.email}</b> không?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={() => setOpenDeleteDialog(false)}
            variant="outlined"
            color="inherit"
          >
            Hủy
          </Button>
          <Button variant="contained" color="error">
            Xóa vĩnh viễn
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default SettingsAdminPage;
