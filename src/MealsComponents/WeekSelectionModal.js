"use client";
import { useState } from "react";

const weeks = ["Week 1", "Week 2", "Week 3", "Week 4"];

const WeekSelectionModal = ({ onSave }) => {
  const [selectedWeek, setSelectedWeek] = useState("Week 1");

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">Select Week</h2>

        <div className="week-buttons">
          {weeks.map((week) => (
            <button
              key={week}
              className={`week-button ${selectedWeek === week ? "active" : ""}`}
              onClick={() => setSelectedWeek(week)}
            >
              {week}
            </button>
          ))}
        </div>

        <button className="save-button" onClick={() => onSave(selectedWeek)}>
          Save
        </button>
      </div>
    </div>
  );
};

export default WeekSelectionModal;
