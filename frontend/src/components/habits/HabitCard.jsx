import { useState, useEffect, useRef } from 'react';
import * as Icons from 'lucide-react';
import { Check, MoreHorizontal, Pencil, Archive } from 'lucide-react';

function HabitCard({ habit, isCompletedToday, onToggle, onArchive, onEdit }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const Icon = Icons[habit.icon] || Icons.Star;

  useEffect(() => {
    if (!menuOpen) return;
    const handleOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [menuOpen]);

  const handleArchive = () => {
    setMenuOpen(false);
    if (window.confirm(`Archive "${habit.name}"?`)) onArchive(habit._id);
  };

  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid #f0f0f0',
        borderRadius: '12px',
        borderLeft: `4px solid ${habit.color}`,
        padding: '18px 20px',
        marginBottom: '12px',
        position: 'relative',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: habit.color + '26',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Icon size={20} color={habit.color} />
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '3px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {habit.name}
          </div>
          <span style={{
            background: '#f5f5f5',
            color: '#6b7280',
            borderRadius: '6px',
            padding: '2px 8px',
            fontSize: '0.75rem',
          }}>
            {habit.category}
          </span>
        </div>

        <div style={{
          color: habit.currentStreak > 0 ? '#FF7D00' : '#6b7280',
          fontWeight: 600,
          fontSize: '0.9rem',
          whiteSpace: 'nowrap',
          marginRight: '4px',
        }}>
          🔥 {habit.currentStreak} days
        </div>

        <button
          onClick={() => onToggle(habit._id)}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: isCompletedToday ? 'none' : '2px solid #f0f0f0',
            background: isCompletedToday ? '#FF7D00' : 'transparent',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'all 0.2s',
          }}
        >
          {isCompletedToday && <Check size={18} color="#fff" strokeWidth={3} />}
        </button>

        <div ref={menuRef} style={{ position: 'relative', flexShrink: 0 }}>
          <button
            onClick={() => setMenuOpen(o => !o)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px 2px',
              color: '#6b7280',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <MoreHorizontal size={18} />
          </button>
          {menuOpen && (
            <div style={{
              position: 'absolute',
              right: 0,
              top: 'calc(100% + 4px)',
              background: '#fff',
              border: '1px solid #f0f0f0',
              borderRadius: '8px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
              zIndex: 20,
              minWidth: '140px',
              overflow: 'hidden',
            }}>
              <button
                onClick={() => { setMenuOpen(false); onEdit(habit._id); }}
                style={menuItemStyle}
              >
                <Pencil size={14} /> Edit
              </button>
              <button onClick={handleArchive} style={menuItemStyle}>
                <Archive size={14} /> Archive
              </button>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

const menuItemStyle = {
  width: '100%',
  border: 'none',
  background: 'none',
  padding: '10px 16px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  color: '#1a1a1a',
  fontSize: '0.875rem',
  textAlign: 'left',
};

export default HabitCard;