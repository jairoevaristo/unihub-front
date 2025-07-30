import React from 'react'

type SpinnerSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

const sizeMap: Record<SpinnerSize, string> = {
  xxs: 'w-2 h-2',
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12',
  xxl: 'w-16 h-16',
}

interface LoadingSpinnerProps {
  size?: SpinnerSize
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
}) => {
  const sizeClass = sizeMap[size]

  return (
    <div
      className={`inline-block ${sizeClass} rounded-full border-4 border-gray-200 border-t-[#33b5eb] animate-spin`}
    />
  )
}
