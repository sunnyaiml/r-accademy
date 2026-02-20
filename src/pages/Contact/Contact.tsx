import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from 'lucide-react';

const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const Contact: React.FC = () => {
    return (
        <div className="bg-[#F8F9FC] min-h-screen">
            {/* Hero Banner */}
            <div
                className="relative py-24 text-center overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #334155 100%)' }}
            >
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #6366f1 0%, transparent 50%), radial-gradient(circle at 80% 50%, #3b82f6 0%, transparent 50%)' }} />
                <div className="relative z-10 max-w-3xl mx-auto px-4">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 text-blue-200 text-sm font-semibold tracking-wider mb-4 border border-white/20 backdrop-blur-md">
                            REACH OUT TO US
                        </span>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
                            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">Touch</span>
                        </h1>
                        <p className="text-slate-300 text-lg leading-relaxed">
                            Have questions about admissions or our programs? We'd love to hear from you.
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10 pb-24">
                {/* Contact Cards */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
                    initial="hidden" animate="visible"
                    variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                >
                    {[
                        { icon: <Phone className="w-6 h-6" />, label: 'Call Us', value: '+91 84336 13068', sub: 'Mon-Sat, 9AM - 7PM', color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-100' },
                        { icon: <Mail className="w-6 h-6" />, label: 'Email Us', value: 'Sunny.work70@gmail.com', sub: 'We reply within 24 hours', color: 'text-indigo-500', bg: 'bg-indigo-50', border: 'border-indigo-100' },
                        { icon: <MapPin className="w-6 h-6" />, label: 'Visit Us', value: 'Room no. 36, Utkal Sadan', sub: 'Ganesh Chowk, Bhatwadi, Thane', color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-100' },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            variants={sectionVariants}
                            className={`bg-white rounded-2xl p-8 shadow-lg border ${item.border} hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
                        >
                            <div className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center mb-5 ${item.color}`}>
                                {item.icon}
                            </div>
                            <p className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">{item.label}</p>
                            <p className="text-lg font-bold text-slate-800 mb-1">{item.value}</p>
                            <p className="text-sm text-slate-500">{item.sub}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Main Content: Form + Map */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Inquiry Form */}
                    <motion.div
                        variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        className="bg-white rounded-3xl p-10 shadow-lg border border-slate-100"
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600">
                                <Send className="w-5 h-5" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-extrabold text-slate-900">Send us a Message</h2>
                                <p className="text-sm text-slate-500">Fill out the form and we'll get back to you shortly.</p>
                            </div>
                        </div>
                        <form className="space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                                    <input type="text" placeholder="Your name" className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all outline-none text-sm bg-slate-50 focus:bg-white" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                                    <input type="tel" placeholder="+91 XXXXX XXXXX" className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all outline-none text-sm bg-slate-50 focus:bg-white" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                                <input type="email" placeholder="your@email.com" className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all outline-none text-sm bg-slate-50 focus:bg-white" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Your Message</label>
                                <textarea rows={4} placeholder="How can we help you?" className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all outline-none text-sm bg-slate-50 focus:bg-white resize-none" />
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 pt-2">
                                <button type="submit" className="flex-1 bg-primary-600 text-white font-bold py-4 rounded-xl hover:bg-primary-700 transition-all shadow-md hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-2">
                                    <Send className="w-4 h-4" /> Send Message
                                </button>
                                <a
                                    href="https://wa.me/918433613068"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 bg-emerald-500 text-white font-bold py-4 rounded-xl hover:bg-emerald-600 transition-all shadow-md hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-2"
                                >
                                    <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
                                </a>
                            </div>
                        </form>
                    </motion.div>

                    {/* Map + Hours */}
                    <motion.div
                        variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        className="flex flex-col gap-6"
                    >
                        {/* Google Map */}
                        <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 flex-1 min-h-[320px]">
                            <iframe
                                title="R Education Location"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.135896846132!2d72.94537617520824!3d19.18926588203875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b9987e5ca713%3A0x14773b64c2ed9c58!2sUtkal%20Sadan!5e0!3m2!1sen!2sin!4v1739248716821!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0, minHeight: '320px' }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>

                        {/* Working Hours */}
                        <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500">
                                    <Clock className="w-5 h-5" />
                                </div>
                                <h3 className="text-xl font-extrabold text-slate-900">Working Hours</h3>
                            </div>
                            <div className="space-y-3">
                                {[
                                    { day: 'Monday - Thursday', time: 'Teaching Sessions', highlight: false },
                                    { day: 'Friday', time: 'Weekly Test Day', highlight: true },
                                    { day: 'Saturday', time: 'Test / Marks Discussion', highlight: true },
                                    { day: 'Sunday', time: 'Closed', highlight: false },
                                ].map((item, i) => (
                                    <div key={i} className={`flex items-center justify-between py-3 px-4 rounded-xl ${item.highlight ? 'bg-primary-50 border border-primary-100' : 'bg-slate-50'}`}>
                                        <span className={`text-sm font-semibold ${item.highlight ? 'text-primary-700' : 'text-slate-700'}`}>{item.day}</span>
                                        <span className={`text-sm ${item.highlight ? 'text-primary-600 font-bold' : 'text-slate-500'}`}>{item.time}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
