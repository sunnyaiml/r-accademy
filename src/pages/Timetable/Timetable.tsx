import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, PenTool, MessageSquare } from 'lucide-react';

const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const schedule = [
    { day: 'Monday', activity: 'Teaching Sessions', detail: 'Std 2 – 10', type: 'teaching' },
    { day: 'Tuesday', activity: 'Teaching Sessions', detail: 'Std 2 – 10', type: 'teaching' },
    { day: 'Wednesday', activity: 'Teaching Sessions', detail: 'Std 2 – 10', type: 'teaching' },
    { day: 'Thursday', activity: 'Teaching Sessions', detail: 'Std 2 – 10', type: 'teaching' },
    { day: 'Friday', activity: 'Weekly Test', detail: 'All subjects', type: 'test' },
    { day: 'Saturday', activity: 'Test / Marks Discussion', detail: 'Review & feedback', type: 'review' },
    { day: 'Sunday', activity: 'Holiday', detail: 'Closed', type: 'off' },
];

const getTypeStyles = (type: string) => {
    switch (type) {
        case 'teaching': return { bg: 'bg-blue-50', text: 'text-blue-700', badge: 'bg-blue-100 text-blue-600', icon: <BookOpen className="w-4 h-4" /> };
        case 'test': return { bg: 'bg-amber-50', text: 'text-amber-700', badge: 'bg-amber-100 text-amber-600', icon: <PenTool className="w-4 h-4" /> };
        case 'review': return { bg: 'bg-emerald-50', text: 'text-emerald-700', badge: 'bg-emerald-100 text-emerald-600', icon: <MessageSquare className="w-4 h-4" /> };
        case 'off': return { bg: 'bg-slate-50', text: 'text-slate-400', badge: 'bg-slate-100 text-slate-400', icon: null };
        default: return { bg: 'bg-slate-50', text: 'text-slate-700', badge: 'bg-slate-100 text-slate-600', icon: null };
    }
};

const Timetable: React.FC = () => {
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
                            WEEKLY PLAN
                        </span>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
                            Weekly <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">Timetable</span>
                        </h1>
                        <p className="text-slate-300 text-lg leading-relaxed">
                            A structured weekly schedule designed to maximize learning and ensure consistent evaluation.
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 -mt-12 relative z-10">
                {/* Schedule Cards */}
                <motion.div
                    className="space-y-4"
                    initial="hidden" animate="visible"
                    variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
                >
                    {schedule.map((item, i) => {
                        const styles = getTypeStyles(item.type);
                        return (
                            <motion.div
                                key={i}
                                variants={sectionVariants}
                                className={`bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300 overflow-hidden`}
                            >
                                <div className="flex items-center">
                                    {/* Day Label */}
                                    <div className={`w-36 md:w-44 flex-shrink-0 py-5 px-6 ${styles.bg} flex flex-col items-center justify-center border-r border-slate-100`}>
                                        <span className={`text-lg font-extrabold ${styles.text}`}>{item.day}</span>
                                    </div>

                                    {/* Activity */}
                                    <div className="flex-1 py-5 px-6 flex items-center justify-between">
                                        <div>
                                            <p className="text-lg font-bold text-slate-800">{item.activity}</p>
                                            <p className="text-sm text-slate-500">{item.detail}</p>
                                        </div>
                                        {styles.icon && (
                                            <div className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold ${styles.badge}`}>
                                                {styles.icon}
                                                <span>{item.type === 'teaching' ? 'Class' : item.type === 'test' ? 'Exam' : 'Review'}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Legend */}
                <motion.div
                    variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    className="mt-10 flex flex-wrap gap-4 justify-center"
                >
                    {[
                        { label: 'Teaching', color: 'bg-blue-500' },
                        { label: 'Test Day', color: 'bg-amber-500' },
                        { label: 'Review', color: 'bg-emerald-500' },
                        { label: 'Holiday', color: 'bg-slate-300' },
                    ].map((l, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                            <span className={`w-3 h-3 rounded-full ${l.color}`} />
                            {l.label}
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Timetable;
