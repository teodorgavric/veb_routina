import * as Icons from 'lucide-react';
import { Lock, TrendingUp, Target, Flame, LayoutList } from 'lucide-react';
import { mockUser, mockBadges, BADGE_DEFINITIONS, mockHabits } from '../utils/mockData';
import Navbar from '../components/common/Navbar';

const initials = mockUser.name
  .split(' ')
  .map(w => w[0])
  .join('')
  .toUpperCase();

const memberSince = new Date(mockUser.createdAt + 'T00:00:00')
  .toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

const earnedMap = Object.fromEntries(mockBadges.map(b => [b.type, b]));

const SUMMARY_CARDS = [
  { label: 'Total Completions', value: '47',               Icon: TrendingUp, color: '#FF3381' },
  { label: 'Success Rate',      value: '74%',              Icon: Target,     color: '#FF7D00' },
  { label: 'Best Streak',       value: '12 days',       Icon: Flame,      color: '#FF7D00' },
  { label: 'Habits Created',    value: mockHabits.length,  Icon: LayoutList, color: '#FF3381' },
];

function ProfilePage() {
  return (
    <>
    <Navbar />
    <div className="container pt-4 pb-5" style={{ maxWidth: '900px' }}>

      <div style={{
        background: '#fff',
        border: '1px solid #f0f0f0',
        borderRadius: '12px',
        padding: '32px',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
      }}>
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          background: 'var(--gradient)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: '1.5rem',
          fontWeight: 700,
          flexShrink: 0,
        }}>
          {initials}
        </div>
        <div>
          <h4 style={{ fontWeight: 700, color: '#1a1a1a', marginBottom: '4px' }}>{mockUser.name}</h4>
          <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>{mockUser.email}</div>
          <div style={{ color: '#6b7280', fontSize: '0.875rem', marginTop: '4px' }}>
            Member since {memberSince}
          </div>
        </div>
      </div>

      <div className="row g-3 mb-4">
        {SUMMARY_CARDS.map(({ label, value, Icon, color }) => (
          <div className="col-6 col-md-3" key={label}>
            <div style={{
              background: '#fff',
              border: '1px solid #f0f0f0',
              borderRadius: '12px',
              padding: '24px',
            }}>
              <Icon size={22} color={color} style={{ marginBottom: '12px' }} />
              <div style={{ fontSize: '2rem', fontWeight: 700, color: '#1a1a1a', lineHeight: 1 }}>
                {value}
              </div>
              <div style={{ color: '#6b7280', fontSize: '0.875rem', marginTop: '6px' }}>{label}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ fontWeight: 600, fontSize: '1.25rem', color: '#1a1a1a', marginBottom: '16px' }}>
        Your Badges
      </div>
      <div className="row g-3">
        {BADGE_DEFINITIONS.map(badge => {
          const earned = earnedMap[badge.type];
          const BadgeIcon = Icons[badge.icon] || Icons.Star;
          return (
            <div className="col-6 col-md-4 col-lg-3" key={badge.type}>
              <div style={{
                background: '#fff',
                border: `2px solid ${earned ? '#FF3381' : '#f0f0f0'}`,
                borderRadius: '12px',
                padding: '20px',
                textAlign: 'center',
                position: 'relative',
                opacity: earned ? 1 : 0.5,
                height: '100%',
              }}>
                {!earned && (
                  <Lock size={14} color="#6b7280" style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                  }} />
                )}
                <BadgeIcon size={48} color={earned ? '#FF3381' : '#6b7280'} style={{ marginBottom: '12px' }} />
                <div style={{ fontWeight: 600, color: '#1a1a1a', fontSize: '0.9rem', marginBottom: '6px' }}>
                  {badge.name}
                </div>
                <div style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: earned ? '8px' : 0 }}>
                  {badge.description}
                </div>
                {earned && (
                  <div style={{ color: '#FF7D00', fontSize: '0.8rem', fontWeight: 600 }}>
                    Earned {new Date(earned.earnedAt + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </>
  );
}

export default ProfilePage;
