import prisma from '../config/database';

export const getMessages = async (groupId: number, limit = 50, offset = 0) => {
  const messages = await prisma.message.findMany({
    where: { chatGroupId: groupId },
    include: { sender: true },
    orderBy: { createdAt: 'desc' },
    skip: offset,
    take: limit,
  });

  return messages.reverse().map((m) => ({
    id: m.id,
    sender: m.sender.name,
    content: m.content,
    timestamp: m.createdAt.toISOString(),
    role: m.sender.role === 'teacher' ? 'teacher' : 'student',
  }));
};

export const sendMessage = async (groupId: number, senderId: number, content: string) => {
  const message = await prisma.message.create({
    data: {
      chatGroupId: groupId,
      senderId,
      content,
    },
    include: { sender: true },
  });

  return {
    id: message.id,
    sender: message.sender.name,
    content: message.content,
    timestamp: message.createdAt.toISOString(),
    role: message.sender.role === 'teacher' ? 'teacher' : 'student',
  };
};

export const deleteMessage = async (messageId: number) => {
  await prisma.message.delete({ where: { id: messageId } });
  return { message: 'Message deleted' };
};
