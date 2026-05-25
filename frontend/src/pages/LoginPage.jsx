import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/images/routina-logo.svg';

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    login({ name: 'Teodor', email, role: 'user' }, 'mock-token');
    navigate('/dashboard');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#fff', display: 'flex', alignItems: 'center' }}>
      <div style={{ maxWidth: '420px', width: '100%', margin: '0 auto', padding: '0 16px' }}>
        <div style={{
          border: '1px solid #f0f0f0',
          borderRadius: '12px',
          padding: '40px',
        }}>
          <div className="text-center mb-4">
            <img src={logo} alt="Routina" style={{ height: '40px', marginBottom: '20px' }} />
            <h4 style={{ fontWeight: 700, color: '#1a1a1a', marginBottom: 0 }}>Welcome back</h4>
          </div>

          {error && (
            <div className="alert alert-danger" role="alert" style={{ borderRadius: '8px', fontSize: '0.9rem' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label" style={{ fontWeight: 600, color: '#1a1a1a' }}>Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ borderRadius: '8px', padding: '10px 14px' }}
              />
            </div>

            <div className="mb-4">
              <label className="form-label" style={{ fontWeight: 600, color: '#1a1a1a' }}>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ borderRadius: '8px', padding: '10px 14px' }}
              />
            </div>

            <button type="submit" className="btn-brand" style={{ width: '100%', padding: '12px' }}>
              Login
            </button>
          </form>

          <p className="text-center mt-4" style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: 0 }}>
            Don't have an account?{' '}
            <Link to="/register" className="link-brand" style={{ fontWeight: 600 }}>
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
