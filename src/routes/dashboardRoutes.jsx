// src/routes/dashboardRoutes.js

import React from "react";

// --- Import Icons ---
import DashboardIcon from "@mui/icons-material/Dashboard";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import BarChartIcon from "@mui/icons-material/BarChart";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import SettingsIcon from "@mui/icons-material/Settings";
import CommentIcon from "@mui/icons-material/Comment";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PersonIcon from "@mui/icons-material/Person";
import PaymentIcon from "@mui/icons-material/Payment";
import StyleIcon from "@mui/icons-material/Style";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import GrassIcon from "@mui/icons-material/Grass";
import StadiumIcon from "@mui/icons-material/Stadium";

// --- Import Admin Page Components ---
import OverviewAdminPage from "../pages/Admin/OverViewAdminPage/OverviewAdminPage";
// import PitchManagementPage from "../pages/Admin/PitchManagementPage/PitchManagementPage";
// import BookingManagementPage from "../pages/Admin/TotalYardManagementPage/BookingManagementPage";
import AssessmentManagement from "../pages/Admin/AssessmentManagementPage/AssessmentManagementPage";
import OwnerManagementPage from "../pages/Admin/OwnerManagementPage/OwnerManagementPage";
import CustomerManagementPage from "../pages/Admin/CustomerManagementPage/CustomerManagementPage";
import RevenueReportAdminPage from "../pages/Admin/RevenueReportAdminPage/RevenueReportAdminPage";
import UserReportPage from "../pages/Admin/UserReportPage/UserReportPage";
import SettingsAdminPage from "../pages/Admin/SettingsAdminPage/SettingsAdminPage"; // Giả sử đây là trang cài đặt chung

// --- Import Owner Page Components ---
import ManageBookingSchedulePage from "../pages/Owner/ManageBookingSchedulePage/ManageBookingSchedulePage";
import ManageOrdersPage from "../pages/Owner/ManageOrdersPage/ManageOrdersPage";
import OverviewOwnerPage from "../pages/Owner/OverViewOwnerPage/OverviewOwnerPage";
import RevenueReportOwnerPage from "../pages/Owner/RevenueReportOwnerPage/RevenueReportOwnerPage";
import ServicePaymentPage from "../pages/Owner/ServicePaymentPage/ServicePaymentPage";
import SoccerFieldManagementPage from "../pages/Owner/SoccerFieldManagementPage/SoccerFieldManagementPage";
import YardTypeManagementPage from "../pages/Admin/YardTypeManagementPage/YardTypeManagementPage";
import SettingsOwnerPage from "../pages/Owner/SettingsOwnerPage/SettingsOwnerPage";
// === Đổi tên thành dashboardRoutes (chứa tất cả route) ===
export const dashboardRoutes = [
  // =========== CÁC ROUTE CỦA ADMIN ============
  {
    path: "/admin/dashboard", // Đổi từ /dashboard để rõ ràng
    element: <OverviewAdminPage />,
    meta: {
      title: "TỔNG QUAN",
      icon: <DashboardIcon />,
      roles: ["admin"],
    },
  },
  {
    path: "/admin/yard-types",
    element: <YardTypeManagementPage />,
    meta: {
      title: "QUẢN LÝ LOẠI SÂN",
      icon: <StyleIcon />,
      roles: ["admin"],
    },
  },
  {
    path: "/admin/assessment",
    element: <AssessmentManagement />,
    meta: {
      title: "QUẢN LÝ ĐÁNH GIÁ",
      icon: <CommentIcon />,
      roles: ["admin"],
    },
  },
  {
    // Mục cha cho Quản lý Người dùng (Admin)
    meta: {
      title: "QUẢN LÝ NGƯỜI DÙNG",
      icon: <PersonIcon />,
      roles: ["admin"],
    },
    children: [
      {
        path: "/admin/owners",
        element: <OwnerManagementPage />,
        meta: {
          title: "Quản lý chủ sân",
          icon: <SupervisorAccountIcon />,
          roles: ["admin"],
        },
      },
      {
        path: "/admin/customers",
        element: <CustomerManagementPage />,
        meta: {
          title: "Quản lý khách hàng",
          icon: <PeopleOutlineIcon />,
          roles: ["admin"],
        },
      },
    ],
  },

  {
    // Mục cha cho Báo cáo (Admin)
    meta: {
      title: "BÁO CÁO & THỐNG KÊ",
      icon: <AssessmentIcon />,
      roles: ["admin"],
    },
    children: [
      {
        path: "/admin/reports/revenue",
        element: <RevenueReportAdminPage />,
        meta: {
          title: "Báo cáo Doanh thu",
          icon: <BarChartIcon />,
          roles: ["admin"],
        },
      },
      {
        path: "/admin/reports/users",
        element: <UserReportPage />,
        meta: {
          title: "Báo cáo Người dùng",
          icon: <QueryStatsIcon />,
          roles: ["admin"],
        },
      },
    ],
  },
  {
    path: "/admin/settings", // Route cài đặt chung
    element: <SettingsAdminPage />,
    meta: {
      title: "CÀI ĐẶT",
      icon: <SettingsIcon />,
      roles: ["admin"], // Cả hai đều có thể truy cập
    },
  },

  // =========== CÁC ROUTE CỦA OWNER ============
  {
    path: "/owner/dashboard", // Route tổng quan riêng cho Owner
    element: <OverviewOwnerPage />,
    meta: {
      title: "Tổng quan",
      icon: <DashboardIcon />,
      roles: ["owner"],
    },
  },
  {
    path: "/owner/pitches",
    element: <SoccerFieldManagementPage />,
    meta: {
      title: "Quản lý sân của tôi",
      icon: <SportsSoccerIcon />,
      roles: ["owner"],
    },
  },
  {
    path: "/owner/schedule",
    element: <ManageBookingSchedulePage />,
    meta: {
      title: "Quản lý lịch đặt",
      icon: <EventAvailableIcon />,
      roles: ["owner"],
    },
  },
  {
    path: "/owner/bookings",
    element: <ManageOrdersPage />,
    meta: {
      title: "Quản lý đơn đặt",
      icon: <ReceiptLongIcon />,
      roles: ["owner"],
    },
  },
  {
    path: "/owner/reports/revenue",
    element: <RevenueReportOwnerPage />,
    meta: {
      title: "Báo cáo doanh thu",
      icon: <BarChartIcon />,
      roles: ["owner"],
    },
  },
  {
    path: "/owner/payment",
    element: <ServicePaymentPage />,
    meta: {
      title: "Thanh toán dịch vụ",
      icon: <PaymentIcon />,
      roles: ["owner"],
    },
  },
  {
    path: "/owner/settings", // Route cài đặt chung
    element: <SettingsOwnerPage />,
    meta: {
      title: "CÀI ĐẶT",
      icon: <SettingsIcon />,
      roles: ["owner"], // Cả hai đều có thể truy cập
    },
  },

  // =========== CÁC ROUTE DÙNG CHUNG ============
];
