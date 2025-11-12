import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import { drawerWidth } from "../Sidebar/Sidebar";
import TextField from "@mui/material/TextField";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Avatar, darken, Typography } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import Badge from "@mui/material/Badge";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Header({ isOpen, onToggleSidebar }) {
  const [anchorElMess, setAnchorElMess] = React.useState(null);
  const [anchorElNoti, setAnchorElNoti] = React.useState(null);
  const [anchorElAcc, setAnchorElAcc] = React.useState(null);
  const openMess = Boolean(anchorElMess);
  const openAcc = Boolean(anchorElAcc);
  const openNoti = Boolean(anchorElNoti);
  const role = "admin";

  const [isLoggedIn, setLogIn] = useState(false);
  const [adminName, setAdminName] = useState("");

  const checkLogin = () => {
    axios
      .get("http://127.0.0.1:8000/api/quan-tri-vien/kiem-tra-dang-nhap", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token_quan_tri_vien"),
        },
      })
      .then((res) => {
        if (res.data.status) {
          setLogIn(true);
          setAdminName(res.data.ten_qtv);
        } else {
          setLogIn(false);
        }
      })
      .catch((err) => {
        console.error(err);
        setAuth(false);
      });
  };

  useEffect(() => {
    checkLogin();
  }, []);

  const handleClickAcc = (event) => {
    setAnchorElAcc(event.currentTarget);
  };

  const handleClickMess = (event) => {
    setAnchorElMess(event.currentTarget);
  };

  const handleClickNoti = (event) => {
    setAnchorElNoti(event.currentTarget);
  };
  const handleCloseMess = () => {
    setAnchorElMess(null);
  };
  const handleCloseNoti = () => {
    setAnchorElNoti(null);
  };
  const handleCloseAcc = () => {
    setAnchorElAcc(null);
  };

  const STYLE_ICON = {
    color: "primary.minor",
    fontSize: "1.5rem",
    mr: { xs: 0, md: 1, xl: 1 },
    cursor: "pointer",
  };

  const STYLE_TYPO = {
    color: "primary.minor",
    fontSize: "0.9rem",
    display: { xs: "none", md: "block", xl: "block" },
  };

  const STYLE_BTN_ACTION = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    p: "6px",
    m: "2px",
    borderRadius: 2,
    "&:hover": {
      backgroundColor: (theme) => darken(theme.palette.background.default, 0.1),
    },
    maxWidth: "200px",
    minWidth: "40px",
  };

  const STYLE_AVA = {
    bgcolor: "primary.minor",
    mr: 2,
    width: 32,
    height: 32,
  };

  return (
    <AppBar
      sx={{
        position: "fixed",
        backgroundColor: "background.default",
        justifyContent: "center",
        boxShadow:
          "0 2px 4px -1px rgba(0,0,0,0.06), 0 4px 5px 0 rgba(0,0,0,0.04)",
        // 2. Style động để Header co giãn theo Sidebar
        transition: (theme) =>
          theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        ...(isOpen && {
          width: `calc(100% - ${drawerWidth}px)`,
          marginLeft: `${drawerWidth}px`,
          transition: (theme) =>
            theme.transitions.create(["width", "margin"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
        }),
      }}
    >
      <Toolbar>
        {/* Logo */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            // 2. Kích thước linh hoạt
            minWidth: { md: 250 }, // Kích thước tối thiểu
            width: { md: 300, lg: 400 }, // Kích thước mặc định
          }}
        >
          <MenuIcon onClick={onToggleSidebar} sx={STYLE_ICON} />
          <TextField
            id="outlined-textarea"
            label="Search"
            placeholder="Search..."
            size="small"
            fullWidth
            sx={{
              // Đặt width ở cấp cao nhất
              display: { xs: "none", md: "block" },
              // Style cho label
              "& .MuiInputLabel-root": {
                color: "primary.minor", // Label mặc định
                "&.Mui-focused": {
                  color: "primary.minor", // Label khi focus
                },
              },

              // Style cho khung input
              "& .MuiOutlinedInput-root": {
                fontSize: 14,

                // Style cho viền (notchedOutline)
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "primary.minor", // Viền mặc định
                },

                // Style khi hover
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "primary.minor", // Viền khi hover
                },

                // Style khi focus
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "primary.minor", // Viền khi focus
                },

                // Style cho chữ gõ vào
                "& .MuiOutlinedInput-input": {
                  color: "primary.minor", // Màu chữ gõ vào
                },
              },
            }}
          />
        </Box>

        {/* Menu */}
        <Box sx={{ flexGrow: 1 }} />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Message */}
          <Box>
            <Box
              id="basic-button-mess"
              aria-controls={openMess ? "basic-menu-mess" : undefined}
              aria-haspopup="true"
              aria-expanded={openMess ? "true" : undefined}
              onClick={handleClickMess}
              sx={STYLE_BTN_ACTION}
            >
              <Badge
                badgeContent={2}
                // 1. (Tùy chọn) Bỏ prop 'color' nếu bạn muốn ghi đè hoàn toàn
                // color="primary"
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                sx={{
                  // Style cũ của bạn để ẩn/hiện
                  "& .MuiBadge-standard": {
                    display: openMess ? "none" : "block",
                  },
                  // 2. Thêm style mới để đổi màu
                  "& .MuiBadge-badge": {
                    backgroundColor: "secondary.main", // <-- Thay 'green' bằng mã màu bạn muốn
                    color: "white", // (Tùy chọn) Đổi màu chữ bên trong badge
                  },
                }}
              >
                <EmailIcon sx={STYLE_ICON} />
              </Badge>
              <Typography variant="body1" sx={STYLE_TYPO}>
                Message
                {openMess ? <ExpandLess /> : <ExpandMore />}
              </Typography>
            </Box>
            <Menu
              id="basic-menu-mess"
              anchorEl={anchorElMess}
              open={openMess}
              onClose={handleCloseMess}
              slotProps={{
                list: {
                  "aria-labelledby": "basic-button-mess",
                },
              }}
            >
              <MenuItem onClick={handleCloseMess}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Avatar sx={STYLE_AVA} />
                  <Box sx={{ borderLeft: "1px solid #ccc", pl: 2 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: "bold",
                        borderBottom: "1px solid #ccc",
                        pb: 0.1,
                      }}
                    >
                      Jhon send you a message
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      15 minutes ago.
                    </Typography>
                  </Box>
                </Box>
              </MenuItem>
              <MenuItem onClick={handleCloseMess}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Avatar sx={STYLE_AVA} />
                  <Box sx={{ borderLeft: "1px solid #ccc", pl: 2 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: "bold",
                        borderBottom: "1px solid #ccc",
                        pb: 0.1,
                      }}
                    >
                      Jhon send you a message
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      15 minutes ago.
                    </Typography>
                  </Box>
                </Box>
              </MenuItem>
              <MenuItem onClick={handleCloseMess}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Avatar sx={STYLE_AVA} />
                  <Box sx={{ borderLeft: "1px solid #ccc", pl: 2 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: "bold",
                        borderBottom: "1px solid #ccc",
                        pb: 0.1,
                      }}
                    >
                      Jhon send you a message
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      15 minutes ago.
                    </Typography>
                  </Box>
                </Box>
              </MenuItem>
            </Menu>
          </Box>

          {/* Notification */}
          <Box>
            <Box
              id="basic-button-noti"
              aria-controls={openNoti ? "basic-menu-noti" : undefined}
              aria-haspopup="true"
              aria-expanded={openNoti ? "true" : undefined}
              onClick={handleClickNoti}
              sx={STYLE_BTN_ACTION}
            >
              <Badge
                badgeContent={2}
                // 1. (Tùy chọn) Bỏ prop 'color' nếu bạn muốn ghi đè hoàn toàn
                // color="primary"
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                sx={{
                  // Style cũ của bạn để ẩn/hiện
                  "& .MuiBadge-standard": {
                    display: openNoti ? "none" : "block",
                  },
                  // 2. Thêm style mới để đổi màu
                  "& .MuiBadge-badge": {
                    backgroundColor: "secondary.main", // <-- Thay 'green' bằng mã màu bạn muốn
                    color: "white", // (Tùy chọn) Đổi màu chữ bên trong badge
                  },
                }}
              >
                <NotificationsNoneIcon sx={STYLE_ICON} />
              </Badge>
              <Typography variant="body1" sx={STYLE_TYPO}>
                Notification
                {openNoti ? <ExpandLess /> : <ExpandMore />}
              </Typography>
            </Box>
            <Menu
              id="basic-menu-noti"
              anchorEl={anchorElNoti}
              open={openNoti}
              onClose={handleCloseNoti}
              slotProps={{
                list: {
                  "aria-labelledby": "basic-button-noti",
                },
              }}
            >
              <MenuItem onClick={handleCloseNoti}>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 1,
                    borderBottom: "1px solid #ccc",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: "bold",
                      color: "black",
                    }}
                  >
                    Profile updated successfully
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    15 minutes ago.
                  </Typography>
                </Box>
              </MenuItem>
              <MenuItem onClick={handleCloseNoti}>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 1,
                    borderBottom: "1px solid #ccc",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: "bold",
                      color: "black",
                    }}
                  >
                    Profile updated successfully
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    15 minutes ago.
                  </Typography>
                </Box>
              </MenuItem>
              <MenuItem onClick={handleCloseNoti}>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 1,
                    borderBottom: "1px solid #ccc",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: "bold",
                      color: "black",
                    }}
                  >
                    Profile updated successfully
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    15 minutes ago.
                  </Typography>
                </Box>
              </MenuItem>
            </Menu>
          </Box>

          {/* Account */}
          <Box>
            <Box
              id="basic-button-acc"
              aria-controls={openAcc ? "basic-menu-acc" : undefined}
              aria-haspopup="true"
              aria-expanded={openAcc ? "true" : undefined}
              onClick={handleClickAcc}
              sx={STYLE_BTN_ACTION}
            >
              <AccountCircleIcon sx={STYLE_ICON} />
              <Typography variant="body1" sx={STYLE_TYPO}>
                {isLoggedIn ? adminName : "Tài khoản"}
                {openAcc ? <ExpandLess /> : <ExpandMore />}
              </Typography>
            </Box>
            <Menu
              id="basic-menu-acc"
              anchorEl={anchorElAcc}
              open={openAcc}
              onClose={handleCloseAcc}
              slotProps={{
                list: {
                  "aria-labelledby": "basic-button-acc",
                },
              }}
              sx={{
                "& .MuiMenuItem-root": {
                  width: "200px",
                },
              }}
            >
              {isLoggedIn ? (
                <React.Fragment>
                  <MenuItem>
                    <Typography variant="body2" sx={{ color: "black" }}>
                      Tài khoản
                    </Typography>
                  </MenuItem>
                  <MenuItem>
                    <Typography variant="body2" sx={{ color: "black" }}>
                      Cài đặt
                    </Typography>
                  </MenuItem>
                  <MenuItem>
                    <Typography variant="body2" sx={{ color: "black" }}>
                      Đăng xuất
                    </Typography>
                  </MenuItem>
                </React.Fragment>
              ) : (
                // Chuyển sang trang Login bằng router
                <MenuItem
                  component={NavLink}
                  to={role === "admin" ? "/admin/login" : "/owner/login"}
                >
                  <Typography variant="body2" sx={{ color: "black" }}>
                    Đăng nhập
                  </Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
