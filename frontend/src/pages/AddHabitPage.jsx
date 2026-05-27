import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { Check, ArrowLeft } from 'lucide-react';
import { mockHabits, HABIT_TEMPLATES, CATEGORIES, CATEGORY_ICONS, HABIT_COLORS } from '../utils/mockData';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const ICON_NAMES = [
  'Flame', 'Zap', 'Star', 'Heart', 'Coffee',
  'BookOpen', 'Music', 'Bike', 'Sunset', 'Moon',
  'Droplets', 'Apple', 'Dumbbell', 'Pen', 'Globe',
  'Code', 'Camera', 'Headphones', 'Leaf', 'Brain',
];

function AddHabitPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [icon, setIcon] = useState('Flame');
  const [color, setColor] = useState(HABIT_COLORS[0]);
  const [targetDays, setTargetDays] = useState('');
  const [reminderTime, setReminderTime] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isEdit) return;
    const habit = mockHabits.find(h => h._id === id);
    if (habit) {
      setName(habit.name);
      setDescription(habit.description || '');
      setCategory(habit.category);
      setIcon(habit.icon);
      setColor(habit.color);
      setTargetDays(habit.targetDays ?? '');
    }
  }, [id, isEdit]);

  const applyTemplate = (tpl) => {
    setName(tpl.name);
    setCategory(tpl.category);
    setIcon(tpl.icon);
    setColor(tpl.color);
    setErrors({});
  };

  const handleSubmit = () => {
    const errs = {};
    if (!name.trim()) errs.name = 'Habit name is required.';
    if (!category) errs.category = 'Please select a category.';
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    navigate('/dashboard');
  };

  const clearError = (key) => setErrors(prev => { const e = { ...prev }; delete e[key]; return e; });

  return (
    <>
    <Navbar />
    <div className="container pt-4 pb-5">
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <button
        onClick={() => navigate('/dashboard')}
        style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', color: '#6b7280', fontSize: '0.9rem', padding: '0', marginBottom: '20px' }}
      >
        <ArrowLeft size={16} />
        Back to Dashboard
      </button>
      <h4 style={{ fontWeight: 700, color: '#1a1a1a', marginBottom: '28px' }}>
        {isEdit ? 'Edit Habit' : 'Add New Habit'}
      </h4>

      {!isEdit && (
        <div style={{ marginBottom: '36px' }}>
          <div style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>
            Start from a template
          </div>
          <div className="row g-3">
            {HABIT_TEMPLATES.map(tpl => {
              const TplIcon = Icons[tpl.icon] || Icons.Star;
              return (
                <div className="col-6 col-md-3" key={tpl.name}>
                  <div
                    onClick={() => applyTemplate(tpl)}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = '#FF3381';
                      e.currentTarget.style.boxShadow = '0 2px 12px rgba(255,51,129,0.1)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = '#f0f0f0';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                    style={{
                      border: '1px solid #f0f0f0',
                      borderRadius: '10px',
                      padding: '16px',
                      cursor: 'pointer',
                      transition: 'border-color 0.15s, box-shadow 0.15s',
                    }}
                  >
                    <TplIcon size={24} color={tpl.color} style={{ marginBottom: '8px' }} />
                    <div style={{ fontWeight: 600, color: '#1a1a1a', fontSize: '0.88rem' }}>{tpl.name}</div>
                    <div style={{ color: '#6b7280', fontSize: '0.78rem', marginTop: '2px' }}>{tpl.category}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="mb-4">
        <label className="form-label" style={{ fontWeight: 600, color: '#1a1a1a' }}>
          Habit Name <span style={{ color: '#FF3381' }}>*</span>
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="e.g. Morning Run"
          value={name}
          onChange={e => { setName(e.target.value); clearError('name'); }}
          style={{ borderRadius: '8px', padding: '10px 14px' }}
        />
        {errors.name && <div style={{ color: '#FF3381', fontSize: '0.82rem', marginTop: '4px' }}>{errors.name}</div>}
      </div>

      <div className="mb-4">
        <label className="form-label" style={{ fontWeight: 600, color: '#1a1a1a' }}>
          Description <span style={{ color: '#6b7280', fontWeight: 400 }}>(optional)</span>
        </label>
        <textarea
          className="form-control"
          rows={3}
          placeholder="What's the goal?"
          value={description}
          onChange={e => setDescription(e.target.value)}
          style={{ borderRadius: '8px', padding: '10px 14px', resize: 'none' }}
        />
      </div>

      <div className="mb-4">
        <label className="form-label" style={{ fontWeight: 600, color: '#1a1a1a' }}>
          Category <span style={{ color: '#FF3381' }}>*</span>
        </label>
        <div className="row g-2">
          {CATEGORIES.map(cat => {
            const CatIcon = Icons[CATEGORY_ICONS[cat]] || Icons.Star;
            const active = category === cat;
            return (
              <div className="col-4" key={cat}>
                <div
                  onClick={() => { setCategory(cat); clearError('category'); }}
                  style={{
                    border: active ? '2px solid #FF3381' : '2px solid #f0f0f0',
                    background: active ? '#fff0f5' : '#fff',
                    borderRadius: '10px',
                    padding: '12px 14px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.15s',
                  }}
                >
                  <CatIcon size={22} color={active ? '#FF3381' : '#6b7280'} />
                  <span style={{ fontWeight: 500, color: active ? '#FF3381' : '#6b7280', fontSize: '0.88rem' }}>
                    {cat}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        {errors.category && <div style={{ color: '#FF3381', fontSize: '0.82rem', marginTop: '6px' }}>{errors.category}</div>}
      </div>

      {category && (
        <div className="mb-4">
          <label className="form-label" style={{ fontWeight: 600, color: '#1a1a1a' }}>Icon</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {ICON_NAMES.map(iconName => {
              const IconComp = Icons[iconName] || Icons.Star;
              const active = icon === iconName;
              return (
                <button
                  key={iconName}
                  onClick={() => setIcon(iconName)}
                  title={iconName}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    border: active ? `2px solid ${color}` : '2px solid #f0f0f0',
                    background: active ? color + '15' : '#fff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 0,
                    transition: 'border-color 0.12s',
                  }}
                >
                  <IconComp size={20} color={active ? color : '#bbb'} />
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="mb-4">
        <label className="form-label" style={{ fontWeight: 600, color: '#1a1a1a' }}>Color</label>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {HABIT_COLORS.map(c => (
            <button
              key={c}
              onClick={() => setColor(c)}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: c,
                border: color === c ? `3px solid ${c}` : '3px solid transparent',
                outline: color === c ? '2px solid #fff' : 'none',
                outlineOffset: '-5px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0,
                transition: 'outline 0.12s',
              }}
            >
              {color === c && <Check size={16} color="#fff" strokeWidth={3} />}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="form-label" style={{ fontWeight: 600, color: '#1a1a1a' }}>
          Target Days <span style={{ color: '#6b7280', fontWeight: 400 }}>(optional)</span>
        </label>
        <input
          type="number"
          className="form-control"
          placeholder="e.g. 30"
          min="1"
          max="365"
          value={targetDays}
          onChange={e => setTargetDays(e.target.value)}
          style={{ borderRadius: '8px', padding: '10px 14px', maxWidth: '180px' }}
        />
        <div style={{ color: '#6b7280', fontSize: '0.8rem', marginTop: '4px' }}>
          We'll notify you when you reach this goal
        </div>
      </div>

      <div className="mb-5">
        <label className="form-label" style={{ fontWeight: 600, color: '#1a1a1a' }}>
          Reminder Time <span style={{ color: '#6b7280', fontWeight: 400 }}>(optional)</span>
        </label>
        <input
          type="time"
          className="form-control"
          value={reminderTime}
          onChange={e => setReminderTime(e.target.value)}
          style={{ borderRadius: '8px', padding: '10px 14px', maxWidth: '180px' }}
        />
        <div style={{ color: '#6b7280', fontSize: '0.8rem', marginTop: '4px' }}>
          Email reminders coming soon
        </div>
      </div>

      <div className="d-flex gap-3">
        <button className="btn-outline-brand" onClick={() => navigate(-1)}>Cancel</button>
        <button className="btn-brand" onClick={handleSubmit}>Save Habit</button>
      </div>
    </div>
    </div>
    <Footer />
    </>
  );
}

export default AddHabitPage;
