import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Flame, BarChart2, Target } from 'lucide-react';
import { mockHabits } from '../utils/mockData';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const calendarStyles = `
  .react-calendar { border: 1px solid #f0f0f0 !important; border-radius: 12px !important; font-family: system-ui !important; width: 100% !important; padding: 8px; }
  .react-calendar__navigation { gap: 4px !important; margin-bottom: 8px !important; }
  .react-calendar__navigation button { border-radius: 8px; font-weight: 600; color: #1a1a1a; }
  .react-calendar__navigation button:hover { background: #fff0f5 !important; }
  .react-calendar__tile { border-radius: 8px !important; padding: 10px 4px !important; }
  .react-calendar__tile--active { background: #FF3381 !important; color: white !important; }
  .react-calendar__tile--active:hover { background: #FF3381 !important; }
  .react-calendar__tile:hover { background: #fff0f5 !important; }
  .react-calendar__tile--now { background: #fff0f5 !important; font-weight: 700; }
  .react-calendar__tile--now.react-calendar__tile--active { background: #FF3381 !important; }
  .completed-day abbr { position: relative; }
  .completed-day { background: #fff0f5 !important; }
  .react-calendar__month-view__weekdays,
  .react-calendar__month-view__days { display: grid !important; grid-template-columns: repeat(7, 1fr) !important; gap: 4px !important; }
  .react-calendar__month-view__weekdays { color: #6b7280; font-size: 0.78rem; }
  .react-calendar__month-view__weekdays__weekday { text-align: center; }
`;

const today = new Date();
today.setHours(0, 0, 0, 0);

function dateHash(date, seed = '') {
  const s = date.toISOString().split('T')[0] + seed;
  let h = 0;
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) % 100;
  return h;
}

function isPast(date) {
  return date <= today;
}

function CalendarPage() {
  const [selectedHabit, setSelectedHabit] = useState('all');
  const [calValue, setCalValue] = useState(new Date());

  const habit = selectedHabit !== 'all'
    ? mockHabits.find(h => h._id === selectedHabit)
    : null;

  const isAllCompleted = (date) => {
    if (!isPast(date)) return false;
    const h = selectedHabit === 'all'
      ? dateHash(date)
      : dateHash(date, selectedHabit);
    return selectedHabit === 'all' ? h > 70 : h > 40;
  };

  const tileContent = ({ date, view }) => {
    if (view !== 'month') return null;
    const show = selectedHabit === 'all' && isAllCompleted(date);
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3px' }}>
        <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: show ? '#FF3381' : 'transparent' }} />
      </div>
    );
  };

  const tileClassName = ({ date, view }) => {
    if (view !== 'month') return null;
    return isAllCompleted(date) ? 'completed-day' : null;
  };

  const activeBtn = {
    background: '#FF3381',
    color: '#fff',
    border: '2px solid #FF3381',
    borderRadius: '8px',
    padding: '7px 20px',
    fontWeight: 600,
    cursor: 'pointer',
    fontSize: '0.9rem',
  };

  const inactiveBtn = {
    background: 'transparent',
    color: '#FF3381',
    border: '2px solid #FF3381',
    borderRadius: '8px',
    padding: '7px 20px',
    fontWeight: 600,
    cursor: 'pointer',
    fontSize: '0.9rem',
    transition: 'opacity 0.2s',
  };

  return (
    <>
    <Navbar />
    <div className="container pt-4 pb-5" style={{ maxWidth: '800px' }}>
      <style>{calendarStyles}</style>

      {/* View switcher */}
      <div className="d-flex align-items-center gap-3 mb-4 flex-wrap">
        <button
          style={selectedHabit === 'all' ? activeBtn : inactiveBtn}
          onClick={() => setSelectedHabit('all')}
        >
          All Habits
        </button>
        <select
          className="form-select"
          value={selectedHabit === 'all' ? '' : selectedHabit}
          onChange={e => { if (e.target.value) setSelectedHabit(e.target.value); }}
          style={{ maxWidth: '220px', borderRadius: '8px', borderColor: '#f0f0f0', fontSize: '0.9rem', cursor: 'pointer' }}
        >
          <option value="">View specific habit…</option>
          {mockHabits.map(h => (
            <option key={h._id} value={h._id}>{h.name}</option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '28px' }}>
        <Calendar
          value={calValue}
          onChange={setCalValue}
          tileContent={tileContent}
          tileClassName={tileClassName}
          maxDate={today}
        />
      </div>


      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontSize: '0.82rem', color: '#6b7280' }}>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FF3381', flexShrink: 0 }} />
        {selectedHabit === 'all' ? 'All Habits Completed' : `${habit?.name} Completed`}
      </div>

      {habit && (
        <div className="row g-3" style={{ marginTop: '32px' }}>
          {[
            { label: 'Current Streak', value: `🔥 ${habit.currentStreak} days`, Icon: Flame, color: '#FF7D00' },
            { label: 'Longest Streak', value: `${habit.longestStreak} days`, Icon: BarChart2, color: '#FF3381' },
            { label: 'Success Rate', value: `${habit.successRate}%`, Icon: Target, color: '#FF3381' },
          ].map(({ label, value, Icon, color }) => (
            <div className="col-4" key={label}>
              <div style={{
                background: '#fff',
                border: '1px solid #f0f0f0',
                borderRadius: '12px',
                padding: '20px',
              }}>
                <Icon size={20} color={color} style={{ marginBottom: '10px' }} />
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a1a', lineHeight: 1 }}>{value}</div>
                <div style={{ color: '#6b7280', fontSize: '0.82rem', marginTop: '5px' }}>{label}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    <Footer />
    </>
  );
}

export default CalendarPage;
