import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  TextField,
  Button,
  Divider,
} from '@mui/material';
import {
  Facebook,
  Instagram,
  YouTube,
  GitHub,
  Email,
  Phone,
  LocationOn,
} from '@mui/icons-material';

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        py: 6,
        mt: 8,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              🔗 Quick Links
            </Typography>
            <Link href="/" color="inherit" display="block" sx={{ mb: 1 }}>
              Home
            </Link>
            <Link href="/about" color="inherit" display="block" sx={{ mb: 1 }}>
              About Us
            </Link>
            <Link href="/classes" color="inherit" display="block" sx={{ mb: 1 }}>
              Classes
            </Link>
            <Link href="/schedule" color="inherit" display="block" sx={{ mb: 1 }}>
              Schedule
            </Link>
            <Link href="/contact" color="inherit" display="block">
              Contact
            </Link>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              📞 Contact Us
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Email sx={{ mr: 1 }} />
              <Typography>Sunny.work70@gmail.com</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Phone sx={{ mr: 1 }} />
              <Typography>+91 98765 43210</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
              <LocationOn sx={{ mr: 1, mt: 0.5 }} />
              <Typography>
                Room no. 36, Utkal Sadan,
                <br />
                Opp. to RK Jewellers,
                <br />
                Ganesh Chowk, Bhatwadi,
                <br />
                Kisan Nagar No.3, Wagle Estate,
                <br />
                Thane - 400604
              </Typography>
            </Box>
          </Grid>

          {/* Newsletter Signup */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              📫 Newsletter
            </Typography>
            <Typography paragraph>Stay Updated! Subscribe for Offers and Updates</Typography>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Enter your email"
              sx={{
                mb: 2,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                '& .MuiOutlinedInput-root': {
                  color: 'white',
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                  },
                },
              }}
            />
            <Button variant="contained" color="secondary" fullWidth>
              Subscribe
            </Button>
          </Grid>

          {/* Social Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              🌐 Connect With Us
            </Typography>
            <Box>
              <IconButton color="inherit" aria-label="Facebook">
                <Facebook />
              </IconButton>
              <IconButton color="inherit" aria-label="Instagram">
                <Instagram />
              </IconButton>
              <IconButton color="inherit" aria-label="YouTube">
                <YouTube />
              </IconButton>
              <IconButton color="inherit" aria-label="GitHub">
                <GitHub />
              </IconButton>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                🏆 Best Local Tuition Center, 2023
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                📚 5+ Years of Teaching Excellence
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                🎓 500+ Students Enrolled
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

        {/* Creator Info */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            Created with ❤️ by Sunny Vishwakarma
          </Typography>
          <Link
            href="https://github.com/sunnyaiml"
            color="inherit"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ display: 'inline-flex', alignItems: 'center', mt: 1 }}
          >
            <GitHub sx={{ mr: 0.5 }} />
            GitHub Repository
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
