import React from 'react';
import { GraduationCap, BookOpen, Target, Clock, Wallet } from 'lucide-react';

const benefits = [
  {
    icon: GraduationCap,
    title: 'Expert Faculty',
    description: 'Learn from experienced educators with proven track records in academic excellence.',
    color: 'bg-indigo-100 text-indigo-600',
  },
  {
    icon: BookOpen,
    title: 'Customized Learning',
    description: "Personalized study plans tailored to each student's needs and learning pace.",
    color: 'bg-purple-100 text-purple-600',
  },
  {
    icon: Target,
    title: 'Result-Oriented',
    description: 'Focused approach with regular assessments and performance tracking.',
    color: 'bg-emerald-100 text-emerald-600',
  },
  {
    icon: Clock,
    title: 'Flexible Schedule',
    description: 'Multiple batches and timing options to suit your convenience.',
    color: 'bg-amber-100 text-amber-600',
  },
  {
    icon: Wallet,
    title: 'Affordable Fees',
    description: 'Quality education at competitive rates with flexible payment options.',
    color: 'bg-rose-100 text-rose-600',
  },
];

const stats = [
  { value: '500+', label: 'Students Enrolled' },
  { value: '95%', label: 'Board Exam Pass Rate' },
  { value: '5+', label: 'Years of Excellence' },
];

const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-20 bg-[#F8F9FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-3">
            Our Strengths
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            Why Choose Us
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            We provide the best learning experience with a focus on holistic development
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {benefits.map((benefit, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className={`h-14 w-14 ${benefit.color} rounded-2xl flex items-center justify-center mb-5`}
              >
                <benefit.icon size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Track Record Stats */}
        <div className="text-center mb-10">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Our Track Record
          </h3>
          <p className="text-gray-500">Numbers that speak for themselves</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-8 text-center hover:shadow-md transition-shadow"
            >
              <p
                className="text-5xl font-extrabold mb-2 bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(to right, #2563EB, #0D9488)' }}
              >
                {stat.value}
              </p>
              <p className="text-gray-500 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
