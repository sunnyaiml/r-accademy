
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemIcon,
  Avatar,
  Button,
  Card,
  CardContent,
  IconButton,
  Chip,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import People from '@mui/icons-material/People';
import School from '@mui/icons-material/School';
import Class from '@mui/icons-material/Class';
import Assessment from '@mui/icons-material/Assessment';
import Settings from '@mui/icons-material/Settings';
import Announcement from '@mui/icons-material/Announcement';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import Visibility from '@mui/icons-material/Visibility';
import CalendarMonth from '@mui/icons-material/CalendarMonth';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Send from '@mui/icons-material/Send';
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import BarChart from '@mui/icons-material/BarChart';
import AdminPanelSettings from '@mui/icons-material/AdminPanelSettings';
import FamilyRestroom from '@mui/icons-material/FamilyRestroom';
import CheckCircle from '@mui/icons-material/CheckCircle';
import Cancel from '@mui/icons-material/Cancel';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  BarChart3,
  Settings as SettingsIcon,
} from 'lucide-react';
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

const ADMIN_NAV: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard' },
  { icon: Users, label: 'Teachers' },
  { icon: GraduationCap, label: 'Students' },
  { icon: BookOpen, label: 'Classes' },
  { icon: BarChart3, label: 'Analytics' },
  { icon: SettingsIcon, label: 'Settings' },
];

interface TeacherRecord {
  id: number;
  name: string;
  subject: string;
  classes: string[];
  students: number;
  status: 'active' | 'inactive';
  joinDate: string;
}

interface StudentRecord {
  id: number;
  name: string;
  grade: string;
  section: string;
  attendance: number;
  gpa: number;
  parentName: string;
  status: 'active' | 'promoted' | 'detained';
}

interface ClassRecord {
  id: number;
  grade: string;
  section: string;
  classTeacher: string;
  students: number;
  capacity: number;
  subjects: number;
}

interface AuditEntry {
  id: number;
  action: string;
  user: string;
  timestamp: string;
  details: string;
  type: 'teacher' | 'student' | 'class' | 'system' | 'announcement';
}

const SuperAdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [addTeacherOpen, setAddTeacherOpen] = useState(false);
  const [createClassOpen, setCreateClassOpen] = useState(false);
  const [broadcastOpen, setBroadcastOpen] = useState(false);
  const [promotionOpen, setPromotionOpen] = useState(false);
  const [newTeacher, setNewTeacher] = useState({ name: '', email: '', subject: '', phone: '' });
  const [newClass, setNewClass] = useState({ grade: '', section: '', classTeacher: '', capacity: '' });
  const [broadcastMessage, setBroadcastMessage] = useState({ title: '', message: '', target: 'all' });

  const teachers: TeacherRecord[] = [
    { id: 1, name: 'Dr. Robert Smith', subject: 'Mathematics', classes: ['10A', '11A', '12A'], students: 83, status: 'active', joinDate: '2023-06-15' },
    { id: 2, name: 'Ms. Emily Chen', subject: 'Physics', classes: ['10A', '10B', '11A'], students: 78, status: 'active', joinDate: '2024-01-10' },
    { id: 3, name: 'Mr. James Wilson', subject: 'English', classes: ['10A', '11A', '11B'], students: 80, status: 'active', joinDate: '2022-08-20' },
    { id: 4, name: 'Dr. Lisa Park', subject: 'Chemistry', classes: ['10A', '11A', '12A'], students: 83, status: 'active', joinDate: '2023-03-01' },
    { id: 5, name: 'Mr. David Brown', subject: 'Computer Science', classes: ['10A', '11A'], students: 55, status: 'active', joinDate: '2024-06-15' },
    { id: 6, name: 'Ms. Sarah James', subject: 'Biology', classes: ['10B'], students: 25, status: 'inactive', joinDate: '2023-01-10' },
  ];

  const students: StudentRecord[] = [
    { id: 1, name: 'Rahul Sharma', grade: '10', section: 'A', attendance: 95, gpa: 3.8, parentName: 'Mr. Suresh Sharma', status: 'active' },
    { id: 2, name: 'Priya Patel', grade: '10', section: 'A', attendance: 98, gpa: 3.9, parentName: 'Mr. Ramesh Patel', status: 'active' },
    { id: 3, name: 'Amit Kumar', grade: '10', section: 'A', attendance: 78, gpa: 2.8, parentName: 'Mr. Vijay Kumar', status: 'active' },
    { id: 4, name: 'Sneha Gupta', grade: '11', section: 'A', attendance: 92, gpa: 3.5, parentName: 'Mrs. Meena Gupta', status: 'active' },
    { id: 5, name: 'Vikram Singh', grade: '11', section: 'A', attendance: 85, gpa: 3.2, parentName: 'Mr. Rajendra Singh', status: 'active' },
    { id: 6, name: 'Ananya Reddy', grade: '12', section: 'A', attendance: 96, gpa: 3.7, parentName: 'Dr. Krishna Reddy', status: 'active' },
    { id: 7, name: 'Karan Mehta', grade: '12', section: 'A', attendance: 88, gpa: 3.4, parentName: 'Mr. Sanjay Mehta', status: 'active' },
  ];

  const classRecords: ClassRecord[] = [
    { id: 1, grade: '10', section: 'A', classTeacher: 'Dr. Robert Smith', students: 25, capacity: 30, subjects: 6 },
    { id: 2, grade: '10', section: 'B', classTeacher: 'Ms. Sarah James', students: 22, capacity: 30, subjects: 6 },
    { id: 3, grade: '11', section: 'A', classTeacher: 'Mr. James Wilson', students: 30, capacity: 35, subjects: 6 },
    { id: 4, grade: '11', section: 'B', classTeacher: 'Ms. Emily Chen', students: 28, capacity: 35, subjects: 6 },
    { id: 5, grade: '12', section: 'A', classTeacher: 'Dr. Lisa Park', students: 28, capacity: 35, subjects: 5 },
  ];

  const auditLog: AuditEntry[] = [
    { id: 1, action: 'Teacher Added', user: 'Super Admin', timestamp: '2026-02-17 09:30 AM', details: 'Mr. David Brown - Computer Science', type: 'teacher' },
    { id: 2, action: 'Class 10A Promoted', user: 'Super Admin', timestamp: '2026-02-16 02:00 PM', details: '25 students promoted to Grade 11', type: 'class' },
    { id: 3, action: 'Announcement Sent', user: 'Super Admin', timestamp: '2026-02-16 10:15 AM', details: 'Mid-Term Schedule Released - All Roles', type: 'announcement' },
    { id: 4, action: 'Teacher Deactivated', user: 'Super Admin', timestamp: '2026-02-15 04:30 PM', details: 'Ms. Sarah James - Biology (On Leave)', type: 'teacher' },
    { id: 5, action: 'New Student Enrolled', user: 'Super Admin', timestamp: '2026-02-14 11:00 AM', details: 'Karan Mehta - Grade 12A', type: 'student' },
    { id: 6, action: 'Academic Year Updated', user: 'Super Admin', timestamp: '2026-02-13 09:00 AM', details: 'Set to 2025-2026', type: 'system' },
    { id: 7, action: 'Grading Scale Modified', user: 'Super Admin', timestamp: '2026-02-12 03:45 PM', details: 'Updated A+ threshold to 90%', type: 'system' },
  ];

  const analyticsData = {
    enrollmentTrend: [
      { year: '2022-23', count: 120 },
      { year: '2023-24', count: 138 },
      { year: '2024-25', count: 150 },
      { year: '2025-26', count: 156 },
    ],
    attendanceByGrade: [
      { grade: '10th', avg: 91 },
      { grade: '11th', avg: 88 },
      { grade: '12th', avg: 93 },
    ],
    performanceBySubject: [
      { subject: 'Mathematics', avg: 78 },
      { subject: 'Physics', avg: 74 },
      { subject: 'Chemistry', avg: 82 },
      { subject: 'English', avg: 71 },
      { subject: 'Computer Science', avg: 85 },
    ],
  };

  const getAuditColor = (type: string) => {
    switch (type) {
      case 'teacher': return 'primary.main';
      case 'student': return 'success.main';
      case 'class': return 'secondary.main';
      case 'announcement': return 'warning.main';
      case 'system': return 'info.main';
      default: return 'text.secondary';
    }
  };

  return (
    <DashboardLayout
      navItems={ADMIN_NAV}
      greeting="Admin Control Center"
      subtitle="Manage teachers, students, classes, and system settings"
    >
      <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <Grid container spacing={3}>
            {/* System Overview Stats */}
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={3}>
                  <StatBox value={teachers.filter(t => t.status === 'active').length} label="Active Teachers" icon={<People sx={{ fontSize: 40 }} />} gradient="linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)" />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <StatBox value={students.length} label="Total Students" icon={<School sx={{ fontSize: 40 }} />} gradient="linear-gradient(135deg, #000428 0%, #004e92 100%)" />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <StatBox value={classRecords.length} label="Active Classes" icon={<Class sx={{ fontSize: 40 }} />} gradient="linear-gradient(135deg, #373B44 0%, #4286f4 100%)" />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <StatBox value="45" label="Total Parents" icon={<FamilyRestroom sx={{ fontSize: 40 }} />} gradient="linear-gradient(135deg, #232526 0%, #414345 100%)" />
                </Grid>
              </Grid>
            </Grid>

            {/* Main Management Tabs */}
            <Grid item xs={12}>
              <motion.div variants={itemVariants}>
                <DashboardPaper>
                  <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)} variant="scrollable" scrollButtons="auto" sx={{ mb: 2, borderBottom: 1, borderColor: 'divider' }}>
                    <Tab label="Teacher Management" />
                    <Tab label="Student Records" />
                    <Tab label="Class Management" />
                    <Tab label="Analytics" />
                    <Tab label="Audit Log" />
                  </Tabs>

                  {/* Tab 0: Teacher Management */}
                  {activeTab === 0 && (
                    <Box>
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                        <Button startIcon={<PersonAdd />} variant="contained" onClick={() => setAddTeacherOpen(true)} sx={{ borderRadius: 2, textTransform: 'none' }}>
                          Appoint New Teacher
                        </Button>
                      </Box>
                      <TableContainer>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell><strong>Teacher</strong></TableCell>
                              <TableCell><strong>Subject</strong></TableCell>
                              <TableCell><strong>Classes</strong></TableCell>
                              <TableCell><strong>Students</strong></TableCell>
                              <TableCell><strong>Joined</strong></TableCell>
                              <TableCell><strong>Status</strong></TableCell>
                              <TableCell align="right"><strong>Actions</strong></TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {teachers.map((t) => (
                              <TableRow key={t.id} hover>
                                <TableCell>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Avatar sx={{ width: 32, height: 32, fontSize: '0.8rem', bgcolor: t.status === 'active' ? 'primary.light' : 'grey.300' }}>
                                      {t.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                    </Avatar>
                                    <Typography variant="body2" fontWeight="600">{t.name}</Typography>
                                  </Box>
                                </TableCell>
                                <TableCell>{t.subject}</TableCell>
                                <TableCell>
                                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                                    {t.classes.map(c => <Chip key={c} label={c} size="small" sx={{ height: 20, fontSize: '0.65rem' }} />)}
                                  </Box>
                                </TableCell>
                                <TableCell>{t.students}</TableCell>
                                <TableCell>{t.joinDate}</TableCell>
                                <TableCell><StatusChip status={t.status} /></TableCell>
                                <TableCell align="right">
                                  <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'flex-end' }}>
                                    <IconButton size="small" color="primary"><EditIcon fontSize="small" /></IconButton>
                                    <IconButton size="small"><Visibility fontSize="small" /></IconButton>
                                    <IconButton size="small" color={t.status === 'active' ? 'error' : 'success'}>
                                      {t.status === 'active' ? <Cancel fontSize="small" /> : <CheckCircle fontSize="small" />}
                                    </IconButton>
                                  </Box>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Box>
                  )}

                  {/* Tab 1: Student Records */}
                  {activeTab === 1 && (
                    <Box>
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2, gap: 1 }}>
                        <Button startIcon={<ArrowUpward />} variant="outlined" onClick={() => setPromotionOpen(true)} sx={{ borderRadius: 2, textTransform: 'none' }}>
                          Promote Students
                        </Button>
                        <Button startIcon={<PersonAdd />} variant="contained" sx={{ borderRadius: 2, textTransform: 'none' }}>
                          Enroll Student
                        </Button>
                      </Box>
                      <TableContainer>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell><strong>Student</strong></TableCell>
                              <TableCell><strong>Grade</strong></TableCell>
                              <TableCell><strong>Section</strong></TableCell>
                              <TableCell><strong>Attendance</strong></TableCell>
                              <TableCell><strong>GPA</strong></TableCell>
                              <TableCell><strong>Parent</strong></TableCell>
                              <TableCell><strong>Status</strong></TableCell>
                              <TableCell align="right"><strong>Actions</strong></TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {students.map((s) => (
                              <TableRow key={s.id} hover>
                                <TableCell>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Avatar sx={{ width: 32, height: 32, fontSize: '0.8rem', bgcolor: 'primary.light' }}>
                                      {s.name.split(' ').map(n => n[0]).join('')}
                                    </Avatar>
                                    <Typography variant="body2" fontWeight="600">{s.name}</Typography>
                                  </Box>
                                </TableCell>
                                <TableCell>{s.grade}</TableCell>
                                <TableCell>{s.section}</TableCell>
                                <TableCell>
                                  <ProgressWithLabel value={s.attendance} color={s.attendance >= 90 ? '#4caf50' : s.attendance >= 75 ? '#ff9800' : '#f44336'} />
                                </TableCell>
                                <TableCell>
                                  <Chip label={s.gpa.toFixed(1)} size="small" color={s.gpa >= 3.5 ? 'success' : s.gpa >= 2.5 ? 'warning' : 'error'} sx={{ fontWeight: 700, borderRadius: 1 }} />
                                </TableCell>
                                <TableCell><Typography variant="caption">{s.parentName}</Typography></TableCell>
                                <TableCell><StatusChip status={s.status} /></TableCell>
                                <TableCell align="right">
                                  <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'flex-end' }}>
                                    <IconButton size="small"><Visibility fontSize="small" /></IconButton>
                                    <IconButton size="small" color="primary"><EditIcon fontSize="small" /></IconButton>
                                  </Box>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Box>
                  )}

                  {/* Tab 2: Class Management */}
                  {activeTab === 2 && (
                    <Box>
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                        <Button startIcon={<AddIcon />} variant="contained" onClick={() => setCreateClassOpen(true)} sx={{ borderRadius: 2, textTransform: 'none' }}>
                          Create Class
                        </Button>
                      </Box>
                      <Grid container spacing={2}>
                        {classRecords.map((cls) => (
                          <Grid item xs={12} sm={6} md={4} key={cls.id}>
                            <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, '&:hover': { borderColor: 'primary.main', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' } }}>
                              <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                  <Typography variant="h6" fontWeight="bold">
                                    Grade {cls.grade} - {cls.section}
                                  </Typography>
                                  <IconButton size="small"><EditIcon fontSize="small" /></IconButton>
                                </Box>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                  Class Teacher: {cls.classTeacher}
                                </Typography>
                                <Box sx={{ mt: 2, mb: 1 }}>
                                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                    <Typography variant="caption" color="text.secondary">Capacity</Typography>
                                    <Typography variant="caption" fontWeight="bold">{cls.students}/{cls.capacity}</Typography>
                                  </Box>
                                  <ProgressWithLabel value={Math.round((cls.students / cls.capacity) * 100)} color={cls.students / cls.capacity > 0.9 ? '#f44336' : '#4caf50'} />
                                </Box>
                                <Box sx={{ display: 'flex', gap: 1, mt: 2, flexWrap: 'wrap' }}>
                                  <Chip label={`${cls.students} Students`} size="small" icon={<School sx={{ fontSize: '14px !important' }} />} sx={{ borderRadius: 1, fontSize: '0.7rem' }} />
                                  <Chip label={`${cls.subjects} Subjects`} size="small" variant="outlined" sx={{ borderRadius: 1, fontSize: '0.7rem' }} />
                                </Box>
                              </CardContent>
                            </Card>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  )}

                  {/* Tab 3: Analytics */}
                  {activeTab === 3 && (
                    <Box>
                      <Grid container spacing={3}>
                        {/* Enrollment Trend */}
                        <Grid item xs={12} md={6}>
                          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Enrollment Trend</Typography>
                          {analyticsData.enrollmentTrend.map((item) => (
                            <Box key={item.year} sx={{ mb: 1.5 }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                <Typography variant="body2">{item.year}</Typography>
                                <Typography variant="body2" fontWeight="bold">{item.count} students</Typography>
                              </Box>
                              <ProgressWithLabel value={Math.round((item.count / 200) * 100)} color="linear-gradient(90deg, #667eea, #764ba2)" />
                            </Box>
                          ))}
                        </Grid>

                        {/* Attendance by Grade */}
                        <Grid item xs={12} md={6}>
                          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Attendance by Grade</Typography>
                          {analyticsData.attendanceByGrade.map((item) => (
                            <Box key={item.grade} sx={{ mb: 1.5 }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                <Typography variant="body2">{item.grade} Grade</Typography>
                                <Typography variant="body2" fontWeight="bold">{item.avg}%</Typography>
                              </Box>
                              <ProgressWithLabel value={item.avg} color={item.avg >= 90 ? '#4caf50' : item.avg >= 80 ? '#ff9800' : '#f44336'} />
                            </Box>
                          ))}
                        </Grid>

                        {/* Performance by Subject */}
                        <Grid item xs={12}>
                          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Average Performance by Subject</Typography>
                          <Grid container spacing={2}>
                            {analyticsData.performanceBySubject.map((item) => (
                              <Grid item xs={12} sm={6} md={2.4} key={item.subject}>
                                <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, textAlign: 'center', p: 2 }}>
                                  <Typography variant="h4" fontWeight="bold" color={item.avg >= 80 ? 'success.main' : item.avg >= 70 ? 'warning.main' : 'error.main'}>
                                    {item.avg}%
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">{item.subject}</Typography>
                                </Card>
                              </Grid>
                            ))}
                          </Grid>
                        </Grid>
                      </Grid>
                    </Box>
                  )}

                  {/* Tab 4: Audit Log */}
                  {activeTab === 4 && (
                    <Box>
                      <List disablePadding>
                        {auditLog.map((entry) => (
                          <ListItem
                            key={entry.id}
                            sx={{ mb: 1, borderRadius: 2, border: '1px solid', borderColor: 'divider', borderLeft: '4px solid', borderLeftColor: getAuditColor(entry.type) }}
                          >
                            <ListItemAvatar>
                              <Avatar sx={{ bgcolor: `${getAuditColor(entry.type)}20`, color: getAuditColor(entry.type), width: 36, height: 36 }}>
                                {entry.type === 'teacher' ? <People sx={{ fontSize: 18 }} /> :
                                  entry.type === 'student' ? <School sx={{ fontSize: 18 }} /> :
                                    entry.type === 'class' ? <Class sx={{ fontSize: 18 }} /> :
                                      entry.type === 'announcement' ? <Announcement sx={{ fontSize: 18 }} /> :
                                        <Settings sx={{ fontSize: 18 }} />}
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <Typography variant="body2" fontWeight="600">{entry.action}</Typography>
                                  <Typography variant="caption" color="text.secondary">{entry.timestamp}</Typography>
                                </Box>
                              }
                              secondary={
                                <Typography variant="caption" color="text.secondary">{entry.details}</Typography>
                              }
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  )}
                </DashboardPaper>
              </motion.div>
            </Grid>

            {/* Quick Actions */}
            <Grid item xs={12} md={8}>
              <motion.div variants={itemVariants}>
                <DashboardPaper>
                  <SectionTitle variant="h6">Quick Actions</SectionTitle>
                  <Grid container spacing={2}>
                    <Grid item xs={6} sm={4}>
                      <Button fullWidth variant="outlined" startIcon={<PersonAdd />} onClick={() => setAddTeacherOpen(true)} sx={{ py: 2, borderRadius: 2, textTransform: 'none' }}>
                        Appoint Teacher
                      </Button>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <Button fullWidth variant="outlined" startIcon={<Class />} onClick={() => setCreateClassOpen(true)} sx={{ py: 2, borderRadius: 2, textTransform: 'none' }}>
                        Create Class
                      </Button>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <Button fullWidth variant="outlined" startIcon={<Announcement />} onClick={() => setBroadcastOpen(true)} sx={{ py: 2, borderRadius: 2, textTransform: 'none' }}>
                        Broadcast
                      </Button>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <Button fullWidth variant="outlined" startIcon={<ArrowUpward />} onClick={() => setPromotionOpen(true)} sx={{ py: 2, borderRadius: 2, textTransform: 'none' }}>
                        Promote Students
                      </Button>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <Button fullWidth variant="outlined" startIcon={<Settings />} sx={{ py: 2, borderRadius: 2, textTransform: 'none' }}>
                        System Config
                      </Button>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <Button fullWidth variant="outlined" startIcon={<BarChart />} sx={{ py: 2, borderRadius: 2, textTransform: 'none' }}>
                        Export Reports
                      </Button>
                    </Grid>
                  </Grid>
                </DashboardPaper>
              </motion.div>
            </Grid>

            {/* Hierarchy Config Summary */}
            <Grid item xs={12} md={4}>
              <motion.div variants={itemVariants}>
                <DashboardPaper>
                  <SectionTitle variant="h6">System Config</SectionTitle>
                  <List dense disablePadding>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}><CalendarMonth color="primary" /></ListItemIcon>
                      <ListItemText primary={<Typography variant="body2" fontWeight="600">Academic Year</Typography>} secondary="2025-2026" />
                    </ListItem>
                    <Divider />
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}><Assessment color="secondary" /></ListItemIcon>
                      <ListItemText primary={<Typography variant="body2" fontWeight="600">Grading Scale</Typography>} secondary="A+ (90%), A (80%), B+ (70%), B (60%)" />
                    </ListItem>
                    <Divider />
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}><AdminPanelSettings color="info" /></ListItemIcon>
                      <ListItemText primary={<Typography variant="body2" fontWeight="600">Term Structure</Typography>} secondary="3 Terms (Apr-Jul, Aug-Nov, Dec-Mar)" />
                    </ListItem>
                    <Divider />
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}><ArrowUpward color="success" /></ListItemIcon>
                      <ListItemText primary={<Typography variant="body2" fontWeight="600">Promotion Criteria</Typography>} secondary="Min 75% attendance, Min 2.0 GPA" />
                    </ListItem>
                  </List>
                </DashboardPaper>
              </motion.div>
            </Grid>
          </Grid>

        {/* Add Teacher Dialog */}
        <Dialog open={addTeacherOpen} onClose={() => setAddTeacherOpen(false)} PaperProps={{ sx: { borderRadius: 3, width: '100%', maxWidth: 500 } }}>
          <DialogTitle sx={{ borderBottom: '1px solid', borderColor: 'divider', pb: 2 }}>
            <Typography variant="h6" fontWeight="bold">Appoint New Teacher</Typography>
          </DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: 3 }}>
              <TextField label="Full Name" fullWidth value={newTeacher.name} onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })} />
              <TextField label="Email" type="email" fullWidth value={newTeacher.email} onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })} />
              <TextField label="Phone" fullWidth value={newTeacher.phone} onChange={(e) => setNewTeacher({ ...newTeacher, phone: e.target.value })} />
              <FormControl fullWidth>
                <InputLabel>Subject / Specialization</InputLabel>
                <Select value={newTeacher.subject} label="Subject / Specialization" onChange={(e) => setNewTeacher({ ...newTeacher, subject: e.target.value })}>
                  <MenuItem value="Mathematics">Mathematics</MenuItem>
                  <MenuItem value="Physics">Physics</MenuItem>
                  <MenuItem value="Chemistry">Chemistry</MenuItem>
                  <MenuItem value="English">English</MenuItem>
                  <MenuItem value="Biology">Biology</MenuItem>
                  <MenuItem value="Computer Science">Computer Science</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 2.5, pt: 0 }}>
            <Button onClick={() => setAddTeacherOpen(false)} sx={{ borderRadius: 2 }}>Cancel</Button>
            <Button onClick={() => setAddTeacherOpen(false)} variant="contained" sx={{ borderRadius: 2, px: 3 }}>Appoint</Button>
          </DialogActions>
        </Dialog>

        {/* Create Class Dialog */}
        <Dialog open={createClassOpen} onClose={() => setCreateClassOpen(false)} PaperProps={{ sx: { borderRadius: 3, width: '100%', maxWidth: 500 } }}>
          <DialogTitle sx={{ borderBottom: '1px solid', borderColor: 'divider', pb: 2 }}>
            <Typography variant="h6" fontWeight="bold">Create New Class</Typography>
          </DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: 3 }}>
              <FormControl fullWidth>
                <InputLabel>Grade</InputLabel>
                <Select value={newClass.grade} label="Grade" onChange={(e) => setNewClass({ ...newClass, grade: e.target.value })}>
                  {[8, 9, 10, 11, 12].map(g => <MenuItem key={g} value={String(g)}>Grade {g}</MenuItem>)}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Section</InputLabel>
                <Select value={newClass.section} label="Section" onChange={(e) => setNewClass({ ...newClass, section: e.target.value })}>
                  {['A', 'B', 'C', 'D'].map(s => <MenuItem key={s} value={s}>Section {s}</MenuItem>)}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Class Teacher</InputLabel>
                <Select value={newClass.classTeacher} label="Class Teacher" onChange={(e) => setNewClass({ ...newClass, classTeacher: e.target.value })}>
                  {teachers.filter(t => t.status === 'active').map(t => <MenuItem key={t.id} value={t.name}>{t.name} ({t.subject})</MenuItem>)}
                </Select>
              </FormControl>
              <TextField label="Max Capacity" type="number" fullWidth value={newClass.capacity} onChange={(e) => setNewClass({ ...newClass, capacity: e.target.value })} />
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 2.5, pt: 0 }}>
            <Button onClick={() => setCreateClassOpen(false)} sx={{ borderRadius: 2 }}>Cancel</Button>
            <Button onClick={() => setCreateClassOpen(false)} variant="contained" sx={{ borderRadius: 2, px: 3 }}>Create</Button>
          </DialogActions>
        </Dialog>

        {/* Broadcast Dialog */}
        <Dialog open={broadcastOpen} onClose={() => setBroadcastOpen(false)} PaperProps={{ sx: { borderRadius: 3, width: '100%', maxWidth: 500 } }}>
          <DialogTitle sx={{ borderBottom: '1px solid', borderColor: 'divider', pb: 2 }}>
            <Typography variant="h6" fontWeight="bold">Broadcast Announcement</Typography>
          </DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: 3 }}>
              <TextField label="Title" fullWidth value={broadcastMessage.title} onChange={(e) => setBroadcastMessage({ ...broadcastMessage, title: e.target.value })} />
              <TextField label="Message" multiline rows={4} fullWidth value={broadcastMessage.message} onChange={(e) => setBroadcastMessage({ ...broadcastMessage, message: e.target.value })} />
              <FormControl fullWidth>
                <InputLabel>Target Audience</InputLabel>
                <Select value={broadcastMessage.target} label="Target Audience" onChange={(e) => setBroadcastMessage({ ...broadcastMessage, target: e.target.value })}>
                  <MenuItem value="all">All Users</MenuItem>
                  <MenuItem value="teachers">Teachers Only</MenuItem>
                  <MenuItem value="students">Students Only</MenuItem>
                  <MenuItem value="parents">Parents Only</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 2.5, pt: 0 }}>
            <Button onClick={() => setBroadcastOpen(false)} sx={{ borderRadius: 2 }}>Cancel</Button>
            <Button onClick={() => setBroadcastOpen(false)} variant="contained" startIcon={<Send />} sx={{ borderRadius: 2, px: 3 }}>Send</Button>
          </DialogActions>
        </Dialog>

        {/* Promotion Dialog */}
        <Dialog open={promotionOpen} onClose={() => setPromotionOpen(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
          <DialogTitle sx={{ borderBottom: '1px solid', borderColor: 'divider', pb: 2 }}>
            <Typography variant="h6" fontWeight="bold">Student Promotion</Typography>
          </DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: 3 }}>
              <FormControl fullWidth>
                <InputLabel>Source Grade</InputLabel>
                <Select label="Source Grade">
                  {[10, 11, 12].map(g => <MenuItem key={g} value={g}>Grade {g}</MenuItem>)}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Section</InputLabel>
                <Select label="Section">
                  {['A', 'B', 'All'].map(s => <MenuItem key={s} value={s}>{s === 'All' ? 'All Sections' : `Section ${s}`}</MenuItem>)}
                </Select>
              </FormControl>
              <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, p: 2 }}>
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>Promotion Criteria</Typography>
                <Typography variant="body2" color="text.secondary">Min Attendance: 75%</Typography>
                <Typography variant="body2" color="text.secondary">Min GPA: 2.0</Typography>
                <Typography variant="body2" color="text.secondary">No failed core subjects</Typography>
              </Card>
              <Typography variant="body2" color="text.secondary">
                Eligible students will be moved to the next grade. Students not meeting criteria will be marked for detention with a reason.
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 2.5 }}>
            <Button onClick={() => setPromotionOpen(false)} sx={{ borderRadius: 2 }}>Cancel</Button>
            <Button onClick={() => setPromotionOpen(false)} variant="contained" startIcon={<ArrowUpward />} sx={{ borderRadius: 2, px: 3 }}>Promote Eligible</Button>
          </DialogActions>
        </Dialog>
      </motion.div>
    </DashboardLayout>
  );
};

export default SuperAdminDashboard;
