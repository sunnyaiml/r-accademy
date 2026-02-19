import React from 'react';
import { Box, Container, Paper, Typography, useTheme, useMediaQuery, Grid } from '@mui/material';
import { motion } from 'framer-motion';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  image?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle, image }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={24}
          sx={{
            borderRadius: 4,
            overflow: 'hidden',
            display: 'flex',
            maxWidth: '100%',
            mx: 'auto',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Grid container>
            {/* Left Side - Image/Branding (Desktop only) */}
            {!isMobile && (
              <Grid item md={6} sx={{ position: 'relative' }}>
                <Box
                  sx={{
                    height: '100%',
                    width: '100%',
                    backgroundImage: `url(${image || '/images/auth-bg.jpg'})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.8) 0%, rgba(33, 203, 243, 0.6) 100%)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      zIndex: 1,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      color: 'white',
                      p: 4,
                      textAlign: 'center',
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                    >
                      <Typography variant="h3" fontWeight="bold" gutterBottom>
                        R-Academy
                      </Typography>
                      <Typography variant="h6" sx={{ opacity: 0.9 }}>
                        Empowering Education, <br />
                        One Student at a Time.
                      </Typography>
                    </motion.div>
                  </Box>
                </Box>
              </Grid>
            )}

            {/* Right Side - Form */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: { xs: 3, sm: 6 },
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  minHeight: '600px',
                }}
              >
                <Box sx={{ mb: 4, textAlign: 'center' }}>
                  <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
                    {title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {subtitle}
                  </Typography>
                </Box>
                {children}
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default AuthLayout;
