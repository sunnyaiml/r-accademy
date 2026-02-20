import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase } from 'lucide-react';

const facultyList = [
    { name: 'Rohit Sir', subject: 'Mathematics', qualification: 'M.Sc. B.Ed.', experience: '10+ Years', color: 'from-blue-500 to-indigo-600' },
    { name: 'Rohan Sir', subject: 'Mathematics', qualification: 'B.E. Civil', experience: '8+ Years', color: 'from-emerald-500 to-teal-600' },
    { name: 'Meenakshi Ma\'am', subject: 'Hindi / Marathi', qualification: 'M.A. B.Ed.', experience: '12+ Years', color: 'from-pink-500 to-rose-600' },
    { name: 'Tejashri Ma\'am', subject: 'Science / S.S.', qualification: 'M.Sc. Micro', experience: '6+ Years', color: 'from-amber-500 to-orange-600' },
];

const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const Faculties: React.FC = () => {
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
                            EXPERT EDUCATORS
                        </span>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
                            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">Faculties</span>
                        </h1>
                        <p className="text-slate-300 text-lg leading-relaxed">
                            Dedicated professionals committed to nurturing academic excellence in every student.
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 -mt-12 relative z-10">
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                    initial="hidden" animate="visible"
                    variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
                >
                    {facultyList.map((faculty, i) => (
                        <motion.div
                            key={i}
                            variants={sectionVariants}
                            className="group bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                        >
                            {/* Gradient Avatar Header */}
                            <div className={`h-32 bg-gradient-to-br ${faculty.color} relative`}>
                                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
                                    <div className="w-20 h-20 rounded-2xl bg-white shadow-lg flex items-center justify-center text-3xl font-extrabold text-slate-700 border-4 border-white">
                                        {faculty.name.charAt(0)}
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="pt-14 pb-8 px-6 text-center">
                                <h3 className="text-xl font-extrabold text-slate-900 mb-1">{faculty.name}</h3>
                                <p className="text-primary-600 font-semibold text-sm mb-5">{faculty.subject}</p>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-sm text-slate-600 bg-slate-50 rounded-xl px-4 py-2.5">
                                        <GraduationCap className="w-4 h-4 text-slate-400 flex-shrink-0" />
                                        <span>{faculty.qualification}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-slate-600 bg-slate-50 rounded-xl px-4 py-2.5">
                                        <Briefcase className="w-4 h-4 text-slate-400 flex-shrink-0" />
                                        <span>{faculty.experience} Experience</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Faculties;
