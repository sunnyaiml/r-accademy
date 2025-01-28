import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  useTheme,
} from '@mui/material';
import {
  School as SchoolIcon,
  MenuBook as MenuBookIcon,
  Timer as TimerIcon,
  AttachMoney as MoneyIcon,
  Gavel as TargetIcon, // Changed from Target to Gavel as Target is not available
} from '@mui/icons-material';

const benefits = [
  {
    icon: <SchoolIcon sx={{ fontSize: 40 }} />,
    title: 'Expert Faculty',
    description: 'Learn from experienced educators with proven track records in academic excellence.',
  },
  {
    icon: <MenuBookIcon sx={{ fontSize: 40 }} />,
    title: 'Customized Learning',
    description: "Personalized study plans tailored to each student's needs and learning pace.",
  },
  {
    icon: <TargetIcon sx={{ fontSize: 40 }} />,
    title: 'Result-Oriented',
    description: 'Focused approach with regular assessments and performance tracking.',
  },
  {
    icon: <TimerIcon sx={{ fontSize: 40 }} />,
    title: 'Flexible Schedule',
    description: 'Multiple batches and timing options to suit your convenience.',
  },
  {
    icon: <MoneyIcon sx={{ fontSize: 40 }} />,
    title: 'Affordable Fees',
    description: 'Quality education at competitive rates with flexible payment options.',
  },
];

const WhyChooseUs: React.FC = () => {
  const theme = useTheme();

  return (
    <Box sx={{ py: 8, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          textAlign="center"
          gutterBottom
          sx={{ mb: 6 }}
        >
          Why Choose Us
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
                    bgcolor: 'primary.light',
                    opacity: 0.8,
                  }}
                >
                  {benefit.icon}
                </Box>
                <Typography
                  variant="h5"
                  component="h3"
                  gutterBottom
                  sx={{ fontWeight: 600 }}
                >
                  {benefit.title}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ flexGrow: 1 }}
                >
                  {benefit.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Our Track Record
          </Typography>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h2" color="primary" fontWeight="bold">
                  500+
                </Typography>
                <Typography variant="h6">Students Enrolled</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h2" color="primary" fontWeight="bold">
                  95%
                </Typography>
                <Typography variant="h6">Success Rate in Board Exams</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h2" color="primary" fontWeight="bold">
                  5+
                </Typography>
                <Typography variant="h6">Years of Teaching Excellence</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default WhyChooseUs;
