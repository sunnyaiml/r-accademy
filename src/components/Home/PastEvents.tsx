import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Chip,
  Button,
} from '@mui/material';
import { Event, LocationOn, Person } from '@mui/icons-material';

const events = [
  {
    id: 1,
    title: 'Annual Science Fair 2024',
    date: 'January 15, 2024',
    location: 'School Auditorium',
    description: 'Students showcased their innovative science projects with remarkable creativity and technical knowledge.',
    image: '/images/science-fair.jpg',
    organizer: 'Science Department',
    tags: ['Science', 'Innovation', 'Competition'],
  },
  {
    id: 2,
    title: 'Literary Festival',
    date: 'December 10, 2023',
    location: 'School Library',
    description: 'A celebration of literature featuring poetry recitations, storytelling, and book discussions.',
    image: '/images/literary-fest.jpg',
    organizer: 'English Department',
    tags: ['Literature', 'Arts', 'Culture'],
  },
  {
    id: 3,
    title: 'Sports Day 2023',
    date: 'November 25, 2023',
    location: 'School Grounds',
    description: 'Annual sports event featuring various athletic competitions and team sports.',
    image: '/images/sports-day.jpg',
    organizer: 'Physical Education Department',
    tags: ['Sports', 'Competition', 'Fitness'],
  },
];

const PastEvents: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h3" textAlign="center" gutterBottom>
        Past Events
      </Typography>
      <Typography variant="subtitle1" textAlign="center" sx={{ mb: 4 }}>
        Relive the memorable moments from our recent events
      </Typography>

      <Grid container spacing={4}>
        {events.map((event) => (
          <Grid item xs={12} md={4} key={event.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="200"
                image={event.image}
                alt={event.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" gutterBottom>
                  {event.title}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Event color="primary" fontSize="small" />
                    <Typography variant="body2" color="text.secondary">
                      {event.date}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <LocationOn color="primary" fontSize="small" />
                    <Typography variant="body2" color="text.secondary">
                      {event.location}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2 }}>
                  <Person color="primary" fontSize="small" />
                  <Typography variant="body2" color="text.secondary">
                    {event.organizer}
                  </Typography>
                </Box>
                <Typography variant="body2" paragraph>
                  {event.description}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                  {event.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Box>
                <Button variant="outlined" fullWidth>
                  View Gallery
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ textAlign: 'center', mt: 6 }}>
        <Typography variant="h5" gutterBottom>
          Stay Updated
        </Typography>
        <Typography>
          Follow our social media channels and newsletter to stay informed about upcoming events
          and activities at our academy.
        </Typography>
      </Box>
    </Container>
  );
};

export default PastEvents;
