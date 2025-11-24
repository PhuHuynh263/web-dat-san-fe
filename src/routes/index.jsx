import { createBrowserRouter } from "react-router-dom";
import React, { Suspense } from "react";

// Import Layouts
import DashBoard from "../layouts/Admin/DashBoard.jsx";
import HomePage from "../pages/Client/HomePage/index.jsx";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage.jsx";

// Import Dashboard Routes
import { dashboardRoutes } from "./dashboardRoutes.jsx";

// Import các trang khác
import LoginPage from "../pages/Client/LoginPage/LoginPage.jsx";
import SignUpPage from "../pages/Client/SignUpPage/SignUpPage.jsx";
import AboutPage from "../pages/Client/AboutPage/AboutPage.jsx";
import ContactPage from "../pages/Client/ContactPage/ContactPage.jsx";
import BookingPage from "../pages/Client/BookingPage/BookingPage.jsx";
import NewsPage from "../pages/Client/NewsPage/NewsPage.jsx";
import LoginAdminPage from "../pages/Admin/LoginAdminPage/LoginAdminPage.jsx";
import LoginOwnerPage from "../pages/Owner/LoginOwnerPage/LoginOwnerPage.jsx";
import SignUpOwnerPage from "../pages/Owner/SignUpOwnerPage/SignUpOwnerPage.jsx";
import SelectedYard from "../pages/Client/SelectedYard/SelectedYard.jsx";

// 1. IMPORT COMPONENT LOADING MỚI
import PageLoading from "../components/common/Loading/PageLoading.jsx";
// --- HÀM MỚI ĐỂ "LÀM PHẲNG" ROUTE ---
function flattenRoutes(routes) {
  let flatRoutes = [];

  routes.forEach((route) => {
    if (route.children) {
      flatRoutes = [...flatRoutes, ...flattenRoutes(route.children)];
    } else {
      flatRoutes.push({
        path: route.path,
        element: route.element,
        meta: route.meta,
      });
    }
  });
  return flatRoutes;
}

// 2. HÀM TIỆN ÍCH ĐỂ BỌC SUSPENSE (Code gọn hơn)
const withLoading = (Component) => (
  <Suspense fallback={<PageLoading message="Đang tải trang..." />}>
    {Component}
  </Suspense>
);

const router = createBrowserRouter([


  // --- Nhóm Route cho Client ---
  {
    path: "/homepage",
    element: <HomePage />,
  },

  // --- Nhóm Route cho Dashboard ---
  {
    element: <DashBoard />,
    children: flattenRoutes(dashboardRoutes).map((route) => ({
      path: route.path,
      // 3. Sử dụng hàm withLoading ở đây
      element: withLoading(route.element),
    })),
  },

  // --- Route cho trang 404 Not Found ---
  {
    path: "*",
    element: <NotFoundPage />,
  },

  // --- Các Route Khác ---
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
  {
    path: "/selectedYard",
    element: <SelectedYard />,
  },
]);

export default router;
