import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/images/routina-logo.svg';

function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!name.trim()) errs.name = 'Name is required.';
    if (!email.trim()) errs.email = 'Email is required.';
    if (password.length < 6) errs.password = 'Password must be at least 6 characters.';
    if (password !== confirm) errs.confirm = 'Passwords do not match.';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    login({ name: name.trim(), email, role: 'user' }, 'mock-token');
    navigate('/dashboard');
  };

  const fieldError = (key) =>
    errors[key] ? (
      <div style={{ color: '#FF3381', fontSize: '0.82rem', marginTop: '4px' }}>{errors[key]}</div>
    ) : null;

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
            <h4 style={{ fontWeight: 700, color: '#1a1a1a', marginBottom: 0 }}>Create your account</h4>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label" style={{ fontWeight: 600, color: '#1a1a1a' }}>Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Teodor"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ borderRadius: '8px', padding: '10px 14px' }}
              />
              {fieldError('name')}
            </div>

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
              {fieldError('email')}
            </div>

            <div className="mb-3">
              <label className="form-label" style={{ fontWeight: 600, color: '#1a1a1a' }}>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Min. 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ borderRadius: '8px', padding: '10px 14px' }}
              />
              {fieldError('password')}
            </div>

            <div className="mb-4">
              <label className="form-label" style={{ fontWeight: 600, color: '#1a1a1a' }}>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="••••••••"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                style={{ borderRadius: '8px', padding: '10px 14px' }}
              />
              {fieldError('confirm')}
            </div>

            <button type="submit" className="btn-brand" style={{ width: '100%', padding: '12px' }}>
              Create Account
            </button>
          </form>

          <p className="text-center mt-4" style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: 0 }}>
            Already have an account?{' '}
            <Link to="/login" className="link-brand" style={{ fontWeight: 600 }}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
