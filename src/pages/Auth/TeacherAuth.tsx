import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Tab,
  Tabs,
  CircularProgress,
  Alert,
  InputAdornment,
  IconButton,
  Link,
  useTheme,
} from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock, Person, Phone, School } from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';
import OtpVerification from '../../components/Auth/OtpVerification';
import AuthLayout from '../../components/Auth/AuthLayout';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`auth-tabpanel-${index}`}
      aria-labelledby={`auth-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3, animation: 'fadeIn 0.5s ease-in-out' }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const TeacherAuth: React.FC = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const { login, register, loading, error, successMessage, otpSent, clearMessages } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  // Login State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register State
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [specialization, setSpecialization] = useState('');

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    clearMessages();
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(loginEmail, loginPassword);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    await register({
      name: registerName,
      email: registerEmail,
      phone: registerPhone,
      password: registerPassword,
    });
  };

  if (otpSent) {
    return (
      <AuthLayout
        title="Verify OTP"
        subtitle="Enter the code sent to your email"
        image="/images/teacher-auth-bg.jpg"
      >
        <OtpVerification />
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title={tabValue === 0 ? "Teacher Portal" : "Join the Faculty"}
      subtitle={tabValue === 0 ? "Login to manage your classes and students." : "Register to start teaching at R-education."}
      image="/images/teacher-auth-bg.jpg"
    >
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          indicatorColor="secondary"
          textColor="secondary"
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '1rem',
            },
          }}
        >
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>
      </Box>

      {/* Login Panel */}
      <TabPanel value={tabValue} index={0}>
        {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}
        {successMessage && <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>{successMessage}</Alert>}

        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            margin="normal"
            required
            variant="outlined"
            color="secondary"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email color="action" />
                </InputAdornment>
              ),
              sx: { borderRadius: 3 }
            }}
          />
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            margin="normal"
            required
            variant="outlined"
            color="secondary"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
              sx: { borderRadius: 3 }
            }}
          />

          <Box sx={{ textAlign: 'right', mt: 1, mb: 2 }}>
            <Link href="#" variant="body2" underline="hover" color="secondary">
              Forgot Password?
            </Link>
          </Box>

          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            disabled={loading}
            color="secondary"
            sx={{
              mt: 2,
              py: 1.5,
              borderRadius: 3,
              fontWeight: 'bold',
              textTransform: 'none',
              fontSize: '1.1rem',
              boxShadow: theme.shadows[4],
              background: `linear-gradient(45deg, ${theme.palette.secondary.main} 30%, ${theme.palette.secondary.light} 90%)`,
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
          </Button>
        </form>
      </TabPanel>

      {/* Register Panel */}
      <TabPanel value={tabValue} index={1}>
        {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}
        {successMessage && <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>{successMessage}</Alert>}

        <form onSubmit={handleRegister}>
          <TextField
            fullWidth
            label="Full Name"
            value={registerName}
            onChange={(e) => setRegisterName(e.target.value)}
            margin="normal"
            required
            variant="outlined"
            color="secondary"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person color="action" />
                </InputAdornment>
              ),
              sx: { borderRadius: 3 }
            }}
          />
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            value={registerEmail}
            onChange={(e) => setRegisterEmail(e.target.value)}
            margin="normal"
            required
            variant="outlined"
            color="secondary"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email color="action" />
                </InputAdornment>
              ),
              sx: { borderRadius: 3 }
            }}
          />
          <TextField
            fullWidth
            label="Phone Number"
            value={registerPhone}
            onChange={(e) => setRegisterPhone(e.target.value)}
            margin="normal"
            required
            variant="outlined"
            color="secondary"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Phone color="action" />
                </InputAdornment>
              ),
              sx: { borderRadius: 3 }
            }}
          />
          <TextField
            fullWidth
            label="Specialization (Subject)"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            margin="normal"
            variant="outlined"
            color="secondary"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <School color="action" />
                </InputAdornment>
              ),
              sx: { borderRadius: 3 }
            }}
          />
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
            margin="normal"
            required
            variant="outlined"
            color="secondary"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
              sx: { borderRadius: 3 }
            }}
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            disabled={loading}
            color="secondary"
            sx={{
              mt: 3,
              py: 1.5,
              borderRadius: 3,
              fontWeight: 'bold',
              textTransform: 'none',
              fontSize: '1.1rem',
              boxShadow: theme.shadows[4],
              background: `linear-gradient(45deg, ${theme.palette.secondary.main} 30%, ${theme.palette.secondary.light} 90%)`,
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
          </Button>
        </form>
      </TabPanel>
    </AuthLayout>
  );
};

export default TeacherAuth;
