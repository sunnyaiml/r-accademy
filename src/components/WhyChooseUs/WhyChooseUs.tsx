import React from 'react';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PaidIcon from '@mui/icons-material/Paid';

const benefits = [
  {
    icon: <SchoolIcon sx={{ fontSize: 40 }} />,
    title: '🧑‍🏫 Expert Faculty',
    description: 'Experienced and dedicated teachers committed to student success.',
  },
  {
    icon: <AutoStoriesIcon sx={{ fontSize: 40 }} />,
    title: '📚 Customized Learning',
    description: "Personalized study plans tailored to each student's needs.",
  },
  {
    icon: <TrackChangesIcon sx={{ fontSize: 40 }} />,
    title: '🎯 Result-oriented',
    description: 'Focused approach with proven track record of academic excellence.',
  },
  {
    icon: <AccessTimeIcon sx={{ fontSize: 40 }} />,
    title: '🕒 Flexible Schedule',
    description: 'Convenient class timings to suit your busy lifestyle.',
  },
  {
    icon: <PaidIcon sx={{ fontSize: 40 }} />,
    title: '💸 Affordable Fees',
    description: 'Quality education at competitive prices.',
  },
];

const WhyChooseUs: React.FC = () => {
  return (
    <Box sx={{ py: 8, backgroundColor: 'white' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h2"
          align="center"
          gutterBottom
          sx={{ mb: 6, fontWeight: 'bold' }}
        >
          ✨ Why Choose Us
        </Typography>

        <Grid container spacing={4}>
          {benefits.map((benefit, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    '& .icon-wrapper': {
                      backgroundColor: 'primary.main',
                      color: 'white',
                    },
                  },
                }}
              >
                <Box
                  className="icon-wrapper"
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    backgroundColor: 'primary.light',
                    color: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                    transition: 'all 0.3s ease-in-out',
                  }}
                >
                  {benefit.icon}
                </Box>
                <Typography
                  variant="h5"
                  component="h3"
                  gutterBottom
                  sx={{ fontWeight: 'bold', mb: 2 }}
                >
                  {benefit.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {benefit.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Quick Stats */}
        <Box sx={{ mt: 8 }}>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                  500+
                </Typography>
                <Typography variant="h6">🎓 Students Enrolled</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                  5+
                </Typography>
                <Typography variant="h6">📘 Years of Excellence</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                  95%
                </Typography>
                <Typography variant="h6">🏆 100% Success Rate</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default WhyChooseUs;
