import React from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowRight } from 'lucide-react';

const MotionDiv = motion.div;

const HeroSection: React.FC = () => {
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
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#F8F9FC]">
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
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              Live Classes Available
            </span>
          </MotionDiv>

          {/* Headline */}
          <MotionDiv variants={itemVariants}>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-6">
              Shaping Futures,{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(to right, #4F46E5, #7C3AED)',
                }}
              >
                One Student
              </span>
              <br />
              at a Time
            </h1>
          </MotionDiv>

          {/* Subtitle */}
          <MotionDiv variants={itemVariants}>
            <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
              Personalized and professional tuition classes for 8th to 12th Science — designed to help students excel academically and grow holistically.
            </p>
          </MotionDiv>

          {/* CTA Buttons */}
          <MotionDiv variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button className="bg-gray-900 text-white text-base font-semibold px-8 py-4 rounded-full hover:bg-gray-800 hover:-translate-y-0.5 transition-all shadow-lg flex items-center gap-2">
              Explore Programs
              <ArrowRight size={18} />
            </button>
            <button className="bg-white text-gray-700 text-base font-semibold px-8 py-4 rounded-full border border-gray-200 hover:border-gray-300 hover:-translate-y-0.5 transition-all shadow-sm flex items-center gap-2">
              <Play size={18} className="text-indigo-600" />
              Watch Demo
            </button>
          </MotionDiv>

          {/* Stats Strip */}
          <MotionDiv
            variants={statsVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap items-center justify-center gap-8 md:gap-16"
          >
            <MotionDiv variants={statItemVariants} className="text-center">
              <p className="text-4xl md:text-5xl font-extrabold text-gray-900">500+</p>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mt-1">Students Enrolled</p>
            </MotionDiv>
            <div className="hidden md:block w-px h-12 bg-gray-200" />
            <MotionDiv variants={statItemVariants} className="text-center">
              <p className="text-4xl md:text-5xl font-extrabold text-gray-900">95%</p>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mt-1">Success Rate</p>
            </MotionDiv>
            <div className="hidden md:block w-px h-12 bg-gray-200" />
            <MotionDiv variants={statItemVariants} className="text-center">
              <p className="text-4xl md:text-5xl font-extrabold text-gray-900">5+</p>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mt-1">Years of Excellence</p>
            </MotionDiv>
          </MotionDiv>
        </MotionDiv>
      </div>
    </section>
  );
};

export default HeroSection;
