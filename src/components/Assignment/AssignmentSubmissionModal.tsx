import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  LinearProgress,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from '@mui/material';
import {
  CloudUpload,
  InsertDriveFile,
  Delete,
  CheckCircle,
} from '@mui/icons-material';
import { useMutation, useQueryClient } from 'react-query';
import { assignmentService } from '../../services/assignmentService';

interface AssignmentSubmissionModalProps {
  open: boolean;
  onClose: () => void;
  assignmentId: number;
  assignmentTitle: string;
}

const AssignmentSubmissionModal: React.FC<AssignmentSubmissionModalProps> = ({
  open,
  onClose,
  assignmentId,
  assignmentTitle,
}) => {
  const queryClient = useQueryClient();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [notes, setNotes] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');

  const submitMutation = useMutation(
    () => {
      if (!selectedFile) throw new Error('No file selected');
      return assignmentService.submitAssignment(assignmentId, selectedFile, notes);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('assignments');
        handleClose();
      },
      onError: (err: any) => {
        setError(err.response?.data?.message || 'Failed to submit assignment');
      },
    }
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        return;
      }

      // Validate file type
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'image/jpeg',
        'image/png',
      ];

      if (!allowedTypes.includes(file.type)) {
        setError('Only PDF, DOC, DOCX, JPG, and PNG files are allowed');
        return;
      }

      setSelectedFile(file);
      setError('');
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setUploadProgress(0);
  };

  const handleSubmit = () => {
    if (!selectedFile) {
      setError('Please select a file to upload');
      return;
    }

    // Simulate upload progress (in real implementation, this comes from Axios)
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 200);

    submitMutation.mutate();
  };

  const handleClose = () => {
    setSelectedFile(null);
    setNotes('');
    setUploadProgress(0);
    setError('');
    onClose();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6">Submit Assignment</Typography>
        <Typography variant="body2" color="text.secondary">
          {assignmentTitle}
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 1 }}>
          {/* File Upload Area */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Upload File *
            </Typography>
            {!selectedFile ? (
              <Box
                sx={{
                  border: '2px dashed',
                  borderColor: 'divider',
                  borderRadius: 2,
                  p: 4,
                  textAlign: 'center',
                  cursor: 'pointer',
                  '&:hover': { borderColor: 'primary.main', bgcolor: 'action.hover' },
                }}
                component="label"
              >
                <CloudUpload sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Click to browse or drag and drop
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  PDF, DOC, DOCX, JPG, PNG (Max 10MB)
                </Typography>
                <input
                  type="file"
                  hidden
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                />
              </Box>
            ) : (
              <List>
                <ListItem
                  sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                  }}
                >
                  <ListItemIcon>
                    {uploadProgress === 100 ? (
                      <CheckCircle color="success" />
                    ) : (
                      <InsertDriveFile color="primary" />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={selectedFile.name}
                    secondary={formatFileSize(selectedFile.size)}
                  />
                  <IconButton
                    edge="end"
                    onClick={handleRemoveFile}
                    disabled={submitMutation.isLoading}
                  >
                    <Delete />
                  </IconButton>
                </ListItem>
              </List>
            )}
          </Box>

          {/* Upload Progress */}
          {uploadProgress > 0 && uploadProgress < 100 && (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="caption">Uploading...</Typography>
                <Typography variant="caption">{uploadProgress}%</Typography>
              </Box>
              <LinearProgress variant="determinate" value={uploadProgress} />
            </Box>
          )}

          {/* Notes Field */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Notes (Optional)
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="Add any notes or comments about your submission..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              disabled={submitMutation.isLoading}
            />
          </Box>

          {/* Error Message */}
          {error && (
            <Alert severity="error" onClose={() => setError('')}>
              {error}
            </Alert>
          )}

          {/* Success Message */}
          {uploadProgress === 100 && !submitMutation.isLoading && (
            <Alert severity="success">File uploaded successfully!</Alert>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2.5 }}>
        <Button onClick={handleClose} disabled={submitMutation.isLoading}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!selectedFile || submitMutation.isLoading}
          startIcon={<CloudUpload />}
        >
          {submitMutation.isLoading ? 'Submitting...' : 'Submit Assignment'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssignmentSubmissionModal;
