import { createBrowserRouter } from "react-router-dom";
import Login from "../features/auth/pages/Login.jsx";
import Register from "../features/auth/pages/Register.jsx";
import { ProtectedRoute } from "./ProtectedRoute.jsx";
import { PublicRoute } from "./PublicRoute.jsx";
import App from "../app/App.jsx";
import ManagerDashboard from "../features/managers/pages/ManagerDashBoard.jsx"
import EmployeeDashboard from "../features/employee/pages/EmployeeDashboard.jsx"
import AdminDashboard from "../features/admin/pages/AdminDashboard.jsx"
import DashboardLayout from "../features/auth/pages/DashboardLayout.jsx";
import ManagerAttendanceLogs from "../features/managers/components/ManagerAttendanceLogs.jsx";
import ManagerOvertimeRequests from "../features/managers/components/ManagerOvertimeRequests.jsx";
import DailyReportGenerator from "../features/admin/pages/DailyReportGenerator.jsx";
import AdminAttendanceLogs from "../features/admin/pages/AdminAttendanceLogs.jsx"
import UserDirectory from "../features/admin/components/UserDirectory.jsx";
import ErrorRoute from "./ErrorRoute.jsx";

export const router = createBrowserRouter([{
    element: <App />,
    children: [{
        element: <PublicRoute />,
        children: [
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            }
        ]
    }, {
        element: <ProtectedRoute />,
        children: [
            {
                path: "/",
                element: <DashboardLayout />,
                children: [
                    {
                        path: "employee",
                        element: <EmployeeDashboard />
                    },
                    {
                        path: "manager",
                        element: <ManagerDashboard />,
                        children: [
                            {
                                path: "attendance",
                                element: <ManagerAttendanceLogs />
                            },
                            {
                                path: "overtime",
                                element: <ManagerOvertimeRequests />
                            }
                        ]
                    },
                    {
                        path: "admin",
                        element: <AdminDashboard />,
                        children: [
                            {
                                path: "dir",
                                element: <UserDirectory />
                            },
                            {
                                path: "reports",
                                element: <DailyReportGenerator />
                            },
                            {
                                path: "attendance",
                                element: <AdminAttendanceLogs />
                            }
                        ]
                    }
                ]
            },

        ]
    }
    ]
}, {
    path: "*",
    element: <ErrorRoute />
}]);

