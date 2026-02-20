import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, BookOpen, Users, Award, Heart } from 'lucide-react';

const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const values = [
    { icon: <BookOpen className="w-6 h-6" />, title: 'Structured Learning', desc: 'A well-organized curriculum with weekly tests, detailed feedback, and continuous improvement tracking.', color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-100' },
    { icon: <Users className="w-6 h-6" />, title: 'Personalized Attention', desc: 'Small batch sizes ensure every student gets individual guidance and mentoring from our expert faculty.', color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-100' },
    { icon: <Award className="w-6 h-6" />, title: 'Proven Results', desc: 'Our students consistently rank at the top of their classes with significant academic improvement.', color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-100' },
    { icon: <Heart className="w-6 h-6" />, title: 'Holistic Development', desc: 'Beyond academics, we nurture confidence, discipline, and curiosity through activities and events.', color: 'text-pink-500', bg: 'bg-pink-50', border: 'border-pink-100' },
];

const AboutUs: React.FC = () => {
    return (
        <div className="bg-[#F8F9FC] min-h-screen">
            {/* Hero Banner */}
            <div
                className="relative py-24 text-center overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #334155 100%)' }}
            >
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #6366f1 0%, transparent 50%), radial-gradient(circle at 70% 50%, #3b82f6 0%, transparent 50%)' }} />
                <div className="relative z-10 max-w-3xl mx-auto px-4">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 text-blue-200 text-sm font-semibold tracking-wider mb-4 border border-white/20 backdrop-blur-md">
                            OUR STORY
                        </span>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
                            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">R Education</span>
                        </h1>
                        <p className="text-slate-300 text-lg leading-relaxed">
                            Building a disciplined academic foundation for students from Std 2 to Std 10 since day one.
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                {/* Vision & Mission */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 -mt-20 relative z-10">
                    <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        className="bg-white rounded-3xl p-10 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300"
                    >
                        <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-500 mb-6">
                            <Eye className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-extrabold text-slate-900 mb-4">Our Vision</h2>
                        <p className="text-slate-600 leading-relaxed">
                            To be a leading tuition institute that fosters academic excellence, discipline, and holistic growth — producing confident learners ready for the future.
                        </p>
                    </motion.div>
                    <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        className="bg-white rounded-3xl p-10 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300"
                    >
                        <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 mb-6">
                            <Target className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-extrabold text-slate-900 mb-4">Our Mission</h2>
                        <p className="text-slate-600 leading-relaxed">
                            To empower every student with quality education through structured teaching, regular assessments, and personalized mentoring in a professional academic environment.
                        </p>
                    </motion.div>
                </div>

                {/* Teaching Philosophy */}
                <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <span className="inline-block py-1.5 px-4 rounded-full bg-primary-50 text-primary-700 text-sm font-semibold tracking-wider mb-4 border border-primary-200">
                        WHAT SETS US APART
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
                        Our Core Values
                    </h2>
                    <p className="text-slate-600 text-lg leading-relaxed">
                        We believe in a professional approach that balances academic rigor with genuine student engagement and care.
                    </p>
                </motion.div>

                {/* Values Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    initial="hidden" whileInView="visible" viewport={{ once: true }}
                    variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                >
                    {values.map((v, i) => (
                        <motion.div
                            key={i}
                            variants={sectionVariants}
                            className={`group relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden`}
                        >
                            <div className={`w-14 h-14 ${v.bg} rounded-2xl flex items-center justify-center ${v.color} mb-6 border ${v.border}`}>
                                {v.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-3">{v.title}</h3>
                            <p className="text-slate-600 leading-relaxed">{v.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default AboutUs;
