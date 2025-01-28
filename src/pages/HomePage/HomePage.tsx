import React from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import HeroSection from '../../components/Home/HeroSection';
import IntroVideo from '../../components/Home/IntroVideo';
import AboutClasses from '../../components/Home/AboutClasses';
import TeacherPosts from '../../components/Posts/TeacherPosts';
import ParentReviews from '../../components/Home/ParentReviews';
import PastEvents from '../../components/Home/PastEvents';
import DemoLectures from '../../components/Home/DemoLectures';
import WhyChooseUs from '../../components/Home/WhyChooseUs';
import GroupChat from '../../components/Chat/GroupChat';
import StudentDashboard from '../../components/Dashboard/StudentDashboard';
import TeacherDashboard from '../../components/Dashboard/TeacherDashboard';

const MotionBox = motion(Box);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const HomePage: React.FC = () => {
  const { user } = useAuth();

  const renderAuthenticatedContent = () => {
    if (!user) return null;

    if (user.role === 'student') {
      return (
        <MotionBox
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <StudentDashboard />
          <GroupChat />
        </MotionBox>
      );
    }

    if (user.role === 'teacher') {
      return (
        <MotionBox
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <TeacherDashboard />
          <GroupChat />
        </MotionBox>
      );
    }

    return null;
  };

  const renderPublicContent = () => (
    <MotionBox
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <MotionBox variants={itemVariants}>
        <HeroSection />
      </MotionBox>
      <MotionBox variants={itemVariants}>
        <IntroVideo />
      </MotionBox>
      <MotionBox variants={itemVariants}>
        <AboutClasses />
      </MotionBox>
      <MotionBox variants={itemVariants}>
        <TeacherPosts />
      </MotionBox>
      <MotionBox variants={itemVariants}>
        <ParentReviews />
      </MotionBox>
      <MotionBox variants={itemVariants}>
        <PastEvents />
      </MotionBox>
      <MotionBox variants={itemVariants}>
        <DemoLectures />
      </MotionBox>
      <MotionBox variants={itemVariants}>
        <WhyChooseUs />
      </MotionBox>
    </MotionBox>
  );

  return (
    <Box>
      {user ? renderAuthenticatedContent() : renderPublicContent()}
    </Box>
  );
};

export default HomePage;
