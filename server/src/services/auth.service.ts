import prisma from '../config/database';
import { hashPassword, comparePassword } from '../utils/hash';
import { signToken } from '../utils/jwt';
import { createOtp, verifyOtp as verifyOtpUtil } from '../utils/otp';
import { Role } from '@prisma/client';

const formatUserResponse = (user: any) => {
  const base: any = {
    id: String(user.id),
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
  };
  if (user.studentProfile) {
    base.grade = user.studentProfile.grade;
    base.studentId = user.studentProfile.studentId;
  }
  if (user.teacherProfile) {
    base.specialization = user.teacherProfile.specialization;
  }
  return base;
};

export const login = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      studentProfile: true,
      teacherProfile: true,
      parentProfile: true,
    },
  });

  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isValid = await comparePassword(password, user.password);
  if (!isValid) {
    throw new Error('Invalid email or password');
  }

  const token = signToken({ userId: user.id, role: user.role });
  return { token, user: formatUserResponse(user) };
};

export const register = async (data: {
  name: string;
  email: string;
  phone: string;
  password: string;
  role?: string;
  studentId?: string;
  specialization?: string;
}) => {
  const existing = await prisma.user.findUnique({ where: { email: data.email } });
  if (existing) {
    throw new Error('Email already registered');
  }

  const hashedPassword = await hashPassword(data.password);
  const role = (data.role as Role) || 'student';

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: hashedPassword,
      role,
    },
  });

  // Create role-specific profile
  if (role === 'student') {
    const studentId = `STU${String(user.id).padStart(5, '0')}`;
    await prisma.studentProfile.create({
      data: {
        userId: user.id,
        studentId,
        grade: '10',
        section: 'A',
      },
    });
  } else if (role === 'teacher') {
    await prisma.teacherProfile.create({
      data: {
        userId: user.id,
        specialization: data.specialization || null,
      },
    });
  } else if (role === 'parent') {
    const parentProfile = await prisma.parentProfile.create({
      data: { userId: user.id },
    });

    // Link to child if studentId provided
    if (data.studentId) {
      const studentProfile = await prisma.studentProfile.findUnique({
        where: { studentId: data.studentId },
      });
      if (studentProfile) {
        await prisma.parentStudent.create({
          data: {
            parentProfileId: parentProfile.id,
            studentProfileId: studentProfile.id,
          },
        });
      }
    }
  }

  // Send OTP for verification
  await createOtp(data.email);

  return { message: 'Registration successful. Please verify your account.' };
};

export const sendOtp = async (contact: string) => {
  await createOtp(contact);
  return { message: 'OTP sent successfully' };
};

export const verifyOtpAndActivate = async (data: {
  otp: string;
  email?: string;
  phone?: string;
  name?: string;
  password?: string;
  role?: string;
  studentId?: string;
  specialization?: string;
}) => {
  const contact = data.email || data.phone || '';
  const isValid = await verifyOtpUtil(contact, data.otp);

  if (!isValid) {
    throw new Error('Invalid or expired OTP');
  }

  // Check if user exists (registered but not verified)
  let user = await prisma.user.findUnique({
    where: { email: contact },
    include: {
      studentProfile: true,
      teacherProfile: true,
      parentProfile: true,
    },
  });

  if (!user && data.name && data.password) {
    // Create user from OTP flow (register + verify in one step)
    const hashedPassword = await hashPassword(data.password);
    const role = (data.role as Role) || 'student';

    user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email || '',
        phone: data.phone || '',
        password: hashedPassword,
        role,
        isVerified: true,
      },
      include: {
        studentProfile: true,
        teacherProfile: true,
        parentProfile: true,
      },
    });

    if (role === 'student') {
      const studentId = `STU${String(user.id).padStart(5, '0')}`;
      await prisma.studentProfile.create({
        data: { userId: user.id, studentId, grade: '10', section: 'A' },
      });
    } else if (role === 'teacher') {
      await prisma.teacherProfile.create({
        data: { userId: user.id, specialization: data.specialization || null },
      });
    } else if (role === 'parent') {
      const parentProfile = await prisma.parentProfile.create({
        data: { userId: user.id },
      });
      if (data.studentId) {
        const studentProfile = await prisma.studentProfile.findUnique({
          where: { studentId: data.studentId },
        });
        if (studentProfile) {
          await prisma.parentStudent.create({
            data: { parentProfileId: parentProfile.id, studentProfileId: studentProfile.id },
          });
        }
      }
    }

    // Re-fetch with profiles
    user = await prisma.user.findUnique({
      where: { id: user.id },
      include: { studentProfile: true, teacherProfile: true, parentProfile: true },
    });
  } else if (user) {
    // Mark existing user as verified
    await prisma.user.update({
      where: { id: user.id },
      data: { isVerified: true },
    });
  }

  if (!user) {
    throw new Error('User not found');
  }

  const token = signToken({ userId: user.id, role: user.role });
  return { token, user: formatUserResponse(user) };
};
