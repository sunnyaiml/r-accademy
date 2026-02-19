import React from 'react';
import { Play, Clock, User } from 'lucide-react';
import { Dialog, DialogTitle, DialogContent, Box } from '@mui/material';

const lectures = [
  {
    id: 1,
    title: 'Introduction to Advanced Mathematics',
    subject: 'Mathematics',
    grade: '11th Grade',
    duration: '45 minutes',
    teacher: 'Dr. Robert Smith',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=600',
    videoUrl: 'https://www.youtube.com/embed/demo-math',
  },
  {
    id: 2,
    title: 'Understanding Chemical Reactions',
    subject: 'Chemistry',
    grade: '10th Grade',
    duration: '40 minutes',
    teacher: 'Ms. Emily Chen',
    thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=600',
    videoUrl: 'https://www.youtube.com/embed/demo-chemistry',
  },
  {
    id: 3,
    title: 'English Literature Analysis',
    subject: 'English',
    grade: '12th Grade',
    duration: '35 minutes',
    teacher: 'Mr. James Wilson',
    thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=600',
    videoUrl: 'https://www.youtube.com/embed/demo-english',
  },
];

const DemoLectures: React.FC = () => {
  const [selectedLecture, setSelectedLecture] = React.useState<typeof lectures[0] | null>(null);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-3">
            Free Resources
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            Demo Lectures
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Experience our teaching methodology with these sample lectures
          </p>
        </div>

        {/* Lecture Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {lectures.map((lecture) => (
            <div
              key={lecture.id}
              className="bg-[#F8F9FC] rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
            >
              {/* Thumbnail */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={lecture.thumbnail}
                  alt={lecture.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Play Button Overlay */}
                <button
                  onClick={() => setSelectedLecture(lecture)}
                  className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <div className="h-14 w-14 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <Play size={22} className="text-indigo-600 ml-1" fill="currentColor" />
                  </div>
                </button>
                {/* Subject Badge */}
                <span className="absolute top-3 left-3 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {lecture.subject}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-bold text-gray-900 mb-3 line-clamp-2">
                  {lecture.title}
                </h3>

                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} />
                    {lecture.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <User size={14} />
                    {lecture.teacher}
                  </span>
                </div>

                <p className="text-xs text-gray-400 mb-4">
                  Suitable for {lecture.grade} students
                </p>

                <button
                  onClick={() => setSelectedLecture(lecture)}
                  className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white text-sm font-semibold py-3 rounded-xl hover:bg-gray-800 transition-colors"
                >
                  <Play size={16} />
                  Watch Demo
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Video Dialog — preserved from original */}
        <Dialog
          open={!!selectedLecture}
          onClose={() => setSelectedLecture(null)}
          maxWidth="md"
          fullWidth
        >
          {selectedLecture && (
            <>
              <DialogTitle>{selectedLecture.title}</DialogTitle>
              <DialogContent>
                <Box sx={{ position: 'relative', paddingTop: '56.25%' }}>
                  <iframe
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      border: 0,
                    }}
                    src={selectedLecture.videoUrl}
                    title={selectedLecture.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </Box>
              </DialogContent>
            </>
          )}
        </Dialog>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Want to See More?
          </h3>
          <p className="text-gray-500 max-w-lg mx-auto mb-6">
            Schedule a free consultation to discuss your educational needs and explore our full range of courses.
          </p>
          <button className="bg-indigo-600 text-white font-semibold px-8 py-3 rounded-full hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
            Schedule Consultation
          </button>
        </div>
      </div>
    </section>
  );
};

export default DemoLectures;
