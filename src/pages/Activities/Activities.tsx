import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Trophy, Lightbulb, ArrowRight } from 'lucide-react';

const activities = [
    {
        title: 'Festival Celebrations',
        description: 'Embracing cultural diversity through vibrant celebrations of major festivals.',
        icon: <Calendar className="w-6 h-6 text-orange-500" />,
        gradient: 'from-orange-500/20 to-red-500/20',
        border: 'border-orange-500/30'
    },
    {
        title: 'Annual Picnic',
        description: 'Building lifetime bonds and refreshing young minds away from the classroom.',
        icon: <Users className="w-6 h-6 text-blue-500" />,
        gradient: 'from-blue-500/20 to-cyan-500/20',
        border: 'border-blue-500/30'
    },
    {
        title: 'Special Motivational Events',
        description: 'Inspiring sessions by guest speakers and industry experts to ignite ambition.',
        icon: <Trophy className="w-6 h-6 text-yellow-500" />,
        gradient: 'from-yellow-500/20 to-amber-500/20',
        border: 'border-yellow-500/30'
    },
    {
        title: 'Educational Workshops',
        description: 'Hands-on learning experiences to bridge the gap between theory and practice.',
        icon: <Lightbulb className="w-6 h-6 text-purple-500" />,
        gradient: 'from-purple-500/20 to-pink-500/20',
        border: 'border-purple-500/30'
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: 'easeOut' }
    }
};

const Activities: React.FC = () => {
    return (
        <div className="bg-[#F8F9FC] min-h-screen py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block py-1.5 px-4 rounded-full bg-primary-50 text-primary-700 text-sm font-semibold tracking-wider mb-4 border border-primary-200">
                            BEYOND ACADEMICS
                        </span>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                            Extra-Curricular <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">Activities</span>
                        </h1>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            We strongly believe that true education extends beyond the four walls of a classroom. Our holistic approach ensures the overall development of our students.
                        </p>
                    </motion.div>
                </div>

                {/* Activities Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {activities.map((activity, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="group relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden"
                        >
                            {/* Background Gradient Blob */}
                            <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full bg-gradient-to-br ${activity.gradient} blur-3xl group-hover:scale-150 transition-transform duration-500`} />

                            <div className="relative z-10 flex flex-col h-full">
                                <div className={`w-14 h-14 rounded-2xl bg-white shadow-sm border ${activity.border} flex items-center justify-center mb-6`}>
                                    {activity.icon}
                                </div>

                                <h3 className="text-2xl font-bold text-slate-800 mb-4">{activity.title}</h3>

                                <p className="text-slate-600 leading-relaxed mb-8 flex-grow">
                                    {activity.description}
                                </p>

                                <div className="flex items-center text-primary-600 font-semibold group-hover:text-primary-700 transition-colors cursor-pointer mt-auto w-fit">
                                    Learn more
                                    <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </div>
    );
};

export default Activities;
