import React from 'react';
import { Box, Container, Typography, Card, CardContent, Avatar, Grid, Rating } from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

const testimonials = [
  {
    name: 'Parent of Rahul',
    role: 'Parent of a 10th-grade student',
    content:
      "R Education has transformed my child's academic journey. The teachers are knowledgeable and supportive.",
    avatar: '/assets/parent1.jpg',
    rating: 5,
  },
  {
    name: 'Mrs. Sharma',
    role: 'Parent of a 12th-grade student',
    content:
      'The personalized attention and structured approach helped my daughter excel in her board exams. Highly recommended!',
    avatar: '/assets/parent2.jpg',
    rating: 5,
  },
  {
    name: 'Mr. Patel',
    role: 'Parent of a 9th-grade student',
    content:
      "The faculty's dedication and innovative teaching methods have made complex subjects easy to understand for my son.",
    avatar: '/assets/parent3.jpg',
    rating: 5,
  },
];

const Testimonials: React.FC = () => {
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
          💬 What Parents Say
        </Typography>

        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    transition: 'transform 0.3s ease-in-out',
                  },
                }}
                elevation={3}
              >
                <CardContent sx={{ flex: 1, pt: 4 }}>
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -20,
                      left: '50%',
                      transform: 'translateX(-50%)',
                    }}
                  >
                    <Avatar
                      src={testimonial.avatar}
                      sx={{
                        width: 80,
                        height: 80,
                        border: '4px solid white',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      }}
                    />
                  </Box>

                  <Box sx={{ textAlign: 'center', mb: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      {testimonial.name}
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                      {testimonial.role}
                    </Typography>
                    <Rating value={testimonial.rating} readOnly sx={{ mb: 2 }} />
                  </Box>

                  <Box
                    sx={{
                      position: 'relative',
                      p: 2,
                      backgroundColor: 'rgba(0, 0, 0, 0.02)',
                      borderRadius: 2,
                    }}
                  >
                    <FormatQuoteIcon
                      sx={{
                        position: 'absolute',
                        top: -10,
                        left: -10,
                        color: 'primary.main',
                        opacity: 0.2,
                        fontSize: 40,
                      }}
                    />
                    <Typography variant="body1" color="text.secondary">
                      {testimonial.content}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Testimonials;
