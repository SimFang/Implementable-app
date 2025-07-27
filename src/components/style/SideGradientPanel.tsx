import React from 'react';
import Gradient from './Gradient';

export default function SideGradientPanel() {
  return (
    <div style={{ 
      width: '25%', // adjust based on your layout
      overflow: 'visible',
      height: "100%"
    }}>
      {/* First gradient - top right */}
      <Gradient
        position="top right"
        size="1000px"
        fromColor="#0237A6"
        toColor="#FFFFFF"
      />

      {/* Second gradient - bottom left */}
      <Gradient
        position="bottom left"
        size="700px"
        fromColor="#0235A6"
        toColor="#FFFFFF"
        style={{ opacity: 0.6 }} // subtle layering
      />
    </div>
  );
}