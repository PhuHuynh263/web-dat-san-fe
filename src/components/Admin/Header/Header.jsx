import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import { drawerWidth } from "../Sidebar/Sidebar";
import TextField from "@mui/material/TextField";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Avatar, Typography } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import Badge from "@mui/material/Badge";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Header({ isOpen, onToggleSidebar }) {
  const [anchorElMess, setAnchorElMess] = React.useState(null);
  const [anchorElNoti, setAnchorElNoti] = React.useState(null);
  const [anchorElAcc, setAnchorElAcc] = React.useState(null);
  const openMess = Boolean(anchorElMess);
  const openAcc = Boolean(anchorElAcc);
  const openNoti = Boolean(anchorElNoti);

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

  return (
    <AppBar
      sx={{
        position: "fixed",
        backgroundColor: "white",
        justifyContent: "center",
        height: 64,
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
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            mr: 2,
          }}
        >
          <MenuIcon
            onClick={onToggleSidebar}
            sx={{
              color: "#003C7A",
              fontSize: "2rem",
              mr: 2,
              cursor: "pointer",
            }}
          />
          <TextField
            id="outlined-textarea"
            label="Search"
            placeholder="Search..."
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                width: 400,
                fontSize: 14,
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#003C7A", // Màu viền bạn muốn khi focus
                  color: "#003C7A", // Màu chữ bạn muốn khi focus
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#003C7A",
              },
              display: { xs: "none", md: "block", xl: "block" },
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
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                p: 2,
                borderRadius: 2,
                "&:hover": { backgroundColor: "#F5F5F5 " },
                maxWidth: "200px",
                minWidth: "50px",
              }}
            >
              <Badge
                badgeContent={2}
                color="primary"
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                sx={{
                  "& .MuiBadge-standard": {
                    display: openMess ? "none" : "block",
                  },
                }}
              >
                <EmailIcon
                  sx={{ color: "#003C7A", mr: { xs: 0, md: 0, xl: 1 } }}
                />
              </Badge>
              <Typography
                variant="body1"
                sx={{
                  color: "#003C7A",
                  fontSize: "1.2rem",
                  display: { xs: "none", md: "none", xl: "block" },
                }}
              >
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
                  <Avatar sx={{ bgcolor: "#003C7A", mr: 2 }} />
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
                  <Avatar sx={{ bgcolor: "#003C7A", mr: 2 }} />
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
                  <Avatar sx={{ bgcolor: "#003C7A", mr: 2 }} />
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
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                p: 2,
                borderRadius: 2,
                "&:hover": { backgroundColor: "#F5F5F5 " },
                maxWidth: "200px",
                minWidth: "50px",
              }}
            >
              <Badge
                badgeContent={2}
                color="primary"
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                sx={{
                  "& .MuiBadge-standard": {
                    display: openNoti ? "none" : "block",
                  },
                }}
              >
                <NotificationsNoneIcon
                  sx={{ color: "#003C7A", mr: { xs: 0, md: 0, xl: 1 } }}
                />
              </Badge>
              <Typography
                variant="body1"
                sx={{
                  color: "#003C7A",
                  fontSize: "1.2rem",
                  display: { xs: "none", md: "none", xl: "block" },
                }}
              >
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
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                p: 2,
                borderRadius: 2,
                "&:hover": { backgroundColor: "#F5F5F5 " },
                maxWidth: "200px",
                minWidth: "50px",
              }}
            >
              <AccountCircleIcon
                sx={{ color: "#003C7A", mr: { xs: 0, md: 0, xl: 1 } }}
              />
              <Typography
                variant="body1"
                sx={{
                  color: "#003C7A",
                  fontSize: "1.2rem",
                  display: { xs: "none", md: "none", xl: "block" },
                }}
              >
                Account
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
                  mb: 1,
                },
              }}
            >
              <MenuItem onClick={handleCloseAcc}>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  My Account
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseAcc}>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Settings
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseAcc}>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Log out
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
