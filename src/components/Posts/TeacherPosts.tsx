import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  IconButton,
  Card,
  CardContent,
  Grid,
  Chip,
} from '@mui/material';
import {
  Add,
  PhotoCamera,
  Videocam,
  Search,
  Clear,
} from '@mui/icons-material';
import PostCard from './PostCard';
import { useAuth } from '../../hooks/useAuth';

interface TeacherPostsProps {
  isTeacher: boolean;
}

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
  subject?: string;
  tags?: string[];
}

const TeacherPosts: React.FC<TeacherPostsProps> = ({ isTeacher }) => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [openCreatePost, setOpenCreatePost] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'popular'>('newest');
  const [newPost, setNewPost] = useState({
    type: 'image' as 'image' | 'video',
    url: '',
    caption: '',
    subject: '',
    tags: [] as string[],
  });
  const [newTag, setNewTag] = useState('');

  // Simulated data load
  useEffect(() => {
    const samplePosts: Post[] = [
      {
        id: '1',
        teacher: {
          name: 'John Smith',
          avatar: '/avatars/teacher1.jpg',
          subject: 'Mathematics',
        },
        content: {
          type: 'image',
          url: '/posts/math-example.jpg',
          caption: 'Today\'s lesson on quadratic equations',
        },
        timestamp: new Date().toISOString(),
        likes: 15,
        comments: [],
        subject: 'Mathematics',
        tags: ['algebra', 'quadratic equations'],
      },
      // Add more sample posts here
    ];
    setPosts(samplePosts);
  }, []);

  const handleCreatePost = () => {
    const post: Post = {
      id: String(posts.length + 1),
      teacher: {
        name: user?.name || 'Current Teacher',
        avatar: '/avatars/current-teacher.jpg',
        subject: newPost.subject,
      },
      content: {
        type: newPost.type,
        url: newPost.url,
        caption: newPost.caption,
      },
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: [],
      subject: newPost.subject,
      tags: newPost.tags,
    };

    setPosts([post, ...posts]);
    setOpenCreatePost(false);
    setNewPost({
      type: 'image',
      url: '',
      caption: '',
      subject: '',
      tags: [],
    });
  };

  const handleAddTag = () => {
    if (newTag && !newPost.tags.includes(newTag)) {
      setNewPost({
        ...newPost,
        tags: [...newPost.tags, newTag],
      });
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setNewPost({
      ...newPost,
      tags: newPost.tags.filter(tag => tag !== tagToRemove),
    });
  };

  const filteredPosts = posts
    .filter(post => {
      const matchesSearch = post.content.caption.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesSubject = !selectedSubject || post.subject === selectedSubject;
      return matchesSearch && matchesSubject;
    })
    .sort((a, b) => {
      if (sortOrder === 'newest') {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      }
      return b.likes - a.likes;
    });

  const subjects = Array.from(new Set(posts.map(post => post.subject))).filter(Boolean);

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h2">
          Teacher Posts
        </Typography>
        {isTeacher && (
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setOpenCreatePost(true)}
          >
            Create Post
          </Button>
        )}
      </Box>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                  endAdornment: searchTerm && (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={() => setSearchTerm('')}>
                        <Clear />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Filter by Subject</InputLabel>
                <Select
                  value={selectedSubject}
                  label="Filter by Subject"
                  onChange={(e) => setSelectedSubject(e.target.value)}
                >
                  <MenuItem value="">All Subjects</MenuItem>
                  {subjects.map((subject) => (
                    <MenuItem key={subject} value={subject}>
                      {subject}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Sort by</InputLabel>
                <Select
                  value={sortOrder}
                  label="Sort by"
                  onChange={(e) => setSortOrder(e.target.value as 'newest' | 'popular')}
                >
                  <MenuItem value="newest">Newest First</MenuItem>
                  <MenuItem value="popular">Most Popular</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Box display="flex" flexDirection="column" gap={4}>
        {filteredPosts.map((post) => (
          <PostCard key={post.id} post={post} isTeacher={isTeacher} />
        ))}
        {filteredPosts.length === 0 && (
          <Typography textAlign="center" color="text.secondary">
            No posts found matching your criteria
          </Typography>
        )}
      </Box>

      <Dialog open={openCreatePost} onClose={() => setOpenCreatePost(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Post</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={3} mt={2}>
            <FormControl fullWidth>
              <InputLabel>Content Type</InputLabel>
              <Select
                value={newPost.type}
                label="Content Type"
                onChange={(e) => setNewPost({ ...newPost, type: e.target.value as 'image' | 'video' })}
              >
                <MenuItem value="image">
                  <Box display="flex" alignItems="center" gap={1}>
                    <PhotoCamera /> Image
                  </Box>
                </MenuItem>
                <MenuItem value="video">
                  <Box display="flex" alignItems="center" gap={1}>
                    <Videocam /> Video
                  </Box>
                </MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Subject</InputLabel>
              <Select
                value={newPost.subject}
                label="Subject"
                onChange={(e) => setNewPost({ ...newPost, subject: e.target.value })}
              >
                <MenuItem value="Mathematics">Mathematics</MenuItem>
                <MenuItem value="Physics">Physics</MenuItem>
                <MenuItem value="Chemistry">Chemistry</MenuItem>
                <MenuItem value="Biology">Biology</MenuItem>
                <MenuItem value="English">English</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Content URL"
              value={newPost.url}
              onChange={(e) => setNewPost({ ...newPost, url: e.target.value })}
            />

            <TextField
              fullWidth
              label="Caption"
              multiline
              rows={4}
              value={newPost.caption}
              onChange={(e) => setNewPost({ ...newPost, caption: e.target.value })}
            />

            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Tags
              </Typography>
              <Box display="flex" gap={1} mb={1}>
                {newPost.tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    onDelete={() => handleRemoveTag(tag)}
                    size="small"
                  />
                ))}
              </Box>
              <Box display="flex" gap={1}>
                <TextField
                  size="small"
                  placeholder="Add a tag"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                />
                <Button variant="outlined" onClick={handleAddTag}>
                  Add
                </Button>
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreatePost(false)}>Cancel</Button>
          <Button
            onClick={handleCreatePost}
            variant="contained"
            disabled={!newPost.url || !newPost.caption || !newPost.subject}
          >
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TeacherPosts;
