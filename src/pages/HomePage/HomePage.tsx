import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../../components/Home/HeroSection';
import IntroVideo from '../../components/Home/IntroVideo';
import AboutClasses from '../../components/Home/AboutClasses';
import TeacherPosts from '../../components/Posts/TeacherPosts';
import ParentReviews from '../../components/Home/ParentReviews';
import PastEvents from '../../components/Home/PastEvents';
import DemoLectures from '../../components/Home/DemoLectures';
import WhyChooseUs from '../../components/Home/WhyChooseUs';

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const HomePage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // If logged in, redirect to appropriate dashboard
  React.useEffect(() => {
    if (user) {
      if (user.role === 'student') navigate('/student/dashboard', { replace: true });
      else if (user.role === 'teacher') navigate('/teacher/dashboard', { replace: true });
      else if (user.role === 'parent') navigate('/parent/dashboard', { replace: true });
      else if (user.role === 'admin') navigate('/admin/dashboard', { replace: true });
    }
  }, [user, navigate]);

  // Don't render marketing content while redirecting
  if (user) return null;

  return (
    <div>
      <motion.div id="hero" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <HeroSection />
      </motion.div>

      <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <IntroVideo />
      </motion.div>

      <motion.div id="about" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <AboutClasses />
      </motion.div>

      <motion.div id="classes" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <TeacherPosts isTeacher={false} />
      </motion.div>

      <motion.div id="testimonials" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <ParentReviews />
      </motion.div>

      <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <PastEvents />
      </motion.div>

      <motion.div id="lectures" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <DemoLectures />
      </motion.div>

      <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <WhyChooseUs />
      </motion.div>

      {/* Dark CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="rounded-3xl px-8 py-16 md:py-20 text-center relative overflow-hidden shadow-2xl shadow-primary-200"
            style={{ background: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 50%, var(--primary-main) 100%)' }}
          >
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
                Ready to Start Your Journey?
              </h2>
              <p className="text-indigo-100/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                Join hundreds of students who are already excelling in their academics with R Academy. Experience personalized learning today.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center">
                <button
                  onClick={() => navigate('/student/login')}
                  className="bg-white text-primary-600 font-bold px-10 py-4 rounded-2xl hover:bg-primary-50 transition-all shadow-xl hover:-translate-y-1 active:scale-95"
                >
                  Get Started Today
                </button>
                <button className="border-2 border-white/20 text-white font-bold px-10 py-4 rounded-2xl hover:bg-white/10 transition-all hover:-translate-y-1 active:scale-95 backdrop-blur-sm">
                  Schedule a Visit
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
