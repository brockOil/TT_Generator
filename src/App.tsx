import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import './App.css';

interface Subject {
  name: string;
  teacher: string;
  credits: string;
}

interface Timetable {
  [day: string]: {
    [slot: string]: string;
  };
}

const App: React.FC = () => {
  const [semesterData, setSemesterData] = useState({
    semester: '',
    termStart: '',
    termEnd: '',
    roomNumber: '',
    numStudents: '',
    subjects: [{ name: '', teacher: '', credits: '' }],
  });
  const [timetable, setTimetable] = useState<Timetable | null>(null);
  const [isPageScrolled, setIsPageScrolled] = useState(false);

  const timeSlots = [
    '9:00-9:55',
    '10:00-10:50',
    '11:05-12:00',
    '12:00-12:55',
    '13:45-14:40',
    '14:40-15:35',
    '15:35-16:30',
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSemesterData({ ...semesterData, [name]: value });
  };

  const handleSubjectChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const updatedSubjects = [...semesterData.subjects];
    updatedSubjects[index] = { ...updatedSubjects[index], [name]: value };
    setSemesterData({ ...semesterData, subjects: updatedSubjects });
  };

  const addSubject = () => {
    setSemesterData({
      ...semesterData,
      subjects: [...semesterData.subjects, { name: '', teacher: '', credits: '' }],
    });
  };

  const generateTimetable = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const newTimetable: Timetable = {};

    days.forEach((day) => {
      newTimetable[day] = {};
      timeSlots.forEach((slot) => {
        newTimetable[day][slot] = '';
      });
    });

    semesterData.subjects.forEach((subject) => {
      const [theory] = subject.credits.split(':').map(Number);

      for (let i = 0; i < theory; i++) {
        const day = days[Math.floor(Math.random() * days.length)];
        const slot = timeSlots[Math.floor(Math.random() * timeSlots.length)];

        if (!newTimetable[day][slot]) {
          newTimetable[day][slot] = `${subject.name} (Theory) - ${subject.teacher}`;
        }
      }
    });

    setTimetable(newTimetable);
  };

  const exportToExcel = () => {
    if (!timetable) return;

    const worksheet = XLSX.utils.json_to_sheet(
      Object.entries(timetable).flatMap(([day, slots]) =>
        Object.entries(slots).map(([slot, subject]) => ({
          Day: day,
          Time: slot,
          Subject: subject,
        }))
      )
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Timetable');
    XLSX.writeFile(workbook, 'timetable.xlsx');
  };

  const handlePageClick = () => {
    setIsPageScrolled(true);
  };

  return (
    <div className="app">
      {!isPageScrolled ? (
        <div className="opening-screen" onClick={handlePageClick}>
          <h1 className="opening-title">Timetable Generator</h1>
        </div>
      ) : (
        <div className="details-form">
          <label>
            Semester:
            <input
              type="text"
              name="semester"
              value={semesterData.semester}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Term Start:
            <input
              type="date"
              name="termStart"
              value={semesterData.termStart}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Term End:
            <input
              type="date"
              name="termEnd"
              value={semesterData.termEnd}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Room Number:
            <input
              type="text"
              name="roomNumber"
              value={semesterData.roomNumber}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Number of Students:
            <input
              type="number"
              name="numStudents"
              value={semesterData.numStudents}
              onChange={handleInputChange}
            />
          </label>

          <h2>Subjects</h2>
          {semesterData.subjects.map((subject, index) => (
            <div key={index} className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Subject Name"
                value={subject.name}
                onChange={(e) => handleSubjectChange(index, e)}
              />
              <input
                type="text"
                name="teacher"
                placeholder="Teacher Name"
                value={subject.teacher}
                onChange={(e) => handleSubjectChange(index, e)}
              />
              <input
                type="text"
                name="credits"
                placeholder="Credits (theory:tutorial:practical)"
                value={subject.credits}
                onChange={(e) => handleSubjectChange(index, e)}
              />
            </div>
          ))}
          <button onClick={addSubject}>Add Subject</button>
          <button onClick={generateTimetable}>Generate Timetable</button>
          <button onClick={exportToExcel}>Export to Excel</button>
        </div>
      )}

      {timetable && (
        <div className="timetable colorful-border">
          <h2>Generated Timetable</h2>
          <table>
            <thead>
              <tr>
                <th>Day</th>
                {timeSlots.map((slot) => (
                  <th key={slot}>{slot}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.entries(timetable).map(([day, slots]) => (
                <tr key={day}>
                  <td>{day}</td>
                  {timeSlots.map((slot) => (
                    <td key={slot}>{slots[slot] || '-'}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default App;
