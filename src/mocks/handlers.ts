import { http, HttpResponse } from 'msw';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api';

export const handlers = [
    http.post(`${API_BASE_URL}/auth/login`, async ({ request }) => {
        const { email, password } = await request.json() as any;

        const credentials: Record<string, any> = {
            'student@r-academy.com': {
                id: 's1',
                name: 'Rahul Sharma',
                role: 'student',
                grade: '10',
                studentId: '12345',
                phone: '1234567890',
            },
            'teacher@r-academy.com': {
                id: 't1',
                name: 'Dr. Robert Smith',
                role: 'teacher',
                specialization: 'Mathematics',
                phone: '9876543210',
            },
            'parent@r-academy.com': {
                id: 'p1',
                name: 'Mrs. Sharma',
                role: 'parent',
                phone: '5551234567',
            },
            'admin@r-academy.com': {
                id: 'a1',
                name: 'Super Admin',
                role: 'admin',
                phone: '0000000000',
            },
        };

        if (credentials[email] && password === 'password123') {
            return HttpResponse.json({
                token: 'mock-jwt-token',
                user: { email, ...credentials[email] },
            });
        }

        return new HttpResponse(
            JSON.stringify({ message: 'Invalid credentials' }),
            { status: 401 }
        );
    }),

    // Get teacher's classes with students
    http.get(`${API_BASE_URL}/teachers/me/classes`, () => {
        return HttpResponse.json([
            {
                id: 1,
                name: 'Mathematics Advanced',
                grade: '10th Grade',
                subject: 'Mathematics',
                students: [
                    { id: 1, name: 'Rahul Sharma', rollNumber: '001', profilePicture: '' },
                    { id: 2, name: 'Priya Patel', rollNumber: '002', profilePicture: '' },
                    { id: 3, name: 'Amit Kumar', rollNumber: '003', profilePicture: '' },
                    { id: 4, name: 'Sneha Gupta', rollNumber: '004', profilePicture: '' },
                    { id: 5, name: 'Vikram Singh', rollNumber: '005', profilePicture: '' },
                ],
            },
            {
                id: 2,
                name: 'Mathematics Honors',
                grade: '11th Grade',
                subject: 'Mathematics',
                students: [
                    { id: 6, name: 'Ananya Reddy', rollNumber: '101', profilePicture: '' },
                    { id: 7, name: 'Karan Mehta', rollNumber: '102', profilePicture: '' },
                    { id: 8, name: 'Neha Joshi', rollNumber: '103', profilePicture: '' },
                    { id: 9, name: 'Rohan Das', rollNumber: '104', profilePicture: '' },
                ],
            },
            {
                id: 3,
                name: 'Calculus',
                grade: '12th Grade',
                subject: 'Mathematics',
                students: [
                    { id: 10, name: 'Sanjay Verma', rollNumber: '201', profilePicture: '' },
                    { id: 11, name: 'Pooja Singh', rollNumber: '202', profilePicture: '' },
                    { id: 12, name: 'Arjun Nair', rollNumber: '203', profilePicture: '' },
                ],
            },
        ]);
    }),

    // Mark attendance
    http.post(`${API_BASE_URL}/attendance`, async ({ request }) => {
        const body = await request.json() as any;
        const { classId, date, students } = body;

        // Simulate creating attendance records
        const records = students.map((student: any) => ({
            id: Math.floor(Math.random() * 10000),
            studentId: student.id,
            studentName: `Student ${student.id}`,
            classId,
            className: 'Mathematics',
            date,
            status: student.status,
            markedBy: 1,
            markedByName: 'Dr. Robert Smith',
            createdAt: new Date().toISOString(),
        }));

        return HttpResponse.json({
            success: true,
            message: `Attendance marked successfully for ${students.length} students`,
            records,
        });
    }),

    // Get today's attendance for a class
    http.get(`${API_BASE_URL}/attendance/class/:classId/today`, ({ params }) => {
        const { classId } = params;
        const today = new Date().toISOString().split('T')[0];

        return HttpResponse.json({
            classId: Number(classId),
            className: 'Mathematics Advanced',
            date: today,
            totalStudents: 5,
            present: 4,
            absent: 1,
            late: 0,
            records: [
                {
                    id: 1,
                    studentId: 1,
                    studentName: 'Rahul Sharma',
                    classId: Number(classId),
                    className: 'Mathematics Advanced',
                    date: today,
                    status: 'present',
                    markedBy: 1,
                    markedByName: 'Dr. Robert Smith',
                    createdAt: new Date().toISOString(),
                },
                {
                    id: 2,
                    studentId: 2,
                    studentName: 'Priya Patel',
                    classId: Number(classId),
                    className: 'Mathematics Advanced',
                    date: today,
                    status: 'present',
                    markedBy: 1,
                    markedByName: 'Dr. Robert Smith',
                    createdAt: new Date().toISOString(),
                },
            ],
        });
    }),

    // Get attendance statistics for a class
    http.get(`${API_BASE_URL}/attendance/class/:classId/stats`, () => {

        return HttpResponse.json([
            {
                studentId: 1,
                studentName: 'Rahul Sharma',
                totalClasses: 20,
                present: 19,
                absent: 1,
                late: 0,
                attendancePercentage: 95,
                recentRecords: [],
            },
            {
                studentId: 2,
                studentName: 'Priya Patel',
                totalClasses: 20,
                present: 20,
                absent: 0,
                late: 0,
                attendancePercentage: 100,
                recentRecords: [],
            },
        ]);
    }),

    // Get class attendance for date range
    http.get(`${API_BASE_URL}/attendance/class/:classId`, ({ params, request }) => {
        const { classId } = params;
        const url = new URL(request.url);
        const startDate = url.searchParams.get('start');

        return HttpResponse.json([
            {
                classId: Number(classId),
                className: 'Mathematics Advanced',
                date: startDate || new Date().toISOString().split('T')[0],
                totalStudents: 5,
                present: 4,
                absent: 1,
                late: 0,
                records: [],
            },
        ]);
    }),

    // Get student attendance
    http.get(`${API_BASE_URL}/attendance/student/:studentId`, ({ params }) => {
        const { studentId } = params;

        return HttpResponse.json({
            studentId: Number(studentId),
            studentName: 'Rahul Sharma',
            totalClasses: 20,
            present: 18,
            absent: 2,
            late: 0,
            attendancePercentage: 90,
            recentRecords: [
                {
                    id: 1,
                    studentId: Number(studentId),
                    studentName: 'Rahul Sharma',
                    classId: 1,
                    className: 'Mathematics Advanced',
                    date: new Date().toISOString().split('T')[0],
                    status: 'present',
                    markedBy: 1,
                    markedByName: 'Dr. Robert Smith',
                    createdAt: new Date().toISOString(),
                },
            ],
        });
    }),

    // Update attendance record
    http.patch(`${API_BASE_URL}/attendance/:recordId`, async ({ params, request }) => {
        const { recordId } = params;
        const body = await request.json() as any;
        const { status } = body;

        return HttpResponse.json({
            success: true,
            record: {
                id: Number(recordId),
                studentId: 1,
                studentName: 'Rahul Sharma',
                classId: 1,
                className: 'Mathematics Advanced',
                date: new Date().toISOString().split('T')[0],
                status,
                markedBy: 1,
                markedByName: 'Dr. Robert Smith',
                createdAt: new Date().toISOString(),
            },
        });
    }),

    // Delete attendance record
    http.delete(`${API_BASE_URL}/attendance/:recordId`, () => {
        return HttpResponse.json({ success: true });
    }),

    // Student Dashboard Handlers
    http.get(`${API_BASE_URL}/students/me/subjects`, () => {
        return HttpResponse.json([
            { id: 1, name: 'Mathematics', teacher: 'Dr. Smith', assignments: 2, nextClass: '10:00 AM Today' },
            { id: 2, name: 'Physics', teacher: 'Mrs. Davis', assignments: 1, nextClass: '11:30 AM Tomorrow' },
            { id: 3, name: 'Chemistry', teacher: 'Mr. White', assignments: 0, nextClass: '09:00 AM Friday' },
            { id: 4, name: 'English', teacher: 'Ms. Johnson', assignments: 3, nextClass: '02:00 PM Today' },
            { id: 5, name: 'Computer Science', teacher: 'Mr. Wilson', assignments: 1, nextClass: '11:00 AM Monday' },
        ]);
    }),

    http.get(`${API_BASE_URL}/students/me/tests`, ({ request }) => {
        const url = new URL(request.url);
        const status = url.searchParams.get('status');

        if (status === 'upcoming') {
            return HttpResponse.json([
                { id: 1, subject: 'Mathematics', type: 'Midterm', date: '2024-03-25', duration: '90 min', topics: ['Algebra', 'Geometry'], status: 'active' },
                { id: 2, subject: 'Physics', type: 'Quiz', date: '2024-03-28', duration: '45 min', topics: ['Newton Laws'], status: 'upcoming' },
                { id: 3, subject: 'English', type: 'Essay', date: '2024-04-02', duration: '60 min', topics: ['Shakespeare'], status: 'upcoming' },
            ]);
        }
        return HttpResponse.json([
            { id: 101, subject: 'Chemistry', date: '2024-02-15', score: 85, percentage: 85, grade: 'A' },
            { id: 102, subject: 'Computer Science', date: '2024-02-10', score: 92, percentage: 92, grade: 'A+' },
            { id: 103, subject: 'Mathematics', date: '2024-01-20', score: 78, percentage: 78, grade: 'B+' },
        ]);
    }),

    http.get(`${API_BASE_URL}/students/me/meetings`, () => {
        return HttpResponse.json([
            { id: 1, title: 'Math Doubt Session', teacher: 'Dr. Smith', time: '4:00 PM Today', status: 'active', type: 'Doubt' },
            { id: 2, title: 'Physics Lab Prep', teacher: 'Mrs. Davis', time: '2:00 PM Tomorrow', status: 'scheduled', type: 'Class' },
        ]);
    }),

    http.get(`${API_BASE_URL}/students/me/assignments`, () => {
        return HttpResponse.json([
            { id: 1, title: 'Algebra Problem Set', subject: 'Mathematics', deadline: '2024-03-20', status: 'pending', description: 'Complete exercises 1-10' },
            { id: 2, title: 'Physics Lab Report', subject: 'Physics', deadline: '2024-03-22', status: 'pending', description: 'Submit report on pendulum' },
            { id: 3, title: 'Essay Draft', subject: 'English', deadline: '2024-03-15', status: 'overdue', description: 'First draft of hamlet essay' },
            { id: 4, title: 'Chemical Reactions', subject: 'Chemistry', deadline: '2024-03-10', status: 'graded', marks: '18/20', description: 'Balance equations' },
        ]);
    }),

    http.get(`${API_BASE_URL}/students/me/timetable`, () => {
        return HttpResponse.json([
            { time: '09:00 - 10:00', subject: 'Mathematics', teacher: 'Dr. Smith', room: '101' },
            { time: '10:00 - 11:00', subject: 'Physics', teacher: 'Mrs. Davis', room: 'Lab 2' },
            { time: '11:00 - 11:30', subject: 'Lunch Break', teacher: '-', room: 'Cafeteria' },
            { time: '11:30 - 12:30', subject: 'English', teacher: 'Ms. Johnson', room: '203' },
            { time: '12:30 - 01:30', subject: 'Chemistry', teacher: 'Mr. White', room: 'Lab 1' },
        ]);
    }),

    http.get(`${API_BASE_URL}/students/me/notifications`, () => {
        return HttpResponse.json([
            { id: 1, message: 'Math test scheduled for March 25th', time: '2 hours ago', type: 'reminder', read: false },
            { id: 2, message: 'Chemistry assignment graded: A', time: 'Yesterday', type: 'result', read: true },
            { id: 3, message: 'School closed on Friday', time: '2 days ago', type: 'announcement', read: true },
        ]);
    }),

    http.get(`${API_BASE_URL}/students/me/performance`, () => {
        return HttpResponse.json([
            { subject: 'Mathematics', avg: 85, trend: 'up' },
            { subject: 'Physics', avg: 78, trend: 'down' },
            { subject: 'Chemistry', avg: 92, trend: 'up' },
            { subject: 'English', avg: 88, trend: 'stable' },
        ]);
    }),

    http.get(`${API_BASE_URL}/students/me/daily-progress`, () => {
        return HttpResponse.json({
            attendance: 'Present',
            classesAttended: 3,
            totalClasses: 5,
            tasksCompleted: 2,
            totalTasks: 4,
            todayRating: 4,
            teacherRemark: 'Good participation in Math class.',
        });
    }),

    http.patch(`${API_BASE_URL}/students/me/notifications/:id/read`, () => {
        return HttpResponse.json({ success: true });
    }),
];
