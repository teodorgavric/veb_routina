import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';

function OnboardingFlow({ habits, completedToday }) {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(
    localStorage.getItem('routina_onboarding_done') !== 'true'
  );

  const step1Done = habits.length > 0;
  const step2Done = completedToday.length > 0;
  const step3Done = false; //localStorage.getItem('routina_visited_stats') === 'true';

  const doneCount = [step1Done, step2Done, step3Done].filter(Boolean).length;
  const percent = Math.round((doneCount / 3) * 100);
  const allDone = doneCount === 3;

  useEffect(() => {
    if (!allDone) return;
    const t = setTimeout(() => {
      localStorage.setItem('routina_onboarding_done', 'true');
      setVisible(false);
    }, 3000);
    return () => clearTimeout(t);
  }, [allDone]);

  if (!visible) return null;

  const steps = [
    {
      label: 'Create your first habit',
      done: step1Done,
      actionLabel: 'Add habit',
      actionClass: 'btn-brand',
      onAction: () => navigate('/habits/new'),
    },
    {
      label: 'Complete a habit today',
      done: step2Done,
    },
    {
      label: 'Check your progress',
      done: step3Done,
      actionLabel: 'View stats',
      actionClass: 'btn-outline-brand',
      onAction: () => navigate('/stats'),
    },
  ];

  return (
    <div style={{
      background: '#fff',
      border: '1px solid #f0f0f0',
      borderRadius: '12px',
      padding: '24px',
      marginBottom: '32px',
    }}>
      <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '14px', fontSize: '1rem' }}>
        {allDone ? "You're all set! 🎉" : 'Get started with Routina 👋'}
      </div>

      <div style={{ height: '6px', background: '#f0f0f0', borderRadius: '3px', marginBottom: '20px', overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          width: `${percent}%`,
          background: 'var(--gradient)',
          borderRadius: '3px',
          transition: 'width 0.4s ease',
        }} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {steps.map((step, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              flexShrink: 0,
              border: step.done ? 'none' : '2px solid #FF3381',
              background: step.done ? '#FF7D00' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FF3381',
              fontSize: '0.8rem',
              fontWeight: 700,
            }}>
              {step.done ? <Check size={14} color="#fff" strokeWidth={3} /> : i + 1}
            </div>

            <span style={{
              flex: 1,
              color: step.done ? '#6b7280' : '#1a1a1a',
              fontWeight: step.done ? 400 : 600,
              textDecoration: step.done ? 'line-through' : 'none',
              fontSize: '0.92rem',
            }}>
              {step.label}
            </span>

            {!step.done && step.onAction && (
              <button
                className={step.actionClass}
                onClick={step.onAction}
                style={{ padding: '5px 14px', fontSize: '0.82rem', whiteSpace: 'nowrap' }}
              >
                {step.actionLabel}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default OnboardingFlow;