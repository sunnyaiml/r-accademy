
import React from 'react';
import { Box, Paper, Typography, Chip, styled, LinearProgress, linearProgressClasses } from '@mui/material';
import { motion } from 'framer-motion';

// Animations
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};


// Styled Components
export const DashboardPaper = styled(Paper)(() => ({
  padding: '24px',
  borderRadius: 16,
  boxShadow: '0 2px 10px -4px rgba(0,0,0,0.05)',
  backgroundColor: '#fff',
  border: '1px solid rgba(0,0,0,0.05)',
  transition: 'box-shadow 0.3s ease-in-out',
  '&:hover': {
    boxShadow: '0 8px 30px -4px rgba(0,0,0,0.08)',
  },
}));

export const GradientCard = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'gradient',
})<{ gradient: string }>(({ gradient }) => ({
  padding: '24px',
  borderRadius: 16,
  background: gradient,
  color: '#fff',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
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
  iconBg = 'bg-indigo-50',
  iconColor = 'text-indigo-600',
  extra,
  gradient,
}) => (
  // @ts-ignore - framer-motion types issue with custom components
  <motion.div variants={itemVariants} style={{ width: '100%' }}>
    {gradient ? (
      <GradientCard gradient={gradient}>
        <Box sx={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          {icon && <Box sx={{ mb: 1, opacity: 0.9 }}>{icon}</Box>}
          <Typography variant="h3" fontWeight="bold" sx={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            {value}
          </Typography>
          <Typography variant="subtitle1" sx={{ opacity: 0.9, fontWeight: 500, letterSpacing: 0.5 }}>
            {label}
          </Typography>
        </Box>
      </GradientCard>
    ) : (
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.05)] transition-all duration-300 group">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
            <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
          </div>
          {icon && (
            <div className={`h-12 w-12 rounded-full ${iconBg} ${iconColor} flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}>
              {icon}
            </div>
          )}
        </div>
        {extra}
      </div>
    )}
  </motion.div>
);


export const SectionTitle = styled(Typography)(() => ({
  fontWeight: 700,
  marginBottom: '16px',
  color: '#111827',
  fontSize: '1.25rem',
}));

// Status chip helper
export const StatusChip: React.FC<{ status: string }> = ({ status }) => {
  const colorMap: Record<string, 'success' | 'warning' | 'error' | 'info' | 'default'> = {
    completed: 'success',
    submitted: 'success',
    active: 'info',
    present: 'success',
    pending: 'warning',
    upcoming: 'info',
    overdue: 'error',
    absent: 'error',
    late: 'warning',
    missed: 'error',
    graded: 'success',
    draft: 'default',
  };
  return (
    <Chip
      label={status.charAt(0).toUpperCase() + status.slice(1)}
      size="small"
      color={colorMap[status.toLowerCase()] || 'default'}
      sx={{ borderRadius: '8px', fontWeight: 600, fontSize: '0.7rem' }}
    />
  );
};

// Progress bar with label
export const ProgressWithLabel: React.FC<{ value: number; color?: string }> = ({ value, color = '#4F46E5' }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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
            backgroundColor: 'rgba(0,0,0,0.06)',
          },
        }}
      />
    </Box>
    <Typography variant="caption" fontWeight="bold" color="text.secondary">
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
