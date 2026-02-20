import React from 'react';
import { Quote } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: 'Sunita Sharma',
    rating: 5,
    comment: 'My son\'s maths marks improved from 60% to 92% in just one term. The weekly test system keeps him disciplined and focused.',
    relation: 'Parent of Std 8 Student',
    initials: 'SS',
    color: 'bg-indigo-600',
  },
  {
    id: 2,
    name: 'Rajesh Patil',
    rating: 5,
    comment: 'The teachers genuinely care about each child. The regular PTMs and personal attention make a huge difference. Highly recommended!',
    relation: 'Parent of Std 5 Student',
    initials: 'RP',
    color: 'bg-purple-600',
  },
  {
    id: 3,
    name: 'Priya Deshmukh',
    rating: 5,
    comment: 'R Education has been a turning point for my daughter. She now loves studying and actively participates in class. Thank you!',
    relation: 'Parent of Std 10 Student',
    initials: 'PD',
    color: 'bg-emerald-600',
  },
];

const ParentReviews: React.FC = () => {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-14">
          <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-3">
            Testimonials
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            What Parents Say
          </h2>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            Hear from our community of parents about their experience with R Education
          </p>
        </div>

        {/* Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-[#F8F9FC] rounded-2xl p-6 md:p-8 relative hover:shadow-lg transition-shadow duration-300"
            >
              {/* Quote Icon */}
              <div className="absolute top-5 right-5 md:top-6 md:right-6 text-indigo-200">
                <Quote size={28} />
              </div>

              {/* Avatar + Info */}
              <div className="flex items-center gap-3 md:gap-4 mb-5 md:mb-6">
                <div
                  className={`h-12 w-12 md:h-14 md:w-14 ${review.color} rounded-full flex items-center justify-center text-white font-bold text-sm md:text-lg flex-shrink-0`}
                >
                  {review.initials}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm md:text-base">{review.name}</h4>
                  <p className="text-xs md:text-sm text-gray-500">{review.relation}</p>
                </div>
              </div>

              {/* Stars */}
              <div className="flex gap-0.5 mb-3 md:mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`text-base md:text-lg ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  >
                    &#9733;
                  </span>
                ))}
              </div>

              {/* Comment */}
              <p className="text-gray-600 leading-relaxed italic text-sm md:text-base">
                "{review.comment}"
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 md:mt-16">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
            Join Our Growing Community
          </h3>
          <p className="text-gray-500 max-w-lg mx-auto text-sm md:text-base">
            Experience the difference in education that R Education provides.
            Schedule a visit or contact us to learn more.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ParentReviews;
