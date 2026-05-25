import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/routina-logo.svg';

const gradientText = {
  background: 'linear-gradient(135deg, #FF3381, #FF2200, #FF7D00, #FFFB00)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      background: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '0 16px',
    }}>
      <img src={logo} alt="Routina" style={{ height: '48px', marginBottom: '32px' }} />
      <div style={{ ...gradientText, fontSize: '5rem', fontWeight: 800, lineHeight: 1 }}>
        404
      </div>
      <p style={{ color: '#6b7280', fontSize: '1.1rem', marginTop: '16px', marginBottom: '32px' }}>
        Page not found
      </p>
      <button className="btn-brand" style={{ padding: '12px 32px', fontSize: '1rem' }} onClick={() => navigate('/dashboard')}>
        Go to Dashboard
      </button>
    </div>
  );
}

export default NotFoundPage;
