import { createBrowserRouter } from "react-router-dom";

// Import Layouts

// Import Pages
import HomePage from "../pages/Client/HomePage/index.jsx";
import DashBoard from "../layouts/Admin/DashBoard.jsx";

// Import Dashboard Routes
import { dashboardAdminRoutes } from "./dashboardRoutes.jsx";

const router = createBrowserRouter([
  // --- Nhóm Route cho Client ---
  {
    path: "/",
    element: <HomePage />,
    children: [
      {
        index: true, // Trang chủ
        element: <HomePage />,
      },
      // ...các trang client khác
    ],
  },

  // --- Nhóm Route cho Dashboard ---
  {
    element: <DashBoard />,
    // Optional: Thêm 1 element ErrorBoundary ở đây để bắt lỗi cho cả dashboard
    children: dashboardAdminRoutes.map((route) => ({
      path: route.path,
      element: route.element,
      // Để đơn giản, ta chỉ cần path và element ở đây
      // Vì các thông tin meta đã được dùng trong DashboardLayout
    })),
  },

  // --- Route cho trang 404 Not Found ---
  {
    path: "*",
    element: <div>404 - Page Not Found</div>,
  },
]);

export default router;
