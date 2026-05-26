import { useEffect } from 'react';
import * as Icons from 'lucide-react';
import confetti from 'canvas-confetti';

function BadgeAward({ badge, onClose }) {
  const BadgeIcon = Icons[badge.icon] || Icons.Star;

  useEffect(() => {
    if (badge.type === 'goal_reached') {
      confetti({ particleCount: 150, spread: 70, colors: ['#FF3381', '#FF7D00', '#FFFB00'] });
    }
    const t = setTimeout(onClose, 5000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.5)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
    }}
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#fff',
          borderRadius: '16px',
          padding: '48px',
          textAlign: 'center',
          maxWidth: '380px',
          width: '100%',
        }}
      >
        <BadgeIcon size={80} color="#FF3381" style={{ marginBottom: '20px' }} />
        <h3 style={{ fontWeight: 700, color: '#1a1a1a', marginBottom: '8px' }}>Badge Earned! 🎉</h3>
        <h4 style={{ color: '#FF3381', fontWeight: 600, marginBottom: '12px' }}>{badge.name}</h4>
        <p style={{ color: '#6b7280', marginBottom: '28px', lineHeight: 1.6 }}>{badge.description}</p>
        <button
          className="btn-brand"
          style={{ width: '100%', padding: '12px' }}
          onClick={onClose}
        >
          Awesome!
        </button>
      </div>
    </div>
  );
}

export default BadgeAward;