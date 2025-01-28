import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Box,
  TextField,
  Menu,
  MenuItem,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  ChatBubbleOutline,
  Share,
  MoreVert,
  Send,
  Edit,
  Delete,
} from '@mui/icons-material';

interface Teacher {
  name: string;
  avatar: string;
  subject: string;
}

interface Comment {
  id: string;
  user: string;
  avatar: string;
  text: string;
  timestamp: string;
}

interface PostContent {
  type: 'image' | 'video';
  url: string;
  caption: string;
}

interface Post {
  id: string;
  teacher: Teacher;
  content: PostContent;
  timestamp: string;
  likes: number;
  comments: Comment[];
}

interface PostCardProps {
  post: Post;
  isTeacher: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, isTeacher }) => {
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedCaption, setEditedCaption] = useState(post.content.caption);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: String(post.comments.length + 1),
        user: 'Current User',
        avatar: '/avatars/default.jpg',
        text: newComment,
        timestamp: new Date().toISOString(),
      };
      // Add comment logic here
      setNewComment('');
    }
  };

  const handleEdit = () => {
    setEditDialogOpen(true);
    setAnchorEl(null);
  };

  const handleDelete = () => {
    setDeleteDialogOpen(true);
    setAnchorEl(null);
  };

  const handleSaveEdit = () => {
    // Update post logic here
    setEditDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    // Delete post logic here
    setDeleteDialogOpen(false);
  };

  return (
    <>
      <Card elevation={3}>
        <CardHeader
          avatar={<Avatar src={post.teacher.avatar} alt={post.teacher.name} />}
          action={
            isTeacher && (
              <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                <MoreVert />
              </IconButton>
            )
          }
          title={post.teacher.name}
          subheader={`${post.teacher.subject} • ${new Date(post.timestamp).toLocaleDateString()}`}
        />

        {post.content.type === 'image' ? (
          <CardMedia
            component="img"
            height="300"
            image={post.content.url}
            alt={post.content.caption}
          />
        ) : (
          <CardMedia
            component="video"
            height="300"
            src={post.content.url}
            controls
          />
        )}

        <CardContent>
          <Typography variant="body1">{post.content.caption}</Typography>
        </CardContent>

        <CardActions disableSpacing>
          <IconButton onClick={handleLike}>
            {liked ? <Favorite color="error" /> : <FavoriteBorder />}
          </IconButton>
          <Typography variant="body2">{post.likes + (liked ? 1 : 0)}</Typography>
          <IconButton onClick={() => setShowComments(!showComments)}>
            <ChatBubbleOutline />
          </IconButton>
          <Typography variant="body2">{post.comments.length}</Typography>
          <IconButton>
            <Share />
          </IconButton>
        </CardActions>

        {showComments && (
          <Box sx={{ p: 2 }}>
            <Divider />
            {post.comments.map((comment) => (
              <Box key={comment.id} sx={{ mt: 2 }}>
                <Box display="flex" alignItems="center" gap={1}>
                  <Avatar src={comment.avatar} alt={comment.user} sx={{ width: 32, height: 32 }} />
                  <Typography variant="subtitle2">{comment.user}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(comment.timestamp).toLocaleDateString()}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ mt: 1, ml: 5 }}>
                  {comment.text}
                </Typography>
              </Box>
            ))}
            <Box display="flex" gap={1} mt={2}>
              <TextField
                fullWidth
                size="small"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <IconButton color="primary" onClick={handleComment} disabled={!newComment.trim()}>
                <Send />
              </IconButton>
            </Box>
          </Box>
        )}
      </Card>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={handleEdit}>
          <Edit sx={{ mr: 1 }} /> Edit Post
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <Delete sx={{ mr: 1 }} /> Delete Post
        </MenuItem>
      </Menu>

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Post</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={editedCaption}
            onChange={(e) => setEditedCaption(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveEdit} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Post</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this post?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PostCard;
