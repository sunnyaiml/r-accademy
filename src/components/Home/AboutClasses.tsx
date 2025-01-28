import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
} from '@mui/material';

const classes = [
  {
    title: 'High School Program',
    grade: '8th - 12th Grade',
    description: 'Comprehensive education focusing on academic excellence and personal growth.',
    image: '/images/high-school.jpg',
    subjects: ['Mathematics', 'Science', 'English', 'Social Studies'],
  },
  {
    title: 'Test Preparation',
    grade: 'All Grades',
    description: 'Specialized coaching for competitive exams and standardized tests.',
    image: '/images/test-prep.jpg',
    subjects: ['SAT', 'ACT', 'AP Courses'],
  },
  {
    title: 'Skill Development',
    grade: 'All Grades',
    description: 'Extra-curricular activities and practical skill development.',
    image: '/images/skills.jpg',
    subjects: ['Computer Science', 'Public Speaking', 'Art & Design'],
  },
];

const AboutClasses: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h3" textAlign="center" gutterBottom>
        Our Academic Programs
      </Typography>
      <Typography variant="subtitle1" textAlign="center" sx={{ mb: 4 }}>
        Choose from our diverse range of programs designed to meet your educational needs
      </Typography>

      <Grid container spacing={4}>
        {classes.map((classItem, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="200"
                image={classItem.image}
                alt={classItem.title}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" gutterBottom>
                  {classItem.title}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  {classItem.grade}
                </Typography>
                <Typography variant="body2" paragraph>
                  {classItem.description}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  Key Subjects:
                </Typography>
                <Box component="ul" sx={{ pl: 2 }}>
                  {classItem.subjects.map((subject, idx) => (
                    <Typography component="li" variant="body2" key={idx}>
                      {subject}
                    </Typography>
                  ))}
                </Box>
              </CardContent>
              <Box sx={{ p: 2, pt: 0 }}>
                <Button variant="contained" fullWidth>
                  Learn More
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ textAlign: 'center', mt: 6 }}>
        <Typography variant="h4" gutterBottom>
          Why Choose Our Programs?
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={4}>
            <Box>
              <Typography variant="h6" gutterBottom>
                Expert Teachers
              </Typography>
              <Typography>
                Learn from experienced educators with proven track records
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box>
              <Typography variant="h6" gutterBottom>
                Personalized Attention
              </Typography>
              <Typography>
                Small class sizes ensuring individual attention and growth
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box>
              <Typography variant="h6" gutterBottom>
                Modern Facilities
              </Typography>
              <Typography>
                State-of-the-art classrooms and learning resources
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AboutClasses;
