import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
} from '@mui/material';
import { useAuth } from '../../hooks/useAuth';

const OtpVerification: React.FC = () => {
  const [otp, setOtp] = useState('');
  const { verifyOtp, isLoading, error, phoneNumber } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await verifyOtp(otp);
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom align="center">
        Verify OTP
      </Typography>
      <Typography variant="body2" align="center" sx={{ mb: 3 }}>
        Enter the OTP sent to {phoneNumber}
      </Typography>
      {error && (
        <Typography color="error" align="center" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          margin="normal"
          required
          inputProps={{ maxLength: 6 }}
        />
        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          disabled={isLoading}
          sx={{ mt: 3 }}
        >
          {isLoading ? <CircularProgress size={24} /> : 'Verify OTP'}
        </Button>
      </form>
    </Paper>
  );
};

export default OtpVerification;
