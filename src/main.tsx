import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { Footer } from './components/Footer.js';
import Login from './components/Login.js';
import { Navbar } from './components/Navbar.js';
import Register from './components/Register.js';
import { AuthProvider } from './context/AuthContext.js';
import './i18n';
// import i18n
import { Home } from './pages/home/Home.js';
import JuryDashboard from './pages/jury/JuryDashboard.js';
import { FilmUpload } from './pages/submission/FilmUpload.js';
import './styles/index.css';
import './styles/index.css';
import { useAuth } from './hooks/useAuth.js';

const AppRoutes = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/submit" element={<FilmUpload />} />
      
      {/* PROTECTED ROUTES */}
      <Route 
        path="/jury" 
        element={isAuthenticated ? <JuryDashboard /> : <Navigate to="/login" />} 
      />
    </Routes>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <main className="min-h-screen min-w-80">
          <AppRoutes /> 
        </main>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
