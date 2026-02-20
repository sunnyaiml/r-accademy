import React from 'react';
import { PenTool, Trophy, Users, Sparkles, Heart } from 'lucide-react';

const CultureGrid: React.FC = () => {
    return (
        <section id="culture" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-primary-600 font-bold tracking-wide uppercase text-sm mb-3">Life at R Education</h2>
                    <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">More than just studying.</h3>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                        From Std 2 to Std 10, we nurture academic excellence alongside creativity, discipline, and joyful learning experiences.
                    </p>
                </div>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-6 h-auto md:h-[800px]">

                    {/* Large Feature - Structured Classes */}
                    <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-3xl cursor-pointer min-h-[300px] bg-gradient-to-br from-indigo-600 to-blue-700">
                        <div className="absolute inset-0 opacity-20">
                            <div className="absolute top-10 right-10 w-72 h-72 bg-white/20 rounded-full blur-3xl" />
                            <div className="absolute bottom-10 left-10 w-48 h-48 bg-blue-300/30 rounded-full blur-3xl" />
                        </div>
                        <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end z-10">
                            <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full w-fit mb-4 border border-white/20">Std 2 – Std 10</span>
                            <h4 className="text-3xl md:text-4xl font-extrabold text-white mb-3">Structured Daily Classes</h4>
                            <p className="text-blue-100 text-lg max-w-lg">Expert-led teaching sessions Monday through Thursday, covering Maths, Science, English, Hindi, Marathi & Social Studies.</p>
                        </div>
                    </div>

                    {/* Medium - Weekly Tests */}
                    <div className="md:col-span-1 md:row-span-1 relative group overflow-hidden rounded-3xl bg-amber-50 border border-amber-100 min-h-[200px] flex flex-col justify-end p-6 hover:shadow-xl transition-all duration-300">
                        <div className="absolute top-6 right-6">
                            <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600">
                                <PenTool className="w-5 h-5" />
                            </div>
                        </div>
                        <h4 className="text-xl font-bold text-slate-800 mb-1">Weekly Tests</h4>
                        <p className="text-slate-500 text-sm">Every Friday & Saturday — continuous evaluation for consistent improvement.</p>
                    </div>

                    {/* Tall - Festival Celebrations */}
                    <div className="md:col-span-1 md:row-span-2 relative group overflow-hidden rounded-3xl bg-gradient-to-b from-pink-500 to-rose-600 min-h-[300px]">
                        <div className="absolute inset-0 opacity-20">
                            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-40 h-40 bg-white/30 rounded-full blur-3xl" />
                        </div>
                        <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/20">
                                <Sparkles className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-2xl font-bold text-white mb-2">Festival Celebrations</h4>
                                <p className="text-pink-100 text-sm">Cultural events, Diwali, Holi, Independence Day — celebrating together builds lifelong memories.</p>
                            </div>
                        </div>
                    </div>

                    {/* Medium - Parent-Teacher Meetings */}
                    <div className="md:col-span-1 md:row-span-1 relative group overflow-hidden rounded-3xl bg-emerald-50 border border-emerald-100 min-h-[200px] flex flex-col justify-end p-6 hover:shadow-xl transition-all duration-300">
                        <div className="absolute top-6 right-6">
                            <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
                                <Users className="w-5 h-5" />
                            </div>
                        </div>
                        <h4 className="text-xl font-bold text-slate-800 mb-1">Parent-Teacher Meetings</h4>
                        <p className="text-slate-500 text-sm">Regular PTMs to discuss progress, strengths, and areas for growth.</p>
                    </div>

                    {/* Wide - Annual Picnic */}
                    <div className="md:col-span-2 md:row-span-1 relative group overflow-hidden rounded-3xl bg-gradient-to-r from-slate-800 to-slate-900 min-h-[200px]">
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-0 right-0 w-60 h-60 bg-blue-500/30 rounded-full blur-3xl" />
                        </div>
                        <div className="absolute inset-0 p-8 flex flex-col md:flex-row items-start md:items-center justify-between z-10">
                            <div>
                                <span className="inline-block bg-white/10 text-white text-xs font-bold px-3 py-1 rounded-full mb-3 border border-white/10">Annual Event</span>
                                <h4 className="text-2xl font-bold text-white mb-2">Annual Picnic & Outings</h4>
                                <p className="text-slate-300 max-w-sm">Fun-filled excursions that give students a break from academics and help build friendships outside the classroom.</p>
                            </div>
                        </div>
                    </div>

                    {/* Small - Motivation */}
                    <div className="md:col-span-1 md:row-span-1 relative group overflow-hidden rounded-3xl bg-purple-600 flex flex-col items-center justify-center p-6 text-center hover:bg-purple-700 transition-colors cursor-pointer min-h-[150px]">
                        <div className="h-12 w-12 bg-white/20 rounded-full flex items-center justify-center mb-4 text-white">
                            <Trophy size={24} />
                        </div>
                        <h4 className="text-xl font-bold text-white">Motivational Sessions</h4>
                        <p className="text-purple-200 text-sm">Guest speakers & rewards</p>
                    </div>

                    {/* Small - Personal Care */}
                    <div className="md:col-span-1 md:row-span-1 relative group overflow-hidden rounded-3xl bg-sky-400 flex flex-col items-center justify-center p-6 text-center hover:bg-sky-500 transition-colors cursor-pointer min-h-[150px]">
                        <div className="h-12 w-12 bg-white/20 rounded-full flex items-center justify-center mb-4 text-white">
                            <Heart size={24} />
                        </div>
                        <h4 className="text-xl font-bold text-white">Personalized Attention</h4>
                        <p className="text-sky-100 text-sm">Small batches, big results</p>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default CultureGrid;
