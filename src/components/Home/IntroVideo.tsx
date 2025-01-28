import React from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';

const IntroVideo: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" textAlign="center" gutterBottom>
          Welcome to Our Academy
        </Typography>
        <Paper 
          elevation={3}
          sx={{
            position: 'relative',
            paddingTop: '56.25%', // 16:9 Aspect Ratio
            overflow: 'hidden',
          }}
        >
          <iframe
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 0,
            }}
            src="https://www.youtube.com/embed/your-video-id"
            title="Academy Introduction"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Paper>
        <Typography variant="h5" textAlign="center" sx={{ mt: 4 }}>
          Empowering Minds, Shaping Futures
        </Typography>
        <Typography variant="body1" textAlign="center" sx={{ mt: 2 }}>
          Join our academy and experience excellence in education with expert teachers,
          modern facilities, and a supportive learning environment.
        </Typography>
      </Box>
    </Container>
  );
};

export default IntroVideo;
