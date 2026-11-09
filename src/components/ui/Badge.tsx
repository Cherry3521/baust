import React from 'react';

export type BadgeVariant = 
  | 'pending'
  | 'approved'
  | 'accepted'
  | 'rejected'
  | 'inProgress'
  | 'completed'
  | 'cancelled'
  | 'actionRequired'
  | 'gold'
  | 'navy'
  | 'green'
  | 'gray'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'neutral';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'gray',
  children,
  size = 'md',
  className = '',
  dot = false
}) => {
  const variantStyles: Record<BadgeVariant, { bg: string; dotBg: string }> = {
    primary: {
      bg: 'bg-[#0F2A4A]/10 text-[#0F2A4A] border-[#0F2A4A]/20',
      dotBg: 'bg-[#0F2A4A]'
    },
    secondary: {
      bg: 'bg-slate-100 text-slate-800 border-slate-200',
      dotBg: 'bg-slate-500'
    },
    success: {
      bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      dotBg: 'bg-emerald-500'
    },
    warning: {
      bg: 'bg-amber-50 text-amber-800 border-amber-200',
      dotBg: 'bg-amber-500'
    },
    danger: {
      bg: 'bg-rose-50 text-rose-800 border-rose-200',
      dotBg: 'bg-rose-500'
    },
    neutral: {
      bg: 'bg-gray-50 text-gray-700 border-gray-200',
      dotBg: 'bg-gray-400'
    },
    pending: {
      bg: 'bg-amber-50 text-amber-800 border-amber-200',
      dotBg: 'bg-amber-500'
    },
    approved: {
      bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      dotBg: 'bg-emerald-500'
    },
    accepted: {
      bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      dotBg: 'bg-emerald-500'
    },
    rejected: {
      bg: 'bg-rose-50 text-rose-800 border-rose-200',
      dotBg: 'bg-rose-500'
    },
    inProgress: {
      bg: 'bg-blue-50 text-blue-800 border-blue-200',
      dotBg: 'bg-blue-500'
    },
    completed: {
      bg: 'bg-slate-100 text-[#0F2A4A] border-slate-300 font-semibold',
      dotBg: 'bg-[#0F2A4A]'
    },
    cancelled: {
      bg: 'bg-gray-100 text-gray-700 border-gray-200',
      dotBg: 'bg-gray-400'
    },
    actionRequired: {
      bg: 'bg-orange-50 text-orange-800 border-orange-200 animate-pulse',
      dotBg: 'bg-orange-500'
    },
    gold: {
      bg: 'bg-amber-50 text-amber-900 border-[#C9A227]/40 font-semibold',
      dotBg: 'bg-[#C9A227]'
    },
    navy: {
      bg: 'bg-[#0F2A4A]/10 text-[#0F2A4A] border-[#0F2A4A]/20',
      dotBg: 'bg-[#0F2A4A]'
    },
    green: {
      bg: 'bg-[#2E5E3E]/10 text-[#2E5E3E] border-[#2E5E3E]/20',
      dotBg: 'bg-[#2E5E3E]'
    },
    gray: {
      bg: 'bg-gray-50 text-gray-700 border-gray-200',
      dotBg: 'bg-gray-400'
    }
  };

  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3 py-1.5'
  };

  const config = variantStyles[variant] || variantStyles.gray;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-medium ${sizeStyles[size]} ${config.bg} ${className}`}
    >
      {dot && <span className={`h-1.5 w-1.5 rounded-full ${config.dotBg}`} />}
      {children}
    </span>
  );
};
