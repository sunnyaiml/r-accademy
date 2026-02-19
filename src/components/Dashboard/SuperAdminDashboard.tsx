
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
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  BarChart3,
  Settings as SettingsIcon,
  Plus as AddIcon,
  Edit2 as EditIcon,
  Eye as Visibility,
  Calendar as CalendarMonth,
  UserPlus as PersonAdd,
  Send as SendIcon,
  ArrowUp as ArrowUpward,
  BarChart as BarChartIcon,
  Megaphone as AnnouncementIcon,
  ShieldCheck as AdminPanelSettingsIcon,
  CheckCircle2 as CheckCircleIcon,
  XCircle as CancelIcon,
  Settings as SettingsIconSmall,
  School as SchoolIcon,
  TrendingUp,
  FileBarChart,
  Activity,
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
  const [activeSection, setActiveSection] = useState(0);
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

  const getAuditIcon = (type: string) => {
    switch (type) {
      case 'teacher': return <Users size={16} />;
      case 'student': return <GraduationCap size={16} />;
      case 'class': return <BookOpen size={16} />;
      case 'announcement': return <AnnouncementIcon size={16} />;
      case 'system': return <SettingsIconSmall size={16} />;
      default: return <Activity size={16} />;
    }
  };

  const getAuditColor = (type: string) => {
    switch (type) {
      case 'teacher': return { bg: '#EFF6FF', fg: '#2563EB', border: '#BFDBFE' };
      case 'student': return { bg: '#F0FDF4', fg: '#16A34A', border: '#BBF7D0' };
      case 'class': return { bg: '#F0FDFA', fg: '#0D9488', border: '#99F6E4' };
      case 'announcement': return { bg: '#FFFBEB', fg: '#D97706', border: '#FDE68A' };
      case 'system': return { bg: '#F0F9FF', fg: '#0284C7', border: '#BAE6FD' };
      default: return { bg: '#F9FAFB', fg: '#6B7280', border: '#E5E7EB' };
    }
  };

  // Section 0: Dashboard Overview
  const renderOverview = () => (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <Grid container spacing={3}>
        {/* Stats Row */}
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={3}>
              <StatBox
                value={teachers.filter(t => t.status === 'active').length}
                label="Active Teachers"
                icon={<Users size={22} />}
                iconBg="bg-blue-50"
                iconColor="text-blue-600"
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <StatBox
                value={students.length}
                label="Total Students"
                icon={<GraduationCap size={22} />}
                iconBg="bg-teal-50"
                iconColor="text-teal-600"
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <StatBox
                value={classRecords.length}
                label="Active Classes"
                icon={<BookOpen size={22} />}
                iconBg="bg-sky-50"
                iconColor="text-sky-600"
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <StatBox
                value="45"
                label="Total Parents"
                icon={<Users size={22} />}
                iconBg="bg-amber-50"
                iconColor="text-amber-600"
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={7}>
          <motion.div variants={itemVariants}>
            <DashboardPaper>
              <SectionTitle variant="h6">Quick Actions</SectionTitle>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={4}>
                  <Button fullWidth variant="outlined" startIcon={<PersonAdd size={16} />} onClick={() => setAddTeacherOpen(true)}
                    sx={{ py: 2, borderRadius: 3, textTransform: 'none', borderColor: '#E2E8F0', color: '#475569', fontWeight: 600, fontSize: '0.8rem', '&:hover': { borderColor: '#2563EB', color: '#2563EB', bgcolor: '#EFF6FF' } }}>
                    Appoint Teacher
                  </Button>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Button fullWidth variant="outlined" startIcon={<BookOpen size={16} />} onClick={() => setCreateClassOpen(true)}
                    sx={{ py: 2, borderRadius: 3, textTransform: 'none', borderColor: '#E2E8F0', color: '#475569', fontWeight: 600, fontSize: '0.8rem', '&:hover': { borderColor: '#0D9488', color: '#0D9488', bgcolor: '#F0FDFA' } }}>
                    Create Class
                  </Button>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Button fullWidth variant="outlined" startIcon={<AnnouncementIcon size={16} />} onClick={() => setBroadcastOpen(true)}
                    sx={{ py: 2, borderRadius: 3, textTransform: 'none', borderColor: '#E2E8F0', color: '#475569', fontWeight: 600, fontSize: '0.8rem', '&:hover': { borderColor: '#D97706', color: '#D97706', bgcolor: '#FFFBEB' } }}>
                    Broadcast
                  </Button>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Button fullWidth variant="outlined" startIcon={<ArrowUpward size={16} />} onClick={() => setPromotionOpen(true)}
                    sx={{ py: 2, borderRadius: 3, textTransform: 'none', borderColor: '#E2E8F0', color: '#475569', fontWeight: 600, fontSize: '0.8rem', '&:hover': { borderColor: '#7C3AED', color: '#7C3AED', bgcolor: '#F5F3FF' } }}>
                    Promote Students
                  </Button>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Button fullWidth variant="outlined" startIcon={<SettingsIconSmall size={16} />}
                    onClick={() => setActiveSection(5)}
                    sx={{ py: 2, borderRadius: 3, textTransform: 'none', borderColor: '#E2E8F0', color: '#475569', fontWeight: 600, fontSize: '0.8rem', '&:hover': { borderColor: '#475569', color: '#475569', bgcolor: '#F8FAFC' } }}>
                    System Config
                  </Button>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Button fullWidth variant="outlined" startIcon={<FileBarChart size={16} />}
                    onClick={() => setActiveSection(4)}
                    sx={{ py: 2, borderRadius: 3, textTransform: 'none', borderColor: '#E2E8F0', color: '#475569', fontWeight: 600, fontSize: '0.8rem', '&:hover': { borderColor: '#0EA5E9', color: '#0EA5E9', bgcolor: '#F0F9FF' } }}>
                    View Analytics
                  </Button>
                </Grid>
              </Grid>
            </DashboardPaper>
          </motion.div>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} md={5}>
          <motion.div variants={itemVariants}>
            <DashboardPaper>
              <SectionTitle variant="h6">Recent Activity</SectionTitle>
              <List disablePadding>
                {auditLog.slice(0, 5).map((entry) => {
                  const colors = getAuditColor(entry.type);
                  return (
                    <ListItem
                      key={entry.id}
                      sx={{ px: 1.5, py: 1, mb: 0.5, borderRadius: 2, '&:hover': { bgcolor: '#F8FAFC' } }}
                    >
                      <ListItemAvatar sx={{ minWidth: 40 }}>
                        <Avatar sx={{ bgcolor: colors.bg, color: colors.fg, width: 32, height: 32 }}>
                          {getAuditIcon(entry.type)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={<Typography variant="body2" fontWeight="600" sx={{ fontSize: '0.8rem' }}>{entry.action}</Typography>}
                        secondary={
                          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                            {entry.details} &middot; {entry.timestamp.split(' ').slice(1).join(' ')}
                          </Typography>
                        }
                      />
                    </ListItem>
                  );
                })}
              </List>
              <Button fullWidth sx={{ mt: 1, borderRadius: 2, textTransform: 'none', fontSize: '0.8rem', fontWeight: 600, color: '#64748B' }}
                onClick={() => setActiveSection(5)}>
                View Full Audit Log
              </Button>
            </DashboardPaper>
          </motion.div>
        </Grid>

        {/* System Config Summary */}
        <Grid item xs={12}>
          <motion.div variants={itemVariants}>
            <DashboardPaper>
              <SectionTitle variant="h6">System Configuration</SectionTitle>
              <Grid container spacing={3}>
                {[
                  { icon: <CalendarMonth size={20} />, label: 'Academic Year', value: '2025-2026', color: '#2563EB' },
                  { icon: <BarChartIcon size={20} />, label: 'Grading Scale', value: 'A+ (90%), A (80%), B+ (70%)', color: '#0D9488' },
                  { icon: <AdminPanelSettingsIcon size={20} />, label: 'Term Structure', value: '3 Terms (Apr-Jul, Aug-Nov, Dec-Mar)', color: '#0EA5E9' },
                  { icon: <TrendingUp size={20} />, label: 'Promotion Criteria', value: 'Min 75% attendance, Min 2.0 GPA', color: '#10B981' },
                ].map((item, i) => (
                  <Grid item xs={12} sm={6} md={3} key={i}>
                    <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                      <Box sx={{ p: 1, borderRadius: 2, bgcolor: `${item.color}10`, color: item.color, flexShrink: 0 }}>
                        {item.icon}
                      </Box>
                      <Box>
                        <Typography variant="body2" fontWeight="700" sx={{ fontSize: '0.8rem', color: '#1E293B' }}>{item.label}</Typography>
                        <Typography variant="caption" color="text.secondary">{item.value}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </DashboardPaper>
          </motion.div>
        </Grid>
      </Grid>
    </motion.div>
  );

  // Section 1: Teacher Management
  const renderTeachers = () => (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <motion.div variants={itemVariants}>
        <DashboardPaper>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <SectionTitle variant="h6" sx={{ mb: 0 }}>Teacher Management</SectionTitle>
            <Button startIcon={<PersonAdd size={16} />} variant="contained" onClick={() => setAddTeacherOpen(true)}
              sx={{ borderRadius: 2.5, textTransform: 'none', fontWeight: 600, px: 3, boxShadow: 'none', '&:hover': { boxShadow: '0 4px 12px rgba(37,99,235,0.2)' } }}>
              Appoint Teacher
            </Button>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ '& th': { fontWeight: 700, color: '#64748B', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderColor: '#F1F5F9' } }}>
                  <TableCell>Teacher</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell>Classes</TableCell>
                  <TableCell>Students</TableCell>
                  <TableCell>Joined</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {teachers.map((t) => (
                  <TableRow key={t.id} hover sx={{ '& td': { borderColor: '#F1F5F9' }, '&:hover': { bgcolor: '#F8FAFC' } }}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar sx={{ width: 34, height: 34, fontSize: '0.75rem', fontWeight: 700, bgcolor: t.status === 'active' ? '#EFF6FF' : '#F1F5F9', color: t.status === 'active' ? '#2563EB' : '#94A3B8' }}>
                          {t.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </Avatar>
                        <Typography variant="body2" fontWeight="600" sx={{ fontSize: '0.85rem' }}>{t.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell><Typography variant="body2" color="text.secondary">{t.subject}</Typography></TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                        {t.classes.map(c => <Chip key={c} label={c} size="small" sx={{ height: 22, fontSize: '0.7rem', fontWeight: 600, bgcolor: '#F0FDFA', color: '#0D9488', borderRadius: 1.5 }} />)}
                      </Box>
                    </TableCell>
                    <TableCell><Typography variant="body2" fontWeight="600">{t.students}</Typography></TableCell>
                    <TableCell><Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>{t.joinDate}</Typography></TableCell>
                    <TableCell><StatusChip status={t.status} /></TableCell>
                    <TableCell align="right">
                      <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'flex-end' }}>
                        <IconButton size="small" sx={{ color: '#2563EB' }}><EditIcon size={16} /></IconButton>
                        <IconButton size="small" sx={{ color: '#64748B' }}><Visibility size={16} /></IconButton>
                        <IconButton size="small" sx={{ color: t.status === 'active' ? '#EF4444' : '#10B981' }}>
                          {t.status === 'active' ? <CancelIcon size={16} /> : <CheckCircleIcon size={16} />}
                        </IconButton>
                      </Box>
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

  // Section 2: Student Records
  const renderStudents = () => (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <motion.div variants={itemVariants}>
        <DashboardPaper>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 1 }}>
            <SectionTitle variant="h6" sx={{ mb: 0 }}>Student Records</SectionTitle>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button startIcon={<ArrowUpward size={16} />} variant="outlined" onClick={() => setPromotionOpen(true)}
                sx={{ borderRadius: 2.5, textTransform: 'none', fontWeight: 600, borderColor: '#E2E8F0' }}>
                Promote
              </Button>
              <Button startIcon={<PersonAdd size={16} />} variant="contained"
                sx={{ borderRadius: 2.5, textTransform: 'none', fontWeight: 600, boxShadow: 'none' }}>
                Enroll Student
              </Button>
            </Box>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ '& th': { fontWeight: 700, color: '#64748B', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderColor: '#F1F5F9' } }}>
                  <TableCell>Student</TableCell>
                  <TableCell>Grade</TableCell>
                  <TableCell>Section</TableCell>
                  <TableCell>Attendance</TableCell>
                  <TableCell>GPA</TableCell>
                  <TableCell>Parent</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((s) => (
                  <TableRow key={s.id} hover sx={{ '& td': { borderColor: '#F1F5F9' }, '&:hover': { bgcolor: '#F8FAFC' } }}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar sx={{ width: 34, height: 34, fontSize: '0.7rem', fontWeight: 700, bgcolor: '#EFF6FF', color: '#2563EB' }}>
                          {s.name.split(' ').map(n => n[0]).join('')}
                        </Avatar>
                        <Typography variant="body2" fontWeight="600" sx={{ fontSize: '0.85rem' }}>{s.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{s.grade}</TableCell>
                    <TableCell>{s.section}</TableCell>
                    <TableCell>
                      <ProgressWithLabel value={s.attendance} color={s.attendance >= 90 ? '#10B981' : s.attendance >= 75 ? '#F59E0B' : '#EF4444'} />
                    </TableCell>
                    <TableCell>
                      <Chip label={s.gpa.toFixed(1)} size="small"
                        sx={{
                          fontWeight: 700, borderRadius: 1.5, fontSize: '0.75rem',
                          bgcolor: s.gpa >= 3.5 ? '#F0FDF4' : s.gpa >= 2.5 ? '#FFFBEB' : '#FEF2F2',
                          color: s.gpa >= 3.5 ? '#16A34A' : s.gpa >= 2.5 ? '#D97706' : '#DC2626',
                        }} />
                    </TableCell>
                    <TableCell><Typography variant="caption" color="text.secondary">{s.parentName}</Typography></TableCell>
                    <TableCell><StatusChip status={s.status} /></TableCell>
                    <TableCell align="right">
                      <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'flex-end' }}>
                        <IconButton size="small" sx={{ color: '#64748B' }}><Visibility size={16} /></IconButton>
                        <IconButton size="small" sx={{ color: '#2563EB' }}><EditIcon size={16} /></IconButton>
                      </Box>
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

  // Section 3: Class Management
  const renderClasses = () => (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <motion.div variants={itemVariants}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" fontWeight="700" color="#1E293B">Class Management</Typography>
          <Button startIcon={<AddIcon size={16} />} variant="contained" onClick={() => setCreateClassOpen(true)}
            sx={{ borderRadius: 2.5, textTransform: 'none', fontWeight: 600, boxShadow: 'none' }}>
            Create Class
          </Button>
        </Box>
        <Grid container spacing={2}>
          {classRecords.map((cls) => {
            const fillPercent = Math.round((cls.students / cls.capacity) * 100);
            const isFull = fillPercent > 90;
            return (
              <Grid item xs={12} sm={6} md={4} key={cls.id}>
                <Card elevation={0} sx={{
                  border: '1px solid', borderColor: '#E2E8F0', borderRadius: 4,
                  transition: 'all 0.2s',
                  '&:hover': { borderColor: '#2563EB', boxShadow: '0 4px 16px rgba(37,99,235,0.08)' }
                }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Box>
                        <Typography variant="h6" fontWeight="bold" sx={{ fontSize: '1.1rem', color: '#1E293B' }}>
                          Grade {cls.grade} - {cls.section}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                          {cls.classTeacher}
                        </Typography>
                      </Box>
                      <IconButton size="small" sx={{ color: '#94A3B8' }}><EditIcon size={16} /></IconButton>
                    </Box>
                    <Box sx={{ mt: 2, mb: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="caption" color="text.secondary">Capacity</Typography>
                        <Typography variant="caption" fontWeight="bold" sx={{ color: isFull ? '#EF4444' : '#1E293B' }}>{cls.students}/{cls.capacity}</Typography>
                      </Box>
                      <ProgressWithLabel value={fillPercent} color={isFull ? '#EF4444' : '#10B981'} />
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, mt: 2, flexWrap: 'wrap' }}>
                      <Chip label={`${cls.students} Students`} size="small" icon={<SchoolIcon size={12} />}
                        sx={{ borderRadius: 1.5, fontSize: '0.7rem', fontWeight: 600, bgcolor: '#EFF6FF', color: '#2563EB' }} />
                      <Chip label={`${cls.subjects} Subjects`} size="small" variant="outlined"
                        sx={{ borderRadius: 1.5, fontSize: '0.7rem', borderColor: '#E2E8F0' }} />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </motion.div>
    </motion.div>
  );

  // Section 4: Analytics
  const renderAnalytics = () => (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <motion.div variants={itemVariants}>
            <DashboardPaper>
              <SectionTitle variant="h6">Enrollment Trend</SectionTitle>
              {analyticsData.enrollmentTrend.map((item) => (
                <Box key={item.year} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2" fontWeight="500">{item.year}</Typography>
                    <Typography variant="body2" fontWeight="700" color="#1E293B">{item.count} students</Typography>
                  </Box>
                  <ProgressWithLabel value={Math.round((item.count / 200) * 100)} color="linear-gradient(90deg, #2563EB, #0D9488)" />
                </Box>
              ))}
            </DashboardPaper>
          </motion.div>
        </Grid>

        <Grid item xs={12} md={6}>
          <motion.div variants={itemVariants}>
            <DashboardPaper>
              <SectionTitle variant="h6">Attendance by Grade</SectionTitle>
              {analyticsData.attendanceByGrade.map((item) => (
                <Box key={item.grade} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2" fontWeight="500">{item.grade} Grade</Typography>
                    <Typography variant="body2" fontWeight="700" color="#1E293B">{item.avg}%</Typography>
                  </Box>
                  <ProgressWithLabel value={item.avg} color={item.avg >= 90 ? '#10B981' : item.avg >= 80 ? '#F59E0B' : '#EF4444'} />
                </Box>
              ))}
            </DashboardPaper>
          </motion.div>
        </Grid>

        <Grid item xs={12}>
          <motion.div variants={itemVariants}>
            <DashboardPaper>
              <SectionTitle variant="h6">Average Performance by Subject</SectionTitle>
              <Grid container spacing={2}>
                {analyticsData.performanceBySubject.map((item) => (
                  <Grid item xs={6} sm={4} md={2.4} key={item.subject}>
                    <Card elevation={0} sx={{ border: '1px solid', borderColor: '#E2E8F0', borderRadius: 3, textAlign: 'center', p: 2.5 }}>
                      <Typography variant="h4" fontWeight="800"
                        sx={{ color: item.avg >= 80 ? '#10B981' : item.avg >= 70 ? '#F59E0B' : '#EF4444' }}>
                        {item.avg}%
                      </Typography>
                      <Typography variant="caption" color="text.secondary" fontWeight="600">{item.subject}</Typography>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </DashboardPaper>
          </motion.div>
        </Grid>
      </Grid>
    </motion.div>
  );

  // Section 5: Settings / Audit Log
  const renderSettings = () => (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <Grid container spacing={3}>
        {/* System Config */}
        <Grid item xs={12} md={5}>
          <motion.div variants={itemVariants}>
            <DashboardPaper>
              <SectionTitle variant="h6">System Configuration</SectionTitle>
              <List dense disablePadding>
                {[
                  { icon: <CalendarMonth size={18} />, label: 'Academic Year', value: '2025-2026', color: '#2563EB' },
                  { icon: <BarChartIcon size={18} />, label: 'Grading Scale', value: 'A+ (90%), A (80%), B+ (70%), B (60%)', color: '#0D9488' },
                  { icon: <AdminPanelSettingsIcon size={18} />, label: 'Term Structure', value: '3 Terms (Apr-Jul, Aug-Nov, Dec-Mar)', color: '#0EA5E9' },
                  { icon: <ArrowUpward size={18} />, label: 'Promotion Criteria', value: 'Min 75% attendance, Min 2.0 GPA', color: '#10B981' },
                ].map((item, i) => (
                  <React.Fragment key={i}>
                    <ListItem sx={{ px: 0, py: 1.5 }}>
                      <ListItemIcon sx={{ minWidth: 40, color: item.color }}>
                        <Box sx={{ p: 0.75, borderRadius: 1.5, bgcolor: `${item.color}12` }}>{item.icon}</Box>
                      </ListItemIcon>
                      <ListItemText
                        primary={<Typography variant="body2" fontWeight="700" sx={{ fontSize: '0.8rem' }}>{item.label}</Typography>}
                        secondary={<Typography variant="caption" color="text.secondary">{item.value}</Typography>}
                      />
                    </ListItem>
                    {i < 3 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </DashboardPaper>
          </motion.div>
        </Grid>

        {/* Full Audit Log */}
        <Grid item xs={12} md={7}>
          <motion.div variants={itemVariants}>
            <DashboardPaper>
              <SectionTitle variant="h6">Audit Log</SectionTitle>
              <List disablePadding>
                {auditLog.map((entry) => {
                  const colors = getAuditColor(entry.type);
                  return (
                    <ListItem
                      key={entry.id}
                      sx={{
                        mb: 1, borderRadius: 2.5, border: '1px solid', borderColor: '#F1F5F9',
                        borderLeft: '3px solid', borderLeftColor: colors.fg,
                        '&:hover': { bgcolor: '#FAFBFC' },
                      }}
                    >
                      <ListItemAvatar sx={{ minWidth: 44 }}>
                        <Avatar sx={{ bgcolor: colors.bg, color: colors.fg, width: 34, height: 34 }}>
                          {getAuditIcon(entry.type)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="body2" fontWeight="600" sx={{ fontSize: '0.8rem' }}>{entry.action}</Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>{entry.timestamp}</Typography>
                          </Box>
                        }
                        secondary={
                          <Typography variant="caption" color="text.secondary">{entry.details}</Typography>
                        }
                      />
                    </ListItem>
                  );
                })}
              </List>
            </DashboardPaper>
          </motion.div>
        </Grid>
      </Grid>
    </motion.div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case 0: return renderOverview();
      case 1: return renderTeachers();
      case 2: return renderStudents();
      case 3: return renderClasses();
      case 4: return renderAnalytics();
      case 5: return renderSettings();
      default: return renderOverview();
    }
  };

  return (
    <DashboardLayout
      navItems={ADMIN_NAV}
      greeting="Admin Control Center"
      subtitle="Manage teachers, students, classes, and system settings"
      activeSection={activeSection}
      onSectionChange={setActiveSection}
    >
      {renderSection()}

      {/* Add Teacher Dialog */}
      <Dialog open={addTeacherOpen} onClose={() => setAddTeacherOpen(false)} PaperProps={{ sx: { borderRadius: 4, width: '100%', maxWidth: 500 } }}>
        <DialogTitle sx={{ borderBottom: '1px solid', borderColor: '#F1F5F9', pb: 2 }}>
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
          <Button onClick={() => setAddTeacherOpen(false)} sx={{ borderRadius: 2.5, color: '#64748B' }}>Cancel</Button>
          <Button onClick={() => setAddTeacherOpen(false)} variant="contained" sx={{ borderRadius: 2.5, px: 3, boxShadow: 'none' }}>Appoint</Button>
        </DialogActions>
      </Dialog>

      {/* Create Class Dialog */}
      <Dialog open={createClassOpen} onClose={() => setCreateClassOpen(false)} PaperProps={{ sx: { borderRadius: 4, width: '100%', maxWidth: 500 } }}>
        <DialogTitle sx={{ borderBottom: '1px solid', borderColor: '#F1F5F9', pb: 2 }}>
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
          <Button onClick={() => setCreateClassOpen(false)} sx={{ borderRadius: 2.5, color: '#64748B' }}>Cancel</Button>
          <Button onClick={() => setCreateClassOpen(false)} variant="contained" sx={{ borderRadius: 2.5, px: 3, boxShadow: 'none' }}>Create</Button>
        </DialogActions>
      </Dialog>

      {/* Broadcast Dialog */}
      <Dialog open={broadcastOpen} onClose={() => setBroadcastOpen(false)} PaperProps={{ sx: { borderRadius: 4, width: '100%', maxWidth: 500 } }}>
        <DialogTitle sx={{ borderBottom: '1px solid', borderColor: '#F1F5F9', pb: 2 }}>
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
          <Button onClick={() => setBroadcastOpen(false)} sx={{ borderRadius: 2.5, color: '#64748B' }}>Cancel</Button>
          <Button onClick={() => setBroadcastOpen(false)} variant="contained" startIcon={<SendIcon size={16} />} sx={{ borderRadius: 2.5, px: 3, boxShadow: 'none' }}>Send</Button>
        </DialogActions>
      </Dialog>

      {/* Promotion Dialog */}
      <Dialog open={promotionOpen} onClose={() => setPromotionOpen(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 4 } }}>
        <DialogTitle sx={{ borderBottom: '1px solid', borderColor: '#F1F5F9', pb: 2 }}>
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
            <Card elevation={0} sx={{ border: '1px solid', borderColor: '#E2E8F0', borderRadius: 3, p: 2.5, bgcolor: '#F8FAFC' }}>
              <Typography variant="subtitle2" fontWeight="bold" gutterBottom sx={{ color: '#1E293B' }}>Promotion Criteria</Typography>
              <Typography variant="body2" color="text.secondary">Min Attendance: 75%</Typography>
              <Typography variant="body2" color="text.secondary">Min GPA: 2.0</Typography>
              <Typography variant="body2" color="text.secondary">No failed core subjects</Typography>
            </Card>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
              Eligible students will be moved to the next grade. Students not meeting criteria will be marked for detention with a reason.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={() => setPromotionOpen(false)} sx={{ borderRadius: 2.5, color: '#64748B' }}>Cancel</Button>
          <Button onClick={() => setPromotionOpen(false)} variant="contained" startIcon={<ArrowUpward size={16} />} sx={{ borderRadius: 2.5, px: 3, boxShadow: 'none' }}>Promote Eligible</Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
};

export default SuperAdminDashboard;
