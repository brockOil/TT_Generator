import React, { useState } from 'react';

interface Availability {
  [key: string]: {
    [key: string]: boolean;
  };
}

const AvailabilityCheck: React.FC = () => {
  const [roomNumber, setRoomNumber] = useState('');
  const [date, setDate] = useState('');
  const [availability, setAvailability] = useState<Availability | null>(null);

  const checkAvailability = async () => {
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const slots = ['9:00-9:55', '10:00-10:50', '11:05-12:00', '12:00-12:55', '13:45-14:40', '14:40-15:35', '15:35-16:30'];
    
    const mockAvailability: Availability = {
      [date]: {}
    };

    slots.forEach(slot => {
      mockAvailability[date][slot] = Math.random() > 0.3; // 70% chance the room is available
    });

    setAvailability(mockAvailability);
  };

  return (
    <div className="availability-check">
      <h2>Check Room Availability</h2>
      <div className="form-group">
        <label htmlFor="roomNumber">Room Number:</label>
        <input
          type="text"
          id="roomNumber"
          value={roomNumber}
          onChange={(e) => setRoomNumber(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <button onClick={checkAvailability}>Check Availability</button>
      {availability && (
        <div className="availability-results">
          <h3>Availability for Room {roomNumber} on {date}:</h3>
          <table>
            <thead>
              <tr>
                <th>Time Slot</th>
                <th>Availability</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(availability[date]).map(([slot, isAvailable]) => (
                <tr key={slot}>
                  <td>{slot}</td>
                  <td className={isAvailable ? 'available' : 'unavailable'}>
                    {isAvailable ? 'Available' : 'Unavailable'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AvailabilityCheck;

