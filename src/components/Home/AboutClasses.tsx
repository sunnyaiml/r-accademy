import React from 'react';
import { BookOpen, Users, Target } from 'lucide-react';

const AboutClasses: React.FC = () => {
  return (
    <div>
      {/* Dark Stats Band */}
      <section className="bg-gray-900 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 md:divide-x md:divide-gray-800">
            {[
              { value: '500+', label: 'Students Taught' },
              { value: '4+', label: 'Expert Faculties' },
              { value: '95%', label: 'Improvement Rate' },
              { value: '5+', label: 'Years of Excellence' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl md:text-5xl font-extrabold bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-xs md:text-sm font-medium text-gray-400 uppercase tracking-wider mt-2">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20 bg-[#F8F9FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Text + Features */}
            <div>
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-3">
                Our Approach
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-6">
                Building strong{' '}
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(to right, #4F46E5, #9333EA)' }}>
                  academic foundations
                </span>
              </h2>
              <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-8">
                Our teaching methodology is designed specifically for Std 2 to Std 10 students, combining conceptual clarity with regular practice and continuous evaluation.
              </p>

              <div className="space-y-5 md:space-y-6">
                {[
                  { icon: BookOpen, title: 'Concept-Based Teaching', desc: 'We focus on understanding fundamentals, not rote memorization. Strong basics build confident learners.' },
                  { icon: Users, title: 'Small Batch Sizes', desc: 'Personalized attention in every batch ensures no student is left behind. Each child is mentored individually.' },
                  { icon: Target, title: 'Weekly Test System', desc: 'Regular assessments every Friday and Saturday ensure continuous improvement and exam readiness.' },
                ].map((feature, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 h-12 w-12 bg-white rounded-xl flex items-center justify-center shadow-sm text-indigo-600 border border-gray-100">
                      <feature.icon size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg md:text-xl font-bold text-gray-900">{feature.title}</h4>
                      <p className="text-gray-500 text-sm md:text-base">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Gradient Card */}
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-indigo-600 to-blue-700 p-8 md:p-10 min-h-[300px] md:min-h-[450px] flex flex-col justify-end relative">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-10 right-10 w-60 h-60 bg-white/20 rounded-full blur-3xl" />
                  <div className="absolute bottom-10 left-10 w-40 h-40 bg-blue-300/30 rounded-full blur-3xl" />
                </div>
                <div className="relative z-10">
                  <span className="inline-block bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full mb-4 border border-white/20">
                    Std 2 – Std 10
                  </span>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-3">All Subjects Covered</h3>
                  <p className="text-blue-100 text-sm md:text-base max-w-sm">
                    Mathematics, Science, English, Hindi, Marathi, Social Studies — comprehensive coaching for every subject across all standards.
                  </p>
                </div>
              </div>

              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-4 md:-bottom-8 md:-left-8 bg-white p-4 md:p-5 rounded-2xl shadow-xl z-20 max-w-[200px] md:max-w-xs border border-gray-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-8 w-8 md:h-10 md:w-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 flex-shrink-0">
                    <Target size={16} />
                  </div>
                  <div>
                    <p className="text-xs md:text-sm font-bold text-gray-900">Proven Results</p>
                    <p className="text-[10px] md:text-xs text-gray-500">Every Academic Year</p>
                  </div>
                </div>
                <p className="text-xs text-gray-600 hidden sm:block">"Our students consistently top their school exams."</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutClasses;
