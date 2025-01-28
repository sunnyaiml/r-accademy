import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLoginClick = () => {
    handleClose();
    navigate('/student/login');
  };

  const handleLogout = async () => {
    handleClose();
    await logout();
    navigate('/');
  };

  const handleDashboardClick = () => {
    handleClose();
    navigate(user?.role === 'student' ? '/student/dashboard' : '/teacher/dashboard');
  };

  const navItems = ['Home', 'About Us', 'Classes', 'Schedule', 'Testimonials', 'Contact Us'];

  const renderMobileMenu = (
    <Drawer anchor="right" open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
      <Box sx={{ width: 250 }}>
        <List>
          {navItems.map((item) => (
            <ListItem button key={item} onClick={() => setMobileMenuOpen(false)}>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              color: 'primary.main',
              fontWeight: 'bold',
              fontSize: '1.5rem',
              cursor: 'pointer',
            }}
            onClick={() => navigate('/')}
          >
            R Education
          </Typography>

          {!isMobile ? (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {navItems.map((item) => (
                <Button
                  key={item}
                  sx={{
                    color: 'text.primary',
                    mx: 1,
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    },
                  }}
                >
                  {item}
                </Button>
              ))}
              {user ? (
                <IconButton
                  onClick={handleProfileClick}
                  sx={{ ml: 2 }}
                  aria-controls="profile-menu"
                  aria-haspopup="true"
                >
                  <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                    {user.name.charAt(0).toUpperCase()}
                  </Avatar>
                </IconButton>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleLoginClick}
                  startIcon={<span role="img" aria-label="person">👤</span>}
                >
                  Login
                </Button>
              )}
            </Box>
          ) : (
            <Box>
              {user ? (
                <IconButton onClick={handleProfileClick} sx={{ mr: 2 }}>
                  <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                    {user.name.charAt(0).toUpperCase()}
                  </Avatar>
                </IconButton>
              ) : (
                <IconButton onClick={handleLoginClick} sx={{ mr: 2 }}>
                  <PersonIcon />
                </IconButton>
              )}
              <IconButton edge="end" onClick={() => setMobileMenuOpen(true)}>
                <MenuIcon />
              </IconButton>
            </Box>
          )}

          <Menu
            id="profile-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            {user ? (
              <>
                <MenuItem onClick={handleDashboardClick}>
                  Dashboard
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </>
            ) : (
              <MenuItem onClick={handleLoginClick}>Login</MenuItem>
            )}
          </Menu>
        </Toolbar>
      </AppBar>
      <Toolbar /> {/* This is for spacing below the fixed AppBar */}
      {renderMobileMenu}
    </>
  );
};

export default Header;
