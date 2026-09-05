import React from 'react';
import { Clock } from 'lucide-react';
import { massTimes } from '../../data/massTimes';
import './MassScheduleSection.css';

const ScheduleRow = ({ day, time, note }) => (
  <li className="mass-schedule__row">
    <span className="mass-schedule__day">{day}</span>
    <span className="mass-schedule__time">{time}</span>
    {note && <span className="mass-schedule__note">{note}</span>}
  </li>
);

const MassScheduleSection = () => {
  const weekdaySchedule = massTimes.weekday.map((item) => ({
    day: item.day,
    time: item.time,
    note: item.note
  }));

  return (
    <section className="mass-schedule section section--cream" aria-label="Mass and Worship Schedule">
      <div className="container mass-schedule__container">
        <div className="section-heading">
          <h2 className="section-heading__title">Mass Timings</h2>
          <p className="section-heading__subtitle">All Masses are celebrated in Konkani</p>
        </div>

        <div className="mass-schedule__card">
          <div className="mass-schedule__card-header">
            <Clock size={19} aria-hidden="true" />
            <span>Weekly Schedule</span>
          </div>

          <ul className="mass-schedule__list">
            {weekdaySchedule.map((item) => (
              <ScheduleRow key={item.day} {...item} />
            ))}
            <ScheduleRow
              day="Sunday"
              time={massTimes.sunday[0].time}
              note={massTimes.sunday[0].note}
            />
          </ul>

          <div className="mass-schedule__special-notes">
            {massTimes.special.map((item) => (
              <p key={item.occasion}>
                <strong>{item.occasion}:</strong> {item.time} — {item.note}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MassScheduleSection;
