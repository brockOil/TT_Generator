import React from 'react';
import { TimetableData, SemesterData, TIME_SLOTS, DAYS } from '../types';
import { exportToXlsx } from '../utils/exportToXlsx';

interface TimetableProps {
  timetable: TimetableData;
  semesterData: SemesterData;
}

const Timetable: React.FC<TimetableProps> = ({ timetable, semesterData }) => {
  const handleExport = () => {
    exportToXlsx(timetable, semesterData);
  };

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Timetable for {semesterData.semester}</h2>
      <button 
        onClick={handleExport}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-300"
      >
        Export to Excel
      </button>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Time / Day</th>
            {DAYS.map(day => (
              <th key={day} className="border px-4 py-2">{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TIME_SLOTS.map((slot, index) => (
            <tr key={slot} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
              <td className="border px-4 py-2 font-medium">{slot}</td>
              {DAYS.map(day => (
                <td key={`${day}-${slot}`} className="border px-4 py-2">
                  {timetable[day][slot] ? (
                    <div className="text-sm">
                      {timetable[day][slot].split('\n').map((line, i) => (
                        <div key={i} className="mb-1">{line}</div>
                      ))}
                    </div>
                  ) : '-'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Timetable;

