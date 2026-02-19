import React from 'react';
import { Calendar, MapPin } from 'lucide-react';

const events = [
  {
    id: 1,
    title: 'Annual Science Fair 2024',
    date: 'January 15, 2024',
    location: 'School Auditorium',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800',
    tags: ['Science', 'Innovation'],
    span: 'md:col-span-2 md:row-span-2',
    height: 'h-64 md:h-full',
  },
  {
    id: 2,
    title: 'Literary Festival',
    date: 'December 10, 2023',
    location: 'School Library',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=800',
    tags: ['Literature', 'Arts'],
    span: '',
    height: 'h-64',
  },
  {
    id: 3,
    title: 'Sports Day 2023',
    date: 'November 25, 2023',
    location: 'School Grounds',
    image: 'https://images.unsplash.com/photo-1461896836934-bd45ba8fcf9b?auto=format&fit=crop&q=80&w=800',
    tags: ['Sports', 'Fitness'],
    span: '',
    height: 'h-64',
  },
];

const PastEvents: React.FC = () => {
  return (
    <section className="py-20 bg-[#F8F9FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-3">
            Memories
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            Past Events
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Relive the memorable moments from our recent events
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4">
          {events.map((event) => (
            <div
              key={event.id}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer ${event.span} ${event.height}`}
            >
              {/* Image */}
              <img
                src={event.image}
                alt={event.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Tags */}
              <div className="absolute top-4 left-4 flex gap-2">
                {event.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-white/20 backdrop-blur-md text-white text-xs font-medium px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-white font-bold text-xl mb-2">
                  {event.title}
                </h3>
                <div className="flex items-center gap-4 text-white/80 text-sm">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    {event.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} />
                    {event.location}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Accent CTA Card */}
        <div className="mt-4 rounded-2xl p-8 text-center"
          style={{ background: 'linear-gradient(135deg, #2563EB 0%, #0D9488 100%)' }}
        >
          <h3 className="text-white font-bold text-xl mb-2">Stay Updated</h3>
          <p className="text-indigo-100 text-sm max-w-md mx-auto">
            Follow our social media channels and newsletter to stay informed about upcoming events.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PastEvents;
