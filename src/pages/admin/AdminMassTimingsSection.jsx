import React, { useEffect, useState } from 'react';
import { Clock, Plus, Save, Trash2 } from 'lucide-react';
import { useParishData } from '../../context/ParishContext';

const emptySunday = { time: '', language: '', note: '' };
const emptyWeekday = { day: '', time: '', language: '', note: '' };
const emptySpecial = { occasion: '', time: '', note: '' };

const AdminMassTimingsSection = () => {
  const { massTimes, updateMassTimes } = useParishData();
  const [draft, setDraft] = useState(massTimes);
  const [saved, setSaved] = useState(false);

  useEffect(() => setDraft(massTimes), [massTimes]);

  const updateRow = (section, index, field, value) => {
    setDraft((current) => ({
      ...current,
      [section]: current[section].map((row, rowIndex) => (
        rowIndex === index ? { ...row, [field]: value } : row
      )),
    }));
  };

  const addRow = (section, emptyRow) => {
    setDraft((current) => ({ ...current, [section]: [...current[section], { ...emptyRow }] }));
  };

  const removeRow = (section, index) => {
    setDraft((current) => ({
      ...current,
      [section]: current[section].filter((_, rowIndex) => rowIndex !== index),
    }));
  };

  const handleSave = (event) => {
    event.preventDefault();
    updateMassTimes(draft);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  };

  const input = (value, onChange, placeholder) => (
    <input
      className="admin-form-control"
      value={value || ''}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
    />
  );

  return (
    <form onSubmit={handleSave}>
      {saved && <div className="admin-alert admin-alert--success">Mass timings saved successfully.</div>}

      <div className="admin-card">
        <div className="admin-card__header">
          <h2 className="admin-card__title"><Clock size={20} /> Mass Timings</h2>
          <p className="admin-card__subtitle">Update the schedule shown on the homepage and Mass Timings page.</p>
        </div>

        <h3 className="admin-card__title" style={{ fontSize: '1.1rem', marginTop: '1.5rem' }}>Sunday Masses</h3>
        {draft.sunday.map((row, index) => (
          <div key={`sunday-${index}`} className="admin-form-grid" style={{ alignItems: 'end', marginBottom: '0.75rem' }}>
            <div><label>Time</label>{input(row.time, (value) => updateRow('sunday', index, 'time', value), 'e.g. 7:30 AM')}</div>
            <div><label>Language</label>{input(row.language, (value) => updateRow('sunday', index, 'language', value), 'e.g. Konkani')}</div>
            <div><label>Note</label>{input(row.note, (value) => updateRow('sunday', index, 'note', value), 'Optional note')}</div>
            <button type="button" className="admin-btn admin-btn--danger" onClick={() => removeRow('sunday', index)} aria-label="Remove Sunday Mass"><Trash2 size={15} /></button>
          </div>
        ))}
        <button type="button" className="admin-btn admin-btn--secondary" onClick={() => addRow('sunday', emptySunday)}><Plus size={15} /> Add Sunday Mass</button>

        <h3 className="admin-card__title" style={{ fontSize: '1.1rem', marginTop: '2rem' }}>Weekday Schedule</h3>
        {draft.weekday.map((row, index) => (
          <div key={`weekday-${index}`} className="admin-form-grid" style={{ alignItems: 'end', marginBottom: '0.75rem' }}>
            <div><label>Day</label>{input(row.day, (value) => updateRow('weekday', index, 'day', value), 'e.g. Monday')}</div>
            <div><label>Time</label>{input(row.time, (value) => updateRow('weekday', index, 'time', value), 'e.g. 6:30 AM')}</div>
            <div><label>Language</label>{input(row.language, (value) => updateRow('weekday', index, 'language', value), 'e.g. Konkani')}</div>
            <div><label>Note</label>{input(row.note, (value) => updateRow('weekday', index, 'note', value), 'Optional note')}</div>
            <button type="button" className="admin-btn admin-btn--danger" onClick={() => removeRow('weekday', index)} aria-label="Remove weekday Mass"><Trash2 size={15} /></button>
          </div>
        ))}
        <button type="button" className="admin-btn admin-btn--secondary" onClick={() => addRow('weekday', emptyWeekday)}><Plus size={15} /> Add Weekday</button>

        <h3 className="admin-card__title" style={{ fontSize: '1.1rem', marginTop: '2rem' }}>Special Services</h3>
        {draft.special.map((row, index) => (
          <div key={`special-${index}`} className="admin-form-grid" style={{ alignItems: 'end', marginBottom: '0.75rem' }}>
            <div><label>Occasion</label>{input(row.occasion, (value) => updateRow('special', index, 'occasion', value), 'e.g. First Friday')}</div>
            <div><label>Time</label>{input(row.time, (value) => updateRow('special', index, 'time', value), 'e.g. 5:00 PM')}</div>
            <div><label>Note</label>{input(row.note, (value) => updateRow('special', index, 'note', value), 'Optional note')}</div>
            <button type="button" className="admin-btn admin-btn--danger" onClick={() => removeRow('special', index)} aria-label="Remove special service"><Trash2 size={15} /></button>
          </div>
        ))}
        <button type="button" className="admin-btn admin-btn--secondary" onClick={() => addRow('special', emptySpecial)}><Plus size={15} /> Add Special Service</button>

        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" className="admin-btn admin-btn--primary"><Save size={15} /> Save Mass Timings</button>
        </div>
      </div>
    </form>
  );
};

export default AdminMassTimingsSection;
