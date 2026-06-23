import { useState, useEffect } from 'react';
import { Users, LayoutList, CheckSquare, Award, Trash2 } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import api from '../utils/axiosInstance';

function AdminPage() { 
  const [stats, setStats] = useState({ totalUsers: 0, totalHabits: 0, totalLogsToday: 0, totalBadges: 0 });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get('/users/admin/stats').then(({ data }) => setStats(data));
    api.get('/users').then(({ data }) => setUsers(data));
  }, []);

  const STAT_CARDS = [
    { label: 'Total Users',   value: stats.totalUsers,     Icon: Users,       color: '#FF3381' },
    { label: 'Total Habits',  value: stats.totalHabits,    Icon: LayoutList,  color: '#FF7D00' },
    { label: 'Logs Today',    value: stats.totalLogsToday, Icon: CheckSquare, color: '#FF3381' },
    { label: 'Badges Earned', value: stats.totalBadges,    Icon: Award,       color: '#FF7D00' },
  ];

  const handleDelete = async (id) => {
    if (window.confirm('Delete this user and all their data?')) {
      await api.delete(`/users/${id}`);
      setUsers(prev => prev.filter(u => u._id !== id));
    }
  };

  return (
    <>
      <Navbar />
      <div className="container pt-4 pb-5">

        <div style={{ marginBottom: '28px' }}>
          <h4 style={{ fontWeight: 700, color: '#1a1a1a', marginBottom: '4px' }}>Admin Panel</h4>
          <div style={{ color: '#6b7280' }}>Manage users and content</div>
        </div>

        <div className="row g-3 mb-4">
          {STAT_CARDS.map(({ label, value, Icon, color }) => (
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

        <div style={{ fontWeight: 600, color: '#1a1a1a', fontSize: '1.1rem', marginTop: '32px', marginBottom: '16px' }}>
          All Users
        </div>
        <div style={{
          background: '#fff',
          border: '1px solid #f0f0f0',
          borderRadius: '12px',
          overflow: 'hidden',
        }}>
          <table className="table table-hover mb-0">
            <thead>
              <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                {['#', 'Name', 'Email', 'Role', 'Member Since', 'Habits', 'Actions'].map(col => (
                  <th key={col} style={{
                    color: '#6b7280',
                    fontWeight: 600,
                    fontSize: '0.8rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    padding: '10px 20px',
                    border: 'none',
                    background: '#fff',
                  }}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr key={user._id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                  <td style={{ padding: '14px 20px', border: 'none', verticalAlign: 'middle', color: '#6b7280', fontSize: '0.875rem' }}>
                    {i + 1}
                  </td>
                  <td style={{ padding: '14px 20px', border: 'none', verticalAlign: 'middle', fontWeight: 600, color: '#1a1a1a', fontSize: '0.9rem' }}>
                    {user.name}
                  </td>
                  <td style={{ padding: '14px 20px', border: 'none', verticalAlign: 'middle', color: '#6b7280', fontSize: '0.875rem' }}>
                    {user.email}
                  </td>
                  <td style={{ padding: '14px 20px', border: 'none', verticalAlign: 'middle' }}>
                    <span style={{
                      background: user.role === 'admin' ? '#FF3381' : '#f0f0f0',
                      color: user.role === 'admin' ? '#fff' : '#6b7280',
                      borderRadius: '6px',
                      padding: '3px 10px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                    }}>
                      {user.role}
                    </span>
                  </td>
                  <td style={{ padding: '14px 20px', border: 'none', verticalAlign: 'middle', color: '#6b7280', fontSize: '0.875rem' }}>
                    {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </td>
                  <td style={{ padding: '14px 20px', border: 'none', verticalAlign: 'middle', color: '#1a1a1a', fontSize: '0.875rem' }}>
                    {user.habitCount}
                  </td>
                  <td style={{ padding: '14px 20px', border: 'none', verticalAlign: 'middle' }}>
                    <button
                      onClick={() => handleDelete(user._id)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}
                      title="Delete user"
                    >
                      <Trash2 size={16} color="#FF2200" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AdminPage;