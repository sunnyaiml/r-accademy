import React from 'react';
import { CheckCircle, Cpu, Globe, Code } from 'lucide-react';

const features = [
  'Expert faculty with 10+ years experience',
  'Personalized learning paths for every student',
  'Regular assessments and progress tracking',
  'Modern smart classrooms and labs',
  'Doubt-clearing sessions and mentorship',
  'Competitive exam preparation included',
];

const programs = [
  { title: 'High School Program', grade: '8th - 12th Grade', icon: Cpu, color: 'bg-indigo-100 text-indigo-600' },
  { title: 'Test Preparation', grade: 'All Grades', icon: Code, color: 'bg-purple-100 text-purple-600' },
  { title: 'Skill Development', grade: 'All Grades', icon: Globe, color: 'bg-emerald-100 text-emerald-600' },
];

const AboutClasses: React.FC = () => {
  return (
    <div>
      {/* Dark Stats Band */}
      <section className="bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:divide-x md:divide-gray-800">
            {[
              { value: '500+', label: 'Students Enrolled' },
              { value: '50+', label: 'Expert Teachers' },
              { value: '95%', label: 'Board Exam Pass Rate' },
              { value: '15+', label: 'Programs Offered' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-4xl md:text-5xl font-extrabold bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mt-2">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#F8F9FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text + Features */}
            <div>
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-3">
                Our Academic Programs
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-6">
                Designed to help every student{' '}
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(to right, #4F46E5, #7C3AED)' }}>
                  excel
                </span>
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-8">
                Choose from our diverse range of programs. Each is carefully designed with a focus on conceptual clarity, regular practice, and holistic development.
              </p>

              <div className="space-y-4 mb-8">
                {features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-6 w-6 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle size={14} className="text-indigo-600" />
                    </div>
                    <span className="text-gray-700 text-sm font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Program cards */}
              <div className="space-y-3">
                {programs.map((prog, i) => (
                  <div key={i} className="flex items-center gap-4 bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className={`h-12 w-12 ${prog.color} rounded-xl flex items-center justify-center`}>
                      <prog.icon size={22} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{prog.title}</h4>
                      <p className="text-xs text-gray-500">{prog.grade}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Image + Floating Card */}
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1523050854058-8df90110c476?auto=format&fit=crop&q=80&w=800"
                  alt="Students in classroom"
                  className="w-full h-[500px] object-cover"
                />
              </div>

              {/* Floating Testimonial Card */}
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl z-20 max-w-[280px] hidden lg:block">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                    RS
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">Rahul Sharma</p>
                    <p className="text-xs text-gray-500">12th Grade Student</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 italic">
                  "The teachers here made complex topics simple and fun. I scored 95% in my boards!"
                </p>
                <div className="flex gap-0.5 mt-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} className="text-yellow-400 text-sm">&#9733;</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutClasses;
