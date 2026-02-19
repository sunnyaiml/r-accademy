import React from 'react';
import { Quote } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: 'Sarah Johnson',
    rating: 5,
    comment: 'The teachers are exceptional and my child has shown remarkable improvement in academics.',
    relation: 'Parent of 9th Grade Student',
    initials: 'SJ',
    color: 'bg-indigo-600',
  },
  {
    id: 2,
    name: 'Michael Chen',
    rating: 5,
    comment: "Great learning environment with modern facilities. The regular updates about my child's progress are very helpful.",
    relation: 'Parent of 11th Grade Student',
    initials: 'MC',
    color: 'bg-purple-600',
  },
  {
    id: 3,
    name: 'Emily Williams',
    rating: 4,
    comment: 'The personalized attention and extra-curricular activities have helped my child develop holistically.',
    relation: 'Parent of 10th Grade Student',
    initials: 'EW',
    color: 'bg-emerald-600',
  },
];

const ParentReviews: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-3">
            Testimonials
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            What Parents Say
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Hear from our community of parents about their experience with our academy
          </p>
        </div>

        {/* Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-[#F8F9FC] rounded-2xl p-8 relative hover:shadow-lg transition-shadow duration-300"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-indigo-200">
                <Quote size={36} />
              </div>

              {/* Avatar + Info */}
              <div className="flex items-center gap-4 mb-6">
                <div
                  className={`h-14 w-14 ${review.color} rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}
                >
                  {review.initials}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{review.name}</h4>
                  <p className="text-sm text-gray-500">{review.relation}</p>
                </div>
              </div>

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`text-lg ${
                      i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  >
                    &#9733;
                  </span>
                ))}
              </div>

              {/* Comment */}
              <p className="text-gray-600 leading-relaxed italic">
                "{review.comment}"
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Join Our Growing Community
          </h3>
          <p className="text-gray-500 max-w-lg mx-auto">
            Experience the difference in education that our academy provides.
            Schedule a visit or contact us to learn more about our programs.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ParentReviews;
