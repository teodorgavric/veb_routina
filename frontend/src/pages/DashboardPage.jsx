import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { mockHabits, mockCompletedToday, mockWeekData } from '../utils/mockData';
import ProgressRing from '../components/common/ProgressRing';
import WeeklyWidget from '../components/common/WeeklyWidget';
import HabitCard from '../components/habits/HabitCard';
import QuickAddModal from '../components/habits/QuickAddModal';
import OnboardingFlow from '../components/common/OnboardingFlow';

const FALLBACK_QUOTE = 'Small steps every day lead to big changes.';
const FALLBACK_AUTHOR = 'Unknown';

function DashboardPage() {
  const navigate = useNavigate();

  const [habits, setHabits] = useState(mockHabits);
  const [completedToday, setCompletedToday] = useState(mockCompletedToday);
  const [sortBy, setSortBy] = useState('date');
  const [quote, setQuote] = useState(FALLBACK_QUOTE);
  const [quoteAuthor, setQuoteAuthor] = useState(FALLBACK_AUTHOR);
  const [showBadge, setShowBadge] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);

    axios.get('https://api.quotable.io/random?tags=inspirational')
      .then(({ data }) => {
        setQuote(data.content);
        setQuoteAuthor(data.author);
      })
      .catch(() => {
        setQuote(FALLBACK_QUOTE);
        setQuoteAuthor(FALLBACK_AUTHOR);
      });

    return () => clearTimeout(timer);
  }, []);

  const sortedHabits = useMemo(() => {
    const arr = [...habits];
    if (sortBy === 'streak') return arr.sort((a, b) => b.currentStreak - a.currentStreak);
    if (sortBy === 'category') return arr.sort((a, b) => a.category.localeCompare(b.category));
    return arr.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  }, [habits, sortBy]);

  const handleToggle = (id) => {
    setCompletedToday(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleArchive = (id) => {
    setHabits(prev => prev.filter(h => h._id !== id));
    setCompletedToday(prev => prev.filter(x => x !== id));
  };

  const handleEdit = (id) => navigate(`/habits/${id}/edit`);

  const handleAdd = (newHabit) => setHabits(prev => [newHabit, ...prev]);

  return (
    <div className="container pt-4 pb-5">
      {/* Top row */}
      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div style={{
            background: '#fff',
            border: '1px solid #f0f0f0',
            borderRadius: '12px',
            padding: '24px',
            display: 'flex',
            justifyContent: 'center',
          }}>
            <ProgressRing completed={completedToday.length} total={habits.length} />
          </div>
        </div>

        <div className="col-md-8">
          <div style={{
            background: '#fff',
            border: '1px solid #f0f0f0',
            borderRadius: '12px',
            padding: '24px',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
            <div style={{ color: '#6b7280', fontSize: '0.8rem', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Today's inspiration
            </div>
            <p style={{ fontStyle: 'italic', color: '#1a1a1a', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '12px' }}>
              "{quote}"
            </p>
            <div style={{ color: '#FF3381', fontWeight: 600, fontSize: '0.9rem' }}>
              — {quoteAuthor}
            </div>
          </div>
        </div>
      </div>

      <OnboardingFlow habits={habits} completedToday={completedToday} />

      <div className="d-flex align-items-center gap-3 mb-3">
        <span style={{ color: '#6b7280', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>Sort by:</span>
        <select
          className="form-select"
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          style={{
            borderColor: '#f0f0f0',
            borderRadius: '8px',
            maxWidth: '200px',
            fontSize: '0.9rem',
            cursor: 'pointer',
          }}
        >
          <option value="date">Date Created</option>
          <option value="streak">Streak (High to Low)</option>
          <option value="category">Category</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div
            className="spinner-border"
            role="status"
            style={{
              borderColor: '#FF3381',
              borderRightColor: 'transparent',
              width: '2rem',
              height: '2rem',
            }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : habits.length === 0 ? (
        <div className="text-center py-5">
          <img
            src="/assets/images/empty-habits.svg"
            alt=""
            style={{ width: '120px', marginBottom: '24px', opacity: 0.5 }}
            onError={e => { e.target.style.display = 'none'; }}
          />
          <h5 style={{ fontWeight: 700, color: '#1a1a1a', marginBottom: '8px' }}>No habits yet</h5>
          <p style={{ color: '#6b7280', marginBottom: '24px' }}>Start building your routine</p>
          <button className="btn-brand" style={{ padding: '10px 28px' }} onClick={() => navigate('/habits/new')}>
            Add your first habit
          </button>
        </div>
      ) : (
        sortedHabits.map(habit => (
          <HabitCard
            key={habit._id}
            habit={habit}
            isCompletedToday={completedToday.includes(habit._id)}
            onToggle={handleToggle}
            onArchive={handleArchive}
            onEdit={handleEdit}
          />
        ))
      )}

      <div style={{ marginTop: '40px' }}>
        <WeeklyWidget weekData={mockWeekData} habits={habits} />
      </div>

      <button
        onClick={() => setShowModal(true)}
        style={{
          position: 'fixed',
          bottom: '32px',
          right: '32px',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'var(--gradient)',
          border: 'none',
          color: '#fff',
          fontSize: '1.5rem',
          cursor: 'pointer',
          boxShadow: '0 4px 16px rgba(255, 51, 129, 0.35)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999,
          lineHeight: 1,
        }}
        title="Quick add habit"
      >
        +
      </button>

      <QuickAddModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onAdd={handleAdd}
      />
    </div>
  );
}

export default DashboardPage;