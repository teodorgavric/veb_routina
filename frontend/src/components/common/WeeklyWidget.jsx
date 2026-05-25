const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const DAY_MAP = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function WeeklyWidget({ weekData, habits }) {
  const todayDay = DAY_MAP[new Date().getDay()];

  return (
    <div style={{
      background: '#fff',
      border: '1px solid #f0f0f0',
      borderRadius: '12px',
      padding: '24px',
    }}>
      <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '16px' }}>This Week</div>
      <div style={{ display: 'flex', gap: '6px' }}>
        {DAYS.map(day => {
          const completed = weekData[day] || [];
          const isToday = day === todayDay;

          return (
            <div
              key={day}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '5px',
                background: isToday ? '#fff0f5' : 'transparent',
                borderRadius: '8px',
                padding: '8px 4px',
              }}
            >
              <div style={{ fontSize: '0.72rem', color: '#6b7280', marginBottom: '2px' }}>{day}</div>
              {habits.map(habit => (
                <div
                  key={habit._id}
                  title={habit.name}
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: completed.includes(habit._id) ? habit.color : 'transparent',
                    border: `2px solid ${habit.color}`,
                    opacity: completed.includes(habit._id) ? 1 : 0.3,
                    flexShrink: 0,
                  }}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WeeklyWidget;