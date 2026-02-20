import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MotionDiv = motion.div;

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  };

  const statsVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 1 },
    },
  };

  const statItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="relative min-h-[70vh] md:min-h-[90vh] flex items-center overflow-hidden bg-[#F8F9FC] py-16 md:py-0">
      {/* Animated Blob Shapes */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
      <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" style={{ animationDelay: '4s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <MotionDiv
          className="text-center max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Live Badge */}
          <MotionDiv variants={itemVariants} className="mb-8">
            <span className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm font-medium text-gray-700 shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500" />
              </span>
              Admissions for the new session are now open
            </span>
          </MotionDiv>

          {/* Headline */}
          <MotionDiv variants={itemVariants}>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-6">
              Structured Learning.<br />
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(to right, #4F46E5, #9333EA)',
                }}
              >
                Disciplined Future.
              </span>
            </h1>
          </MotionDiv>

          {/* Subtitle */}
          <MotionDiv variants={itemVariants}>
            <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
              At R Education, we combine professional teaching with a rigourous academic system to ensure every student reaches their full potential.
            </p>
          </MotionDiv>

          {/* CTA Buttons */}
          <MotionDiv variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={() => navigate('/contact')}
              className="bg-primary-600 text-white text-base font-semibold px-8 py-4 rounded-full hover:bg-primary-700 hover:-translate-y-0.5 transition-all shadow-lg flex items-center gap-2"
            >
              Enroll Now
              <ArrowRight size={18} />
            </button>
            <button
              onClick={() => navigate('/about')}
              className="bg-white text-gray-700 text-base font-semibold px-8 py-4 rounded-full border border-gray-200 hover:border-gray-300 hover:-translate-y-0.5 transition-all shadow-sm flex items-center gap-2"
            >
              <Info size={18} className="text-primary-600" />
              Our Philosophy
            </button>
          </MotionDiv>

          {/* Stats Strip */}
          <MotionDiv
            variants={statsVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-16"
          >
            <MotionDiv variants={statItemVariants} className="text-center">
              <p className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-gray-900">Std 2-10</p>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mt-1">Coaching</p>
            </MotionDiv>
            <div className="hidden md:block w-px h-12 bg-gray-200" />
            <MotionDiv variants={statItemVariants} className="text-center">
              <p className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-gray-900">4+</p>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mt-1">Expert Faculties</p>
            </MotionDiv>
            <div className="hidden md:block w-px h-12 bg-gray-200" />
            <MotionDiv variants={statItemVariants} className="text-center">
              <p className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-gray-900">Weekly</p>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mt-1">Test System</p>
            </MotionDiv>
            <div className="hidden md:block w-px h-12 bg-gray-200" />
            <MotionDiv variants={statItemVariants} className="text-center">
              <p className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-gray-900">100%</p>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mt-1">Personalized Attention</p>
            </MotionDiv>
          </MotionDiv>
        </MotionDiv>
      </div>
    </section>
  );
};

export default HeroSection;
