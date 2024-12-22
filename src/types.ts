export interface Subject {
    name: string;
    teacher: string;
    credits: string;
  }
  
  export interface SemesterData {
    subjects: Subject[];
    semester: string;
    termStart: string;
    termEnd: string;
    roomNumber: string;
    numStudents: number;
    fileLocation: string;
    excelName: string;
    dayEndTimes: { [key: string]: string };
  }
  
  export interface TimetableData {
    [day: string]: {
      [slot: string]: string;
    };
  }
  
  export const TIME_SLOTS = [
    '9:00-9:55', '9:55-10:50', '11:05-12:00', '12:00-12:55',
    '13:45-14:40', '14:40-15:35', '15:35-16:30'
  ];
  
  export const THEORY_SLOTS = [
    '9:00-9:55', '10:00-10:50', '11:05-12:00', '12:00-12:55',
    '13:45-14:40', '14:40-15:35', '15:35-16:30'
  ];
  
  export const PRACTICAL_SLOTS = [
    ['9:00-10:50', 2], ['11:05-12:55', 2], ['13:45-15:35', 2], ['14:40-16:30', 2]
  ] as const;
  
  export const BREAKS = [
    ['10:50-11:05', 'Short Break'],
    ['12:55-13:45', 'Lunch Break']
  ] as const;
  
  export const END_TIME_OPTIONS = ['10:50', '12:55', '14:40', '15:35', '16:30'];
  
  export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  