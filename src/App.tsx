import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import HomePage from './pages/HomePage/HomePage';
import StudentAuth from './pages/Auth/StudentAuth';
import TeacherAuth from './pages/Auth/TeacherAuth';
import Footer from './components/Footer/Footer';
import { AuthProvider } from './hooks/useAuth';
import Header from './components/Header/Header';
import StudentDashboard from './components/Dashboard/StudentDashboard';
import TeacherDashboard from './components/Dashboard/TeacherDashboard';
import ParentDashboard from './components/Dashboard/ParentDashboard';
import SuperAdminDashboard from './components/Dashboard/SuperAdminDashboard';
import ParentAuth from './pages/Auth/ParentAuth';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import TestEngine from './components/Test/TestEngine';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4F46E5',
      light: '#818CF8',
      dark: '#3730A3',
    },
    secondary: {
      main: '#7C3AED',
      light: '#A78BFA',
      dark: '#5B21B6',
    },
    background: {
      default: '#F8F9FC',
    },
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
    h1: { fontWeight: 800, letterSpacing: '-0.025em' },
    h2: { fontWeight: 700, letterSpacing: '-0.025em' },
    h3: { fontWeight: 700, letterSpacing: '-0.02em' },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 2px 10px -4px rgba(0,0,0,0.05)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 12,
        },
      },
    },
  },
});

/** Public layout: Header + content + Footer */
const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <Header />
    <Box component="main" sx={{ flex: 1 }}>
      {children}
    </Box>
    <Footer />
  </Box>
);

const App: React.FC = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <Routes>
            {/* Public routes with Header/Footer */}
            <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
            <Route path="/student/login" element={<PublicLayout><StudentAuth /></PublicLayout>} />
            <Route path="/teacher/login" element={<PublicLayout><TeacherAuth /></PublicLayout>} />
            <Route path="/parent/login" element={<PublicLayout><ParentAuth /></PublicLayout>} />

            {/* Dashboard routes WITHOUT Header/Footer (they have their own DashboardLayout) */}
            <Route
              path="/student/dashboard"
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/tests/:testId/take"
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <TestEngine />
                </ProtectedRoute>
              }
            />
            <Route
              path="/teacher/dashboard"
              element={
                <ProtectedRoute allowedRoles={['teacher']}>
                  <TeacherDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/parent/dashboard"
              element={
                <ProtectedRoute allowedRoles={['parent']}>
                  <ParentDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <SuperAdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
