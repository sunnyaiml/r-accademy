
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Badge,
  Tab,
  Tabs,
  CircularProgress,
  Alert,
  Switch,
} from '@mui/material';
import Book from '@mui/icons-material/Book';
import AccessTime from '@mui/icons-material/AccessTime';
import Assignment from '@mui/icons-material/Assignment';
import VideoCall from '@mui/icons-material/VideoCall';
import Chat from '@mui/icons-material/Chat';
import Notifications from '@mui/icons-material/Notifications';
import CalendarMonth from '@mui/icons-material/CalendarMonth';
import CheckCircle from '@mui/icons-material/CheckCircle';
import TrendingUp from '@mui/icons-material/TrendingUp';
import Star from '@mui/icons-material/Star';
import PlayArrow from '@mui/icons-material/PlayArrow';
import Description from '@mui/icons-material/Description';
import ArrowForward from '@mui/icons-material/ArrowForward';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  Calendar,
  GraduationCap,
  Settings,
  PlayCircle,
  Clock,
  Award,
  Target,
  ChevronRight,
  Bell,
  User,
  Lock,
  Globe,
  Moon,
  Mail,
  Shield,
  Eye,
  Download,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { studentService } from '../../services/studentService';
import { getSocket } from '../../utils/socket';
import type { MeetingItem, NotificationItem, AssignmentItem } from '../../types/student.types';
import AssignmentSubmissionModal from '../Assignment/AssignmentSubmissionModal';
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

const STUDENT_NAV: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard' },
  { icon: BookOpen, label: 'Courses' },
  { icon: FileText, label: 'Tests' },
  { icon: Calendar, label: 'Assignments' },
  { icon: GraduationCap, label: 'Grades' },
  { icon: Settings, label: 'Settings' },
];

