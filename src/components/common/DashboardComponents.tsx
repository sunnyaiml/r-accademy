
import React from 'react';
import { Box, Paper, Typography, styled, LinearProgress, linearProgressClasses } from '@mui/material';
import { motion } from 'framer-motion';

// Animations
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

export const itemVariants = {
  hidden: { y: 16, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 14,
    }
  }
};


// Styled Components
export const DashboardPaper = styled(Paper)(() => ({
  padding: '28px',
  borderRadius: 20,
  boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)',
  backgroundColor: '#fff',
  border: '1px solid rgba(0,0,0,0.05)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    boxShadow: '0 8px 25px -5px rgba(0,0,0,0.06), 0 4px 10px -5px rgba(0,0,0,0.03)',
  },
}));

export const GradientCard = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'gradient',
})<{ gradient: string }>(({ gradient }) => ({
  padding: '28px',
  borderRadius: 20,
  background: gradient,
  color: '#fff',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '0 8px 24px 0 rgba(37, 99, 235, 0.15)',
  border: 'none',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(45deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 100%)',
    zIndex: 1,
  },
}));

interface StatBoxProps {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
  iconBg?: string;
  iconColor?: string;
  extra?: React.ReactNode;
  gradient?: string;
}

export const StatBox: React.FC<StatBoxProps> = ({
  value,
  label,
  icon,
  iconBg = 'bg-blue-50',
  iconColor = 'text-blue-600',
  extra,
  gradient,
}) => (
  // @ts-ignore - framer-motion types issue with custom components
  <motion.div variants={itemVariants} style={{ width: '100%' }}>
    {gradient ? (
      <GradientCard gradient={gradient}>
        <Box sx={{ position: 'relative', zIndex: 2, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="subtitle2" sx={{ opacity: 0.85, fontWeight: 600, letterSpacing: 0.5, mb: 0.5, textTransform: 'uppercase', fontSize: '0.7rem' }}>
              {label}
            </Typography>
            <Typography variant="h3" fontWeight="800">
              {value}
            </Typography>
          </Box>
          {icon && (
            <Box sx={{
              p: 1.5,
              bgcolor: 'rgba(255,255,255,0.15)',
              borderRadius: '16px',
              backdropFilter: 'blur(8px)',
            }}>
              {icon}
            </Box>
          )}
        </Box>
      </GradientCard>
    ) : (
      <div className="bg-white p-5 rounded-2xl border border-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group relative overflow-hidden">
        <div className="absolute -top-6 -right-6 w-20 h-20 bg-gray-50 rounded-full group-hover:bg-blue-50 transition-colors duration-500 opacity-60" />
        <div className="flex justify-between items-start mb-3 relative z-10">
          <div className={`h-11 w-11 rounded-xl ${iconBg} ${iconColor} flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
            {icon}
          </div>
        </div>
        <div className="relative z-10">
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">{label}</p>
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
          {extra}
        </div>
      </div>
    )}
  </motion.div>
);


export const SectionTitle = styled(Typography)(() => ({
  fontWeight: 700,
  marginBottom: '20px',
  color: '#1E293B',
  fontSize: '1.1rem',
  letterSpacing: '-0.01em',
  display: 'flex',
  alignItems: 'center',
  '&::before': {
    content: '""',
    width: 3,
    height: 20,
    backgroundColor: 'var(--primary-main)',
    borderRadius: 4,
    marginRight: 10,
  }
}));

// Status chip helper
export const StatusChip: React.FC<{ status: string }> = ({ status }) => {
  const colorMap: Record<string, string> = {
    completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    submitted: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    active: 'bg-blue-50 text-blue-700 border-blue-200',
    present: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    pending: 'bg-amber-50 text-amber-700 border-amber-200',
    upcoming: 'bg-sky-50 text-sky-700 border-sky-200',
    overdue: 'bg-rose-50 text-rose-700 border-rose-200',
    absent: 'bg-rose-50 text-rose-700 border-rose-200',
    late: 'bg-amber-50 text-amber-700 border-amber-200',
    missed: 'bg-rose-50 text-rose-700 border-rose-200',
    graded: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    draft: 'bg-gray-50 text-gray-600 border-gray-200',
    inactive: 'bg-gray-50 text-gray-500 border-gray-200',
    promoted: 'bg-teal-50 text-teal-700 border-teal-200',
    detained: 'bg-rose-50 text-rose-700 border-rose-200',
  };

  const cls = colorMap[status.toLowerCase()] || 'bg-gray-50 text-gray-600 border-gray-200';

  return (
    <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider border ${cls}`}>
      {status}
    </span>
  );
};

// Progress bar with label
export const ProgressWithLabel: React.FC<{ value: number; color?: string }> = ({ value, color = 'var(--primary-main)' }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
    <Box sx={{ flex: 1 }}>
      <LinearProgress
        variant="determinate"
        value={value}
        sx={{
          height: 6,
          borderRadius: 3,
          [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 3,
            background: color,
          },
          [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: 'rgba(0,0,0,0.04)',
          },
        }}
      />
    </Box>
    <Typography variant="caption" fontWeight="700" color="text.primary" sx={{ fontSize: '0.7rem', minWidth: 32 }}>
      {value}%
    </Typography>
  </Box>
);

// Empty state placeholder
export const EmptyState: React.FC<{ icon: React.ReactNode; message: string }> = ({ icon, message }) => (
  <Box sx={{ textAlign: 'center', py: 4, color: 'text.disabled' }}>
    <Box sx={{ mb: 1, opacity: 0.5 }}>{icon}</Box>
    <Typography variant="body2">{message}</Typography>
  </Box>
);
