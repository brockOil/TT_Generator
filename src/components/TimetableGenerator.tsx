import React, { useState } from 'react';
import { SemesterData, TimetableData, TIME_SLOTS, DAYS, PRACTICAL_SLOTS } from '../types';
import { shuffleArray, isSlotAvailable } from './utils'; // Adjust the import according to your project structure

interface TimetableGeneratorProps {
  semesterData: SemesterData;
  allSemesterData: SemesterData[];
  onGenerate: (timetable: TimetableData) => void;
}

interface Subject {
  name: string;
  teacher: string;
  numClasses: number;
}

interface TeacherSchedules {
  [teacher: string]: {
    [day: string]: string[];
  };
}

interface DayEndTimes {
  [day: string]: string;
}

const TimetableGenerator: React.FC<TimetableGeneratorProps> = ({ semesterData, allSemesterData, onGenerate }) => {
  const [generating, setGenerating] = useState(false);

  const generateTimetable = () => {
    setGenerating(true);
    setTimeout(() => {
      const timetable = createTimetable(semesterData, allSemesterData);
      setGenerating(false);
      onGenerate(timetable);
    }, 2000); // Simulate a 2-second generation process
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Generate Timetable for {semesterData.semester}</h2>
      <button 
        onClick={generateTimetable} 
        disabled={generating}
        className={`px-6 py-3 text-white rounded-lg transition-all duration-300 transform hover:scale-105 ${
          generating ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {generating ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </span>
        ) : (
          'Generate Timetable'
        )}
      </button>
    </div>
  );
};

function createTimetable(semesterData: SemesterData, allSemesterData: SemesterData[]): TimetableData {
  const timetable: TimetableData = {};
  const teacherSchedules: TeacherSchedules = {};
  const dayEndTimes: DayEndTimes = {};

  // Example logic to use semesterData and allSemesterData
  semesterData.subjects.forEach(subject => {
    const numClasses = subject.numClasses;
    scheduleTutorial(subject, numClasses, timetable, teacherSchedules, dayEndTimes);
  });

  // Example logic to handle practical slots
  PRACTICAL_SLOTS.forEach(slot => {
    // Implement logic to schedule practical slots
    allSemesterData.forEach(semester => {
      semester.subjects.forEach(subject => {
        if (subject.numClasses > 0) {
          // Example logic to schedule practical slots
          const day = DAYS[Math.floor(Math.random() * DAYS.length)];
          if (!timetable[day]) {
            timetable[day] = {};
          }
          timetable[day][slot] = `${subject.name} (Practical) - ${subject.teacher}`;
        }
      });
    });
  });

  return timetable;
}

function scheduleTutorial(
  subject: Subject,
  numClasses: number,
  timetable: TimetableData,
  teacherSchedules: TeacherSchedules,
  dayEndTimes: DayEndTimes
) {
  const days = [...DAYS];
  shuffleArray(days);
  let classesScheduled = 0;

  while (classesScheduled < numClasses) {
    for (const day of days) {
      if (classesScheduled >= numClasses) break;

      const endTime = new Date(`1970-01-01T${dayEndTimes[day]}:00`);
      const availableSlots = TIME_SLOTS.slice(0, -1).filter(slot => {
        const slotEnd = new Date(`1970-01-01T${TIME_SLOTS[TIME_SLOTS.indexOf(slot) + 1].split('-')[1]}:00`);
        return slotEnd <= endTime;
      });
      shuffleArray(availableSlots);

      for (const slot of availableSlots) {
        if (classesScheduled >= numClasses) break;

        const nextSlot = TIME_SLOTS[TIME_SLOTS.indexOf(slot) + 1];
        const startTime = slot.split('-')[0];

        if (startTime === '9:55' || startTime === '12:00') continue;

        if (isSlotAvailable(day, slot, subject.teacher, timetable, teacherSchedules) &&
            isSlotAvailable(day, nextSlot, subject.teacher, timetable, teacherSchedules)) {
          
          timetable[day][slot] = `${subject.name} (Tutorial) - ${subject.teacher}`;
          timetable[day][nextSlot] = `${subject.name} (Tutorial) - ${subject.teacher}`;

          if (!teacherSchedules[subject.teacher]) {
            teacherSchedules[subject.teacher] = {};
          }
          if (!teacherSchedules[subject.teacher][day]) {
            teacherSchedules[subject.teacher][day] = [];
          }
          teacherSchedules[subject.teacher][day].push(slot, nextSlot);
          classesScheduled++;
          break;
        }
      }
    }
  }
}

export default TimetableGenerator;