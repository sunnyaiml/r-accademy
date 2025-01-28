import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Card,
  CardContent,
  CardActions,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Event as EventIcon,
  Class as ClassIcon,
  Assessment as AssessmentIcon,
  Group as GroupIcon,
} from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';

interface Class {
  id: number;
  grade: string;
  subject: string;
  students: number;
  nextSession: string;
}

interface Event {
  id: number;
  title: string;
  date: string;
  type: 'test' | 'assignment' | 'event';
  grade: string;
}

const TeacherDashboard: React.FC = () => {
  const { user } = useAuth();
  const [createEventOpen, setCreateEventOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    type: 'event',
    grade: '',
  });

  const classes: Class[] = [
    {
      id: 1,
      grade: '10th Grade',
      subject: 'Mathematics',
      students: 25,
      nextSession: 'Today, 10:00 AM',
    },
    {
      id: 2,
      grade: '11th Grade',
      subject: 'Mathematics',
      students: 30,
      nextSession: 'Tomorrow, 9:00 AM',
    },
    {
      id: 3,
      grade: '12th Grade',
      subject: 'Mathematics',
      students: 28,
      nextSession: 'Wednesday, 11:00 AM',
    },
  ];

  const events: Event[] = [
    {
      id: 1,
      title: 'Mid-term Test',
      date: '2024-02-05',
      type: 'test',
      grade: '10th Grade',
    },
    {
      id: 2,
      title: 'Math Project Submission',
      date: '2024-02-10',
      type: 'assignment',
      grade: '11th Grade',
    },
    {
      id: 3,
      title: 'Parent-Teacher Meeting',
      date: '2024-02-15',
      type: 'event',
      grade: 'All Grades',
    },
  ];

  const handleCreateEvent = () => {
    // Implement event creation logic
    setCreateEventOpen(false);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={3}>
          {/* Teacher Profile */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Avatar
                sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }}
                src="/images/teacher-avatar.jpg"
              />
              <Typography variant="h5" gutterBottom>
                {user?.name}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                Mathematics Teacher
              </Typography>
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 1 }}>
                <Chip icon={<GroupIcon />} label="83 Students" />
                <Chip icon={<ClassIcon />} label="3 Classes" />
              </Box>
            </Paper>
          </Grid>

          {/* Quick Stats */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'primary.light', color: 'white' }}>
                  <Typography variant="h4">3</Typography>
                  <Typography>Active Classes</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'secondary.light', color: 'white' }}>
                  <Typography variant="h4">5</Typography>
                  <Typography>Upcoming Tests</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'success.light', color: 'white' }}>
                  <Typography variant="h4">12</Typography>
                  <Typography>Posts Created</Typography>
                </Paper>
              </Grid>
            </Grid>
          </Grid>

          {/* Classes List */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">My Classes</Typography>
                <Button startIcon={<AddIcon />} variant="contained">
                  Create Class
                </Button>
              </Box>
              <List>
                {classes.map((cls) => (
                  <Card key={cls.id} sx={{ mb: 2 }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6">
                          {cls.subject} - {cls.grade}
                        </Typography>
                        <Box>
                          <IconButton size="small">
                            <EditIcon />
                          </IconButton>
                          <IconButton size="small" color="error">
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </Box>
                      <Typography color="textSecondary">
                        {cls.students} Students • Next Session: {cls.nextSession}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">View Details</Button>
                      <Button size="small">Take Attendance</Button>
                      <Button size="small">Create Assignment</Button>
                    </CardActions>
                  </Card>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Upcoming Events */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Upcoming Events</Typography>
                <Button
                  startIcon={<AddIcon />}
                  variant="outlined"
                  onClick={() => setCreateEventOpen(true)}
                >
                  Add Event
                </Button>
              </Box>
              <List>
                {events.map((event) => (
                  <ListItem key={event.id}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        {event.type === 'test' ? <AssessmentIcon /> : 
                         event.type === 'assignment' ? <EditIcon /> : 
                         <EventIcon />}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={event.title}
                      secondary={`${event.date} • ${event.grade}`}
                    />
                    <IconButton size="small">
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Create Event Dialog */}
      <Dialog open={createEventOpen} onClose={() => setCreateEventOpen(false)}>
        <DialogTitle>Create New Event</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              label="Event Title"
              fullWidth
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            />
            <TextField
              label="Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={newEvent.date}
              onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            />
            <FormControl fullWidth>
              <InputLabel>Event Type</InputLabel>
              <Select
                value={newEvent.type}
                label="Event Type"
                onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value as any })}
              >
                <MenuItem value="test">Test</MenuItem>
                <MenuItem value="assignment">Assignment</MenuItem>
                <MenuItem value="event">Other Event</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Grade</InputLabel>
              <Select
                value={newEvent.grade}
                label="Grade"
                onChange={(e) => setNewEvent({ ...newEvent, grade: e.target.value })}
              >
                <MenuItem value="10th Grade">10th Grade</MenuItem>
                <MenuItem value="11th Grade">11th Grade</MenuItem>
                <MenuItem value="12th Grade">12th Grade</MenuItem>
                <MenuItem value="All Grades">All Grades</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateEventOpen(false)}>Cancel</Button>
          <Button onClick={handleCreateEvent} variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TeacherDashboard;
