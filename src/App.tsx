import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';

// Phase 1 - Informational Pages
import AboutUs from './pages/AboutUs/AboutUs';
import Faculties from './pages/Faculties/Faculties';
import Students from './pages/Students/Students';
import Timetable from './pages/Timetable/Timetable';
import TestSchedule from './pages/TestSchedule/TestSchedule';
import ParentMeeting from './pages/ParentMeeting/ParentMeeting';
import Activities from './pages/Activities/Activities';
import Contact from './pages/Contact/Contact';
import HomePage from './pages/HomePage/HomePage';

// Layout
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

// Phase 2 - Auth
import { AuthProvider } from './hooks/useAuth';
import StudentAuth from './pages/Auth/StudentAuth';
import TeacherAuth from './pages/Auth/TeacherAuth';
import ParentAuth from './pages/Auth/ParentAuth';
import { ProtectedRoute } from './components/common/ProtectedRoute';

// Phase 2 - Dashboards
import StudentDashboard from './components/Dashboard/StudentDashboard';
import TeacherDashboard from './components/Dashboard/TeacherDashboard';
import ParentDashboard from './components/Dashboard/ParentDashboard';
import SuperAdminDashboard from './components/Dashboard/SuperAdminDashboard';
import TestEngine from './components/Test/TestEngine';

const theme = createTheme({
  // ... (previous theme code remains same)
});

/** Public layout: Header + content + Footer */
const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'white' }}>
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
            {/* Phase 1 - Informational Routes */}
            <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
            <Route path="/about" element={<PublicLayout><AboutUs /></PublicLayout>} />
            <Route path="/faculties" element={<PublicLayout><Faculties /></PublicLayout>} />
            <Route path="/students" element={<PublicLayout><Students /></PublicLayout>} />
            <Route path="/timetable" element={<PublicLayout><Timetable /></PublicLayout>} />
            <Route path="/test-schedule" element={<PublicLayout><TestSchedule /></PublicLayout>} />
            <Route path="/parents-meeting" element={<PublicLayout><ParentMeeting /></PublicLayout>} />
            <Route path="/activities" element={<PublicLayout><Activities /></PublicLayout>} />
            <Route path="/testimonials" element={<PublicLayout><HomePage /></PublicLayout>} />
            <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />

            {/* Phase 2 - Auth Pages */}
            <Route path="/student/login" element={<PublicLayout><StudentAuth /></PublicLayout>} />
            <Route path="/teacher/login" element={<PublicLayout><TeacherAuth /></PublicLayout>} />
            <Route path="/parent/login" element={<PublicLayout><ParentAuth /></PublicLayout>} />

            {/* Phase 2 - Protected Dashboards */}
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

            {/* Fallback */}
            <Route path="*" element={<PublicLayout><HomePage /></PublicLayout>} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
