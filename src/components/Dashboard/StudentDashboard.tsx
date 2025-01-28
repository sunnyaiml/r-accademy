import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Chip,
  Button,
  Card,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Collapse,
} from '@mui/material';
import {
  Book,
  Assignment,
  Event,
  ExpandMore as ExpandMoreIcon,
  School,
  Person,
  Grade,
} from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';

interface Subject {
  id: number;
  name: string;
  teacher: string;
  nextClass: string;
  assignments: number;
}

interface UpcomingTest {
  id: number;
  subject: string;
  date: string;
  topics: string[];
}

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [expandedSubject, setExpandedSubject] = useState<number | null>(null);

  const subjects: Subject[] = [
    {
      id: 1,
      name: 'Mathematics',
      teacher: 'Dr. Robert Smith',
      nextClass: 'Tomorrow, 9:00 AM',
      assignments: 2,
    },
    {
      id: 2,
      name: 'Physics',
      teacher: 'Ms. Emily Chen',
      nextClass: 'Wednesday, 11:00 AM',
      assignments: 1,
    },
    {
      id: 3,
      name: 'English',
      teacher: 'Mr. James Wilson',
      nextClass: 'Thursday, 10:00 AM',
      assignments: 3,
    },
  ];

  const upcomingTests: UpcomingTest[] = [
    {
      id: 1,
      subject: 'Mathematics',
      date: '2024-02-05',
      topics: ['Calculus', 'Trigonometry'],
    },
    {
      id: 2,
      subject: 'Physics',
      date: '2024-02-08',
      topics: ['Mechanics', 'Wave Motion'],
    },
  ];

  const handleExpandSubject = (subjectId: number) => {
    setExpandedSubject(expandedSubject === subjectId ? null : subjectId);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={3}>
          {/* Student Profile Summary */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Avatar
                sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }}
                src="/images/student-avatar.jpg"
              />
              <Typography variant="h5" gutterBottom>
                {user?.name}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                Grade {user?.grade}
              </Typography>
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 1 }}>
                <Chip icon={<School />} label="Student ID: 12345" />
                <Chip icon={<Grade />} label="GPA: 3.8" />
              </Box>
            </Paper>
          </Grid>

          {/* Quick Stats */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'primary.light', color: 'white' }}>
                  <Typography variant="h4">6</Typography>
                  <Typography>Active Subjects</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'secondary.light', color: 'white' }}>
                  <Typography variant="h4">8</Typography>
                  <Typography>Pending Assignments</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'success.light', color: 'white' }}>
                  <Typography variant="h4">92%</Typography>
                  <Typography>Attendance</Typography>
                </Paper>
              </Grid>
            </Grid>
          </Grid>

          {/* Subjects List */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                My Subjects
              </Typography>
              <List>
                {subjects.map((subject) => (
                  <React.Fragment key={subject.id}>
                    <ListItem>
                      <ListItemIcon>
                        <Book color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary={subject.name}
                        secondary={`Teacher: ${subject.teacher}`}
                      />
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Chip
                          size="small"
                          label={`${subject.assignments} assignments`}
                          color="primary"
                          variant="outlined"
                        />
                        <IconButton
                          onClick={() => handleExpandSubject(subject.id)}
                          sx={{
                            transform: expandedSubject === subject.id ? 'rotate(180deg)' : 'none',
                            transition: '0.3s',
                          }}
                        >
                          <ExpandMoreIcon />
                        </IconButton>
                      </Box>
                    </ListItem>
                    <Collapse in={expandedSubject === subject.id}>
                      <Box sx={{ pl: 9, pr: 2, pb: 2 }}>
                        <Typography variant="body2" gutterBottom>
                          Next Class: {subject.nextClass}
                        </Typography>
                        <Button variant="outlined" size="small">
                          View Materials
                        </Button>
                      </Box>
                    </Collapse>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Upcoming Tests */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Upcoming Tests
              </Typography>
              <List>
                {upcomingTests.map((test) => (
                  <Card key={test.id} sx={{ mb: 2 }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {test.subject}
                      </Typography>
                      <Typography color="textSecondary" gutterBottom>
                        Date: {test.date}
                      </Typography>
                      <Box sx={{ mt: 1 }}>
                        {test.topics.map((topic) => (
                          <Chip
                            key={topic}
                            label={topic}
                            size="small"
                            sx={{ mr: 0.5, mb: 0.5 }}
                          />
                        ))}
                      </Box>
                    </CardContent>
                    <CardActions>
                      <Button size="small">View Study Material</Button>
                    </CardActions>
                  </Card>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default StudentDashboard;
