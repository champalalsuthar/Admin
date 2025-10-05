import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router";
import MobileNavigation from "./Navigation/MobileNavigation";
import DesktopNavigation from "./Navigation/DesktopNavigation";
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminHomePage from "./Admin/Pages/AdminHomePage";
import NotFoundPage from "./Admin/Pages/NotFoundPage";
import ProtectedRoute from "./PrivateRoute";
import AdminLogin from "./Admin/Pages/AdminLogin";
import { AuthProvider } from "./Context/AuthContext";
import AdminTable from "./Admin/Pages/Table/AdminTable";
import AddEditAdmins from "./Admin/Pages/AddEdit/AddEditAdmins";
import AddEditBlogPost from "./Admin/Pages/AddEdit/AddEditBlogPost";
import BlogPostTable from "./Admin/Pages/Table/BlogPostTable";
import ErrorBoundary from "./Admin/Pages/ErrorBoundary";

function App() {
  return (
    <AuthProvider>
      <ToastContainer
        toastClassName="toastContainerBox"
        transition={Flip}
        position="top-center"
      />
      <Router>
        <DesktopNavigation />
        <div className="margin">
          <Routes>
            <Route path="/" element={<Navigate to="/crm/login" />} />
            <Route path="/crm" element={<Navigate to="/crm/login" />} />
            <Route
              path="/crm/login"
              element={
                <ErrorBoundary>
                  <AdminLogin />
                </ErrorBoundary>
              }
            />

            <Route
              path="/crm/home"
              element={
                <ErrorBoundary>
                  <ProtectedRoute>
                    <AdminHomePage />
                  </ProtectedRoute>
                </ErrorBoundary>
              }
            />

            <Route
              path="/crm/home/admin/add"
              element={
                <ErrorBoundary>
                  <ProtectedRoute>
                    <AddEditAdmins />
                  </ProtectedRoute>
                </ErrorBoundary>
              }
            />
            <Route
              path="/crm/home/admin/table"
              element={
                <ErrorBoundary>
                  <ProtectedRoute>
                    <AdminTable />
                  </ProtectedRoute>
                </ErrorBoundary>
              }
            />
            <Route
              path="/crm/home/admin/:id"
              element={
                <ErrorBoundary>
                  <ProtectedRoute>
                    <AddEditAdmins />
                  </ProtectedRoute>
                </ErrorBoundary>
              }
            />

            <Route
              path="/crm/home/blogpost/add"
              element={
                <ErrorBoundary>
                  <ProtectedRoute>
                    <AddEditBlogPost />
                  </ProtectedRoute>
                </ErrorBoundary>
              }
            />
            <Route
              path="/crm/home/blogpost/table"
              element={
                <ErrorBoundary>
                  <ProtectedRoute>
                    <BlogPostTable />
                  </ProtectedRoute>
                 </ErrorBoundary>
              }
            />
            <Route
              path="/crm/home/blogpost/:id"
              element={
                <ErrorBoundary>
                  <ProtectedRoute>
                    <AddEditBlogPost />
                  </ProtectedRoute>
                </ErrorBoundary>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <MobileNavigation />
      </Router>
    </AuthProvider>
  );
}
export default App;
