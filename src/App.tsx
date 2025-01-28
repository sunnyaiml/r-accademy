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

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#dc004e',
      light: '#ff4081',
      dark: '#c51162',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

const App: React.FC = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <Box component="main" sx={{ flex: 1, mt: 8, p: 3 }}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/student/login" element={<StudentAuth />} />
                <Route path="/teacher/login" element={<TeacherAuth />} />
                <Route path="/student/dashboard" element={<StudentDashboard />} />
                <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
              </Routes>
            </Box>
            <Footer />
          </Box>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
