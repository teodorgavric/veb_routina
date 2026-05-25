import { useState, useEffect } from 'react';

const RADIUS = 54;
const STROKE = 10;
const SIZE = 140;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function ProgressRing({ completed, total }) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 50);
    return () => clearTimeout(t);
  }, []);

  const progress = total > 0 ? completed / total : 0;
  const offset = CIRCUMFERENCE * (1 - progress);
  const cx = SIZE / 2;
  const cy = SIZE / 2;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <svg width={SIZE} height={SIZE}>
        <circle cx={cx} cy={cy} r={RADIUS} fill="none" stroke="#f0f0f0" strokeWidth={STROKE} />
        <circle
          cx={cx}
          cy={cy}
          r={RADIUS}
          fill="none"
          stroke="#FF3381"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={animated ? offset : CIRCUMFERENCE}
          transform={`rotate(-90 ${cx} ${cy})`}
          style={{ transition: 'stroke-dashoffset 1s ease' }}
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="central"
          style={{ fontSize: '1.4rem', fontWeight: 700, fill: '#1a1a1a' }}
        >
          {completed}/{total}
        </text>
      </svg>
      <div style={{ color: '#6b7280', fontSize: '0.8rem', marginTop: '6px' }}>
        habits done today
      </div>
    </div>
  );
}

export default ProgressRing;