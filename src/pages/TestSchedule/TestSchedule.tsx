import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, RefreshCw, ClipboardCheck, MessageSquare } from 'lucide-react';

const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const features = [
    { icon: <Calendar className="w-6 h-6" />, title: 'Weekly Test Model', desc: 'Every Friday and Saturday are dedicated to testing and evaluation, ensuring continuous assessment throughout the year.', color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-100' },
    { icon: <RefreshCw className="w-6 h-6" />, title: 'Re-test Policy', desc: 'Students who need extra practice can take re-tests, giving them another opportunity to improve their scores and understanding.', color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-100' },
    { icon: <ClipboardCheck className="w-6 h-6" />, title: 'Professional Evaluation', desc: 'Professional marking with detailed feedback on every answer, helping students understand exactly where they went right or wrong.', color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-100' },
    { icon: <MessageSquare className="w-6 h-6" />, title: 'Marks Discussion', desc: 'Test results are discussed during regular class hours and Parent-Teacher Meetings, keeping everyone in the loop.', color: 'text-purple-500', bg: 'bg-purple-50', border: 'border-purple-100' },
];

const TestSchedule: React.FC = () => {
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
                            ASSESSMENT SYSTEM
                        </span>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
                            Test <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">Schedule</span>
                        </h1>
                        <p className="text-slate-300 text-lg leading-relaxed">
                            Our unique test model ensures continuous evaluation and measurable improvement.
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

export default TestSchedule;
