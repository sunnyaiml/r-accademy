import React, { useState } from 'react';
import { Modal, Box, Typography, Button, Tabs, Tab, TextField } from '@mui/material';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose }) => {
  const [tab, setTab] = useState(0);
  const [userType, setUserType] = useState<'student' | 'teacher'>('student');

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" component="h2" gutterBottom>
          {tab === 0 ? 'Login' : 'Sign Up'}
        </Typography>

        <Tabs value={tab} onChange={(_, newValue) => setTab(newValue)} sx={{ mb: 2 }}>
          <Tab label="Login" />
          <Tab label="Sign Up" />
        </Tabs>

        <Box sx={{ mb: 2 }}>
          <Button
            variant={userType === 'student' ? 'contained' : 'outlined'}
            onClick={() => setUserType('student')}
            sx={{ mr: 1 }}
          >
            Student
          </Button>
          <Button
            variant={userType === 'teacher' ? 'contained' : 'outlined'}
            onClick={() => setUserType('teacher')}
          >
            Teacher
          </Button>
        </Box>

        <Box component="form" sx={{ mt: 2 }}>
          <TextField fullWidth label="Email" type="email" margin="normal" required />
          <TextField fullWidth label="Password" type="password" margin="normal" required />
          {tab === 1 && (
            <>
              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                margin="normal"
                required
              />
              {userType === 'student' && (
                <TextField fullWidth label="Class/Grade" margin="normal" required />
              )}
            </>
          )}
          <Button fullWidth variant="contained" sx={{ mt: 3 }}>
            {tab === 0 ? 'Login' : 'Sign Up'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default LoginModal;
