import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Badge,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from '@mui/material';
import {
  Send,
  AttachFile,
  Person,
  Notifications,
  Delete,
} from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useAuth } from '../../hooks/useAuth';
import { chatService } from '../../services/chatService';
import { getSocket } from '../../utils/socket';
import type { Message } from '../../types/student.types';

interface GroupChatProps {
  groupId?: number;
  groupName?: string;
}

const GroupChat: React.FC<GroupChatProps> = ({ groupId = 1, groupName = 'Class Group Chat' }) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const socket = getSocket();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [newMessage, setNewMessage] = useState('');
  const [fileUploadOpen, setFileUploadOpen] = useState(false);

  // Fetch initial messages from API
  const { data: messages = [], isLoading } = useQuery(
    ['messages', groupId],
    () => chatService.getMessages(groupId).then((r) => r.data),
    {
      onSuccess: () => {
        // Scroll to bottom when messages load
        scrollToBottom();
      },
    }
  );

  // Send message mutation
  const sendMessageMutation = useMutation(
    (content: string) => chatService.sendMessage(groupId, content),
    {
      onSuccess: () => {
        setNewMessage('');
        // Message will appear via socket event, no need to update here
      },
    }
  );

  // Delete message mutation (teacher only)
  const deleteMessageMutation = useMutation(
    (messageId: number) => chatService.deleteMessage(messageId),
    {
      onSuccess: () => {
        // Message will be removed via socket event
      },
    }
  );

  // Socket.io real-time listeners
  useEffect(() => {
    if (!socket) return;

    // Join the chat room
    socket.emit('join_room', { groupId });

    // Listen for new messages
    socket.on('new_message', (message: Message) => {
      queryClient.setQueryData(['messages', groupId], (old: Message[] = []) => [...old, message]);
      scrollToBottom();
    });

    // Listen for deleted messages
    socket.on('message_deleted', (messageId: number) => {
      queryClient.setQueryData(['messages', groupId], (old: Message[] = []) =>
        old.filter((m) => m.id !== messageId)
      );
    });

    // Cleanup on unmount
    return () => {
      socket.emit('leave_room', { groupId });
      socket.off('new_message');
      socket.off('message_deleted');
    };
  }, [groupId, socket, queryClient]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    sendMessageMutation.mutate(newMessage);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleDeleteMessage = (messageId: number) => {
    if (user?.role === 'teacher') {
      deleteMessageMutation.mutate(messageId);
    }
  };

  const handleFileUpload = () => {
    setFileUploadOpen(false);
    // TODO: Implement file upload logic in Phase 2
  };

  return (
    <Paper elevation={3} sx={{ height: '500px', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'white' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">{groupName}</Typography>
          <Box>
            <IconButton color="inherit">
              <Badge badgeContent={0} color="error">
                <Notifications />
              </Badge>
            </IconButton>
            <IconButton color="inherit">
              <Person />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}>
          <CircularProgress />
        </Box>
      ) : (
        <List sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
          {messages.map((message, index) => (
            <React.Fragment key={message.id}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar>{message.sender[0]}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography
                        component="span"
                        variant="subtitle2"
                        color={message.role === 'teacher' ? 'primary' : 'text.primary'}
                      >
                        {message.sender}
                      </Typography>
                      <Typography component="span" variant="caption" color="text.secondary">
                        {new Date(message.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </Typography>
                    </Box>
                  }
                  secondary={message.content}
                />
                {user?.role === 'teacher' && (
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDeleteMessage(message.id)}
                    disabled={deleteMessageMutation.isLoading}
                  >
                    <Delete />
                  </IconButton>
                )}
              </ListItem>
              {index < messages.length - 1 && <Divider variant="inset" component="li" />}
            </React.Fragment>
          ))}
          <div ref={messagesEndRef} />
        </List>
      )}

      <Box sx={{ p: 2, bgcolor: 'background.paper' }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton onClick={() => setFileUploadOpen(true)}>
            <AttachFile />
          </IconButton>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type a message..."
            size="small"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <IconButton
            color="primary"
            onClick={handleSendMessage}
            disabled={sendMessageMutation.isLoading || !newMessage.trim()}
          >
            <Send />
          </IconButton>
        </Box>
      </Box>

      <Dialog open={fileUploadOpen} onClose={() => setFileUploadOpen(false)}>
        <DialogTitle>Upload File</DialogTitle>
        <DialogContent>
          <Button variant="contained" component="label">
            Choose File
            <input type="file" hidden />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFileUploadOpen(false)}>Cancel</Button>
          <Button onClick={handleFileUpload} variant="contained">
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default GroupChat;
