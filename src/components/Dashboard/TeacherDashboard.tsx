
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
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
  Divider,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Rating,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Alert,
  Snackbar,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EventIcon from '@mui/icons-material/Event';
import AssessmentIcon from '@mui/icons-material/Assessment';
import GroupIcon from '@mui/icons-material/Group';
import AccessTime from '@mui/icons-material/AccessTime';
import MoreVert from '@mui/icons-material/MoreVert';
import Quiz from '@mui/icons-material/Quiz';
import VideoCall from '@mui/icons-material/VideoCall';
import Assignment from '@mui/icons-material/Assignment';
import Upload from '@mui/icons-material/Upload';
import Schedule from '@mui/icons-material/Schedule';
import Send from '@mui/icons-material/Send';
import Visibility from '@mui/icons-material/Visibility';
import TrendingUp from '@mui/icons-material/TrendingUp';
import Today from '@mui/icons-material/Today';
import Description from '@mui/icons-material/Description';
import Map from '@mui/icons-material/Map';
import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  FileText,
  Calendar,
  MessageSquare,
  Cloud,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { meetingService } from '../../services/meetingService';
import AttendanceModal from '../Attendance/AttendanceModal';
import DashboardLayout, { NavItem } from '../common/DashboardLayout';
import CalendarWidget from '../common/CalendarWidget';
import ScheduleItemComponent from '../common/ScheduleItem';
import type { ScheduleColor } from '../common/ScheduleItem';
import {
  DashboardPaper,
  StatBox,
  SectionTitle,
  StatusChip,
  ProgressWithLabel,
  containerVariants,
  itemVariants,
} from '../common/DashboardComponents';

const TEACHER_NAV: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard' },
  { icon: BookOpen, label: 'My Classes' },
  { icon: Users, label: 'Students' },
  { icon: FileText, label: 'Gradebook' },
  { icon: Calendar, label: 'Schedule' },
  { icon: MessageSquare, label: 'Messages' },
];

const CloudStorageWidget = () => (
  <div className="bg-gradient-to-br from-primary-600 to-primary-900 rounded-[24px] p-6 text-white shadow-xl shadow-primary-200 relative overflow-hidden group">
    <div className="absolute top-0 right-0 -mr-8 -mt-8 h-32 w-32 bg-white opacity-10 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-700" />
    <div className="h-10 w-10 bg-white/20 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm shadow-inner">
      <Cloud size={20} className="text-white" />
    </div>
    <h3 className="font-black text-lg mb-1 relative z-10">Cloud Storage</h3>
    <p className="text-primary-100 text-[11px] mb-5 font-medium relative z-10 leading-relaxed uppercase tracking-wider">75GB of 100GB used</p>
    <div className="w-full bg-black/20 rounded-full h-1.5 mb-5 overflow-hidden relative z-10">
      <div className="h-full bg-white w-3/4 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
    </div>
    <button className="w-full bg-white text-primary-600 text-[10px] font-black py-3 rounded-xl shadow-lg hover:shadow-white/20 hover:-translate-y-1 transition-all active:scale-95 relative z-10 uppercase tracking-widest text-center">
      Manage Files
    </button>
  </div>
);

interface ClassItem {
  id: number;
  grade: string;
  subject: string;
  students: number;
  nextSession: string;
}

interface EventItem {
  id: number;
  title: string;
  date: string;
  type: 'test' | 'assignment' | 'event' | 'trip' | 'meeting';
  grade: string;
}

interface TestItem {
  id: number;
  title: string;
  subject: string;
  grade: string;
  date: string;
  duration: string;
  totalMarks: number;
  status: 'draft' | 'active' | 'completed' | 'graded';
  submissions?: number;
  totalStudents?: number;
}

interface StudentRecord {
  id: number;
  name: string;
  grade: string;
  avgScore: number;
  attendance: number;
  trend: 'up' | 'down' | 'stable';
  lastRemark: string;
}

interface AssignmentItemLocal {
  id: number;
  title: string;
  subject: string;
  grade: string;
  deadline: string;
  submitted: number;
  total: number;
  status: 'active' | 'graded' | 'draft';
}

