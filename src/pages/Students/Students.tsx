import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Award, Star, Users } from 'lucide-react';

const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const achievements = [
    { icon: <TrendingUp className="w-6 h-6" />, stat: '95%+', label: 'Average Score Improvement', color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-100' },
    { icon: <Award className="w-6 h-6" />, stat: '500+', label: 'Students Taught', color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-100' },
    { icon: <Star className="w-6 h-6" />, stat: 'Top 10', label: 'Rankers Every Year', color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-100' },
    { icon: <Users className="w-6 h-6" />, stat: 'Std 2-10', label: 'All Standards Covered', color: 'text-purple-500', bg: 'bg-purple-50', border: 'border-purple-100' },
];

const successStories = [
    { name: 'Consistent Toppers', desc: 'Our students regularly secure top positions in school exams across multiple subjects, reflecting our structured teaching methodology.' },
    { name: 'Board Exam Excellence', desc: 'Students from R Education have achieved outstanding results in SSC board exams, with many scoring above 90% aggregate.' },
    { name: 'Subject Mastery', desc: 'Through weekly tests and personalized feedback, students develop deep understanding rather than rote learning.' },
    { name: 'All-Round Development', desc: 'Beyond marks, our students gain confidence, discipline, and critical thinking skills that serve them throughout their academic journey.' },
];

const Students: React.FC = () => {
    return (
        <div className="bg-[#F8F9FC] min-h-screen">
            {/* Hero Banner */}
            <div
                className="relative py-24 text-center overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #334155 100%)' }}
            >
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 25% 50%, #6366f1 0%, transparent 50%), radial-gradient(circle at 75% 50%, #3b82f6 0%, transparent 50%)' }} />
                <div className="relative z-10 max-w-3xl mx-auto px-4">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 text-blue-200 text-sm font-semibold tracking-wider mb-4 border border-white/20 backdrop-blur-md">
                            OUR PRIDE
                        </span>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
                            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">Students</span>
                        </h1>
                        <p className="text-slate-300 text-lg leading-relaxed">
                            We take pride in our students' achievements from Std 2 to Std 10 — they are proof of what structured education can achieve.
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                {/* Stats Cards */}
                <motion.div
                    className="grid grid-cols-2 lg:grid-cols-4 gap-6 -mt-28 relative z-10 mb-20"
                    initial="hidden" animate="visible"
                    variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                >
                    {achievements.map((item, i) => (
                        <motion.div
                            key={i}
                            variants={sectionVariants}
                            className={`bg-white rounded-2xl p-6 shadow-lg border ${item.border} text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
                        >
                            <div className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center ${item.color} mx-auto mb-4`}>
                                {item.icon}
                            </div>
                            <p className="text-3xl font-extrabold text-slate-900 mb-1">{item.stat}</p>
                            <p className="text-sm text-slate-500 font-medium">{item.label}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Success Stories */}
                <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <span className="inline-block py-1.5 px-4 rounded-full bg-primary-50 text-primary-700 text-sm font-semibold tracking-wider mb-4 border border-primary-200">
                        ACADEMIC ACHIEVEMENTS
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
                        Why Our Students Excel
                    </h2>
                    <p className="text-slate-600 text-lg leading-relaxed">
                        A systematic approach to education that consistently produces exceptional results.
                    </p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    initial="hidden" whileInView="visible" viewport={{ once: true }}
                    variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                >
                    {successStories.map((story, i) => (
                        <motion.div
                            key={i}
                            variants={sectionVariants}
                            className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300"
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600 flex-shrink-0 mt-1">
                                    <span className="text-lg font-extrabold">{i + 1}</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-800 mb-2">{story.name}</h3>
                                    <p className="text-slate-600 leading-relaxed">{story.desc}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Students;
