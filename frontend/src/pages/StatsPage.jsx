import { useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { TrendingUp, Target, Flame, LayoutList } from 'lucide-react';
import { mockHabits, mockDailyStats } from '../utils/mockData';
import Navbar from '../components/common/Navbar';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const formatDate = (dateStr) => {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const SUMMARY_CARDS = [
  { label: 'Total Completions', value: '47', Icon: TrendingUp, color: '#FF3381' },
  { label: 'Success Rate',      value: '74%', Icon: Target,     color: '#FF7D00' },
  { label: 'Best Streak',       value: '12 Days', Icon: Flame, color: '#FF7D00' },
  { label: 'Habits Created',    value: mockHabits.length, Icon: LayoutList, color: '#FF3381' },
];

const chartData = {
  labels: mockDailyStats.map(d => formatDate(d.date)),
  datasets: [{
    data: mockDailyStats.map(d => d.count),
    backgroundColor: '#FF3381',
    borderRadius: 4,
    borderSkipped: false,
  }],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
  },
  scales: {
    x: {
      grid: { color: '#f0f0f0' },
      ticks: {
        maxTicksLimit: 10,
        color: '#6b7280',
        font: { size: 11 },
      },
    },
    y: {
      grid: { color: '#f0f0f0' },
      ticks: { color: '#6b7280', stepSize: 1 },
      min: 0,
    },
  },
};

function StatsPage() {
useEffect(() => {
    localStorage.setItem('routina_visited_stats', 'true');
  }, []);

  return (
    <>
    <Navbar />
    <div className="container pt-4 pb-5">

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
              <div style={{ color: '#6b7280', fontSize: '0.875rem', marginTop: '6px' }}>
                {label}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        background: '#fff',
        border: '1px solid #f0f0f0',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '24px',
      }}>
        <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '20px' }}>Last 30 days</div>
        <div style={{ height: '200px' }}>
          <Bar data={chartData} options={{ ...chartOptions, maintainAspectRatio: false }} />
        </div>
      </div>

      <div style={{
        background: '#fff',
        border: '1px solid #f0f0f0',
        borderRadius: '12px',
        overflow: 'hidden',
      }}>
        <div style={{ padding: '20px 24px 0', fontWeight: 600, color: '#1a1a1a' }}>
          Habit breakdown
        </div>
        <table className="table table-hover mb-0" style={{ marginTop: '12px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
              {['Habit', 'Category', 'Success Rate', 'Current Streak', 'Longest Streak'].map(col => (
                <th key={col} style={{
                  color: '#6b7280',
                  fontWeight: 600,
                  fontSize: '0.8rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  padding: '10px 24px',
                  border: 'none',
                  background: '#fff',
                }}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockHabits.map(habit => (
              <tr key={habit._id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                <td style={{ padding: '14px 24px', border: 'none', verticalAlign: 'middle' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: habit.color,
                      flexShrink: 0,
                    }} />
                    <span style={{ fontWeight: 600, color: '#1a1a1a', fontSize: '0.9rem' }}>
                      {habit.name}
                    </span>
                  </div>
                </td>

                <td style={{ padding: '14px 24px', border: 'none', verticalAlign: 'middle' }}>
                  <span style={{
                    background: '#f5f5f5',
                    color: '#6b7280',
                    borderRadius: '6px',
                    padding: '3px 10px',
                    fontSize: '0.8rem',
                  }}>
                    {habit.category}
                  </span>
                </td>

                <td style={{ padding: '14px 24px', border: 'none', verticalAlign: 'middle', minWidth: '160px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: '#1a1a1a', fontSize: '0.875rem', minWidth: '34px' }}>
                      {habit.successRate}%
                    </span>
                    <div style={{ flex: 1, height: '4px', background: '#f0f0f0', borderRadius: '2px' }}>
                      <div style={{
                        height: '100%',
                        width: `${habit.successRate}%`,
                        background: '#FF3381',
                        borderRadius: '2px',
                      }} />
                    </div>
                  </div>
                </td>

                <td style={{ padding: '14px 24px', border: 'none', verticalAlign: 'middle' }}>
                  <span style={{
                    color: habit.currentStreak > 0 ? '#FF7D00' : '#6b7280',
                    fontWeight: habit.currentStreak > 0 ? 600 : 400,
                    fontSize: '0.875rem',
                  }}>
                    {habit.currentStreak > 0 ? `🔥 ${habit.currentStreak} days` : `${habit.currentStreak} days`}
                  </span>
                </td>

                <td style={{ padding: '14px 24px', border: 'none', verticalAlign: 'middle' }}>
                  <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                    {habit.longestStreak} days
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
    </>
  );
}

export default StatsPage;
