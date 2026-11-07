import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export interface VideoProps {
  topic: string;
}

export const VideoComposition: React.FC<VideoProps> = ({ topic }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Entrance spring animation for title
  const titleScale = spring({
    frame,
    fps,
    config: {
      damping: 12,
      stiffness: 100,
    },
  });

  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const subtitleOpacity = interpolate(frame, [25, 45], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Animated gradient shift
  const bgRotation = interpolate(frame, [0, 150], [0, 360]);

  return (
    <div
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: `radial-gradient(circle at 50% 50%, #1e1b4b 0%, #0f172a 70%, #020617 100%)`,
        color: '#ffffff',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative background glow */}
      <div
        style={{
          position: 'absolute',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(139, 92, 246, 0.3) 100%)',
          filter: 'blur(80px)',
          transform: `rotate(${bgRotation}deg) scale(${1 + Math.sin(frame / 20) * 0.1})`,
        }}
      />

      {/* Main Card Content */}
      <div
        style={{
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: '80%',
          textAlign: 'center',
          opacity,
          transform: `scale(${titleScale})`,
        }}
      >
        <div
          style={{
            padding: '10px 24px',
            borderRadius: 30,
            background: 'rgba(59, 130, 246, 0.2)',
            border: '1px solid rgba(59, 130, 246, 0.5)',
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: 2,
            textTransform: 'uppercase',
            color: '#60a5fa',
            marginBottom: 28,
          }}
        >
          Remotion &bull; Cloud Render
        </div>

        <h1
          style={{
            fontSize: 68,
            fontWeight: 900,
            lineHeight: 1.2,
            margin: '0 0 20px 0',
            background: 'linear-gradient(to right, #ffffff, #93c5fd)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {topic || 'Remotion Android App'}
        </h1>

        <p
          style={{
            fontSize: 28,
            color: '#94a3b8',
            opacity: subtitleOpacity,
            margin: 0,
          }}
        >
          Rendered automatically using GitHub Actions Runner
        </p>
      </div>

      {/* Bottom Progress Bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 40,
          width: '60%',
          height: 8,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: 4,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${(frame / 150) * 100}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #3b82f6, #a855f7)',
          }}
        />
      </div>
    </div>
  );
};
