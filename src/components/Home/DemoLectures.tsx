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
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import { PlayArrow, Timer, Class, Person } from '@mui/icons-material';

const lectures = [
  {
    id: 1,
    title: 'Introduction to Advanced Mathematics',
    subject: 'Mathematics',
    grade: '11th Grade',
    duration: '45 minutes',
    teacher: 'Dr. Robert Smith',
    thumbnail: '/images/math-lecture.jpg',
    videoUrl: 'https://www.youtube.com/embed/demo-math',
  },
  {
    id: 2,
    title: 'Understanding Chemical Reactions',
    subject: 'Chemistry',
    grade: '10th Grade',
    duration: '40 minutes',
    teacher: 'Ms. Emily Chen',
    thumbnail: '/images/chemistry-lecture.jpg',
    videoUrl: 'https://www.youtube.com/embed/demo-chemistry',
  },
  {
    id: 3,
    title: 'English Literature Analysis',
    subject: 'English',
    grade: '12th Grade',
    duration: '35 minutes',
    teacher: 'Mr. James Wilson',
    thumbnail: '/images/english-lecture.jpg',
    videoUrl: 'https://www.youtube.com/embed/demo-english',
  },
];

const DemoLectures: React.FC = () => {
  const [selectedLecture, setSelectedLecture] = React.useState<typeof lectures[0] | null>(null);

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" textAlign="center" gutterBottom>
        Demo Lectures
      </Typography>
      <Typography variant="subtitle1" textAlign="center" sx={{ mb: 4 }}>
        Experience our teaching methodology with these sample lectures
      </Typography>

      <Grid container spacing={4}>
        {lectures.map((lecture) => (
          <Grid item xs={12} md={4} key={lecture.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ position: 'relative' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={lecture.thumbnail}
                  alt={lecture.title}
                />
                <IconButton
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'rgba(0, 0, 0, 0.6)',
                    '&:hover': {
                      bgcolor: 'rgba(0, 0, 0, 0.8)',
                    },
                  }}
                  onClick={() => setSelectedLecture(lecture)}
                >
                  <PlayArrow sx={{ fontSize: 40, color: 'white' }} />
                </IconButton>
              </Box>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" gutterBottom>
                  {lecture.title}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Chip
                    icon={<Class />}
                    label={lecture.subject}
                    size="small"
                    color="primary"
                  />
                  <Chip
                    icon={<Timer />}
                    label={lecture.duration}
                    size="small"
                    variant="outlined"
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Person color="action" sx={{ mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    {lecture.teacher}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Suitable for {lecture.grade} students
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<PlayArrow />}
                  onClick={() => setSelectedLecture(lecture)}
                  sx={{ mt: 2 }}
                >
                  Watch Demo
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={!!selectedLecture}
        onClose={() => setSelectedLecture(null)}
        maxWidth="md"
        fullWidth
      >
        {selectedLecture && (
          <>
            <DialogTitle>
              {selectedLecture.title}
            </DialogTitle>
            <DialogContent>
              <Box sx={{ position: 'relative', paddingTop: '56.25%' }}>
                <iframe
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 0,
                  }}
                  src={selectedLecture.videoUrl}
                  title={selectedLecture.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </Box>
            </DialogContent>
          </>
        )}
      </Dialog>

      <Box sx={{ textAlign: 'center', mt: 6 }}>
        <Typography variant="h5" gutterBottom>
          Want to See More?
        </Typography>
        <Typography sx={{ mb: 3 }}>
          Schedule a free consultation to discuss your educational needs and explore our full range of courses.
        </Typography>
        <Button variant="contained" size="large">
          Schedule Consultation
        </Button>
      </Box>
    </Container>
  );
};

export default DemoLectures;
