import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../../components/Home/HeroSection';
import AboutClasses from '../../components/Home/AboutClasses';

import ParentReviews from '../../components/Home/ParentReviews';
import CultureGrid from '../../components/Home/CultureGrid';
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
  const navigate = useNavigate();

  return (
    <div>
      <motion.div id="hero" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <HeroSection />
      </motion.div>

      <motion.div id="about" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <AboutClasses />
      </motion.div>

      <motion.div id="testimonials" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <ParentReviews />
      </motion.div>

      <motion.div id="life" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <CultureGrid />
      </motion.div>

      <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <WhyChooseUs />
      </motion.div>

      {/* Dark CTA Section */}
      <section className="py-24 bg-[#F8F9FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="rounded-[2.5rem] px-8 py-20 md:py-24 text-center relative overflow-hidden shadow-2xl shadow-indigo-900/20"
            style={{ background: 'linear-gradient(135deg, #0F172A 0%, #312E81 50%, #4338CA 100%)' }}
          >
            {/* Decorative animated circles */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

            <div className="relative z-10">
              <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 text-indigo-100 text-sm font-semibold tracking-wider mb-6 border border-white/20 backdrop-blur-md">
                ADMISSIONS OPEN
              </span>
              <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8 tracking-tight">
                Ready to Join <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-white">R Education?</span>
              </h2>
              <p className="text-indigo-100/90 text-lg md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed font-light">
                Secure your child's future with our structured academic programs. Excellence begins here.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <button
                  onClick={() => navigate('/contact')}
                  className="w-full sm:w-auto bg-white text-indigo-900 font-bold text-lg px-12 py-5 rounded-full hover:bg-indigo-50 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-95"
                >
                  Enroll Now
                </button>
                <button
                  onClick={() => navigate('/about')}
                  className="w-full sm:w-auto border-2 border-white/30 text-white font-bold text-lg px-12 py-5 rounded-full hover:bg-white/10 transition-all hover:border-white/50 hover:-translate-y-1 active:scale-95 backdrop-blur-sm"
                >
                  Learn More
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
