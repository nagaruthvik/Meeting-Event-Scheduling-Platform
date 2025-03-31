import React from "react";
import { Navigate } from "react-big-calendar";
export default function CustomToolbar({ 
  label, 
  onNavigate, 
  onView, 
  view, 
  searchTerm, 
  onSearchChange 
}) {
  return (
    <div className="rbc-toolbar" style={{ 
      display: 'flex', 
      flexDirection: 'column',
      gap: '10px',
      padding: '10px 0'
    }}>
      <span className="rbc-toolbar-label" style={{ fontSize: "18px", fontWeight: "bold" }}>
        {label}
      </span>
      <div style={{ 
        display: 'flex', 
        width :"100%",
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '5vh' 
      }}>
        <span className="rbc-btn-group" style={{ display: 'flex', gap: '10px' }}>
          <button type="button" onClick={() => onNavigate(Navigate.PREVIOUS)}>&lt;</button>
          <button type="button" onClick={() => onNavigate(Navigate.TODAY)}>Today</button>
          <button type="button" onClick={() => onNavigate(Navigate.NEXT)}>&gt;</button>
        </span>

        <span className="rbc-btn-group" style={{ margin: '0 auto' }}>
          <button type="button" className={view === 'day' ? 'rbc-active' : ''} onClick={() => onView('day')}>Day</button>
          <button type="button" className={view === 'week' ? 'rbc-active' : ''} onClick={() => onView('week')}>Week</button>
          <button type="button" className={view === 'month' ? 'rbc-active' : ''} onClick={() => onView('month')}>Month</button>
          <button type="button" className={view === 'year' ? 'rbc-active' : ''} onClick={() => onView('year')}>Year</button>
        </span>

        <div style={{ width: '200px' }}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={onSearchChange}
            style={{
              padding: '6px 12px',
              width: '100%',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
        </div>
      </div>
    </div>
  );
}
