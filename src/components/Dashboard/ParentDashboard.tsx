
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
  Chip,
  Button,
  Card,
  CardContent,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  IconButton,
} from '@mui/material';
import ChildCare from '@mui/icons-material/ChildCare';
import Assignment from '@mui/icons-material/Assignment';
import EventNote from '@mui/icons-material/EventNote';
import Poll from '@mui/icons-material/Poll';
import Notifications from '@mui/icons-material/Notifications';
import School from '@mui/icons-material/School';
import Grade from '@mui/icons-material/Grade';
import Star from '@mui/icons-material/Star';
import TrendingUp from '@mui/icons-material/TrendingUp';
import Chat from '@mui/icons-material/Chat';
import Send from '@mui/icons-material/Send';
import AccessTime from '@mui/icons-material/AccessTime';
import Download from '@mui/icons-material/Download';
import Payment from '@mui/icons-material/Payment';
import Receipt from '@mui/icons-material/Receipt';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  FileText,
  ClipboardList,
  CalendarCheck,
  Wallet,
  Phone as PhoneIcon,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import DashboardLayout, { NavItem } from '../common/DashboardLayout';
import {
  DashboardPaper,
  StatBox,
  SectionTitle,
  StatusChip,
  ProgressWithLabel,
  containerVariants,
  itemVariants,
} from '../common/DashboardComponents';

const PARENT_NAV: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard' },
  { icon: FileText, label: 'Reports' },
  { icon: ClipboardList, label: 'Tests' },
  { icon: CalendarCheck, label: 'Attendance' },
  { icon: Wallet, label: 'Fees' },
  { icon: PhoneIcon, label: 'Contact' },
];

interface DailyReport {
  date: string;
  attendance: 'Present' | 'Absent' | 'Late';
  classesAttended: number;
  totalClasses: number;
  homeworkStatus: 'Done' | 'Partial' | 'Not Done';
  rating: number;
  teacherRemark: string;
  behaviorNote?: string;
}

interface TestResult {
  id: number;
  subject: string;
  testName: string;
  date: string;
  score: string;
  percentage: number;
  grade: string;
  classAvg: number;
}

interface AnnouncementItem {
  id: number;
  title: string;
  message: string;
  by: string;
  date: string;
  type: 'school' | 'class' | 'teacher';
}

interface EventItem {
  id: number;
  title: string;
  date: string;
  type: string;
  description: string;
  requiresPermission?: boolean;
  permissionStatus?: 'pending' | 'approved' | 'declined';
}

const ParentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [messageText, setMessageText] = useState('');

  const childInfo = {
    name: 'Rahul Sharma',
    grade: 'Grade 10 - Section A',
    rollNo: '001',
    gpa: '3.8',
    attendance: 94,
    rank: 5,
    totalStudents: 25,
  };

  const dailyReports: DailyReport[] = [
    { date: '2026-02-17', attendance: 'Present', classesAttended: 5, totalClasses: 5, homeworkStatus: 'Done', rating: 4, teacherRemark: 'Good participation in Mathematics class today.', behaviorNote: 'Very helpful to classmates' },
    { date: '2026-02-16', attendance: 'Present', classesAttended: 4, totalClasses: 5, homeworkStatus: 'Partial', rating: 3, teacherRemark: 'Needs to submit Physics lab report.' },
    { date: '2026-02-15', attendance: 'Late', classesAttended: 5, totalClasses: 5, homeworkStatus: 'Done', rating: 4, teacherRemark: 'Excellent performance in Chemistry test.' },
    { date: '2026-02-14', attendance: 'Present', classesAttended: 5, totalClasses: 5, homeworkStatus: 'Done', rating: 5, teacherRemark: 'Outstanding work on English essay. Best in class!' },
    { date: '2026-02-13', attendance: 'Absent', classesAttended: 0, totalClasses: 5, homeworkStatus: 'Not Done', rating: 0, teacherRemark: 'Student was absent. Please share reason.', behaviorNote: 'Absent - medical leave reported by parent' },
  ];

  const testResults: TestResult[] = [
    { id: 1, subject: 'Mathematics', testName: 'Unit Test - Ch.5', date: '2026-02-10', score: '42/50', percentage: 84, grade: 'A', classAvg: 72 },
    { id: 2, subject: 'Physics', testName: 'Quiz - Mechanics', date: '2026-02-08', score: '38/50', percentage: 76, grade: 'B+', classAvg: 68 },
    { id: 3, subject: 'Chemistry', testName: 'Mid-Term', date: '2026-02-05', score: '90/100', percentage: 90, grade: 'A+', classAvg: 75 },
    { id: 4, subject: 'English', testName: 'Literature Essay', date: '2026-02-01', score: '35/50', percentage: 70, grade: 'B', classAvg: 65 },
    { id: 5, subject: 'Computer Science', testName: 'Project Evaluation', date: '2026-01-28', score: '18/20', percentage: 90, grade: 'A+', classAvg: 82 },
  ];

  const attendanceCalendar = [
    { date: 1, status: 'present' }, { date: 2, status: 'present' }, { date: 3, status: 'present' },
    { date: 4, status: 'present' }, { date: 5, status: 'absent' }, { date: 6, status: 'weekend' },
    { date: 7, status: 'weekend' }, { date: 8, status: 'present' }, { date: 9, status: 'present' },
    { date: 10, status: 'late' }, { date: 11, status: 'present' }, { date: 12, status: 'present' },
    { date: 13, status: 'holiday' }, { date: 14, status: 'present' }, { date: 15, status: 'present' },
    { date: 16, status: 'present' }, { date: 17, status: 'present' },
  ];

  const announcements: AnnouncementItem[] = [
    { id: 1, title: 'Mid-Term Schedule Released', message: 'Mid-term examinations will be held from March 1-10. Detailed schedule is available on the student portal.', by: 'Principal', date: '2026-02-16', type: 'school' },
    { id: 2, title: 'Science Exhibition', message: 'Annual Science Exhibition will be held on March 15. Students are encouraged to participate.', by: 'Vice Principal', date: '2026-02-15', type: 'school' },
    { id: 3, title: 'Extra Mathematics Class', message: 'Additional class for quadratic equations on Saturday 10 AM.', by: 'Dr. Robert Smith', date: '2026-02-14', type: 'class' },
    { id: 4, title: 'PTM Scheduled', message: 'Parent-Teacher meeting scheduled for Feb 28, 10:00 AM - 1:00 PM.', by: 'Class Teacher', date: '2026-02-13', type: 'teacher' },
  ];

  const upcomingEvents: EventItem[] = [
    { id: 1, title: 'Parent-Teacher Meeting', date: '2026-02-28', type: 'meeting', description: '10:00 AM - 1:00 PM, School Auditorium' },
    { id: 2, title: 'Field Trip - Science Museum', date: '2026-03-15', type: 'trip', description: 'Full day trip. Bus leaves at 8 AM.', requiresPermission: true, permissionStatus: 'pending' },
    { id: 3, title: 'Mid-Term Examinations', date: '2026-03-01', type: 'exam', description: 'March 1-10, as per schedule' },
    { id: 4, title: 'Annual Sports Day', date: '2026-03-20', type: 'event', description: 'Full day event at school grounds' },
    { id: 5, title: 'Summer Break', date: '2026-04-15', type: 'holiday', description: 'April 15 - June 15' },
  ];

  const feeStatus = [
    { term: 'Term 1 (Apr-Jul)', amount: 15000, status: 'paid', date: '2025-04-05', dueDate: '' },
    { term: 'Term 2 (Aug-Nov)', amount: 15000, status: 'paid', date: '2025-08-03', dueDate: '' },
    { term: 'Term 3 (Dec-Mar)', amount: 15000, status: 'pending', date: '-', dueDate: '2026-01-05' },
  ];

  const teacherContacts = [
    { name: 'Dr. Robert Smith', subject: 'Mathematics (Class Teacher)', avatar: 'RS' },
    { name: 'Ms. Emily Chen', subject: 'Physics', avatar: 'EC' },
    { name: 'Mr. James Wilson', subject: 'English', avatar: 'JW' },
    { name: 'Dr. Lisa Park', subject: 'Chemistry', avatar: 'LP' },
  ];

  const getAttendanceColor = (status: string) => {
    switch (status) {
      case 'present': return '#4caf50';
      case 'absent': return '#f44336';
      case 'late': return '#ff9800';
      case 'holiday': return '#9e9e9e';
      case 'weekend': return '#e0e0e0';
      default: return 'transparent';
    }
  };

  return (
    <DashboardLayout
      navItems={PARENT_NAV}
      greeting={`Welcome back, ${user?.name ? user.name.split(' ')[0] : 'Parent'}!`}
      subtitle="Monitor your child's academic progress"
    >
      <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <Grid container spacing={3}>
            {/* Child Overview */}
            <Grid item xs={12} md={4}>
              <motion.div variants={itemVariants}>
                <DashboardPaper sx={{ textAlign: 'center', height: '100%', position: 'relative', overflow: 'hidden' }}>
                  <Box sx={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '80px',
                    background: 'linear-gradient(135deg, #FFD54F 0%, #FF9800 100%)',
                    zIndex: 0
                  }} />
                  <Avatar sx={{ width: 80, height: 80, mx: 'auto', mb: 2, mt: 4, bgcolor: 'secondary.main', border: '4px solid white', position: 'relative', zIndex: 1, boxShadow: 3 }}>
                    <ChildCare fontSize="large" />
                  </Avatar>
                  <Typography variant="h5" fontWeight="bold">{childInfo.name}</Typography>
                  <Typography color="textSecondary" variant="body2" sx={{ mb: 1 }}>{childInfo.grade}</Typography>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                    <Chip icon={<School />} label={`Roll: ${childInfo.rollNo}`} size="small" variant="outlined" sx={{ borderRadius: 2 }} />
                    <Chip icon={<Grade />} label={`GPA: ${childInfo.gpa}`} size="small" color="secondary" variant="outlined" sx={{ borderRadius: 2 }} />
                    <Chip icon={<TrendingUp />} label={`Rank: ${childInfo.rank}/${childInfo.totalStudents}`} size="small" color="primary" variant="outlined" sx={{ borderRadius: 2 }} />
                  </Box>
                  <List dense>
                    <ListItem>
                      <ListItemIcon><Poll color="primary" /></ListItemIcon>
                      <ListItemText primary="Current GPA" secondary={childInfo.gpa} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><EventNote color="secondary" /></ListItemIcon>
                      <ListItemText primary="Attendance" secondary={`${childInfo.attendance}%`} />
                    </ListItem>
                  </List>
                </DashboardPaper>
              </motion.div>
            </Grid>

            {/* Quick Stats */}
            <Grid item xs={12} md={8}>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={3}>
                  <StatBox value="P" label="Today's Attendance" icon={<EventNote sx={{ fontSize: 36 }} />} gradient="linear-gradient(135deg, #00B4DB 0%, #0083B0 100%)" />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <StatBox value="2" label="Pending Tasks" icon={<Assignment sx={{ fontSize: 36 }} />} gradient="linear-gradient(135deg, #F9D423 0%, #FF4E50 100%)" />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <StatBox value="84%" label="Avg. Score" icon={<Poll sx={{ fontSize: 36 }} />} gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <StatBox value="3" label="Notifications" icon={<Notifications sx={{ fontSize: 36 }} />} gradient="linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%)" />
                </Grid>
              </Grid>

              {/* Today's Report Quick View */}
              <Box sx={{ mt: 3 }}>
                <motion.div variants={itemVariants}>
                  <DashboardPaper>
                    <SectionTitle variant="h6">Today's Report</SectionTitle>
                    <Grid container spacing={2} sx={{ mt: 0.5 }}>
                      <Grid item xs={4} sm={2}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Chip label={dailyReports[0].attendance} color="success" size="small" sx={{ fontWeight: 700 }} />
                          <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 0.5 }}>Status</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={4} sm={2}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="h6" fontWeight="bold" color="primary.main">
                            {dailyReports[0].classesAttended}/{dailyReports[0].totalClasses}
                          </Typography>
                          <Typography variant="caption" display="block" color="text.secondary">Classes</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={4} sm={2}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Chip label={dailyReports[0].homeworkStatus} color={dailyReports[0].homeworkStatus === 'Done' ? 'success' : dailyReports[0].homeworkStatus === 'Partial' ? 'warning' : 'error'} size="small" sx={{ fontWeight: 700 }} />
                          <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 0.5 }}>Homework</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6} sm={2}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.25 }}>
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star key={s} sx={{ color: s <= dailyReports[0].rating ? '#FFB400' : '#E0E0E0', fontSize: 18 }} />
                            ))}
                          </Box>
                          <Typography variant="caption" display="block" color="text.secondary">Rating</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Box sx={{ bgcolor: 'grey.50', borderRadius: 2, p: 1.5 }}>
                          <Typography variant="caption" sx={{ fontStyle: 'italic', lineHeight: 1.4 }}>
                            "{dailyReports[0].teacherRemark}"
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </DashboardPaper>
                </motion.div>
              </Box>
            </Grid>

            {/* Main Content Tabs */}
            <Grid item xs={12}>
              <motion.div variants={itemVariants}>
                <DashboardPaper>
                  <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)} variant="scrollable" scrollButtons="auto" sx={{ mb: 2, borderBottom: 1, borderColor: 'divider' }}>
                    <Tab label="Daily Reports" />
                    <Tab label="Test Results" />
                    <Tab label="Attendance" />
                    <Tab label="Fee Status" />
                  </Tabs>

                  {/* Tab 0: Daily Reports */}
                  {activeTab === 0 && (
                    <Box>
                      {dailyReports.map((report, i) => (
                        <Card key={i} elevation={0} sx={{ mb: 2, border: '1px solid', borderColor: 'divider', borderRadius: 3 }}>
                          <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                              <Typography variant="subtitle1" fontWeight="bold">{report.date}</Typography>
                              <Chip
                                label={report.attendance}
                                size="small"
                                color={report.attendance === 'Present' ? 'success' : report.attendance === 'Late' ? 'warning' : 'error'}
                                sx={{ fontWeight: 600 }}
                              />
                            </Box>
                            <Grid container spacing={2}>
                              <Grid item xs={4} sm={2}>
                                <Typography variant="caption" color="text.secondary">Classes</Typography>
                                <Typography variant="body2" fontWeight="600">{report.classesAttended}/{report.totalClasses}</Typography>
                              </Grid>
                              <Grid item xs={4} sm={2}>
                                <Typography variant="caption" color="text.secondary">Homework</Typography>
                                <Chip label={report.homeworkStatus} size="small"
                                  color={report.homeworkStatus === 'Done' ? 'success' : report.homeworkStatus === 'Partial' ? 'warning' : 'error'}
                                  sx={{ height: 22, fontSize: '0.7rem', fontWeight: 600 }} />
                              </Grid>
                              <Grid item xs={4} sm={2}>
                                <Typography variant="caption" color="text.secondary">Rating</Typography>
                                <Box sx={{ display: 'flex', gap: 0.1 }}>
                                  {[1, 2, 3, 4, 5].map((s) => (
                                    <Star key={s} sx={{ color: s <= report.rating ? '#FFB400' : '#E0E0E0', fontSize: 16 }} />
                                  ))}
                                </Box>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <Typography variant="caption" color="text.secondary">Teacher Remark</Typography>
                                <Typography variant="body2" sx={{ fontStyle: 'italic' }}>"{report.teacherRemark}"</Typography>
                                {report.behaviorNote && (
                                  <Typography variant="caption" color="info.main" display="block" sx={{ mt: 0.5 }}>
                                    Note: {report.behaviorNote}
                                  </Typography>
                                )}
                              </Grid>
                            </Grid>
                          </CardContent>
                        </Card>
                      ))}
                    </Box>
                  )}

                  {/* Tab 1: Test Results */}
                  {activeTab === 1 && (
                    <Box>
                      <TableContainer>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell><strong>Subject</strong></TableCell>
                              <TableCell><strong>Test</strong></TableCell>
                              <TableCell><strong>Date</strong></TableCell>
                              <TableCell><strong>Score</strong></TableCell>
                              <TableCell><strong>Grade</strong></TableCell>
                              <TableCell><strong>Class Avg</strong></TableCell>
                              <TableCell><strong>Performance</strong></TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {testResults.map((t) => (
                              <TableRow key={t.id} hover>
                                <TableCell><Typography variant="body2" fontWeight="600">{t.subject}</Typography></TableCell>
                                <TableCell>{t.testName}</TableCell>
                                <TableCell>{t.date}</TableCell>
                                <TableCell>{t.score}</TableCell>
                                <TableCell>
                                  <Chip label={t.grade} size="small" color={t.percentage >= 80 ? 'success' : t.percentage >= 60 ? 'warning' : 'error'} sx={{ borderRadius: 1, fontWeight: 700 }} />
                                </TableCell>
                                <TableCell>{t.classAvg}%</TableCell>
                                <TableCell>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <ProgressWithLabel value={t.percentage} color={t.percentage >= 80 ? '#4caf50' : t.percentage >= 60 ? '#ff9800' : '#f44336'} />
                                    {t.percentage > t.classAvg ? (
                                      <Chip label={`+${t.percentage - t.classAvg}%`} size="small" color="success" variant="outlined" sx={{ height: 20, fontSize: '0.65rem' }} />
                                    ) : (
                                      <Chip label={`${t.percentage - t.classAvg}%`} size="small" color="error" variant="outlined" sx={{ height: 20, fontSize: '0.65rem' }} />
                                    )}
                                  </Box>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      <Box sx={{ mt: 2, textAlign: 'center' }}>
                        <Button variant="outlined" startIcon={<Download />} sx={{ borderRadius: 2 }}>
                          Download Report Card (PDF)
                        </Button>
                      </Box>
                    </Box>
                  )}

                  {/* Tab 2: Attendance Calendar */}
                  {activeTab === 2 && (
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>February 2026</Typography>
                      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
                        {['Present', 'Absent', 'Late', 'Holiday', 'Weekend'].map((label) => (
                          <Box key={label} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: getAttendanceColor(label.toLowerCase()) }} />
                            <Typography variant="caption">{label}</Typography>
                          </Box>
                        ))}
                      </Box>
                      <Grid container spacing={1}>
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                          <Grid item xs={12 / 7} key={day}>
                            <Typography variant="caption" fontWeight="bold" align="center" display="block">{day}</Typography>
                          </Grid>
                        ))}
                        {/* Feb 2026 starts on Sunday, so 6 empty cells */}
                        {[...Array(6)].map((_, i) => (
                          <Grid item xs={12 / 7} key={`empty-${i}`}><Box sx={{ height: 40 }} /></Grid>
                        ))}
                        {attendanceCalendar.map((day) => (
                          <Grid item xs={12 / 7} key={day.date}>
                            <Box sx={{
                              height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
                              borderRadius: '50%', bgcolor: getAttendanceColor(day.status),
                              color: day.status === 'weekend' ? 'text.disabled' : '#fff',
                              fontWeight: 600, fontSize: '0.8rem',
                              mx: 'auto', width: 40,
                            }}>
                              {day.date}
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                      <Divider sx={{ my: 3 }} />
                      <Grid container spacing={2}>
                        <Grid item xs={3}>
                          <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h5" fontWeight="bold" color="success.main">11</Typography>
                            <Typography variant="caption" color="text.secondary">Present</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={3}>
                          <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h5" fontWeight="bold" color="error.main">1</Typography>
                            <Typography variant="caption" color="text.secondary">Absent</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={3}>
                          <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h5" fontWeight="bold" color="warning.main">1</Typography>
                            <Typography variant="caption" color="text.secondary">Late</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={3}>
                          <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h5" fontWeight="bold" color="text.secondary">94%</Typography>
                            <Typography variant="caption" color="text.secondary">Overall</Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  )}

                  {/* Tab 3: Fee Status */}
                  {activeTab === 3 && (
                    <Box>
                      <TableContainer>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell><strong>Term</strong></TableCell>
                              <TableCell><strong>Amount</strong></TableCell>
                              <TableCell><strong>Status</strong></TableCell>
                              <TableCell><strong>Date</strong></TableCell>
                              <TableCell align="right"><strong>Action</strong></TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {feeStatus.map((fee, i) => (
                              <TableRow key={i} hover>
                                <TableCell><Typography variant="body2" fontWeight="600">{fee.term}</Typography></TableCell>
                                <TableCell>Rs. {fee.amount.toLocaleString()}</TableCell>
                                <TableCell>
                                  <Chip
                                    label={fee.status === 'paid' ? 'Paid' : 'Pending'}
                                    size="small"
                                    color={fee.status === 'paid' ? 'success' : 'warning'}
                                    sx={{ fontWeight: 600, borderRadius: 1 }}
                                  />
                                </TableCell>
                                <TableCell>{fee.status === 'paid' ? fee.date : `Due: ${fee.dueDate}`}</TableCell>
                                <TableCell align="right">
                                  {fee.status === 'paid' ? (
                                    <Button size="small" startIcon={<Receipt />} sx={{ borderRadius: 2, textTransform: 'none' }}>Receipt</Button>
                                  ) : (
                                    <Button size="small" variant="contained" startIcon={<Payment />} sx={{ borderRadius: 2, textTransform: 'none' }}>Pay Now</Button>
                                  )}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Box>
                  )}
                </DashboardPaper>
              </motion.div>
            </Grid>

            {/* Announcements */}
            <Grid item xs={12} md={8}>
              <motion.div variants={itemVariants}>
                <DashboardPaper>
                  <SectionTitle variant="h6">Announcements</SectionTitle>
                  <List disablePadding>
                    {announcements.map((ann) => (
                      <Card key={ann.id} elevation={0} sx={{ mb: 2, border: '1px solid', borderColor: 'divider', borderRadius: 3 }}>
                        <CardContent sx={{ pb: '12px !important' }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                            <Typography variant="subtitle1" fontWeight="bold">{ann.title}</Typography>
                            <Chip label={ann.type} size="small" variant="outlined" sx={{ borderRadius: 1, fontSize: '0.65rem', textTransform: 'capitalize' }} />
                          </Box>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{ann.message}</Typography>
                          <Typography variant="caption" color="text.disabled">
                            By {ann.by} - {ann.date}
                          </Typography>
                        </CardContent>
                      </Card>
                    ))}
                  </List>
                </DashboardPaper>
              </motion.div>
            </Grid>

            {/* Right column: Teacher Contact + Events */}
            <Grid item xs={12} md={4}>
              {/* Teacher Contact */}
              <motion.div variants={itemVariants}>
                <DashboardPaper sx={{ mb: 3 }}>
                  <SectionTitle variant="h6">Teacher Contact</SectionTitle>
                  <List disablePadding>
                    {teacherContacts.map((teacher, i) => (
                      <React.Fragment key={i}>
                        <ListItem
                          sx={{ px: 0 }}
                          secondaryAction={
                            <IconButton color="primary" size="small">
                              <Chat />
                            </IconButton>
                          }
                        >
                          <ListItemAvatar>
                            <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main', width: 36, height: 36, fontSize: '0.75rem' }}>
                              {teacher.avatar}
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={<Typography variant="body2" fontWeight="600">{teacher.name}</Typography>}
                            secondary={teacher.subject}
                          />
                        </ListItem>
                        {i < teacherContacts.length - 1 && <Divider variant="inset" />}
                      </React.Fragment>
                    ))}
                  </List>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="Message to class teacher..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                    />
                    <IconButton color="primary"><Send /></IconButton>
                  </Box>
                </DashboardPaper>
              </motion.div>

              {/* Event Calendar */}
              <motion.div variants={itemVariants}>
                <DashboardPaper>
                  <SectionTitle variant="h6">Upcoming Events</SectionTitle>
                  <List disablePadding>
                    {upcomingEvents.map((evt) => (
                      <ListItem
                        key={evt.id}
                        sx={{ mb: 1, borderRadius: 2, border: '1px solid', borderColor: 'divider', flexDirection: 'column', alignItems: 'flex-start', px: 2, py: 1.5 }}
                      >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                          <Typography variant="subtitle2" fontWeight="bold">{evt.title}</Typography>
                          <Chip label={evt.type} size="small" sx={{ height: 20, fontSize: '0.65rem', textTransform: 'capitalize' }} />
                        </Box>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                          <AccessTime sx={{ fontSize: 14 }} /> {evt.date}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">{evt.description}</Typography>
                        {evt.requiresPermission && (
                          <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                            {evt.permissionStatus === 'pending' ? (
                              <>
                                <Button size="small" variant="contained" color="success" sx={{ borderRadius: 2, textTransform: 'none', fontSize: '0.7rem' }}>
                                  Approve
                                </Button>
                                <Button size="small" variant="outlined" color="error" sx={{ borderRadius: 2, textTransform: 'none', fontSize: '0.7rem' }}>
                                  Decline
                                </Button>
                              </>
                            ) : (
                              <StatusChip status={evt.permissionStatus || 'pending'} />
                            )}
                          </Box>
                        )}
                      </ListItem>
                    ))}
                  </List>
                </DashboardPaper>
              </motion.div>
            </Grid>
          </Grid>
      </motion.div>
    </DashboardLayout>
  );
};

export default ParentDashboard;
