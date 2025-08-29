import React, { useEffect, useState } from 'react';

// Define valid size keywords for radial-gradient
const validSizes = ['closest-side', 'farthest-side', 'closest-corner', 'farthest-corner'];

export default function Gradient({
  fromColor = '#0235A6',
  midColor, // Optional third color
  toColor = '#FFFFFF',
  position = 'center',
  size = 'farthest-corner',
  shape = 'circle', // 'circle' (default) or 'ellipse'
  style = {},
  duration = 0.9, // Animation duration in seconds
}: {
  fromColor?: string;
  midColor?: string;
  toColor?: string;
  position?: string;
  size?: 'closest-side' | 'farthest-side' | 'closest-corner' | 'farthest-corner' | `${number}px`;
  shape?: 'circle' | 'ellipse';
  style?: React.CSSProperties;
  duration?: number;
}) {
  const [scale, setScale] = useState(0);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    // Trigger animation on mount
    const timeout = setTimeout(() => {
      setScale(1);
      setOpacity(1);
    }, 10);
    return () => clearTimeout(timeout);
  }, []);

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
    zIndex: 2,
    pointerEvents: 'none',
    background: `radial-gradient(${shape} ${safeSize} at ${safePosition}, ${gradientStops})`,
    transform: `scale(${scale})`,
    transformOrigin: safePosition,
    opacity: opacity,
    transition: `transform ${duration}s ease-in, opacity ${duration}s ease-in`,
    ...style,
  };

  return <div style={gradientStyle} />;
}