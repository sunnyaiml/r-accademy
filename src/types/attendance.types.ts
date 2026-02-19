export interface AttendanceRecord {
  id: number;
  studentId: number;
  studentName: string;
  classId: number;
  className: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  markedBy: number;
  markedByName: string;
  createdAt: string;
}

export interface MarkAttendancePayload {
  classId: number;
  date: string;
  students: {
    id: number;
    status: 'present' | 'absent' | 'late';
  }[];
}

export interface ClassAttendanceResponse {
  classId: number;
  className: string;
  date: string;
  totalStudents: number;
  present: number;
  absent: number;
  late: number;
  records: AttendanceRecord[];
}

export interface StudentAttendanceStats {
  studentId: number;
  studentName: string;
  totalClasses: number;
  present: number;
  absent: number;
  late: number;
  attendancePercentage: number;
  recentRecords: AttendanceRecord[];
}

export interface AttendanceStudent {
  id: number;
  name: string;
  rollNumber?: string;
  profilePicture?: string;
  status?: 'present' | 'absent' | 'late';
}

export interface ClassWithStudents {
  id: number;
  name: string;
  grade: string;
  subject: string;
  students: AttendanceStudent[];
}
