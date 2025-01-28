import React from 'react';
import { Container, Grid, Paper, Typography, Box } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import CalculateIcon from '@mui/icons-material/Calculate';
import ScienceIcon from '@mui/icons-material/Science';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const services = [
  {
    title: '8th Grade',
    description: 'Comprehensive learning across all core subjects.',
    icon: <MenuBookIcon sx={{ fontSize: 40 }} />,
  },
  {
    title: '9th Grade',
    description: 'Foundational concepts with exam-focused strategies.',
    icon: <CalculateIcon sx={{ fontSize: 40 }} />,
  },
  {
    title: '10th Grade (SSC)',
    description: 'Specialized coaching for board exam preparation.',
    icon: <SchoolIcon sx={{ fontSize: 40 }} />,
  },
  {
    title: '11th & 12th Science',
    description: 'Advanced guidance in Physics, Chemistry, Mathematics, and Biology.',
    icon: <ScienceIcon sx={{ fontSize: 40 }} />,
  },
];

const ServicesOverview: React.FC = () => {
  return (
    <Box sx={{ py: 8, backgroundColor: '#f5f5f5' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h2"
          align="center"
          gutterBottom
          sx={{ mb: 6, fontWeight: 'bold' }}
        >
          Our Classes
        </Typography>
        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                  },
                }}
              >
                <Box
                  sx={{
                    mb: 2,
                    color: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(25, 118, 210, 0.1)',
                  }}
                >
                  {service.icon}
                </Box>
                <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {service.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {service.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ServicesOverview;
