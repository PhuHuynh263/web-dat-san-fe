import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { clientTheme } from "../../../clientTheme";
import Header from "../../../components/Client/Header/Header";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SendIcon from "@mui/icons-material/Send";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [openMessageModal, setOpenMessageModal] = useState(false);
  const [tempMessage, setTempMessage] = useState("");
  const [visibleItems, setVisibleItems] = useState([false, false]);

  useEffect(() => {
    const timings = [0, 500];
    const timers = timings.map((timing, index) =>
      setTimeout(() => {
        setVisibleItems((prev) => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      }, timing)
    );

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOpenMessageModal = () => {
    setTempMessage(formData.message);
    setOpenMessageModal(true);
  };

  const handleCloseMessageModal = () => {
    setOpenMessageModal(false);
    setTempMessage("");
  };

  const handleConfirmMessage = () => {
    setFormData({
      ...formData,
      message: tempMessage,
    });
    setOpenMessageModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement API call to send contact form
    toast.success(
      "Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể."
    );
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  const contactInfo = [
    {
      icon: <LocationOnIcon sx={{ fontSize: 40 }} />,
      title: "Địa chỉ",
      details: ["123 Đường ABC, Quận XYZ", "Thành phố Đà Nẵng, Việt Nam"],
    },
    {
      icon: <PhoneIcon sx={{ fontSize: 40 }} />,
      title: "Điện thoại",
      details: ["+84 123 456 789", "+84 987 654 321"],
    },
    {
      icon: <EmailIcon sx={{ fontSize: 40 }} />,
      title: "Email",
      details: ["support@hi5port.com", "info@hi5port.com"],
    },
  ];

  const STYLE_TEXTFIELD = {
    "& .MuiInputLabel-root": {
      color: "text.primary",
      fontWeight: 500,
    },

    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
      backgroundColor: "#fafafa",

      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#e0e0e0",
        borderWidth: "1.5px",
      },

      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "#df1b3f",
      },

      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#df1b3f",
        borderWidth: "2px",
      },
    },
  };

  return (
    <ThemeProvider theme={clientTheme}>
      <CssBaseline />
      <Header />

      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #df1b3f 0%, #c41535 100%)",
          color: "white",
          py: { xs: 8, md: 12 },
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: "2rem", md: "3.5rem" },
              letterSpacing: "-0.02em",
              opacity: visibleItems[0] ? 1 : 0,
              transform: visibleItems[0] ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            Liên Hệ Với Chúng Tôi
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 300,
              fontSize: { xs: "1rem", md: "1.25rem" },
              opacity: visibleItems[1] ? 0.95 : 0,
              transform: visibleItems[1] ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s",
            }}
          >
            Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn
          </Typography>
        </Container>
      </Box>

      {/* Contact Information Cards */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Box sx={{ maxWidth: "1200px", mx: "auto" }}>
          <Grid
            container
            spacing={4}
            sx={{
              mb: { xs: 8, md: 12 },
              justifyContent: "center",
              alignItems: "stretch", // Ensures all grid items stretch to the same height
            }}
          >
            {contactInfo.map((info, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    p: 4,
                    width: "300px", 
                    height: "300px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    borderRadius: "16px",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                    border: "1px solid rgba(223, 27, 63, 0.1)",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 12px 40px rgba(223, 27, 63, 0.15)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      mb: 2,
                      color: "#df1b3f",
                    }}
                  >
                    {info.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      mb: 2,
                      color: "text.primary",
                    }}
                  >
                    {info.title}
                  </Typography>
                  {info.details.map((detail, idx) => (
                    <Typography
                      key={idx}
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        lineHeight: 1.8,
                        mb: idx < info.details.length - 1 ? 1 : 0,
                      }}
                    >
                      {detail}
                    </Typography>
                  ))}
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Contact Form Section with Info */}
        <Box sx={{ maxWidth: "1100px", mx: "auto" }}>
          <Grid container spacing={4} sx={{ alignItems: "stretch" }}>
            {/* Left Side - Contact Info */}
            <Grid item xs={12} md={5}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  h: "100%",
                }}
              ></Box>
            </Grid>

            {/* Right Side - Contact Form */}
            <Grid item xs={12} md={7}>
              <Box
                sx={{
                  background:
                    "linear-gradient(135deg, rgba(223, 27, 63, 0.05) 0%, rgba(223, 27, 63, 0.02) 100%)",
                  borderRadius: "20px",
                  p: { xs: 3.5, md: 5 },
                  border: "1px solid rgba(223, 27, 63, 0.1)",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ textAlign: "center", mb: 3 }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      mb: 2,
                      color: "text.primary",
                    }}
                  >
                    Gửi tin nhắn cho chúng tôi
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "text.secondary",
                      fontSize: "1rem",
                      lineHeight: 1.6,
                    }}
                  >
                    Hãy để lại thông tin và chúng tôi sẽ phản hồi trong vòng 24
                    giờ
                  </Typography>
                </Box>

                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <Grid container spacing={5}>
                    <Grid item xs={12} sm={6} sx={{ display: "flex" }}>
                      <TextField
                        fullWidth
                        name="name"
                        label="Họ và tên"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        sx={{
                          ...STYLE_TEXTFIELD,
                          "& .MuiOutlinedInput-root": {
                            ...STYLE_TEXTFIELD["& .MuiOutlinedInput-root"],
                            minHeight: "56px",
                            fontSize: "1rem",
                          },
                          "& .MuiInputLabel-root": {
                            ...STYLE_TEXTFIELD["& .MuiInputLabel-root"],
                            fontSize: "1rem",
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ display: "flex" }}>
                      <TextField
                        fullWidth
                        name="email"
                        label="Email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        sx={{
                          ...STYLE_TEXTFIELD,
                          "& .MuiOutlinedInput-root": {
                            ...STYLE_TEXTFIELD["& .MuiOutlinedInput-root"],
                            minHeight: "56px",
                            fontSize: "1rem",
                          },
                          "& .MuiInputLabel-root": {
                            ...STYLE_TEXTFIELD["& .MuiInputLabel-root"],
                            fontSize: "1rem",
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        name="phone"
                        label="Số điện thoại"
                        value={formData.phone}
                        onChange={handleChange}
                        sx={{
                          ...STYLE_TEXTFIELD,
                          "& .MuiOutlinedInput-root": {
                            ...STYLE_TEXTFIELD["& .MuiOutlinedInput-root"],
                            minHeight: "56px",
                            fontSize: "1rem",
                          },
                          "& .MuiInputLabel-root": {
                            ...STYLE_TEXTFIELD["& .MuiInputLabel-root"],
                            fontSize: "1rem",
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        name="message"
                        label="Tin nhắn"
                        value={formData.message || "Nhấp để soạn tin nhắn..."}
                        onClick={handleOpenMessageModal}
                        readOnly
                        required
                        sx={{
                          ...STYLE_TEXTFIELD,
                          "& .MuiOutlinedInput-root": {
                            ...STYLE_TEXTFIELD["& .MuiOutlinedInput-root"],
                            minHeight: "56px",
                            fontSize: "1rem",
                            cursor: "pointer",
                          },
                          "& .MuiInputLabel-root": {
                            ...STYLE_TEXTFIELD["& .MuiInputLabel-root"],
                            fontSize: "1rem",
                          },
                        }}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        pt: 2,
                        width: "100%",
                      }}
                    >
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        endIcon={<SendIcon />}
                        sx={{
                          px: 7,
                          py: 1.5,
                          fontSize: "1rem",
                          fontWeight: 600,
                          borderRadius: "10px",
                          minWidth: "200px",
                          background:
                            "linear-gradient(135deg, #df1b3f 0%, #c41535 100%)",
                          boxShadow: "0 4px 15px rgba(223, 27, 63, 0.3)",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            boxShadow: "0 6px 25px rgba(223, 27, 63, 0.4)",
                            transform: "translateY(-2px)",
                          },
                        }}
                      >
                        Gửi tin nhắn
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Additional Info Section */}
        <Box sx={{ mt: { xs: 10, md: 14 }, textAlign: "center" }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              mb: 2,
              color: "text.primary",
            }}
          >
            Có câu hỏi nhanh?
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              fontSize: "1.05rem",
            }}
          >
            Hãy liên hệ trực tiếp với chúng tôi qua{" "}
            <Typography
              component="span"
              sx={{
                color: "#df1b3f",
                fontWeight: 600,
              }}
            >
              điện thoại hoặc email
            </Typography>
            . Chúng tôi sẵn sàng hỗ trợ bạn bất kỳ lúc nào!
          </Typography>
        </Box>
      </Container>

      {/* Message Modal Dialog */}
      <Dialog
        open={openMessageModal}
        onClose={handleCloseMessageModal}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "16px",
            background:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(250, 250, 250, 0.95) 100%)",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 700,
            fontSize: "1.5rem",
            color: "text.primary",
            textAlign: "center",
            pb: 1,
            borderBottom: "2px solid rgba(223, 27, 63, 0.1)",
          }}
        >
          Soạn tin nhắn của bạn
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <TextField
            autoFocus
            fullWidth
            multiline
            rows={8}
            name="tempMessage"
            placeholder="Hãy cho chúng tôi biết bạn cần gì..."
            value={tempMessage}
            onChange={(e) => setTempMessage(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                backgroundColor: "#fafafa",
                border: "1px solid #e0e0e0",
                fontSize: "1rem",
                transition: "all 0.3s ease",
                "&:hover": {
                  borderColor: "#df1b3f",
                  backgroundColor: "#fff",
                },
                "&.Mui-focused": {
                  borderColor: "#df1b3f",
                  backgroundColor: "#fff",
                  boxShadow: "0 0 0 3px rgba(223, 27, 63, 0.1)",
                },
              },
              "& .MuiOutlinedInput-input": {
                fontFamily: "inherit",
                lineHeight: 1.6,
              },
            }}
          />
        </DialogContent>
        <DialogActions
          sx={{
            pt: 2,
            pb: 2,
            px: 3,
            gap: 2,
            justifyContent: "center",
          }}
        >
          <Button
            onClick={handleCloseMessageModal}
            variant="outlined"
            sx={{
              borderColor: "#df1b3f",
              color: "#df1b3f",
              fontSize: "1rem",
              fontWeight: 600,
              px: 4,
              py: 1,
              borderRadius: "10px",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "rgba(223, 27, 63, 0.05)",
                borderColor: "#df1b3f",
              },
            }}
          >
            Hủy
          </Button>
          <Button
            onClick={handleConfirmMessage}
            variant="contained"
            sx={{
              background: "linear-gradient(135deg, #df1b3f 0%, #c41535 100%)",
              color: "white",
              fontSize: "1rem",
              fontWeight: 600,
              px: 4,
              py: 1,
              borderRadius: "10px",
              boxShadow: "0 4px 15px rgba(223, 27, 63, 0.3)",
              transition: "all 0.3s ease",
              "&:hover": {
                boxShadow: "0 6px 25px rgba(223, 27, 63, 0.4)",
                transform: "translateY(-2px)",
              },
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default ContactPage;