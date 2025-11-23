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

function SettingsAdminPage() {
  // --- State ---
  const [tabValue, setTabValue] = useState(0);
  const [showPass, setShowPass] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  // State quản lý chế độ Sửa
  const [isEditing, setIsEditing] = useState(false);

  // Dữ liệu gốc (Dùng để backup khi nhấn Hủy)
  const [originalProfile, setOriginalProfile] = useState({});

  // Dữ liệu đang thao tác
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    avatar: "",
  });

  // Giả lập lấy dữ liệu từ API
  useEffect(() => {
    const dataFromAPI = {
      fullName: "Nguyễn Quản Trị",
      email: "admin@system.com",
      phone: "0905123456",
      address: "Đà Nẵng",
      avatar: "https://i.pravatar.cc/300?img=12",
    };
    setProfile(dataFromAPI);
    setOriginalProfile(dataFromAPI); // Lưu bản sao
  }, []);

  // --- Handlers ---
  const handleChangeTab = (e, v) => {
    setTabValue(v);
    handleCancel(); // Reset chế độ sửa khi chuyển tab
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) setProfile({ ...profile, avatar: URL.createObjectURL(file) });
  };

  // Bật chế độ sửa
  const handleEditMode = () => {
    setIsEditing(true);
  };

  // Hủy bỏ: Quay về chế độ xem & Reset dữ liệu
  const handleCancel = () => {
    setIsEditing(false);
    setProfile(originalProfile); // Trả lại dữ liệu gốc
  };

  // Lưu: Gọi API & Cập nhật dữ liệu gốc
  const handleSave = () => {
    // Call API Update here...
    setOriginalProfile(profile); // Cập nhật bản sao mới
    setIsEditing(false); // Tắt chế độ sửa
    toast.success("Đã lưu thông tin!");
  };

  const handleDelete = () => {
    setOpenDialog(false);
    toast.error("Đã xóa tài khoản (Demo)");
  };

  return (
    <Box sx={{ width: "100%", height: "100%", overflowY: "auto", p: 2 }}>
      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", mb: 3, color: "primary.main" }}
      >
        Cài Đặt Tài Khoản
      </Typography>

      <Grid container spacing={3}>
        {/* --- CỘT TRÁI: AVATAR --- */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{ p: 3, textAlign: "center", borderRadius: 2, height: "100%" }}
          >
            <Box sx={{ position: "relative", display: "inline-block", mb: 2 }}>
              <Avatar
                src={profile.avatar}
                sx={{
                  width: 120,
                  height: 120,
                  mb: 1,
                  border: "1px solid #eee",
                }}
              />
              {/* Chỉ hiện nút Camera khi đang ở chế độ Sửa (Hoặc luôn hiện tùy ý bạn) */}
              <IconButton
                color="primary"
                component="label"
                disabled={!isEditing} // Vô hiệu hóa nếu không phải chế độ sửa
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  bgcolor: "white",
                  boxShadow: 2,
                  "&:hover": { bgcolor: "#f5f5f5" },
                  opacity: isEditing ? 1 : 0.5, // Làm mờ khi không sửa
                }}
              >
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={handleAvatarChange}
                />
                <PhotoCamera fontSize="small" />
              </IconButton>
            </Box>

            <Typography variant="h6" fontWeight="bold">
              {profile.fullName}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              ADMINISTRATOR
            </Typography>
          </Paper>
        </Grid>

        {/* --- CỘT PHẢI: FORM --- */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper
            sx={{ borderRadius: 2, overflow: "hidden", minHeight: "400px" }}
          >
            {/* Tabs */}
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs value={tabValue} onChange={handleChangeTab} sx={{ px: 2 }}>
                <Tab
                  icon={<PersonIcon />}
                  iconPosition="start"
                  label="Thông tin chung"
                />
                <Tab
                  icon={<LockResetIcon />}
                  iconPosition="start"
                  label="Mật khẩu"
                />
              </Tabs>
            </Box>

            {/* Nội dung Tabs */}
            <Box sx={{ p: 3 }}>
              {/* TAB 1: THÔNG TIN */}
              {tabValue === 0 && (
                <Stack spacing={3}>
                  {/* Header của Tab 1: Chứa nút Sửa/Lưu */}
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      color="text.secondary"
                    >
                      Chi tiết hồ sơ
                    </Typography>

                    {!isEditing ? (
                      // Nút Sửa
                      <Button
                        variant="outlined"
                        startIcon={<EditIcon />}
                        onClick={handleEditMode}
                      >
                        Chỉnh sửa
                      </Button>
                    ) : (
                      // Nút Hủy & Lưu
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
                          onClick={handleSave}
                        >
                          Lưu
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
                        onChange={handleChange}
                        // Logic Disable
                        disabled={!isEditing}
                        variant={isEditing ? "outlined" : "filled"}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email"
                        value={profile.email}
                        disabled // Email luôn luôn không cho sửa
                        variant="filled"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Số điện thoại"
                        name="phone"
                        value={profile.phone}
                        onChange={handleChange}
                        // Logic Disable
                        disabled={!isEditing}
                        variant={isEditing ? "outlined" : "filled"}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Địa chỉ"
                        name="address"
                        value={profile.address}
                        onChange={handleChange}
                        // Logic Disable
                        disabled={!isEditing}
                        variant={isEditing ? "outlined" : "filled"}
                      />
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 2 }} />

                  {/* Danger Zone */}
                  <Box
                    sx={{
                      p: 2,
                      border: "1px dashed red",
                      borderRadius: 1,
                      bgcolor: "#fff5f5",
                    }}
                  >
                    <Typography color="error" fontWeight="bold" gutterBottom>
                      Xóa tài khoản
                    </Typography>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography variant="caption">
                        Hành động này không thể hoàn tác.
                      </Typography>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        startIcon={<DeleteForeverIcon />}
                        onClick={() => setOpenDialog(true)}
                      >
                        Xóa ngay
                      </Button>
                    </Box>
                  </Box>
                </Stack>
              )}

              {/* TAB 2: MẬT KHẨU (Luôn cho phép nhập, không cần nút Sửa) */}
              {tabValue === 1 && (
                <Stack spacing={3} maxWidth="600px">
                  <Typography variant="subtitle2" color="text.secondary">
                    Nhập mật khẩu hiện tại để thiết lập mật khẩu mới.
                  </Typography>
                  <TextField
                    fullWidth
                    label="Mật khẩu hiện tại"
                    type={showPass ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPass(!showPass)}>
                            {showPass ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField fullWidth label="Mật khẩu mới" type="password" />
                  <TextField
                    fullWidth
                    label="Xác nhận mật khẩu"
                    type="password"
                  />

                  <Box display="flex" justifyContent="flex-end">
                    <Button variant="contained" startIcon={<SaveIcon />}>
                      Đổi mật khẩu
                    </Button>
                  </Box>
                </Stack>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Dialog Xóa */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle sx={{ color: "error.main" }}>
          Xác nhận xóa tài khoản?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn xóa tài khoản <b>{profile.email}</b> không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Hủy</Button>
          <Button onClick={handleDelete} variant="contained" color="error">
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default SettingsAdminPage;
