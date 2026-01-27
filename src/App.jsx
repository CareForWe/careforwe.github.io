import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Home from "./components/home/home";
import Learn from "./components/learn/learn";
import Contact from "./components/contact/CONTACT.JSX";
import SignIn from "./components/signin/signin";
import Videos from "./components/videos/videos";
import AuthCallback from "./components/auth/AuthCallback";
import TestConnection from "./components/testConn";
import { useAuth } from "./components/context/authContext";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="loading-container">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

// Public Route Component (redirects if already signed in)
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="loading-container">Loading...</div>;
  }

  if (user) {
    return <Navigate to="/videos" replace />;
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
            path="/auth/callback"
            element={<AuthCallback />}
          />
        </Routes>
      </div>
    </div>
  )
}

export default App
