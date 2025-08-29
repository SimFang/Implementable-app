import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

interface ExpandableTextProps {
  text: string;
  limit?: number;
}

export function ExpandableText({ text, limit = 100 }: ExpandableTextProps) {
  const [expanded, setExpanded] = useState(false);
  const [fullHeight, setFullHeight] = useState(0);
  const fullRef = useRef<HTMLDivElement>(null);
  const isTruncated = text?.length > limit;

  const preview = isTruncated ? text.substring(0, limit) + '...' : text;

  // Measure full height
  useEffect(() => {
    if (fullRef.current) {
      setFullHeight(fullRef.current.scrollHeight);
    }
  }, [text]);

  return (
    <motion.div
      onClick={() => isTruncated && setExpanded(prev => !prev)}
      style={{
        cursor: isTruncated ? 'pointer' : 'default',
        overflow: 'hidden',
        position: 'relative',
      }}
      animate={{
        maxHeight: expanded ? fullHeight : 60, // Adjust preview height
        opacity: 1,
      }}
      initial={false}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <div ref={fullRef}>
        <div className="result-slider-item-description">
          {expanded || !isTruncated ? text : preview}
        </div>
      </div>

      {/* Fade effect at the bottom */}
      {!expanded && isTruncated && (
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '2rem',
            background: 'linear-gradient(to bottom, rgba(255,255,255,0), white)',
            pointerEvents: 'none',
          }}
        />
      )}
    </motion.div>
  );
}