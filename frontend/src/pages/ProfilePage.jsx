import { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import api from '../utils/axiosInstance';
import { Lock, TrendingUp, Target, Flame, LayoutList } from 'lucide-react';
import { BADGE_DEFINITIONS } from '../utils/mockData';

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [badges, setBadges] = useState([]);
  const [habits, setHabits] = useState([]);
  const [totalCompletions, setTotalCompletions] = useState(0);

  useEffect(() => {
    Promise.all([
      api.get('/users/profile'),
      api.get('/badges'),
      api.get('/stats/habits'),
      api.get('/logs/all'),
    ]).then(([userRes, badgesRes, habitsRes, logsRes]) => {
      setUser(userRes.data);
      setBadges(badgesRes.data);
      setHabits(habitsRes.data);
      setTotalCompletions(logsRes.data.length);
    });
  }, []);

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="container pt-4 pb-5 text-center py-5">
          <div
            className="spinner-border"
            role="status"
            style={{ borderColor: '#FF3381', borderRightColor: 'transparent', width: '2rem', height: '2rem' }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const initials = user.name
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase();

  const memberSince = new Date(user.createdAt)
    .toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const earnedMap = Object.fromEntries(badges.map(b => [b.type, b]));

  const avgSuccessRate = habits.length
    ? Math.round(habits.reduce((sum, h) => sum + h.successRate, 0) / habits.length)
    : 0;
  const bestStreak = habits.length
    ? Math.max(...habits.map(h => h.longestStreak))
    : 0;

  const SUMMARY_CARDS = [
    { label: 'Total Completions', value: totalCompletions,        Icon: TrendingUp, color: '#FF3381' },
    { label: 'Success Rate',      value: `${avgSuccessRate}%`,    Icon: Target,     color: '#FF7D00' },
    { label: 'Best Streak',       value: `${bestStreak} days`, Icon: Flame,      color: '#FF7D00' },
    { label: 'Habits Created',    value: habits.length,           Icon: LayoutList, color: '#FF3381' },
  ];

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
          <h4 style={{ fontWeight: 700, color: '#1a1a1a', marginBottom: '4px' }}>{user.name}</h4>
          <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>{user.email}</div>
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
                    Earned {new Date(earned.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
    <Footer />
    </>
  );
}

export default ProfilePage;