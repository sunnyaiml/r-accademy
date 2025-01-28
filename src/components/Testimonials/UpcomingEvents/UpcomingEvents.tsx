import React from 'react';
import { Box, Container, Typography, Card, CardContent, Button, Grid, Chip } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const events = [
  {
    title: 'New Batch for 10th Grade',
    date: 'December 15, 2024',
    time: '7:00 PM',
    location: 'Main Classroom',
    type: 'Class',
    description: 'Join our new batch for comprehensive SSC preparation.',
  },
  {
    title: 'Parent-Teacher Interaction',
    date: 'December 20, 2024',
    time: '6:00 PM',
    location: 'Conference Room',
    type: 'Meeting',
    description: 'Discuss student progress and address parent concerns.',
  },
  {
    title: 'Science Exhibition',
    date: 'December 25, 2024',
    time: '10:00 AM',
    location: 'School Auditorium',
    type: 'Event',
    description: 'Annual science exhibition showcasing student projects.',
  },
];

const UpcomingEvents: React.FC = () => {
  return (
    <Box sx={{ py: 8, backgroundColor: '#f8f9fa' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h2"
          align="center"
          gutterBottom
          sx={{ mb: 6, fontWeight: 'bold' }}
        >
          📅 Upcoming Events
        </Typography>

        <Grid container spacing={4}>
          {events.map((event, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                  },
                }}
                elevation={3}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ mb: 2 }}>
                    <Chip label={event.type} color="primary" size="small" sx={{ mb: 2 }} />
                    <Typography variant="h5" component="h3" gutterBottom>
                      {event.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {event.description}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <EventIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="body2">{event.date}</Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <AccessTimeIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="body2">{event.time}</Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <LocationOnIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="body2">{event.location}</Typography>
                  </Box>

                  <Button variant="outlined" color="primary" fullWidth>
                    Register Now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button variant="contained" color="primary" size="large" endIcon={<EventIcon />}>
            View All Events
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default UpcomingEvents;
