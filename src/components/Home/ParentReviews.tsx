import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  Rating,
  Grid,
} from '@mui/material';
import { FormatQuote } from '@mui/icons-material';

const reviews = [
  {
    id: 1,
    name: 'Sarah Johnson',
    rating: 5,
    comment: 'The teachers are exceptional and my child has shown remarkable improvement in academics.',
    avatar: '/images/parent1.jpg',
    relation: 'Parent of 9th Grade Student',
  },
  {
    id: 2,
    name: 'Michael Chen',
    rating: 5,
    comment: 'Great learning environment with modern facilities. The regular updates about my child\'s progress are very helpful.',
    avatar: '/images/parent2.jpg',
    relation: 'Parent of 11th Grade Student',
  },
  {
    id: 3,
    name: 'Emily Williams',
    rating: 4,
    comment: 'The personalized attention and extra-curricular activities have helped my child develop holistically.',
    avatar: '/images/parent3.jpg',
    relation: 'Parent of 10th Grade Student',
  },
];

const ParentReviews: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h3" textAlign="center" gutterBottom>
        What Parents Say
      </Typography>
      <Typography variant="subtitle1" textAlign="center" sx={{ mb: 4 }}>
        Hear from our community of parents about their experience with our academy
      </Typography>

      <Grid container spacing={4}>
        {reviews.map((review) => (
          <Grid item xs={12} md={4} key={review.id}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    color: 'primary.light',
                    opacity: 0.2,
                  }}
                >
                  <FormatQuote sx={{ fontSize: 40 }} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar
                    src={review.avatar}
                    alt={review.name}
                    sx={{ width: 56, height: 56, mr: 2 }}
                  />
                  <Box>
                    <Typography variant="h6">{review.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {review.relation}
                    </Typography>
                  </Box>
                </Box>
                <Rating value={review.rating} readOnly sx={{ mb: 2 }} />
                <Typography variant="body1" color="text.secondary">
                  "{review.comment}"
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ textAlign: 'center', mt: 6 }}>
        <Typography variant="h5" gutterBottom>
          Join Our Growing Community
        </Typography>
        <Typography>
          Experience the difference in education that our academy provides.
          Schedule a visit or contact us to learn more about our programs.
        </Typography>
      </Box>
    </Container>
  );
};

export default ParentReviews;
