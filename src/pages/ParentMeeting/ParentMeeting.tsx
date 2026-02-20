import React from 'react';
import { motion } from 'framer-motion';
import { Users, CalendarCheck, FileText, MessageCircle } from 'lucide-react';

const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const features = [
    { icon: <CalendarCheck className="w-6 h-6" />, title: 'Regular PTM Schedule', desc: 'Parent-Teacher Meetings are held monthly or quarterly as per the academic calendar, ensuring consistent communication.', color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-100' },
    { icon: <FileText className="w-6 h-6" />, title: 'Detailed Report Cards', desc: 'Comprehensive report cards covering test scores, class participation, attendance, and areas of improvement are shared with parents.', color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-100' },
    { icon: <MessageCircle className="w-6 h-6" />, title: 'Open Discussion', desc: 'Dedicated one-on-one time with teachers to discuss your child\'s progress, strengths, and specific areas to focus on.', color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-100' },
    { icon: <Users className="w-6 h-6" />, title: 'Collaborative Approach', desc: 'We believe parents are partners in education. Together, we create personalized plans for each student\'s success.', color: 'text-pink-500', bg: 'bg-pink-50', border: 'border-pink-100' },
];

const ParentMeeting: React.FC = () => {
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
                            PARENT ENGAGEMENT
                        </span>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
                            Parents <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">Meeting</span>
                        </h1>
                        <p className="text-slate-300 text-lg leading-relaxed">
                            Communication with parents is vital for student success. We hold regular meetings to discuss progress and growth.
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 -mt-12 relative z-10">
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    initial="hidden" animate="visible"
                    variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
                >
                    {features.map((item, i) => (
                        <motion.div
                            key={i}
                            variants={sectionVariants}
                            className="group bg-white rounded-3xl p-8 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center ${item.color} mb-6 border ${item.border}`}>
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-3">{item.title}</h3>
                            <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default ParentMeeting;
