import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import glyphDataRaw from '../../data/glyphData.json';

const glyphData = glyphDataRaw as Record<string, any>;

interface Point {
  x: number;
  y: number;
  p: number;
}

interface Stroke {
  points: Point[];
  delay: number;
  duration: number;
}

interface Glyph {
  width: number;
  strokes: Stroke[];
}

const getGlyph = (char: string): Glyph | null => {
  const data = glyphData[char];
  if (!data) return null;
  return {
    width: data.w,
    strokes: data.s.map((s: any) => ({
      points: s.p.map((p: number[]) => ({ x: p[0], y: p[1], p: p[2] })),
      delay: s.d,
      duration: s.a
    }))
  };
};

const StrokePath = ({ stroke, startDelay, speed }: { stroke: Stroke; startDelay: number; speed: number }) => {
  const d = useMemo(() => {
    if (stroke.points.length < 2) return '';
    const points = stroke.points;
    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
        path += ` L ${points[i].x} ${points[i].y}`;
    }
    return path;
  }, [stroke.points]);

  return (
    <motion.path
      d={d}
      fill="none"
      stroke="currentColor"
      strokeWidth={35} // Internal stroke width (will be multiplied by 0.06 scale)
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{
        duration: (stroke.duration * speed) / 1000,
        delay: (startDelay + (stroke.delay * speed)) / 1000,
        ease: "easeInOut",
        opacity: { duration: 0.01, delay: (startDelay + (stroke.delay * speed)) / 1000 }
      }}
    />
  );
};

export const RealisticHandwriting = ({ 
  text, 
  speed = 1000, 
  startDelay = 0,
  lineDelay = 800,
  className = "" 
}: { 
  text: string; 
  speed?: number; 
  startDelay?: number;
  lineDelay?: number;
  className?: string;
}) => {
  const scale = 0.055;
  const spacing = 2;
  const maxWidth = 1100; // SVG space width before wrapping
  const lineHeight = 1000 * scale * 1.3;
  
  let currentX = 0;
  let currentY = 0;
  let charDelay = startDelay;

  const renderedChars = Array.from(text).map((char, index) => {
    if (char === '\n') {
        currentX = 0;
        currentY += lineHeight;
        charDelay += lineDelay; // Pause at end of line
        return null;
    }
    
    // Simple word wrapping prep: check next word width
    if (char === ' ') {
        const remainingText = text.slice(index + 1);
        const nextWord = remainingText.split(/[\s\n]/)[0];
        let nextWordWidth = 0;
        for (const c of nextWord) {
            const g = getGlyph(c);
            nextWordWidth += ((g?.width || 500) + spacing) * scale;
        }
        
        if (currentX + nextWordWidth + (400 * scale) > maxWidth) {
            currentX = 0;
            currentY += lineHeight;
            charDelay += lineDelay * 0.5; // Short pause for auto-wrapping
            return null;
        }
        
        currentX += 350 * scale;
        return null;
    }

    if (char === '❤️' || char === '❤' || char === '♥') {
        const charX = currentX;
        const charY = currentY;
        const currentDelay = charDelay;
        
        // Advance for heart
        currentX += 500 * scale;
        charDelay += speed * 0.4;

        return (
            <motion.path
                key={index}
                d="M 500 800 C 500 800 200 600 200 400 C 200 250 350 150 500 300 C 650 150 800 250 800 400 C 800 600 500 800 500 800"
                fill="none"
                stroke="currentColor"
                strokeWidth={45}
                strokeLinecap="round"
                strokeLinejoin="round"
                transform={`translate(${charX}, ${charY - 600 * scale}) scale(${scale * 0.9})`}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                    duration: (speed * 0.6) / 1000,
                    delay: currentDelay / 1000,
                    ease: "easeInOut"
                }}
            />
        );
    }

    const glyph = getGlyph(char);
    
    // If we're at the end of the line, wrap (fallback if word wrapping fails)
    if (glyph && currentX + (glyph.width * scale) > maxWidth) {
        currentX = 0;
        currentY += lineHeight;
        charDelay += lineDelay * 0.5;
    }

    if (!glyph) {
        const charX = currentX;
        const charY = currentY;
        const fallback = (
            <text 
                key={index}
                x={charX} 
                y={charY} 
                className="font-script" 
                style={{ fontSize: '1.6rem', fill: 'currentColor', opacity: 0.8 }}
            >
                {char}
            </text>
        );
        currentX += 500 * scale;
        charDelay += 50;
        return fallback;
    }

    const charX = currentX;
    const charY = currentY;
    const currentDelay = charDelay;

    // Advance for next char
    currentX += (glyph.width + spacing) * scale;
    // Sequential delay: strokes duration sum * speed_factor + small buffer
    const charWritingTime = glyph.strokes.reduce((acc, s) => acc + s.duration, 0) * (speed * 0.4);
    
    // Calculate pause based on character
    let pause = (speed * 0.05);
    if (char === '.' || char === '!' || char === '?') {
        pause = lineDelay * 0.8; // Long pause after sentences
    } else if (char === ',') {
        pause = lineDelay * 0.4; // Medium pause after commas
    }

    charDelay += charWritingTime + pause;

    return (
      <g key={index} transform={`translate(${charX}, ${charY}) scale(${scale})`}>
        {glyph.strokes.map((stroke, i) => (
          <StrokePath key={i} stroke={stroke} startDelay={currentDelay} speed={speed} />
        ))}
      </g>
    );
  });


  const viewBoxHeight = Math.max(600, currentY + lineHeight + 100);

  return (
    <svg 
      className={className}
      viewBox={`0 -50 1200 ${viewBoxHeight}`}
      preserveAspectRatio="xMidYMin meet"
      style={{ overflow: 'visible', width: '100%', height: 'auto' }}
    >
      {renderedChars}
    </svg>
  );
};
