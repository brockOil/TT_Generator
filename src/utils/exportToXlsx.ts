import * as XLSX from 'xlsx';
import { TimetableData, SemesterData, TIME_SLOTS, DAYS } from '../types';

export function exportToXlsx(timetable: TimetableData, semesterData: SemesterData) {
  // Create workbook and worksheet
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet([['Time / Day', ...DAYS]]);

  // Add timetable data
  TIME_SLOTS.forEach(slot => {
    const row = [slot];
    DAYS.forEach(day => {
      row.push(timetable[day][slot] || '');
    });
    XLSX.utils.sheet_add_aoa(ws, [row], { origin: -1 });
  });

  // Add metadata
  XLSX.utils.sheet_add_aoa(ws, [
    ['Semester', semesterData.semester],
    ['Room Number', semesterData.roomNumber],
    ['Number of Students', semesterData.numStudents.toString()],
    ['Term Start', semesterData.termStart],
    ['Term End', semesterData.termEnd],
  ], { origin: `A${TIME_SLOTS.length + 3}` });

  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(wb, ws, 'Timetable');

  // Generate xlsx file
  XLSX.writeFile(wb, `${semesterData.semester}_timetable.xlsx`);
}