
import { useState } from 'react';
import { ROOMS } from './rooms';
import { filterRooms } from './filter';
import { checkRoom } from './booking';

const EQUIPMENT = [
  'Projector',
  'Whiteboard',
  'Computers',
  'Microphone',
];

function toMinutes(value: string): number {
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(value)) {
    return NaN;
  }

  const [hours, minutes] = value.split(':').map(Number);
  return hours * 60 + minutes;
}

function formatTime(minutes: number): string {
  const hours = String(Math.floor(minutes / 60)).padStart(2, '0');
  const mins = String(minutes % 60).padStart(2, '0');
  return `${hours}:${mins}`;
}

export default function App() {
  const [roomId, setRoomId] = useState('a101');
  const [attendees, setAttendees] = useState(1);
  const [equipment, setEquipment] = useState<string[]>([]);
  const [now, setNow] = useState('09:00');
  const [start, setStart] = useState('11:00');
  const [end, setEnd] = useState('12:00');
  const [endOfDay, setEndOfDay] = useState(false);
  const [result, setResult] = useState<boolean | null>(null);
  const [error, setError] = useState('');

  const filteredRooms = filterRooms(ROOMS, {
    attendees,
    equipment,
  });

  const selectedRoom =
    filteredRooms.find(room => room.id === roomId) ??
    filteredRooms[0];

  function resetResult() {
    setResult(null);
    setError('');
  }

  function toggleEquipment(item: string) {
    setEquipment(previous =>
      previous.includes(item)
        ? previous.filter(value => value !== item)
        : [...previous, item]
    );
    resetResult();
  }

  function check() {
    resetResult();

    if (!selectedRoom) {
      setError('No rooms match your filters.');
      return;
    }

    if (!now || !start || (!end && !endOfDay)) {
      setError('Please fill in all required time fields.');
      return;
    }

    const n = toMinutes(now);
    const s = toMinutes(start);
    const e = endOfDay ? 1440 : toMinutes(end);

    if (![n, s, e].every(Number.isFinite)) {
      setError('Please enter valid times.');
      return;
    }

    const available = checkRoom(
      ROOMS,
      selectedRoom.id,
      { start: s, end: e, now: n }
    );

    setResult(available);
  }

  return (
    <main className="page">
      <h1>Smart Campus Room Availability</h1>
      <p>Find and check available campus rooms.</p>

      <h2>Room filters</h2>

      <div className="row">
        <label>
          Number of attendees
          <input
            type="number"
            min="1"
            value={attendees}
            onChange={event => {
              setAttendees(Number(event.target.value));
              resetResult();
            }}
          />
        </label>
      </div>

      <fieldset>
        <legend>Required equipment</legend>
        <div className="row">
          {EQUIPMENT.map(item => (
            <label className="inline" key={item}>
              <input
                type="checkbox"
                checked={equipment.includes(item)}
                onChange={() => toggleEquipment(item)}
              />
              {item}
            </label>
          ))}
        </div>
      </fieldset>

      <h2>Matching rooms</h2>

      {filteredRooms.length === 0 ? (
        <p className="error" role="status">
          No rooms match your filters.
          Try changing capacity or equipment.
        </p>
      ) : (
        <>
          <div className="row">
            <label>
              Select room
              <select
                value={selectedRoom.id}
                onChange={event => {
                  setRoomId(event.target.value);
                  resetResult();
                }}
              >
                {filteredRooms.map(room => (
                  <option key={room.id} value={room.id}>
                    {room.name} — {room.capacity} seats
                    {room.blocked ? ' (Blocked)' : ''}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <p>
            Capacity: {selectedRoom.capacity}
          </p>
          <p>
            Equipment: {selectedRoom.equipment.join(', ')}
          </p>
          <p>
            Status: {selectedRoom.blocked ? 'Blocked' : 'Active'}
          </p>

          <h2>Check availability</h2>

          <div className="row">
            <label>
              Current time
              <input
                type="time"
                value={now}
                onChange={event => {
                  setNow(event.target.value);
                  resetResult();
                }}
              />
            </label>

            <label>
              Start
              <input
                type="time"
                value={start}
                onChange={event => {
                  setStart(event.target.value);
                  resetResult();
                }}
              />
            </label>

            <label>
              End
              <input
                type="time"
                value={end}
                disabled={endOfDay}
                onChange={event => {
                  setEnd(event.target.value);
                  resetResult();
                }}
              />
            </label>

            <label className="inline">
              <input
                type="checkbox"
                checked={endOfDay}
                onChange={event => {
                  setEndOfDay(event.target.checked);
                  resetResult();
                }}
              />
              Ends at 24:00
            </label>
          </div>

          <button onClick={check}>
            Check availability
          </button>

          {error && (
            <p className="error" role="alert">{error}</p>
          )}

          {result !== null && (
            <p
              role="status"
              className={`result ${
                result ? 'available' : 'unavailable'
              }`}
            >
              {result ? 'Available' : 'Unavailable'}
            </p>
          )}

          <h2>Existing bookings</h2>

          <ul>
            {selectedRoom.bookings.length > 0 ? (
              selectedRoom.bookings.map((booking, index) => (
                <li key={index}>
                  {formatTime(booking.start)}–
                  {formatTime(booking.end)}
                </li>
              ))
            ) : (
              <li>None</li>
            )}
          </ul>
        </>
      )}
    </main>
  );
}
