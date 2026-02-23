import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Home from "./components/home/home";
import Learn from "./components/learn/learn";
import Contact from "./components/contact/CONTACT.JSX";
import SignIn from "./components/signin/signin";
import Videos from "./components/videos/videos";
import Admin from "./components/admin/Admin";
import AuthCallback from "./components/auth/AuthCallback";
import TestConnection from "./components/testConn";
import { useAuth } from "./components/context/authContext";
import LoadingPage from "./components/util/LoadingPage";

// Protected Route Component — requires authentication
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingPage />;
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

// Admin Route Component — requires ADMIN role; non-admins go to /videos
const AdminRoute = ({ children }) => {
  const { user, role, loading } = useAuth();

  if (loading) {
    return <LoadingPage />;
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  if (role !== 'ADMIN') {
    return <Navigate to="/videos" replace />;
  }

  return children;
};

// Public Route Component (redirects if already signed in)
const PublicRoute = ({ children }) => {
  const { user, role, loading } = useAuth();

  if (loading) {
    return <LoadingPage />;
  }

  if (user) {
    return <Navigate to={role === 'ADMIN' ? '/admin' : '/videos'} replace />;
  }

  return children;
};

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className='Appcontainer'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/signin"
            element={
              <PublicRoute>
                <SignIn />
              </PublicRoute>
            }
          />
          <Route
            path="/videos"
            element={
              <ProtectedRoute>
                <Videos />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            }
          />
          <Route
            path="/auth/callback"
            element={<AuthCallback />}
          />
        </Routes>
      </div>
    </div>
  )
}

export default App
