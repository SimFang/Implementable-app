import React from 'react';

// Define valid size keywords for radial-gradient
const validSizes = ['closest-side', 'farthest-side', 'closest-corner', 'farthest-corner'];

export default function Gradient({
  fromColor = '#0235A6',
  midColor, // Optional third color
  toColor = '#FFFFFF',
  position = 'center',
  size = 'farthest-corner',
  shape = 'circle', // New prop: 'circle' (default) or 'ellipse'
  style = {},
}: {
  fromColor?: string;
  midColor?: string;
  toColor?: string;
  position?: string;
  size?: 'closest-side' | 'farthest-side' | 'closest-corner' | 'farthest-corner' | `${number}px`;
  shape?: 'circle' | 'ellipse'; // New shape prop
  style?: React.CSSProperties;
}) {
  // Validate size
  const safeSize = validSizes.includes(size) || /^\d+px$/.test(size) ? size : 'farthest-corner';

  // Validate position
  const safePosition =
    ['center', 'top', 'bottom', 'left', 'right', 'top left', 'top right', 'bottom left', 'bottom right'].includes(position) ||
    /^\d+% \d+%$/.test(position)
      ? position
      : 'center';

  // Build gradient stops
  const gradientStops = midColor
    ? `${fromColor} 0%, ${midColor} 40%, ${toColor} 100%`
    : `${fromColor} 0%, ${toColor} 100%`;

  const gradientStyle: React.CSSProperties = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 4,
    background: `radial-gradient(${shape} ${safeSize} at ${safePosition}, ${gradientStops})`,
    pointerEvents: 'none',
    ...style,
  };

  return <div style={gradientStyle} />;
}