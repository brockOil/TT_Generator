import React, { useState } from 'react';
import { SemesterData, Subject, DAYS, END_TIME_OPTIONS } from '../types';

interface SemesterFormProps {
  onSubmit: (data: SemesterData) => void;
}

const SemesterForm: React.FC<SemesterFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<SemesterData>({
    subjects: [],
    semester: '',
    termStart: '',
    termEnd: '',
    roomNumber: '',
    numStudents: 0,
    fileLocation: '',
    excelName: '',
    dayEndTimes: DAYS.reduce((acc, day) => ({ ...acc, [day]: '10:50' }), {}),
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDayEndTimeChange = (day: string, time: string) => {
    setFormData(prev => ({
      ...prev,
      dayEndTimes: { ...prev.dayEndTimes, [day]: time },
    }));
  };

  const handleSubjectChange = (index: number, field: keyof Subject, value: string) => {
    const newSubjects = [...formData.subjects];
    newSubjects[index] = { ...newSubjects[index], [field]: value };
    setFormData(prev => ({ ...prev, subjects: newSubjects }));
  };

  const addSubject = () => {
    setFormData(prev => ({
      ...prev,
      subjects: [...prev.subjects, { name: '', teacher: '', credits: '' }],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="semester"
          placeholder="Semester"
          value={formData.semester}
          onChange={handleInputChange}
          required
          className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="text"
          name="termStart"
          placeholder="Term Start (dd/mm/yyyy)"
          value={formData.termStart}
          onChange={handleInputChange}
          required
          className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="text"
          name="termEnd"
          placeholder="Term End (dd/mm/yyyy)"
          value={formData.termEnd}
          onChange={handleInputChange}
          required
          className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="text"
          name="roomNumber"
          placeholder="Room Number"
          value={formData.roomNumber}
          onChange={handleInputChange}
          required
          className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="number"
          name="numStudents"
          placeholder="Number of Students"
          value={formData.numStudents}
          onChange={handleInputChange}
          required
          className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Subjects</h3>
        {formData.subjects.map((subject, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Subject Name"
              value={subject.name}
              onChange={(e) => handleSubjectChange(index, 'name', e.target.value)}
              required
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="text"
              placeholder="Teacher Name"
              value={subject.teacher}
              onChange={(e) => handleSubjectChange(index, 'teacher', e.target.value)}
              required
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="text"
              placeholder="Credits (theory:tutorial:practical)"
              value={subject.credits}
              onChange={(e) => handleSubjectChange(index, 'credits', e.target.value)}
              required
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        ))}
        <button 
          type="button" 
          onClick={addSubject}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-300"
        >
          Add Subject
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {DAYS.map(day => (
          <div key={day}>
            <label className="block text-sm font-medium text-gray-700">{day}:</label>
            <select
              value={formData.dayEndTimes[day]}
              onChange={(e) => handleDayEndTimeChange(day, e.target.value)}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            >
              {END_TIME_OPTIONS.map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="fileLocation"
          placeholder="File Location"
          value={formData.fileLocation}
          onChange={handleInputChange}
          required
          className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="text"
          name="excelName"
          placeholder="Excel File Name"
          value={formData.excelName}
          onChange={handleInputChange}
          required
          className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      <button 
        type="submit"
        className="w-full px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors duration-300"
      >
        Generate Timetable
      </button>
    </form>
  );
};

export default SemesterForm;

