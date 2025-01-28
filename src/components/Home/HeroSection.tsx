import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const MotionTypography = motion(Typography);
const MotionButton = motion(Button);
const MotionBox = motion(Box);

const HeroSection: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const statsVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 1,
      },
    },
  };

  const statItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <Box
      sx={{
        position: 'relative',
        height: isMobile ? '80vh' : '90vh',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url("/images/hero-bg.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: -1,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ height: '100%' }}>
        <Grid
          container
          sx={{
            height: '100%',
            alignItems: 'center',
            color: 'white',
          }}
        >
          <Grid item xs={12} md={8}>
            <Box>
              <MotionTypography
                variant="h1"
                initial="hidden"
                animate="visible"
                variants={textVariants}
                sx={{
                  fontSize: { xs: '2.5rem', md: '4rem' },
                  fontWeight: 700,
                  mb: 2,
                }}
              >
                Shaping Futures,
                <br />
                One Student at a Time
              </MotionTypography>
              <MotionTypography
                variant="h5"
                initial="hidden"
                animate="visible"
                variants={textVariants}
                sx={{
                  mb: 4,
                  opacity: 0.9,
                  maxWidth: '800px',
                  lineHeight: 1.5,
                }}
              >
                Personalized and professional tuition classes for 8th, 9th, 10th, 11th & 12th Science—designed
                to help students excel academically and grow holistically.
              </MotionTypography>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.2,
                      delayChildren: 0.6,
                    },
                  },
                }}
              >
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <MotionButton
                    variant="contained"
                    size="large"
                    color="primary"
                    onClick={() => navigate('/classes')}
                    variants={buttonVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    sx={{
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                    }}
                  >
                    Explore Our Classes
                  </MotionButton>
                  <MotionButton
                    variant="contained"
                    size="large"
                    color="secondary"
                    onClick={() => navigate('/enroll')}
                    variants={buttonVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    sx={{
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                    }}
                  >
                    Enroll Today
                  </MotionButton>
                  <MotionButton
                    variant="outlined"
                    size="large"
                    variants={buttonVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    sx={{
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      color: 'white',
                      borderColor: 'white',
                      '&:hover': {
                        borderColor: 'white',
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                    onClick={() => navigate('/about')}
                  >
                    Learn More
                  </MotionButton>
                </Box>
              </motion.div>
              <MotionBox
                sx={{ mt: 6, display: 'flex', gap: 4, flexWrap: 'wrap' }}
                initial="hidden"
                animate="visible"
                variants={statsVariants}
              >
                <MotionBox variants={statItemVariants}>
                  <Typography variant="h3" fontWeight="bold">
                    500+
                  </Typography>
                  <Typography variant="subtitle1">Students Enrolled</Typography>
                </MotionBox>
                <MotionBox variants={statItemVariants}>
                  <Typography variant="h3" fontWeight="bold">
                    95%
                  </Typography>
                  <Typography variant="subtitle1">Success Rate</Typography>
                </MotionBox>
                <MotionBox variants={statItemVariants}>
                  <Typography variant="h3" fontWeight="bold">
                    5+
                  </Typography>
                  <Typography variant="subtitle1">Years of Excellence</Typography>
                </MotionBox>
              </MotionBox>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection;
