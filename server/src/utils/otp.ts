import prisma from '../config/database';

export const generateOtp = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const createOtp = async (contact: string): Promise<string> => {
  const code = generateOtp();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  await prisma.otp.create({
    data: { contact, code, expiresAt },
  });

  // In production, send OTP via email/SMS here
  console.log(`[OTP] Code for ${contact}: ${code}`);

  return code;
};

export const verifyOtp = async (
  contact: string,
  code: string
): Promise<boolean> => {
  const otp = await prisma.otp.findFirst({
    where: {
      contact,
      code,
      verified: false,
      expiresAt: { gte: new Date() },
    },
    orderBy: { createdAt: 'desc' },
  });

  if (!otp) return false;

  await prisma.otp.update({
    where: { id: otp.id },
    data: { verified: true },
  });

  return true;
};
