import React, { useState } from 'react';
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
} from '@mui/material';
import {
  Send,
  AttachFile,
  Person,
  Notifications,
  Delete,
} from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  role: 'teacher' | 'student';
}

const GroupChat: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'Ms. Johnson',
      content: 'Hello class! Don\'t forget about tomorrow\'s test.',
      timestamp: '10:30 AM',
      role: 'teacher',
    },
    {
      id: 2,
      sender: 'John Smith',
      content: 'Will it cover chapter 5 as well?',
      timestamp: '10:32 AM',
      role: 'student',
    },
    {
      id: 3,
      sender: 'Ms. Johnson',
      content: 'Yes, chapters 4 and 5 both.',
      timestamp: '10:33 AM',
      role: 'teacher',
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [fileUploadOpen, setFileUploadOpen] = useState(false);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: messages.length + 1,
      sender: user?.name || 'Anonymous',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      role: user?.role || 'student',
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileUpload = () => {
    setFileUploadOpen(false);
    // Implement file upload logic
  };

  return (
    <Paper elevation={3} sx={{ height: '500px', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'white' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Class Group Chat</Typography>
          <Box>
            <IconButton color="inherit">
              <Badge badgeContent={2} color="error">
                <Notifications />
              </Badge>
            </IconButton>
            <IconButton color="inherit">
              <Person />
            </IconButton>
          </Box>
        </Box>
      </Box>

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
                      {message.timestamp}
                    </Typography>
                  </Box>
                }
                secondary={message.content}
              />
              {user?.role === 'teacher' && (
                <IconButton size="small" color="error">
                  <Delete />
                </IconButton>
              )}
            </ListItem>
            {index < messages.length - 1 && <Divider variant="inset" component="li" />}
          </React.Fragment>
        ))}
      </List>

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
          <IconButton color="primary" onClick={handleSendMessage}>
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
