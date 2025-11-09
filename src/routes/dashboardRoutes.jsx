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

// --- Import Page Components ---
// Giả sử bạn đã tạo các component trang con này
import OverviewPage from "../pages/Admin/OverviewPage/OverviewPage";
import PitchManagementPage from "../pages/Admin/PitchManagementPage/PitchManagementPage";
import BookingManagementPage from "../pages/Admin/BookingManagementPage/BookingManagementPage";
import OwnerManagementPage from "../pages/Admin/OwnerManagementPage/OwnerManagementPage";
import CustomerManagementPage from "../pages/Admin/CustomerManagementPage/CustomerManagementPage";
import RevenueReportPage from "../pages/Admin/RevenueReportPage/RevenueReportPage";
import UserReportPage from "../pages/Admin/UserReportPage/UserReportPage";
import SettingsPage from "../pages/Admin/SettingsPage/SettingsPage";
import AssessmentManagement from "../pages/Admin/AssessmentManagementPage/AssessmentManagementPage";
export const dashboardAdminRoutes = [
  {
    path: "/admin/dashboard",
    element: <OverviewPage />,
    meta: {
      title: "TỔNG QUAN",
      icon: <DashboardIcon />,
      roles: ["admin"],
    },
  },
  {
    path: "/admin/pitches",
    element: <PitchManagementPage />,
    meta: {
      title: "QUẢN LÝ SÂN BÓNG",
      icon: <SportsSoccerIcon />,
      roles: ["admin"],
    },
  },
  {
    path: "/admin/bookings",
    element: <BookingManagementPage />,
    meta: {
      title: "QUẢN LÝ ĐƠN ĐẶT",
      icon: <ReceiptLongIcon />,
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
    path: "/admin/owners",
    element: <OwnerManagementPage />,
    meta: {
      title: "QUẢN LÝ CHỦ SÂN",
      icon: <SupervisorAccountIcon />,
      roles: ["admin"],
    },
  },
  {
    path: "/admin/customers",
    element: <CustomerManagementPage />,
    meta: {
      title: "QUẢN LÝ KHÁCH HÀNG",
      icon: <PeopleOutlineIcon />,
      roles: ["admin"],
    },
  },
  {
    path: "/admin/reports/revenue",
    element: <RevenueReportPage />,
    meta: {
      title: "BÁO CÁO DOANH THU",
      icon: <BarChartIcon />,
      roles: ["admin"],
    },
  },
  {
    path: "/admin/reports/users",
    element: <UserReportPage />,
    meta: {
      title: "BÁO CÁO NGƯỜI DÙNG",
      icon: <QueryStatsIcon />,
      roles: ["admin"],
    },
  },
  {
    path: "/admin/settings",
    element: <SettingsPage />,
    meta: {
      title: "CÀI ĐẶT",
      icon: <SettingsIcon />,
      roles: ["admin"],
    },
  },
];