const ProPlanWidget = () => (
  <div className="bg-gradient-to-br from-primary-600 to-primary-900 rounded-[24px] p-6 text-white shadow-xl shadow-primary-200 relative overflow-hidden group">
    <div className="absolute top-0 right-0 -mr-4 -mt-4 h-24 w-24 bg-white opacity-10 rounded-full blur-2xl group-hover:scale-110 transition-transform" />
    <div className="absolute bottom-0 left-0 -ml-4 -mb-4 h-20 w-20 bg-primary-400 opacity-20 rounded-full blur-xl" />
    <div className="h-10 w-10 bg-white/20 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm shadow-inner">
      <PlayCircle size={20} className="text-white" />
    </div>
    <h3 className="font-extrabold text-lg mb-1 relative z-10">Premium Plan</h3>
    <p className="text-primary-100 text-[11px] mb-5 font-medium relative z-10 leading-relaxed">
      Unlock all advanced features and personalized mentorship.
    </p>
    <button className="w-full bg-white text-primary-600 text-xs font-black py-3 rounded-xl shadow-lg hover:shadow-white/20 hover:-translate-y-1 transition-all active:scale-95 relative z-10 uppercase tracking-widest">
      Go Pro Now
    </button>
  </div>
);

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // UI state
  const [testTab, setTestTab] = useState(0);
  const [submissionModalOpen, setSubmissionModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<AssignmentItem | null>(null);
  const [activeSection, setActiveSection] = useState(0);

  // Get today's date for timetable
  const today = new Date().toISOString().split('T')[0];

  // Fetch all dashboard data with React Query
  const { data: subjects = [], isLoading: loadingSubjects, error: subjectsError } = useQuery(
    'subjects',
    () => studentService.getSubjects().then((r) => r.data)
  );

  const { data: upcomingTests = [] } = useQuery('upcomingTests', () =>
    studentService.getUpcomingTests().then((r) => r.data)
  );

  const { data: pastTests = [] } = useQuery('pastTests', () =>
    studentService.getPastTests().then((r) => r.data)
  );

  const { data: assignments = [] } = useQuery('assignments', () =>
    studentService.getAssignments().then((r) => r.data)
  );

  const { data: meetings = [] } = useQuery('meetings', () =>
    studentService.getMeetings().then((r) => r.data)
  );

  const { data: todayTimetable = [] } = useQuery(['timetable', today], () =>
    studentService.getTimetable(today).then((r) => r.data)
  );

  const { data: notifications = [] } = useQuery('notifications', () =>
    studentService.getNotifications().then((r) => r.data)
  );

  const { data: performanceData = [] } = useQuery('performance', () =>
    studentService.getPerformance().then((r) => r.data)
  );

  const { data: dailyProgress } = useQuery('dailyProgress', () =>
    studentService.getDailyProgress().then((r) => r.data)
  );

  // Mark notification as read mutation
  const markReadMutation = useMutation(
    (id: number) => studentService.markNotificationRead(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('notifications');
      },
    }
  );

  // Handlers
  const handleMarkNotificationRead = (notificationId: number, isRead: boolean) => {
    if (!isRead) {
      markReadMutation.mutate(notificationId);
    }
  };

  const handleStartTest = (testId: number) => {
    navigate(`/student/tests/${testId}/take`);
  };

  const handleJoinMeeting = (meeting: MeetingItem) => {
    const jitsiDomain = process.env.REACT_APP_JITSI_DOMAIN || 'meet.jit.si';
    const roomName = `r-education-${meeting.id}`;
    window.open(`https://${jitsiDomain}/${roomName}`, '_blank');
  };

  // Socket.io listener for real-time notifications
  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    socket.on('new_notification', (notification: NotificationItem) => {
      queryClient.setQueryData('notifications', (old: NotificationItem[] = []) =>
        [notification, ...old]
      );
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(notification.message);
      }
    });

    return () => {
      socket.off('new_notification');
    };
  }, [queryClient]);

  // Show loading state
  if (loadingSubjects) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', bgcolor: '#F0F4F8' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  // Show error state
  if (subjectsError) {
    return (
      <Box sx={{ p: 4, bgcolor: '#F0F4F8', minHeight: '100vh' }}>
        <Alert severity="error">
          Failed to load dashboard data. Please try refreshing the page.
        </Alert>
      </Box>
    );
  }

  // Chat groups placeholder
  const chatGroups = [
    { name: 'Grade 10 - Section A', unread: 5 },
    { name: 'Mathematics Group', unread: 2 },
    { name: 'Physics Group', unread: 0 },
    { name: 'English Group', unread: 8 },
  ];

  const pendingTasks = assignments.filter((a) => a.status === 'pending' || a.status === 'overdue').length;
  const unreadNotifications = notifications.filter((n) => !n.read).length;
  const completedAssignments = assignments.filter((a) => a.status === 'submitted' || a.status === 'graded').length;

  // Map timetable slots to schedule item colors
  const slotColorMap: Record<string, ScheduleColor> = {
    Mathematics: 'blue',
    Science: 'green',
    Physics: 'purple',
    Chemistry: 'orange',
    English: 'indigo',
    'Lunch Break': 'orange',
  };

  // ─── Section 0: Dashboard Overview ──────────────────────────────
  const renderOverview = () => (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatBox
          value={subjects.length || '0'}
          label="Active Subjects"
          icon={<BookOpen size={22} />}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
          extra={
            <div className="h-1.5 w-full bg-gray-100 rounded-full mt-3 overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full transition-all duration-500" style={{ width: '75%' }} />
            </div>
          }
        />
        <StatBox
          value={pendingTasks}
          label="Pending Tasks"
          icon={<FileText size={22} />}
          iconBg="bg-rose-50"
          iconColor="text-rose-500"
          extra={
            pendingTasks > 0 ? (
              <div className="flex items-center text-xs font-semibold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full w-fit mt-2">
                {pendingTasks} due soon
              </div>
            ) : undefined
          }
        />
        <StatBox
          value={dailyProgress?.attendance || '92%'}
          label="Attendance"
          icon={<Target size={22} />}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
          extra={
            <div className="flex items-center text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full w-fit mt-2">
              On track
            </div>
          }
        />
        <StatBox
          value={upcomingTests.length}
          label="Upcoming Tests"
          icon={<Clock size={22} />}
          iconBg="bg-amber-50"
          iconColor="text-amber-600"
          extra={
            <div className="flex items-center text-xs font-semibold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full w-fit mt-2">
              This week
            </div>
          }
        />
      </div>

      {/* Main Content + Right Sidebar */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="xl:col-span-2 space-y-6">
          {/* Today's Progress */}
          <motion.div variants={itemVariants}>
            <DashboardPaper>
              <SectionTitle variant="h6">Today's Progress</SectionTitle>
              <Grid container spacing={3} sx={{ mt: 0.5 }}>
                <Grid item xs={6} sm={2.4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Chip
                      label={dailyProgress?.attendance || 'N/A'}
                      color="success"
                      sx={{ fontWeight: 700, fontSize: '0.85rem', mb: 1, borderRadius: '10px' }}
                    />
                    <Typography variant="caption" display="block" color="text.secondary" fontWeight={500}>Attendance</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={2.4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h5" fontWeight="900" sx={{ color: 'var(--primary-main)' }}>
                      {dailyProgress?.classesAttended ?? 0}/{dailyProgress?.totalClasses ?? 0}
                    </Typography>
                    <Typography variant="caption" display="block" color="text.secondary" fontWeight={500}>Classes</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={2.4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h5" fontWeight="900" sx={{ color: 'var(--secondary-main)' }}>
                      {dailyProgress?.tasksCompleted ?? 0}/{dailyProgress?.totalTasks ?? 0}
                    </Typography>
                    <Typography variant="caption" display="block" color="text.secondary" fontWeight={500}>Tasks</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={2.4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.25 }}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} sx={{ color: star <= (dailyProgress?.todayRating ?? 0) ? '#FFB400' : '#E0E0E0', fontSize: 22 }} />
                      ))}
                    </Box>
                    <Typography variant="caption" display="block" color="text.secondary" fontWeight={500}>Rating</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={2.4}>
                  <Box sx={{ bgcolor: '#F0F4F8', borderRadius: 3, p: 1.5 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic', display: 'block', lineHeight: 1.4 }}>
                      "{dailyProgress?.teacherRemark || 'No remarks for today.'}"
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </DashboardPaper>
          </motion.div>

          {/* Quick Actions */}
          <motion.div variants={itemVariants}>
            <DashboardPaper>
              <SectionTitle variant="h6">Quick Actions</SectionTitle>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: 'View Tests', icon: <FileText size={20} />, color: 'bg-blue-50 text-blue-600 hover:bg-blue-100', section: 2 },
                  { label: 'Assignments', icon: <Calendar size={20} />, color: 'bg-teal-50 text-teal-600 hover:bg-teal-100', section: 3 },
                  { label: 'My Grades', icon: <Award size={20} />, color: 'bg-amber-50 text-amber-600 hover:bg-amber-100', section: 4 },
                  { label: 'My Courses', icon: <BookOpen size={20} />, color: 'bg-violet-50 text-violet-600 hover:bg-violet-100', section: 1 },
                ].map((action) => (
                  <button
                    key={action.label}
                    onClick={() => setActiveSection(action.section)}
                    className={`${action.color} rounded-2xl p-4 flex flex-col items-center gap-2 transition-all duration-200 cursor-pointer border-0 group`}
                  >
                    <div className="group-hover:scale-110 transition-transform">{action.icon}</div>
                    <span className="text-xs font-bold">{action.label}</span>
                  </button>
                ))}
              </div>
            </DashboardPaper>
          </motion.div>

          {/* Upcoming Tests Preview */}
          <motion.div variants={itemVariants}>
            <DashboardPaper>
              <div className="flex justify-between items-center mb-4">
                <SectionTitle variant="h6" sx={{ mb: 0 }}>Upcoming Tests</SectionTitle>
                <Button
                  size="small"
                  endIcon={<ChevronRight size={16} />}
                  onClick={() => setActiveSection(2)}
                  sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
                >
                  View All
                </Button>
              </div>
              {upcomingTests.slice(0, 3).map((test) => (
                <div key={test.id} className="flex items-center justify-between p-3.5 rounded-xl border border-gray-100 mb-2 last:mb-0 hover:border-blue-200 hover:bg-blue-50/30 transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <FileText size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{test.subject} - {test.type}</p>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <CalendarMonth sx={{ fontSize: 13 }} /> {test.date}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <AccessTime sx={{ fontSize: 13 }} /> {test.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                  <StatusChip status={test.status} />
                </div>
              ))}
            </DashboardPaper>
          </motion.div>

          {/* Recent Assignments Preview */}
          <motion.div variants={itemVariants}>
            <DashboardPaper>
              <div className="flex justify-between items-center mb-4">
                <SectionTitle variant="h6" sx={{ mb: 0 }}>Recent Assignments</SectionTitle>
                <Button
                  size="small"
                  endIcon={<ChevronRight size={16} />}
                  onClick={() => setActiveSection(3)}
                  sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
                >
                  View All
                </Button>
              </div>
              {assignments.slice(0, 4).map((a) => (
                <div key={a.id} className="flex items-center justify-between p-3.5 rounded-xl border border-gray-100 mb-2 last:mb-0 hover:border-teal-200 hover:bg-teal-50/30 transition-all">
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${a.status === 'pending' || a.status === 'overdue' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'
                      }`}>
                      <Calendar size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{a.title}</p>
                      <p className="text-xs text-gray-500">{a.subject} &bull; Due: {a.deadline}</p>
                    </div>
                  </div>
                  <StatusChip status={a.status} />
                </div>
              ))}
            </DashboardPaper>
          </motion.div>

          {/* Group Chats */}
          <motion.div variants={itemVariants}>
            <DashboardPaper>
              <SectionTitle variant="h6">Group Chats</SectionTitle>
              <List disablePadding>
                {chatGroups.map((group, i) => (
                  <React.Fragment key={group.name}>
                    <ListItem
                      sx={{ borderRadius: 3, cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}
                      secondaryAction={
                        group.unread > 0 ? (
                          <Badge badgeContent={group.unread} color="error" />
                        ) : (
                          <CheckCircle color="success" sx={{ fontSize: 18 }} />
                        )
                      }
                    >
                      <ListItemIcon>
                        <Avatar sx={{ bgcolor: '#EFF6FF', color: '#2563EB', width: 36, height: 36 }}>
                          <Chat sx={{ fontSize: 18 }} />
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={<Typography variant="body2" fontWeight={group.unread > 0 ? 700 : 400}>{group.name}</Typography>}
                      />
                    </ListItem>
                    {i < chatGroups.length - 1 && <Divider variant="inset" />}
                  </React.Fragment>
                ))}
              </List>
            </DashboardPaper>
          </motion.div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Schedule</h2>
          </div>

          <CalendarWidget />

          {/* Today's Schedule */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Today's Classes</h3>
            </div>
            {todayTimetable.length > 0 ? (
              todayTimetable.map((slot, i) => (
                <ScheduleItemComponent
                  key={i}
                  title={slot.subject}
                  subtitle={`${slot.teacher} • ${slot.room}`}
                  timeLabel={slot.time?.split('-')[0]?.trim() || slot.time}
                  color={slotColorMap[slot.subject] || 'blue'}
                />
              ))
            ) : (
              <div className="text-center py-6 text-gray-400 text-sm bg-gray-50 rounded-xl">
                No classes scheduled for today
              </div>
            )}
          </div>

          {/* Meetings */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Meetings</h3>
            </div>
            {meetings.map((meeting) => (
              <Card
                key={meeting.id}
                elevation={0}
                sx={{ mb: 2, border: '1px solid rgba(0,0,0,0.06)', borderRadius: 3, '&:hover': { borderColor: 'rgba(37,99,235,0.2)' }, transition: '0.2s' }}
              >
                <CardContent sx={{ pb: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                    <Chip label={meeting.type} size="small" variant="outlined" color="info" sx={{ borderRadius: '8px', fontSize: '0.7rem' }} />
                    <StatusChip status={meeting.status} />
                  </Box>
                  <Typography variant="subtitle2" fontWeight="bold" sx={{ mt: 1 }}>
                    {meeting.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block">
                    {meeting.teacher}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                    <AccessTime sx={{ fontSize: 14 }} /> {meeting.time}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    fullWidth
                    variant={meeting.status === 'active' ? 'contained' : 'outlined'}
                    startIcon={<VideoCall />}
                    color={meeting.status === 'active' ? 'success' : 'primary'}
                    onClick={() => meeting.status === 'active' && handleJoinMeeting(meeting)}
                    disabled={meeting.status !== 'active'}
                    sx={{ borderRadius: 2 }}
                  >
                    {meeting.status === 'active' ? 'Join Now' : 'Scheduled'}
                  </Button>
                </CardActions>
              </Card>
            ))}
          </div>

          {/* Notifications */}
          <motion.div variants={itemVariants}>
            <DashboardPaper>
              <SectionTitle variant="h6">Notifications</SectionTitle>
              <List disablePadding>
                {notifications.slice(0, 5).map((notif) => (
                  <ListItem
                    key={notif.id}
                    onClick={() => handleMarkNotificationRead(notif.id, notif.read)}
                    sx={{
                      borderRadius: 3, mb: 1, px: 1.5, py: 1,
                      bgcolor: notif.read ? 'inherit' : 'rgba(37, 99, 235, 0.04)',
                      borderLeft: notif.read ? 'none' : '3px solid',
                      borderColor: '#2563EB',
                      cursor: notif.read ? 'default' : 'pointer',
                      '&:hover': !notif.read ? { bgcolor: 'rgba(37, 99, 235, 0.08)' } : {},
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <Avatar sx={{
                        width: 28, height: 28,
                        bgcolor: notif.type === 'result' ? '#D1FAE5' : notif.type === 'announcement' ? '#DBEAFE' : notif.type === 'reminder' ? '#FEF3C7' : '#FEE2E2',
                      }}>
                        <Notifications sx={{ fontSize: 16, color: notif.type === 'result' ? '#10B981' : notif.type === 'announcement' ? '#3B82F6' : notif.type === 'reminder' ? '#F59E0B' : '#EF4444' }} />
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary={<Typography variant="body2" fontWeight={notif.read ? 400 : 600} sx={{ fontSize: '0.8rem' }}>{notif.message}</Typography>}
                      secondary={<Typography variant="caption" color="text.secondary">{notif.time}</Typography>}
                    />
                  </ListItem>
                ))}
              </List>
              <Button fullWidth sx={{ mt: 1, borderRadius: 2 }} endIcon={<ArrowForward />}>
                View All
              </Button>
            </DashboardPaper>
          </motion.div>

          {/* Study Group CTA */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 text-white relative overflow-hidden group cursor-pointer">
            <div className="absolute right-0 top-0 h-32 w-32 bg-white opacity-5 rounded-full -mr-10 -mt-10 transition-transform group-hover:scale-110" />
            <h3 className="font-bold text-lg mb-1 relative z-10">Join Study Group</h3>
            <p className="text-gray-400 text-xs mb-4 max-w-[180px] relative z-10">
              Collaborate with peers on your current subjects.
            </p>
            <div className="h-8 w-8 rounded-full bg-white text-gray-900 flex items-center justify-center relative z-10 group-hover:bg-blue-500 group-hover:text-white transition-colors">
              <ArrowForward sx={{ fontSize: 18 }} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  // ─── Section 1: Courses ──────────────────────────────────────────
  const renderCourses = () => (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      {/* Header */}
      <motion.div variants={itemVariants}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">My Courses</h2>
            <p className="text-sm text-gray-500 mt-1">You're enrolled in {subjects.length} active courses</p>
          </div>
          <div className="flex gap-2">
            <Chip
              label={`${subjects.length} Active`}
              sx={{ borderRadius: '10px', fontWeight: 600, bgcolor: '#EFF6FF', color: '#2563EB' }}
            />
            <Chip
              label={`${assignments.filter(a => a.status === 'pending').length} Pending Tasks`}
              sx={{ borderRadius: '10px', fontWeight: 600, bgcolor: '#FEF3C7', color: '#D97706' }}
            />
          </div>
        </div>
      </motion.div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {subjects.map((subject) => (
          <motion.div key={subject.id} variants={itemVariants}>
            <DashboardPaper>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Book sx={{ fontSize: 24 }} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900">{subject.name}</h3>
                    <p className="text-xs text-gray-500">Teacher: {subject.teacher}</p>
                  </div>
                </div>
                <Chip
                  size="small"
                  label={`${subject.assignments} tasks`}
                  color={subject.assignments > 0 ? 'error' : 'success'}
                  variant={subject.assignments > 0 ? 'filled' : 'outlined'}
                  sx={{ borderRadius: '8px', fontWeight: 600 }}
                />
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4 bg-gray-50 rounded-xl p-3">
                <AccessTime fontSize="small" sx={{ color: '#2563EB' }} />
                <span>Next Class: <strong className="text-gray-700">{subject.nextClass}</strong></span>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<Description />}
                  sx={{ borderRadius: 2, textTransform: 'none', flex: 1 }}
                >
                  Materials
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<Assignment />}
                  sx={{ borderRadius: 2, textTransform: 'none', flex: 1 }}
                >
                  Assignments
                </Button>
              </div>
            </DashboardPaper>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  // ─── Section 2: Tests ─────────────────────────────────────────────
  const renderTests = () => (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      {/* Header */}
      <motion.div variants={itemVariants}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Test Center</h2>
            <p className="text-sm text-gray-500 mt-1">{upcomingTests.length} upcoming tests &bull; {pastTests.length} past results</p>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div variants={itemVariants}>
        <DashboardPaper>
          <Tabs
            value={testTab}
            onChange={(_, v) => setTestTab(v)}
            sx={{
              mb: 3,
              '& .MuiTab-root': { textTransform: 'none', fontWeight: 600, minHeight: 44 },
              '& .MuiTabs-indicator': { borderRadius: 2, height: 3 },
            }}
          >
            <Tab label={`Upcoming (${upcomingTests.length})`} />
            <Tab label={`Past Results (${pastTests.length})`} />
          </Tabs>

          {testTab === 0 && (
            <div className="space-y-3">
              {upcomingTests.map((test) => (
                <Card
                  key={test.id}
                  elevation={0}
                  sx={{
                    border: '1px solid', borderColor: 'rgba(0,0,0,0.06)', borderRadius: 3,
                    transition: '0.2s',
                    '&:hover': { borderColor: '#2563EB', bgcolor: 'rgba(37, 99, 235, 0.02)' }
                  }}
                >
                  <CardContent sx={{ pb: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Box>
                        <Typography variant="subtitle1" fontWeight="bold" sx={{ color: '#2563EB' }}>
                          {test.subject} - {test.type}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, mt: 0.5, flexWrap: 'wrap' }}>
                          <Typography variant="body2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <CalendarMonth sx={{ fontSize: 16 }} /> {test.date}
                          </Typography>
                          <Typography variant="body2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <AccessTime sx={{ fontSize: 16 }} /> {test.duration}
                          </Typography>
                        </Box>
                      </Box>
                      <StatusChip status={test.status} />
                    </Box>
                    <Box sx={{ mt: 1.5 }}>
                      {test.topics.map((topic) => (
                        <Chip key={topic} label={topic} size="small" sx={{ mr: 0.5, mb: 0.5, borderRadius: '8px', fontSize: '0.75rem' }} />
                      ))}
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Button size="small" sx={{ borderRadius: 2, textTransform: 'none' }}>Study Material</Button>
                    {test.status === 'active' && (
                      <Button
                        size="small"
                        variant="contained"
                        startIcon={<PlayArrow />}
                        onClick={() => handleStartTest(test.id)}
                        sx={{ borderRadius: 2, ml: 'auto', bgcolor: '#2563EB', '&:hover': { bgcolor: '#1E40AF' } }}
                      >
                        Start Test
                      </Button>
                    )}
                  </CardActions>
                </Card>
              ))}
              {upcomingTests.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                  <FileText size={40} className="mx-auto mb-3 opacity-40" />
                  <p className="font-medium">No upcoming tests</p>
                  <p className="text-sm mt-1">You're all caught up!</p>
                </div>
              )}
            </div>
          )}

          {testTab === 1 && (
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ '& th': { fontWeight: 700, color: '#64748B', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' } }}>
                    <TableCell>Subject</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Score</TableCell>
                    <TableCell>Grade</TableCell>
                    <TableCell align="right">Performance</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pastTests.map((test) => (
                    <TableRow key={test.id} hover sx={{ '&:hover': { bgcolor: 'rgba(37,99,235,0.02)' } }}>
                      <TableCell>
                        <Typography variant="body2" fontWeight={600}>{test.subject}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">{test.date}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight={600}>{test.score}</Typography>
                      </TableCell>
                      <TableCell>
                        <Chip label={test.grade} size="small" color={test.percentage >= 80 ? 'success' : test.percentage >= 60 ? 'warning' : 'error'} sx={{ borderRadius: '8px', fontWeight: 700 }} />
                      </TableCell>
                      <TableCell align="right" sx={{ minWidth: 140 }}>
                        <ProgressWithLabel value={test.percentage} color={test.percentage >= 80 ? '#10B981' : test.percentage >= 60 ? '#F59E0B' : '#EF4444'} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DashboardPaper>
      </motion.div>
    </motion.div>
  );

  // ─── Section 3: Assignments ───────────────────────────────────────
  const renderAssignments = () => (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      {/* Header */}
      <motion.div variants={itemVariants}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Assignment Tracker</h2>
            <p className="text-sm text-gray-500 mt-1">
              {completedAssignments} completed &bull; {pendingTasks} pending &bull; {assignments.length} total
            </p>
          </div>
          <div className="flex gap-2">
            <Chip
              icon={<CheckCircle sx={{ fontSize: 16 }} />}
              label={`${completedAssignments} Done`}
              sx={{ borderRadius: '10px', fontWeight: 600, bgcolor: '#D1FAE5', color: '#059669' }}
            />
            <Chip
              icon={<Clock size={14} />}
              label={`${pendingTasks} Pending`}
              sx={{ borderRadius: '10px', fontWeight: 600, bgcolor: '#FEF3C7', color: '#D97706' }}
            />
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <motion.div variants={itemVariants}>
          <StatBox
            value={completedAssignments}
            label="Completed"
            icon={<CheckCircle sx={{ fontSize: 22, color: '#10B981' }} />}
            iconBg="bg-emerald-50"
            iconColor="text-emerald-600"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatBox
            value={pendingTasks}
            label="Pending"
            icon={<Clock size={22} />}
            iconBg="bg-amber-50"
            iconColor="text-amber-600"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatBox
            value={assignments.filter(a => a.status === 'overdue').length}
            label="Overdue"
            icon={<FileText size={22} />}
            iconBg="bg-rose-50"
            iconColor="text-rose-500"
          />
        </motion.div>
      </div>

      {/* Assignment Table */}
      <motion.div variants={itemVariants}>
        <DashboardPaper>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ '& th': { fontWeight: 700, color: '#64748B', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' } }}>
                  <TableCell>Assignment</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell>Deadline</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {assignments.map((a) => (
                  <TableRow key={a.id} hover sx={{ '&:hover': { bgcolor: 'rgba(37,99,235,0.02)' } }}>
                    <TableCell>
                      <Typography variant="body2" fontWeight="600">{a.title}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">{a.subject}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">{a.deadline}</Typography>
                    </TableCell>
                    <TableCell>
                      <StatusChip status={a.status} />
                      {a.marks && <Typography variant="caption" sx={{ ml: 1 }}>{a.marks}</Typography>}
                    </TableCell>
                    <TableCell align="right">
                      {(a.status === 'pending' || a.status === 'overdue') && (
                        <Button
                          size="small"
                          variant="contained"
                          onClick={() => {
                            setSelectedAssignment(a);
                            setSubmissionModalOpen(true);
                          }}
                          sx={{ borderRadius: 2, textTransform: 'none', bgcolor: '#2563EB', '&:hover': { bgcolor: '#1E40AF' } }}
                        >
                          Submit
                        </Button>
                      )}
                      {a.status === 'graded' && (
                        <Button size="small" variant="outlined" sx={{ borderRadius: 2, textTransform: 'none' }}>
                          View Feedback
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DashboardPaper>
      </motion.div>
    </motion.div>
  );

  // ─── Section 4: Grades / Performance ──────────────────────────────
  const renderGrades = () => (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      {/* Header */}
      <motion.div variants={itemVariants}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Academic Performance</h2>
            <p className="text-sm text-gray-500 mt-1">Track your progress across all subjects</p>
          </div>
          <Button
            variant="outlined"
            size="small"
            startIcon={<Download size={16} />}
            sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
          >
            Download Report
          </Button>
        </div>
      </motion.div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <motion.div variants={itemVariants}>
          <StatBox
            value={performanceData.length > 0 ? `${Math.round(performanceData.reduce((sum, p) => sum + p.avg, 0) / performanceData.length)}%` : 'N/A'}
            label="Overall Average"
            icon={<Award size={22} />}
            iconBg="bg-blue-50"
            iconColor="text-blue-600"
            gradient="linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatBox
            value={pastTests.length}
            label="Tests Completed"
            icon={<FileText size={22} />}
            iconBg="bg-teal-50"
            iconColor="text-teal-600"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatBox
            value={performanceData.filter(p => p.avg >= 80).length}
            label="Subjects Above 80%"
            icon={<TrendingUp sx={{ fontSize: 22 }} />}
            iconBg="bg-emerald-50"
            iconColor="text-emerald-600"
          />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subject Performance */}
        <motion.div variants={itemVariants}>
          <DashboardPaper>
            <SectionTitle variant="h6">Subject Performance</SectionTitle>
            <div className="space-y-4">
              {performanceData.map((p) => (
                <div key={p.subject} className="p-3 rounded-xl border border-gray-100 hover:border-blue-100 transition-colors">
                  <div className="flex justify-between items-center mb-2">
                    <Typography variant="body2" fontWeight="700">{p.subject}</Typography>
                    <div className="flex items-center gap-1.5">
                      <Typography variant="body2" fontWeight="bold" sx={{ color: p.avg >= 80 ? '#10B981' : p.avg >= 60 ? '#F59E0B' : '#EF4444' }}>
                        {p.avg}%
                      </Typography>
                      <TrendingUp sx={{
                        fontSize: 16,
                        color: p.trend === 'up' ? '#10B981' : '#EF4444',
                        transform: p.trend === 'down' ? 'rotate(180deg)' : 'none'
                      }} />
                    </div>
                  </div>
                  <ProgressWithLabel
                    value={p.avg}
                    color={p.avg >= 80 ? '#10B981' : p.avg >= 60 ? '#F59E0B' : '#EF4444'}
                  />
                </div>
              ))}
            </div>
          </DashboardPaper>
        </motion.div>

        {/* Test Results History */}
        <motion.div variants={itemVariants}>
          <DashboardPaper>
            <SectionTitle variant="h6">Recent Test Results</SectionTitle>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ '& th': { fontWeight: 700, color: '#64748B', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' } }}>
                    <TableCell>Subject</TableCell>
                    <TableCell>Score</TableCell>
                    <TableCell>Grade</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pastTests.map((test) => (
                    <TableRow key={test.id} hover sx={{ '&:hover': { bgcolor: 'rgba(37,99,235,0.02)' } }}>
                      <TableCell>
                        <Typography variant="body2" fontWeight={600}>{test.subject}</Typography>
                        <Typography variant="caption" color="text.secondary">{test.date}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight={700} sx={{ color: test.percentage >= 80 ? '#10B981' : test.percentage >= 60 ? '#F59E0B' : '#EF4444' }}>
                          {test.score}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={test.grade}
                          size="small"
                          color={test.percentage >= 80 ? 'success' : test.percentage >= 60 ? 'warning' : 'error'}
                          sx={{ borderRadius: '8px', fontWeight: 700 }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DashboardPaper>
        </motion.div>
      </div>
    </motion.div>
  );

  // ─── Section 5: Settings ──────────────────────────────────────────
  const renderSettings = () => (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <motion.div variants={itemVariants}>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
          <p className="text-sm text-gray-500 mt-1">Manage your account preferences</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile */}
        <motion.div variants={itemVariants}>
          <DashboardPaper>
            <SectionTitle variant="h6">Profile Information</SectionTitle>
            <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-2xl">
              <Avatar sx={{ width: 64, height: 64, bgcolor: '#2563EB', fontSize: '1.5rem', fontWeight: 700 }}>
                {user?.name?.charAt(0) || 'S'}
              </Avatar>
              <div>
                <h3 className="text-lg font-bold text-gray-900">{user?.name || 'Student'}</h3>
                <p className="text-sm text-gray-500">{user?.email || 'student@r-academy.com'}</p>
                <Chip label="Student" size="small" sx={{ mt: 0.5, borderRadius: '8px', bgcolor: '#EFF6FF', color: '#2563EB', fontWeight: 600 }} />
              </div>
            </div>
            <div className="space-y-3">
              {[
                { icon: <User size={18} />, label: 'Full Name', value: user?.name || 'Student' },
                { icon: <Mail size={18} />, label: 'Email', value: user?.email || 'student@r-academy.com' },
                { icon: <GraduationCap size={18} />, label: 'Grade', value: 'Grade 10 - Section A' },
                { icon: <Calendar size={18} />, label: 'Enrolled Since', value: 'June 2024' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between p-3 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="text-gray-400">{item.icon}</div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">{item.label}</p>
                      <p className="text-sm font-semibold text-gray-900">{item.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </DashboardPaper>
        </motion.div>

        {/* Preferences */}
        <motion.div variants={itemVariants}>
          <DashboardPaper>
            <SectionTitle variant="h6">Preferences</SectionTitle>
            <div className="space-y-1">
              {[
                { icon: <Bell size={18} />, label: 'Push Notifications', desc: 'Receive notifications for tests and assignments' },
                { icon: <Mail size={18} />, label: 'Email Alerts', desc: 'Get email updates for important events' },
                { icon: <Moon size={18} />, label: 'Dark Mode', desc: 'Switch to dark theme' },
                { icon: <Globe size={18} />, label: 'Language', desc: 'English (US)' },
              ].map((item, i) => (
                <div key={item.label} className="flex items-center justify-between p-3.5 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">{item.icon}</div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                  {i < 3 ? (
                    <Switch defaultChecked={i < 2} size="small" />
                  ) : (
                    <ChevronRight size={18} className="text-gray-400" />
                  )}
                </div>
              ))}
            </div>
          </DashboardPaper>

          {/* Security */}
          <DashboardPaper sx={{ mt: 3 }}>
            <SectionTitle variant="h6">Security</SectionTitle>
            <div className="space-y-1">
              {[
                { icon: <Lock size={18} />, label: 'Change Password', desc: 'Update your account password' },
                { icon: <Shield size={18} />, label: 'Two-Factor Auth', desc: 'Add extra security to your account' },
                { icon: <Eye size={18} />, label: 'Login Activity', desc: 'View recent login sessions' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between p-3.5 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center">{item.icon}</div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-gray-400" />
                </div>
              ))}
            </div>
          </DashboardPaper>
        </motion.div>
      </div>
    </motion.div>
  );

  // ─── Section Router ──────────────────────────────────────────────
  const renderSection = () => {
    switch (activeSection) {
      case 0: return renderOverview();
      case 1: return renderCourses();
      case 2: return renderTests();
      case 3: return renderAssignments();
      case 4: return renderGrades();
      case 5: return renderSettings();
      default: return renderOverview();
    }
  };

  return (
    <DashboardLayout
      navItems={STUDENT_NAV}
      greeting={`Welcome back, ${user?.name?.split(' ')[0] || 'Student'}!`}
      subtitle={`You have ${pendingTasks} pending tasks and ${upcomingTests.length} upcoming tests.`}
      bottomWidget={<ProPlanWidget />}
      notificationCount={unreadNotifications}
      activeSection={activeSection}
      onSectionChange={setActiveSection}
    >
      {renderSection()}

      {/* Assignment Submission Modal */}
      {selectedAssignment && (
        <AssignmentSubmissionModal
          open={submissionModalOpen}
          onClose={() => {
            setSubmissionModalOpen(false);
            setSelectedAssignment(null);
          }}
          assignmentId={selectedAssignment.id}
          assignmentTitle={selectedAssignment.title}
        />
      )}
    </DashboardLayout>
  );
};

export default StudentDashboard;
