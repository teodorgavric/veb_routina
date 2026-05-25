import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import * as Icons from 'lucide-react';
import { CATEGORIES, CATEGORY_ICONS, HABIT_COLORS } from '../../utils/mockData';

function QuickAddModal({ show, onHide, onAdd }) {
  const [name, setName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Health');

  const handleAdd = () => {
    if (!name.trim()) return;
    const newHabit = {
      _id: Date.now().toString(),
      name: name.trim(),
      category: selectedCategory,
      icon: CATEGORY_ICONS[selectedCategory],
      color: HABIT_COLORS[Math.floor(Math.random() * HABIT_COLORS.length)],
      currentStreak: 0,
      longestStreak: 0,
      successRate: 0,
      targetDays: null,
      createdAt: new Date().toISOString().split('T')[0],
    };
    onAdd(newHabit);
    setName('');
    setSelectedCategory('Health');
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton style={{ border: 'none', paddingBottom: 0 }}>
        <Modal.Title style={{ fontWeight: 600, fontSize: '1.1rem', color: '#1a1a1a' }}>
          Quick Add Habit
        </Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ padding: '20px 24px' }}>
        <div className="mb-4">
          <label className="form-label" style={{ fontWeight: 600, color: '#1a1a1a', fontSize: '0.9rem' }}>
            Habit name
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g. Morning Run"
            value={name}
            onChange={e => setName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAdd()}
            style={{ borderRadius: '8px', padding: '10px 14px', borderColor: '#f0f0f0' }}
            autoFocus
          />
        </div>

        <div>
          <label className="form-label" style={{ fontWeight: 600, color: '#1a1a1a', fontSize: '0.9rem' }}>
            Category
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {CATEGORIES.map(cat => {
              const CatIcon = Icons[CATEGORY_ICONS[cat]] || Icons.Star;
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    border: active ? '1px solid #FF3381' : '1px solid #f0f0f0',
                    background: active ? '#FF3381' : '#fff',
                    color: active ? '#fff' : '#6b7280',
                    fontSize: '0.82rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  <CatIcon size={13} />
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer style={{ border: 'none', padding: '8px 24px 20px', justifyContent: 'center' }}>
        <button className="btn-outline-brand" style={{ padding: '8px 20px' }} onClick={onHide}>
          Cancel
        </button>
        <button className="btn-brand" style={{ padding: '8px 20px' }} onClick={handleAdd}>
          Add Habit
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default QuickAddModal;