import { useNavigate } from 'react-router-dom';
import { CheckCircle, Flame, Award } from 'lucide-react';
import logo from '../assets/images/routina-logo.svg';

const gradientText = {
  background: 'linear-gradient(135deg, #FF3381, #FF2200, #FF7D00, #FFFB00)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

const FEATURES = [
  {
    Icon: CheckCircle,
    color: '#FF3381',
    title: 'Track Daily',
    desc: 'Check off habits every day and watch your progress build over time.',
  },
  {
    Icon: Flame,
    color: '#FF7D00',
    title: 'Build Streaks',
    desc: 'Keep your streak alive and stay motivated with visual streak counters.',
  },
  {
    Icon: Award,
    color: '#FF3381',
    title: 'Earn Badges',
    desc: 'Unlock achievement badges as you hit milestones and reach your goals.',
  },
];

const STEPS = [
  { n: '01', title: 'Create Your Habits', desc: 'Add the habits you want to build.' },
  { n: '02', title: 'Check In Daily', desc: 'Mark habits complete each day and watch your streaks grow.' },
  { n: '03', title: 'Earn Rewards', desc: 'Hit milestones, earn badges, and celebrate your progress.' },
];

function LandingPage() {
  const navigate = useNavigate();

  return (
    <>
      <nav style={{
        background: '#fff',
        borderBottom: '1px solid #f0f0f0',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        padding: '12px 0',
      }}>
        <div className="container d-flex justify-content-between align-items-center">
          <img src={logo} alt="Routina" style={{ height: '36px' }} />
          <div className="d-flex gap-2">
            <button
              className="btn-outline-brand"
              style={{ padding: '6px 18px' }}
              onClick={() => navigate('/login')}
            >
              Login
            </button>
            <button
              className="btn-brand"
              style={{ padding: '6px 18px' }}
              onClick={() => navigate('/register')}
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <section style={{ minHeight: 'calc(100vh - 62px)', display: 'flex', alignItems: 'center', background: '#fff' }}>
        <div className="container py-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <h1 style={{ fontSize: '3rem', fontWeight: 800, color: '#1a1a1a', lineHeight: 1.15 }}>
                Build habits that stick.
              </h1>
              <p style={{ color: '#6b7280', fontSize: '1.1rem', maxWidth: '480px', marginTop: '20px', marginBottom: '36px' }}>
                Track your daily habits, build streaks, and earn rewards for staying consistent.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <button
                  className="btn-brand"
                  style={{ padding: '14px 32px', fontSize: '1rem' }}
                  onClick={() => navigate('/register')}
                >
                  Get Started Free
                </button>
                <a
                  href="#features"
                  className="btn-outline-brand"
                  style={{ padding: '14px 32px', fontSize: '1rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
                >
                  See How It Works
                </a>
              </div>
            </div>

            <div className="col-lg-6 d-flex justify-content-center">
              <div
                className="shadow-lg"
                style={{
                  background: '#fff',
                  borderRadius: '16px',
                  borderLeft: '4px solid #FF7D00',
                  padding: '28px 32px',
                  maxWidth: '300px',
                  width: '100%',
                  transform: 'rotate(-2deg)',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.10)',
                }}
              >
                <div style={{ color: '#FF7D00', fontWeight: 700, fontSize: '0.9rem', marginBottom: '8px' }}>
                  🔥 12 days streak
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '16px' }}>
                  Morning Run
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle size={22} color="#06D6A0" />
                  <span style={{ color: '#06D6A0', fontWeight: 600, fontSize: '0.95rem' }}>Completed today</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" style={{ background: '#fff', padding: '80px 0' }}>
        <div className="container">
          <h2 className="text-center mb-2" style={{ fontWeight: 800, fontSize: '2rem', color: '#1a1a1a' }}>
            Everything You Need To Stay Consistent
          </h2>
          <p className="text-center mb-5" style={{ color: '#6b7280' }}>
            Simple tools that build lasting habits.
          </p>
          <div className="row g-4">
            {FEATURES.map(({ Icon, color, title, desc }) => (
              <div className="col-md-4" key={title}>
                <div
                  className="card-hover"
                  style={{
                    background: '#fff',
                    border: '1px solid #f0f0f0',
                    borderRadius: '12px',
                    padding: '32px',
                    height: '100%',
                  }}
                >
                  <Icon size={40} color={color} style={{ marginBottom: '20px' }} />
                  <h5 style={{ fontWeight: 700, color: '#1a1a1a', marginBottom: '10px' }}>{title}</h5>
                  <p style={{ color: '#6b7280', marginBottom: 0 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: '#fafafa', padding: '80px 0' }}>
        <div className="container">
          <h2 className="text-center mb-2" style={{ fontWeight: 800, fontSize: '2rem', color: '#1a1a1a' }}>
            How It Works
          </h2>
          <p className="text-center mb-5" style={{ color: '#6b7280' }}>
            Get Started In Minutes
          </p>
          <div className="row g-4 text-center">
            {STEPS.map(({ n, title, desc }) => (
              <div className="col-md-4" key={n}>
                <div style={{ ...gradientText, fontSize: '4rem', fontWeight: 800, lineHeight: 1 }}>{n}</div>
                <h5 style={{ fontWeight: 700, color: '#1a1a1a', marginTop: '16px', marginBottom: '8px' }}>{title}</h5>
                <p style={{ color: '#6b7280', marginBottom: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer style={{ background: '#fff', borderTop: '1px solid #f0f0f0', padding: '32px 0' }}>
        <div className="container text-center">
          <img src={logo} alt="Routina" style={{ height: '28px', marginBottom: '12px' }} />
          <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: 0 }}>
            © 2026 Routina. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}

export default LandingPage;
