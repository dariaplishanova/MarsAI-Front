import { Navigate, Route, Routes } from 'react-router';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import LoginPage from './pages/auth/LoginPage';
import JuryDashboard from './pages/jury/JuryDashboard';
import { FilmUpload } from './pages/submission/FilmUpload';
import { Home } from './pages/home/Home';

export default function App() {
  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />

          <Route path="/submit" element={<FilmUpload />} />

          <Route
            path="/admin/*"
            element={
              <PrivateRoute role="admin">
                <AdminDashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/jury/*"
            element={
              <PrivateRoute role="jury">
                <JuryDashboard />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
