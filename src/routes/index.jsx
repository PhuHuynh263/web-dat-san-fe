import { createBrowserRouter } from "react-router-dom";
import React, { Suspense } from "react"; // Import Suspense
import { Box, CircularProgress, Toolbar } from "@mui/material"; // Import components

// Import Layouts
import DashBoard from "../layouts/Admin/DashBoard.jsx";
import HomePage from "../pages/Client/HomePage/index.jsx";

// Import Dashboard Routes
import { dashboardRoutes } from "./dashboardRoutes.jsx";
import LoginPage from "../pages/Client/LoginPage/LoginPage.jsx";
import SignUpPage from "../pages/Client/SignUpPage/SignUpPage.jsx";
import AboutPage from "../pages/Client/AboutPage/AboutPage.jsx";
import ContactPage from "../pages/Client/ContactPage/ContactPage.jsx";
import BookingPage from "../pages/Client/BookingPage/BookingPage.jsx";
import NewsPage from "../pages/Client/NewsPage/NewsPage.jsx";
import LoginAdminPage from "../pages/Admin/LoginAdminPage/LoginAdminPage.jsx";
import LoginOwnerPage from "../pages/Owner/LoginOwnerPage/LoginOwnerPage.jsx";
import SignUpOwnerPage from "../pages/Owner/SignUpOwnerPage/SignUpOwnerPage.jsx";

// --- HÀM MỚI ĐỂ "LÀM PHẲNG" ROUTE ---
function flattenRoutes(routes) {
  let flatRoutes = [];

  routes.forEach((route) => {
    if (route.children) {
      // Nếu là mục cha (có children),
      // đệ quy để lấy các route con của nó
      flatRoutes = [...flatRoutes, ...flattenRoutes(route.children)];
    } else {
      // Nếu là route thông thường, thêm vào danh sách
      flatRoutes.push({
        path: route.path,
        element: route.element,
        meta: route.meta, // Giữ lại meta để dùng sau này
      });
    }
  });
  return flatRoutes;
}
// ------------------------------------

const router = createBrowserRouter([
  // --- Nhóm Route cho Client ---
  {
    path: "/",
    element: <HomePage />,
    // ... (children của client)
  },

  // --- Nhóm Route cho Dashboard ---
  {
    element: <DashBoard />, // Dùng DashBoard làm layout chung
    children: flattenRoutes(dashboardRoutes).map((route) => ({
      path: route.path,
      // Bọc element bằng Suspense để hỗ trợ React.lazy
      element: (
        <Suspense
          fallback={
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <CircularProgress />
            </Box>
          }
        >
          {route.element}
        </Suspense>
      ),
    })),
  },

  // --- Route cho trang 404 Not Found ---
  {
    path: "*",
    element: <div>404 - Page Not Found</div>,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/contact",
    element: <ContactPage />,
  },
  {
    path: "/booking",
    element: <BookingPage />,
  },
  {
    path: "/news",
    element: <NewsPage />,
  },
  {
    path: "/admin/login",
    element: <LoginAdminPage />,
  },
  {
    path: "/owner/login",
    element: <LoginOwnerPage />,
  },
  {
    path: "/owner/signup",
    element: <SignUpOwnerPage />,
  },
]);

export default router;
