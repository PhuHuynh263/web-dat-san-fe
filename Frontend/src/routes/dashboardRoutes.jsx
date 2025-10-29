import DashBoard from "../pages/Admin/DashBoard";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import PeopleIcon from "@mui/icons-material/People";


export const dashboardRoutes = [
  {
    path: "/owner", // Hoặc '/dashboard/overview'
    element: <DashBoard />,
    meta: {
      // index: true, // Đánh dấu đây là trang mặc định của dashboard
      title: "Tổng quan",
      icon: <SportsSoccerIcon />,
      roles: ["admin", "owner"], // Ai được phép truy cập
    },
  },
  {
    path: "/admin",
    element: <DashBoard />,
    meta: {
      title: "Quản lý người dùng",
      icon: <PeopleIcon />,
      roles: ["admin"], // Chỉ admin được truy cập
    },
  },
];
