import React from 'react';
import { Box, Typography, Button, Container, Stack } from '@mui/material';

const HeroSection: React.FC = () => {
  return (
    <Box
      sx={{
        background:
          'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("/assets/classroom.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        color: 'white',
        padding: '2rem 0',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              marginBottom: 3,
            }}
          >
            Shaping Futures, One Student at a Time
          </Typography>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              marginBottom: 4,
              lineHeight: 1.5,
            }}
          >
            Personalized and professional tuition classes for 8th, 9th, 10th, 11th & 12th
            Science—designed to help students excel academically and grow holistically.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button
              variant="contained"
              size="large"
              sx={{
                padding: '12px 32px',
                fontSize: '1.1rem',
              }}
            >
              Explore Our Classes
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                padding: '12px 32px',
                fontSize: '1.1rem',
                color: 'white',
                borderColor: 'white',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              Enroll Today
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                padding: '12px 32px',
                fontSize: '1.1rem',
                color: 'white',
                borderColor: 'white',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              Learn More
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
