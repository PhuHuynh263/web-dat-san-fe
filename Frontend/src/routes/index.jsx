import { createBrowserRouter } from "react-router-dom";

// Import Layouts

// Import Pages
import HomePage from "../pages/Client/HomePage/HomePage";
import DashBoard from "../pages/Dashboard/DashBoard";

// Import Dashboard Routes
import { dashboardRoutes } from "./dashboardRoutes";

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
    children: dashboardRoutes.map((route) => ({
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
