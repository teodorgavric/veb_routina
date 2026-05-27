import { useState } from 'react';
import { Users, LayoutList, CheckSquare, Award, Trash2 } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const STAT_CARDS = [
  { label: 'Total Users',   value: 5,  Icon: Users,       color: '#FF3381' },
  { label: 'Total Habits',  value: 23, Icon: LayoutList,  color: '#FF7D00' },
  { label: 'Logs Today',    value: 12, Icon: CheckSquare, color: '#FF3381' },
  { label: 'Badges Earned', value: 8,  Icon: Award,       color: '#FF7D00' },
];

const INITIAL_USERS = [
  { id: 1, name: 'Teodor Gavrić',  email: 'teodor@mail.com', role: 'admin', since: 'Jan 2025', habits: 4 },
  { id: 2, name: 'Ana Marić',      email: 'ana@mail.com',    role: 'user',  since: 'Feb 2025', habits: 6 },
  { id: 3, name: 'Marko Jović',    email: 'marko@mail.com',  role: 'user',  since: 'Feb 2025', habits: 3 },
  { id: 4, name: 'Maja Stoić',     email: 'maja@mail.com',   role: 'user',  since: 'Mar 2025', habits: 7 },
  { id: 5, name: 'Stefan Đorđić', email: 'stefan@mail.com', role: 'user',  since: 'Mar 2025', habits: 3 },
];

function AdminPage() {
  const [users, setUsers] = useState(INITIAL_USERS);

  const handleDelete = (id) => {
    if (window.confirm('Delete this user and all their data?')) {
      setUsers(prev => prev.filter(u => u.id !== id));
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
                <tr key={user.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
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
                    {user.since}
                  </td>
                  <td style={{ padding: '14px 20px', border: 'none', verticalAlign: 'middle', color: '#1a1a1a', fontSize: '0.875rem' }}>
                    {user.habits}
                  </td>
                  <td style={{ padding: '14px 20px', border: 'none', verticalAlign: 'middle' }}>
                    <button
                      onClick={() => handleDelete(user.id)}
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