const TeacherDashboard: React.FC = () => {
  const { user } = useAuth();
  const [createEventOpen, setCreateEventOpen] = useState(false);
  const [createTestOpen, setCreateTestOpen] = useState(false);
  const [attendanceDialogOpen, setAttendanceDialogOpen] = useState(false);
  const [meetingDialogOpen, setMeetingDialogOpen] = useState(false);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [activeSection, setActiveSection] = useState(0);

  // Map sidebar nav to internal tab: Nav 1=Classes(tab0), Nav 2=Students(tab3), Nav 3=Gradebook(tab1), Nav 4=Schedule, Nav 5=Messages
  const handleSectionChange = (index: number) => {
    setActiveSection(index);
    const navToTab: Record<number, number> = { 1: 0, 2: 3, 3: 1 };
    if (navToTab[index] !== undefined) setActiveTab(navToTab[index]);
  };
  const [newEvent, setNewEvent] = useState({ title: '', date: '', type: 'event', grade: '' });
  const [newTest, setNewTest] = useState({ title: '', subject: '', grade: '', date: '', duration: '', totalMarks: '', type: 'quiz' });
  const [newMeeting, setNewMeeting] = useState({
    title: '',
    date: '',
    time: '',
    duration: '',
    grade: '',
    type: 'live_class',
    participants: [] as ('students' | 'parents')[]
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const queryClient = useQueryClient();

  // Fetch teacher's meetings
  const { data: meetings = [] } = useQuery(
    'teacherMeetings',
    () => meetingService.getTeacherMeetings().then(r => r.data)
  );

  // Create meeting mutation
  const createMeetingMutation = useMutation(
    (meetingData: any) => meetingService.createMeeting(meetingData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('teacherMeetings');
        setSuccessMessage('Meeting scheduled successfully! Participants will be notified.');
        setMeetingDialogOpen(false);
        setNewMeeting({ title: '', date: '', time: '', duration: '', grade: '', type: 'live_class', participants: [] });
      },
      onError: (error: any) => {
        setErrorMessage(error.response?.data?.message || 'Failed to schedule meeting');
      },
    }
  );

  // Start meeting mutation
  const startMeetingMutation = useMutation(
    (meetingId: number) => meetingService.startMeeting(meetingId),
    {
      onSuccess: (response, meetingId) => {
        queryClient.invalidateQueries('teacherMeetings');
        setSuccessMessage(`Meeting started! ${response.data.notificationsSent} participants notified.`);
        const jitsiDomain = process.env.REACT_APP_JITSI_DOMAIN || 'meet.jit.si';
        const roomName = `r-academy-${meetingId}`;
        window.open(`https://${jitsiDomain}/${roomName}`, '_blank');
      },
      onError: (error: any) => {
        setErrorMessage(error.response?.data?.message || 'Failed to start meeting');
      },
    }
  );

  // Handler functions
  const handleScheduleMeeting = () => {
    if (!newMeeting.title || !newMeeting.date || !newMeeting.time || !newMeeting.duration || !newMeeting.grade || newMeeting.participants.length === 0) {
      setErrorMessage('Please fill all fields and select at least one participant type');
      return;
    }
    createMeetingMutation.mutate({
      title: newMeeting.title,
      type: newMeeting.type as any,
      date: newMeeting.date,
      time: newMeeting.time,
      duration: parseInt(newMeeting.duration),
      grade: newMeeting.grade,
      participants: newMeeting.participants,
    });
  };

  const handleStartMeeting = (meetingId: number) => {
    startMeetingMutation.mutate(meetingId);
  };

  const handleParticipantToggle = (participantType: 'students' | 'parents') => {
    setNewMeeting(prev => ({
      ...prev,
      participants: prev.participants.includes(participantType)
        ? prev.participants.filter(p => p !== participantType)
        : [...prev.participants, participantType]
    }));
  };

  const classes: ClassItem[] = [
    { id: 1, grade: '10th Grade', subject: 'Mathematics', students: 25, nextSession: 'Today, 10:00 AM' },
    { id: 2, grade: '11th Grade', subject: 'Mathematics', students: 30, nextSession: 'Tomorrow, 9:00 AM' },
    { id: 3, grade: '12th Grade', subject: 'Mathematics', students: 28, nextSession: 'Wednesday, 11:00 AM' },
  ];

  const events: EventItem[] = [
    { id: 1, title: 'Mid-term Test', date: '2026-02-20', type: 'test', grade: '10th Grade' },
    { id: 2, title: 'Math Project Submission', date: '2026-02-22', type: 'assignment', grade: '11th Grade' },
    { id: 3, title: 'Parent-Teacher Meeting', date: '2026-02-28', type: 'meeting', grade: 'All Grades' },
    { id: 4, title: 'Science Exhibition', date: '2026-03-05', type: 'event', grade: 'All Grades' },
    { id: 5, title: 'Field Trip - Science Museum', date: '2026-03-15', type: 'trip', grade: '10th Grade' },
  ];

  const tests: TestItem[] = [
    { id: 1, title: 'Chapter 5 - Quadratic Equations', subject: 'Mathematics', grade: '10th', date: '2026-02-20', duration: '60 min', totalMarks: 50, status: 'active', submissions: 18, totalStudents: 25 },
    { id: 2, title: 'Trigonometry Quiz', subject: 'Mathematics', grade: '11th', date: '2026-02-22', duration: '30 min', totalMarks: 25, status: 'draft' },
    { id: 3, title: 'Calculus Mid-Term', subject: 'Mathematics', grade: '12th', date: '2026-02-15', duration: '90 min', totalMarks: 100, status: 'completed', submissions: 28, totalStudents: 28 },
    { id: 4, title: 'Probability & Statistics', subject: 'Mathematics', grade: '11th', date: '2026-02-10', duration: '45 min', totalMarks: 50, status: 'graded', submissions: 30, totalStudents: 30 },
  ];

  const studentRecords: StudentRecord[] = [
    { id: 1, name: 'Rahul Sharma', grade: '10th', avgScore: 87, attendance: 95, trend: 'up', lastRemark: 'Excellent in problem solving' },
    { id: 2, name: 'Priya Patel', grade: '10th', avgScore: 92, attendance: 98, trend: 'up', lastRemark: 'Consistent top performer' },
    { id: 3, name: 'Amit Kumar', grade: '10th', avgScore: 65, attendance: 78, trend: 'down', lastRemark: 'Needs extra attention in algebra' },
    { id: 4, name: 'Sneha Gupta', grade: '11th', avgScore: 79, attendance: 92, trend: 'stable', lastRemark: 'Good improvement this month' },
    { id: 5, name: 'Vikram Singh', grade: '11th', avgScore: 71, attendance: 85, trend: 'up', lastRemark: 'Active participation in class' },
  ];

  const teacherAssignments: AssignmentItemLocal[] = [
    { id: 1, title: 'Calculus Problem Set #5', subject: 'Mathematics', grade: '12th', deadline: '2026-02-19', submitted: 20, total: 28, status: 'active' },
    { id: 2, title: 'Quadratic Equations Worksheet', subject: 'Mathematics', grade: '10th', deadline: '2026-02-22', submitted: 10, total: 25, status: 'active' },
    { id: 3, title: 'Trigonometry Practice', subject: 'Mathematics', grade: '11th', deadline: '2026-02-15', submitted: 30, total: 30, status: 'graded' },
    { id: 4, title: 'Statistics Project', subject: 'Mathematics', grade: '11th', deadline: '2026-03-01', submitted: 0, total: 30, status: 'draft' },
  ];

  const scheduleItems: { title: string; type: string; time: string; room: string; color: ScheduleColor }[] = [
    { title: '10th Grade Math', type: 'Lecture', time: '09:00 AM', room: 'Room 301', color: 'blue' },
    { title: 'Faculty Meeting', type: 'Discussion', time: '11:30 AM', room: 'Conf Room 1', color: 'purple' },
    { title: '12th Grade Math', type: 'Lecture', time: '02:00 PM', room: 'Room 301', color: 'orange' },
  ];

  const getEventColor = (type: string) => {
    const colors: Record<string, { bg: string; fg: string }> = {
      test: { bg: '#FEE2E2', fg: '#EF4444' },
      assignment: { bg: '#FEF3C7', fg: '#F59E0B' },
      event: { bg: '#DBEAFE', fg: '#3B82F6' },
      trip: { bg: '#D1FAE5', fg: '#10B981' },
      meeting: { bg: '#EDE9FE', fg: '#0D9488' },
    };
    return colors[type] || colors.event;
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'test': return <AssessmentIcon />;
      case 'assignment': return <Assignment />;
      case 'trip': return <Map />;
      case 'meeting': return <VideoCall />;
      default: return <EventIcon />;
    }
  };

  const totalStudents = classes.reduce((sum, c) => sum + c.students, 0);

  return (
    <DashboardLayout
      navItems={TEACHER_NAV}
      greeting={`Good Morning, ${user?.name?.split(' ')[0] || 'Teacher'}!`}
      subtitle={`You have ${teacherAssignments.filter(a => a.status === 'active').length} assignments pending review today.`}
      bottomWidget={<CloudStorageWidget />}
      activeSection={activeSection}
      onSectionChange={handleSectionChange}
    >
      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatBox
            value={totalStudents}
            label="Total Students"
            icon={<Users size={24} />}
            iconBg="bg-primary-50"
            iconColor="text-primary-600"
          />
          <StatBox
            value="92%"
            label="Avg. Attendance"
            icon={<TrendingUp sx={{ fontSize: 24 }} />}
            iconBg="bg-emerald-100"
            iconColor="text-emerald-600"
            extra={
              <div className="flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full w-fit mt-2">
                +3% this week
              </div>
            }
          />
          <StatBox
            value={tests.filter(t => t.status === 'completed').length + teacherAssignments.filter(a => a.status === 'active').length}
            label="To Grade"
            icon={<FileText size={24} />}
            iconBg="bg-orange-100"
            iconColor="text-orange-600"
          />
          <StatBox
            value={classes.length}
            label="Active Classes"
            icon={<BookOpen size={24} />}
            iconBg="bg-blue-100"
            iconColor="text-blue-600"
          />
        </div>

        {/* Main Content + Right Sidebar */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="xl:col-span-2 space-y-6">
            {/* Tabs Section */}
            <motion.div variants={itemVariants}>
              <DashboardPaper>
                <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)} variant="scrollable" scrollButtons="auto" sx={{ mb: 2, borderBottom: 1, borderColor: 'divider', '& .MuiTab-root': { textTransform: 'none', fontWeight: 600 } }}>
                  <Tab label="My Classes" />
                  <Tab label="Test Manager" />
                  <Tab label="Assignments" />
                  <Tab label="Student Performance" />
                </Tabs>

                {/* Tab 0: My Classes */}
                {activeTab === 0 && (
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2, gap: 1, flexWrap: 'wrap' }}>
                      <Button startIcon={<Today />} variant="outlined" onClick={() => setAttendanceDialogOpen(true)} sx={{ borderRadius: 2, textTransform: 'none' }}>
                        Take Attendance
                      </Button>
                      <Button startIcon={<VideoCall />} variant="outlined" onClick={() => setMeetingDialogOpen(true)} sx={{ borderRadius: 2, textTransform: 'none' }}>
                        Schedule Meeting
                      </Button>
                      <Button startIcon={<Description />} variant="outlined" onClick={() => setReportDialogOpen(true)} sx={{ borderRadius: 2, textTransform: 'none' }}>
                        Daily Report
                      </Button>
                    </Box>
                    <Grid container spacing={2}>
                      {classes.map((cls) => (
                        <Grid item xs={12} key={cls.id}>
                          <Card
                            elevation={0}
                            sx={{
                              border: '1px solid rgba(0,0,0,0.06)', borderRadius: 4,
                              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                              '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 12px 24px rgba(0,0,0,0.04)', borderColor: 'var(--primary-main)' }
                            }}
                          >
                            <CardContent sx={{ pb: 1 }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <Box>
                                  <Typography variant="h6" fontWeight="bold">{cls.subject}</Typography>
                                  <Typography color="textSecondary" variant="subtitle2" sx={{ mb: 1 }}>{cls.grade}</Typography>
                                </Box>
                                <IconButton size="small"><MoreVert /></IconButton>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2, flexWrap: 'wrap' }}>
                                <Chip size="small" icon={<GroupIcon />} label={`${cls.students} Students`} sx={{ borderRadius: '8px' }} />
                                <Chip size="small" icon={<AccessTime />} label={cls.nextSession} color="primary" variant="outlined" sx={{ borderRadius: '8px' }} />
                              </Box>
                            </CardContent>
                            <Divider />
                            <CardActions sx={{ px: 2, py: 1.5, flexWrap: 'wrap', gap: 0.5 }}>
                              <Button size="small" sx={{ borderRadius: 2 }}>View Details</Button>
                              <Button size="small" sx={{ borderRadius: 2 }}>Attendance</Button>
                              <Button size="small" sx={{ borderRadius: 2 }}>Grades</Button>
                              <Button size="small" sx={{ borderRadius: 2, ml: 'auto' }} variant="contained" disableElevation startIcon={<AddIcon />}>New Assignment</Button>
                            </CardActions>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}

                {/* Tab 1: Test Manager */}
                {activeTab === 1 && (
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                      <Button startIcon={<AddIcon />} variant="contained" onClick={() => setCreateTestOpen(true)} sx={{ borderRadius: 2, textTransform: 'none' }}>Create Test</Button>
                    </Box>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell><strong>Test</strong></TableCell>
                            <TableCell><strong>Grade</strong></TableCell>
                            <TableCell><strong>Date</strong></TableCell>
                            <TableCell><strong>Duration</strong></TableCell>
                            <TableCell><strong>Marks</strong></TableCell>
                            <TableCell><strong>Submissions</strong></TableCell>
                            <TableCell><strong>Status</strong></TableCell>
                            <TableCell align="right"><strong>Actions</strong></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {tests.map((test) => (
                            <TableRow key={test.id} hover>
                              <TableCell>
                                <Typography variant="body2" fontWeight="600">{test.title}</Typography>
                                <Typography variant="caption" color="text.secondary">{test.subject}</Typography>
                              </TableCell>
                              <TableCell>{test.grade}</TableCell>
                              <TableCell>{test.date}</TableCell>
                              <TableCell>{test.duration}</TableCell>
                              <TableCell>{test.totalMarks}</TableCell>
                              <TableCell>
                                {test.submissions !== undefined ? (
                                  <Box>
                                    <Typography variant="body2">{test.submissions}/{test.totalStudents}</Typography>
                                    <ProgressWithLabel value={Math.round((test.submissions / (test.totalStudents || 1)) * 100)} />
                                  </Box>
                                ) : '-'}
                              </TableCell>
                              <TableCell><StatusChip status={test.status} /></TableCell>
                              <TableCell align="right">
                                <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'flex-end' }}>
                                  {test.status === 'draft' && <IconButton size="small" color="primary"><EditIcon fontSize="small" /></IconButton>}
                                  {test.status === 'completed' && <Button size="small" variant="outlined" sx={{ borderRadius: 2, textTransform: 'none' }}>Grade</Button>}
                                  {test.status === 'graded' && <Button size="small" sx={{ borderRadius: 2, textTransform: 'none' }}>Results</Button>}
                                  <IconButton size="small"><Visibility fontSize="small" /></IconButton>
                                </Box>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                )}

                {/* Tab 2: Assignments */}
                {activeTab === 2 && (
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                      <Button startIcon={<AddIcon />} variant="contained" sx={{ borderRadius: 2, textTransform: 'none' }}>Create Assignment</Button>
                    </Box>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell><strong>Assignment</strong></TableCell>
                            <TableCell><strong>Grade</strong></TableCell>
                            <TableCell><strong>Deadline</strong></TableCell>
                            <TableCell><strong>Submissions</strong></TableCell>
                            <TableCell><strong>Status</strong></TableCell>
                            <TableCell align="right"><strong>Actions</strong></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {teacherAssignments.map((a) => (
                            <TableRow key={a.id} hover>
                              <TableCell>
                                <Typography variant="body2" fontWeight="600">{a.title}</Typography>
                                <Typography variant="caption" color="text.secondary">{a.subject}</Typography>
                              </TableCell>
                              <TableCell>{a.grade}</TableCell>
                              <TableCell>{a.deadline}</TableCell>
                              <TableCell>
                                <Box>
                                  <Typography variant="body2">{a.submitted}/{a.total}</Typography>
                                  <ProgressWithLabel value={Math.round((a.submitted / a.total) * 100)} />
                                </Box>
                              </TableCell>
                              <TableCell><StatusChip status={a.status} /></TableCell>
                              <TableCell align="right">
                                <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'flex-end' }}>
                                  <Button size="small" sx={{ borderRadius: 2, textTransform: 'none' }}>Review</Button>
                                  <IconButton size="small"><EditIcon fontSize="small" /></IconButton>
                                </Box>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                )}

                {/* Tab 3: Student Performance */}
                {activeTab === 3 && (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell><strong>Student</strong></TableCell>
                          <TableCell><strong>Grade</strong></TableCell>
                          <TableCell><strong>Avg Score</strong></TableCell>
                          <TableCell><strong>Attendance</strong></TableCell>
                          <TableCell><strong>Trend</strong></TableCell>
                          <TableCell><strong>Last Remark</strong></TableCell>
                          <TableCell align="right"><strong>Action</strong></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {studentRecords.map((s) => (
                          <TableRow key={s.id} hover>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Avatar sx={{ width: 32, height: 32, fontSize: '0.8rem', bgcolor: '#EFF6FF', color: '#2563EB' }}>
                                  {s.name.split(' ').map(n => n[0]).join('')}
                                </Avatar>
                                <Typography variant="body2" fontWeight="600">{s.name}</Typography>
                              </Box>
                            </TableCell>
                            <TableCell>{s.grade}</TableCell>
                            <TableCell>
                              <ProgressWithLabel value={s.avgScore} color={s.avgScore >= 80 ? '#10B981' : s.avgScore >= 60 ? '#F59E0B' : '#EF4444'} />
                            </TableCell>
                            <TableCell>
                              <ProgressWithLabel value={s.attendance} color={s.attendance >= 90 ? '#10B981' : s.attendance >= 75 ? '#F59E0B' : '#EF4444'} />
                            </TableCell>
                            <TableCell>
                              <TrendingUp sx={{
                                color: s.trend === 'up' ? '#10B981' : s.trend === 'down' ? '#EF4444' : '#6B7280',
                                transform: s.trend === 'down' ? 'rotate(180deg)' : s.trend === 'stable' ? 'rotate(90deg)' : 'none',
                              }} />
                            </TableCell>
                            <TableCell>
                              <Typography variant="caption" sx={{ fontStyle: 'italic' }}>{s.lastRemark}</Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Button size="small" sx={{ borderRadius: 2, textTransform: 'none' }}>View Profile</Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </DashboardPaper>
            </motion.div>

            {/* Quick Actions */}
            <motion.div variants={itemVariants}>
              <DashboardPaper>
                <SectionTitle variant="h6">Quick Actions</SectionTitle>
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={4}>
                    <Button fullWidth variant="outlined" startIcon={<Quiz />} onClick={() => setCreateTestOpen(true)} sx={{ py: 2, borderRadius: 3, textTransform: 'none' }}>
                      Create Test
                    </Button>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Button fullWidth variant="outlined" startIcon={<Assignment />} sx={{ py: 2, borderRadius: 3, textTransform: 'none' }}>
                      New Assignment
                    </Button>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Button fullWidth variant="outlined" startIcon={<Upload />} sx={{ py: 2, borderRadius: 3, textTransform: 'none' }}>
                      Upload Results
                    </Button>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Button fullWidth variant="outlined" startIcon={<VideoCall />} onClick={() => setMeetingDialogOpen(true)} sx={{ py: 2, borderRadius: 3, textTransform: 'none' }}>
                      Schedule Meeting
                    </Button>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Button fullWidth variant="outlined" startIcon={<EditIcon />} sx={{ py: 2, borderRadius: 3, textTransform: 'none' }}>
                      Create Post
                    </Button>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Button fullWidth variant="outlined" startIcon={<Map />} onClick={() => setCreateEventOpen(true)} sx={{ py: 2, borderRadius: 3, textTransform: 'none' }}>
                      Plan Trip/Event
                    </Button>
                  </Grid>
                </Grid>
              </DashboardPaper>
            </motion.div>

            {/* Scheduled Meetings */}
            <motion.div variants={itemVariants}>
              <DashboardPaper>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <SectionTitle variant="h6">Scheduled Meetings</SectionTitle>
                  <Button variant="contained" startIcon={<VideoCall />} onClick={() => setMeetingDialogOpen(true)} sx={{ borderRadius: 2, textTransform: 'none' }}>
                    Schedule New
                  </Button>
                </Box>

                {meetings.length === 0 ? (
                  <Box sx={{ textAlign: 'center', py: 6 }}>
                    <VideoCall sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary" gutterBottom>No meetings scheduled</Typography>
                    <Button variant="contained" startIcon={<AddIcon />} onClick={() => setMeetingDialogOpen(true)} sx={{ borderRadius: 2, mt: 1 }}>
                      Schedule Your First Meeting
                    </Button>
                  </Box>
                ) : (
                  <Grid container spacing={2}>
                    {meetings.map((meeting) => {
                      const isScheduled = meeting.status === 'scheduled';
                      const meetingDateTime = new Date(`${meeting.date} ${meeting.time}`);
                      const now = new Date();
                      const canStart = isScheduled && meetingDateTime <= now;
                      const isPast = meeting.status === 'completed';

                      return (
                        <Grid item xs={12} sm={6} key={meeting.id}>
                          <Card sx={{
                            height: '100%', borderRadius: 3,
                            border: '1px solid', borderColor: canStart ? '#10B981' : 'rgba(0,0,0,0.06)',
                            bgcolor: canStart ? 'rgba(16, 185, 129, 0.04)' : 'background.paper',
                          }}>
                            <CardContent>
                              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                                <Avatar sx={{ bgcolor: canStart ? '#10B981' : isPast ? '#9CA3AF' : '#2563EB', mr: 1.5 }}>
                                  <VideoCall />
                                </Avatar>
                                <Box sx={{ flex: 1 }}>
                                  <Typography variant="h6" fontWeight="bold" gutterBottom>{meeting.title}</Typography>
                                  <Chip label={meeting.type.replace('_', ' ').toUpperCase()} size="small" color="primary" variant="outlined" sx={{ fontSize: '0.7rem', borderRadius: '8px' }} />
                                </Box>
                              </Box>
                              <Divider sx={{ my: 1.5 }} />
                              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <AccessTime sx={{ fontSize: 18, color: 'text.secondary' }} />
                                  <Typography variant="body2" color="text.secondary">
                                    {new Date(meeting.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at {meeting.time}
                                  </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <Schedule sx={{ fontSize: 18, color: 'text.secondary' }} />
                                  <Typography variant="body2" color="text.secondary">{meeting.duration} minutes</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <GroupIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                                  <Typography variant="body2" color="text.secondary">{meeting.grade}</Typography>
                                </Box>
                              </Box>
                              <Divider sx={{ my: 1.5 }} />
                              <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                                {meeting.participants.map((p) => (
                                  <Chip key={p} label={p.charAt(0).toUpperCase() + p.slice(1)} size="small" color="secondary" sx={{ height: 20, fontSize: '0.7rem', borderRadius: '6px' }} />
                                ))}
                              </Box>
                            </CardContent>
                            <CardActions sx={{ p: 2, pt: 0 }}>
                              {canStart ? (
                                <Button fullWidth variant="contained" color="success" startIcon={<VideoCall />} onClick={() => handleStartMeeting(meeting.id)} disabled={startMeetingMutation.isLoading} sx={{ borderRadius: 2, py: 1.5 }}>
                                  Start Meeting Now
                                </Button>
                              ) : isPast ? (
                                <Chip label="Completed" color="default" sx={{ width: '100%', height: 36 }} />
                              ) : (
                                <Chip label={`Starts ${new Date(meetingDateTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`} color="primary" variant="outlined" sx={{ width: '100%', height: 36 }} />
                              )}
                            </CardActions>
                          </Card>
                        </Grid>
                      );
                    })}
                  </Grid>
                )}
              </DashboardPaper>
            </motion.div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Teaching Schedule</h2>
            </div>

            <CalendarWidget />

            {/* Schedule Items */}
            <div>
              {scheduleItems.map((item, i) => (
                <ScheduleItemComponent
                  key={i}
                  title={item.title}
                  subtitle={`${item.room} • ${item.type}`}
                  timeLabel={item.time.split(' ')[0]}
                  timeSubLabel={item.time.split(' ')[1]}
                  color={item.color}
                />
              ))}
            </div>

            {/* Events & Trips */}
            <motion.div variants={itemVariants}>
              <DashboardPaper>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <SectionTitle variant="h6" sx={{ mb: 0 }}>Events & Trips</SectionTitle>
                  <IconButton
                    onClick={() => setCreateEventOpen(true)}
                    sx={{ bgcolor: '#EFF6FF', color: '#2563EB', '&:hover': { bgcolor: '#2563EB', color: 'white' } }}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
                <List disablePadding>
                  {events.map((event) => {
                    const colors = getEventColor(event.type);
                    return (
                      <ListItem
                        key={event.id}
                        sx={{ mb: 1, bgcolor: 'background.paper', borderRadius: 3, border: '1px solid rgba(0,0,0,0.06)', '&:hover': { bgcolor: 'rgba(0,0,0,0.01)' } }}
                        secondaryAction={<IconButton size="small" edge="end"><DeleteIcon fontSize="small" /></IconButton>}
                      >
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: colors.bg, color: colors.fg }}>
                            {getEventIcon(event.type)}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={<Typography variant="subtitle2" fontWeight="600">{event.title}</Typography>}
                          secondary={
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mt: 0.5 }}>
                              <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <AccessTime sx={{ fontSize: 14 }} /> {event.date}
                              </Typography>
                              <Box sx={{ display: 'flex', gap: 0.5 }}>
                                <Chip label={event.grade} size="small" variant="outlined" sx={{ height: 20, fontSize: '0.65rem', borderRadius: '6px' }} />
                              </Box>
                            </Box>
                          }
                        />
                      </ListItem>
                    );
                  })}
                </List>
              </DashboardPaper>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* All Dialogs preserved exactly as before */}
      {/* Create Event Dialog */}
      <Dialog open={createEventOpen} onClose={() => setCreateEventOpen(false)} PaperProps={{ sx: { borderRadius: 3, width: '100%', maxWidth: 500 } }}>
        <DialogTitle sx={{ borderBottom: '1px solid', borderColor: 'divider', pb: 2 }}>
          <Typography variant="h6" fontWeight="bold">Create New Event / Trip</Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: 3 }}>
            <TextField label="Event Title" fullWidth value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
            <TextField label="Date" type="date" fullWidth InputLabelProps={{ shrink: true }} value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} />
            <FormControl fullWidth>
              <InputLabel>Event Type</InputLabel>
              <Select value={newEvent.type} label="Event Type" onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}>
                <MenuItem value="test">Test</MenuItem>
                <MenuItem value="assignment">Assignment</MenuItem>
                <MenuItem value="event">Cultural Event</MenuItem>
                <MenuItem value="trip">Trip</MenuItem>
                <MenuItem value="meeting">Meeting</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Grade</InputLabel>
              <Select value={newEvent.grade} label="Grade" onChange={(e) => setNewEvent({ ...newEvent, grade: e.target.value })}>
                <MenuItem value="10th Grade">10th Grade</MenuItem>
                <MenuItem value="11th Grade">11th Grade</MenuItem>
                <MenuItem value="12th Grade">12th Grade</MenuItem>
                <MenuItem value="All Grades">All Grades</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2.5, pt: 0 }}>
          <Button onClick={() => setCreateEventOpen(false)} sx={{ borderRadius: 2 }}>Cancel</Button>
          <Button onClick={() => setCreateEventOpen(false)} variant="contained" sx={{ borderRadius: 2, px: 3 }}>Create</Button>
        </DialogActions>
      </Dialog>

      {/* Create Test Dialog */}
      <Dialog open={createTestOpen} onClose={() => setCreateTestOpen(false)} PaperProps={{ sx: { borderRadius: 3, width: '100%', maxWidth: 600 } }}>
        <DialogTitle sx={{ borderBottom: '1px solid', borderColor: 'divider', pb: 2 }}>
          <Typography variant="h6" fontWeight="bold">Create New Test</Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: 3 }}>
            <TextField label="Test Title" fullWidth value={newTest.title} onChange={(e) => setNewTest({ ...newTest, title: e.target.value })} />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth><InputLabel>Subject</InputLabel>
                  <Select value={newTest.subject} label="Subject" onChange={(e) => setNewTest({ ...newTest, subject: e.target.value })}>
                    <MenuItem value="Mathematics">Mathematics</MenuItem><MenuItem value="Physics">Physics</MenuItem><MenuItem value="Chemistry">Chemistry</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth><InputLabel>Grade</InputLabel>
                  <Select value={newTest.grade} label="Grade" onChange={(e) => setNewTest({ ...newTest, grade: e.target.value })}>
                    <MenuItem value="10th">10th Grade</MenuItem><MenuItem value="11th">11th Grade</MenuItem><MenuItem value="12th">12th Grade</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}><TextField label="Date" type="date" fullWidth InputLabelProps={{ shrink: true }} value={newTest.date} onChange={(e) => setNewTest({ ...newTest, date: e.target.value })} /></Grid>
              <Grid item xs={6}><TextField label="Duration (min)" type="number" fullWidth value={newTest.duration} onChange={(e) => setNewTest({ ...newTest, duration: e.target.value })} /></Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}><TextField label="Total Marks" type="number" fullWidth value={newTest.totalMarks} onChange={(e) => setNewTest({ ...newTest, totalMarks: e.target.value })} /></Grid>
              <Grid item xs={6}>
                <FormControl fullWidth><InputLabel>Test Type</InputLabel>
                  <Select value={newTest.type} label="Test Type" onChange={(e) => setNewTest({ ...newTest, type: e.target.value })}>
                    <MenuItem value="quiz">Quiz</MenuItem><MenuItem value="unit_test">Unit Test</MenuItem><MenuItem value="mid_term">Mid-Term</MenuItem><MenuItem value="final">Final Exam</MenuItem><MenuItem value="practice">Practice</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2.5, pt: 0 }}>
          <Button onClick={() => setCreateTestOpen(false)} sx={{ borderRadius: 2 }}>Cancel</Button>
          <Button onClick={() => setCreateTestOpen(false)} variant="contained" sx={{ borderRadius: 2, px: 3 }}>Create Test</Button>
        </DialogActions>
      </Dialog>

      <AttendanceModal open={attendanceDialogOpen} onClose={() => setAttendanceDialogOpen(false)} />

      {/* Schedule Meeting Dialog */}
      <Dialog open={meetingDialogOpen} onClose={() => setMeetingDialogOpen(false)} PaperProps={{ sx: { borderRadius: 3, width: '100%', maxWidth: 500 } }}>
        <DialogTitle sx={{ borderBottom: '1px solid', borderColor: 'divider', pb: 2 }}>
          <Typography variant="h6" fontWeight="bold">Schedule Meeting</Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: 3 }}>
            <TextField label="Meeting Title" fullWidth value={newMeeting.title} onChange={(e) => setNewMeeting({ ...newMeeting, title: e.target.value })} />
            <FormControl fullWidth><InputLabel>Meeting Type</InputLabel>
              <Select value={newMeeting.type} label="Meeting Type" onChange={(e) => setNewMeeting({ ...newMeeting, type: e.target.value })}>
                <MenuItem value="live_class">Live Class</MenuItem><MenuItem value="doubt_session">Doubt Session</MenuItem><MenuItem value="ptm">Parent-Teacher Meet</MenuItem><MenuItem value="group_discussion">Group Discussion</MenuItem>
              </Select>
            </FormControl>
            <Grid container spacing={2}>
              <Grid item xs={6}><TextField label="Date" type="date" fullWidth InputLabelProps={{ shrink: true }} value={newMeeting.date} onChange={(e) => setNewMeeting({ ...newMeeting, date: e.target.value })} /></Grid>
              <Grid item xs={6}><TextField label="Time" type="time" fullWidth InputLabelProps={{ shrink: true }} value={newMeeting.time} onChange={(e) => setNewMeeting({ ...newMeeting, time: e.target.value })} /></Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}><TextField label="Duration (min)" type="number" fullWidth value={newMeeting.duration} onChange={(e) => setNewMeeting({ ...newMeeting, duration: e.target.value })} /></Grid>
              <Grid item xs={6}>
                <FormControl fullWidth><InputLabel>Grade</InputLabel>
                  <Select value={newMeeting.grade} label="Grade" onChange={(e) => setNewMeeting({ ...newMeeting, grade: e.target.value })}>
                    <MenuItem value="10th Grade">10th Grade</MenuItem><MenuItem value="11th Grade">11th Grade</MenuItem><MenuItem value="12th Grade">12th Grade</MenuItem><MenuItem value="All Grades">All Grades</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Box sx={{ mt: 1 }}>
              <FormLabel component="legend" sx={{ mb: 1, fontSize: '0.875rem', fontWeight: 600 }}>Who should join? *</FormLabel>
              <FormGroup>
                <FormControlLabel control={<Checkbox checked={newMeeting.participants.includes('students')} onChange={() => handleParticipantToggle('students')} />} label="Students" />
                <FormControlLabel control={<Checkbox checked={newMeeting.participants.includes('parents')} onChange={() => handleParticipantToggle('parents')} />} label="Parents" />
              </FormGroup>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>Selected participants will receive notifications when the meeting starts</Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2.5, pt: 0 }}>
          <Button onClick={() => setMeetingDialogOpen(false)} sx={{ borderRadius: 2 }}>Cancel</Button>
          <Button onClick={handleScheduleMeeting} variant="contained" startIcon={<VideoCall />} disabled={createMeetingMutation.isLoading} sx={{ borderRadius: 2, px: 3 }}>
            {createMeetingMutation.isLoading ? 'Scheduling...' : 'Schedule'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={() => setSuccessMessage('')} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={() => setSuccessMessage('')} severity="success" sx={{ width: '100%' }}>{successMessage}</Alert>
      </Snackbar>
      <Snackbar open={!!errorMessage} autoHideDuration={6000} onClose={() => setErrorMessage('')} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={() => setErrorMessage('')} severity="error" sx={{ width: '100%' }}>{errorMessage}</Alert>
      </Snackbar>

      {/* Daily Report Dialog */}
      <Dialog open={reportDialogOpen} onClose={() => setReportDialogOpen(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle sx={{ borderBottom: '1px solid', borderColor: 'divider', pb: 2 }}>
          <Typography variant="h6" fontWeight="bold">Daily Progress Report</Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: 3 }}>
            <FormControl fullWidth><InputLabel>Select Class</InputLabel>
              <Select label="Select Class">
                {classes.map(c => <MenuItem key={c.id} value={c.grade}>{c.grade} - {c.subject}</MenuItem>)}
              </Select>
            </FormControl>
            <FormControl fullWidth><InputLabel>Select Student</InputLabel>
              <Select label="Select Student">
                {studentRecords.map(s => <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>)}
              </Select>
            </FormControl>
            <Box>
              <Typography variant="subtitle2" gutterBottom>Homework Status</Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Chip label="Done" variant="outlined" clickable color="success" />
                <Chip label="Partial" variant="outlined" clickable color="warning" />
                <Chip label="Not Done" variant="outlined" clickable color="error" />
              </Box>
            </Box>
            <Box>
              <Typography variant="subtitle2" gutterBottom>Daily Rating</Typography>
              <Rating size="large" />
            </Box>
            <TextField label="Teacher Remarks" multiline rows={3} fullWidth />
            <TextField label="Behavior Note (Optional)" multiline rows={2} fullWidth />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={() => setReportDialogOpen(false)} sx={{ borderRadius: 2 }}>Cancel</Button>
          <Button onClick={() => setReportDialogOpen(false)} variant="contained" startIcon={<Send />} sx={{ borderRadius: 2, px: 3 }}>Submit Report</Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
};

export default TeacherDashboard;
