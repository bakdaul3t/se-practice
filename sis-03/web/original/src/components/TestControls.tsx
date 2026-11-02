import { useState, type FormEvent } from 'react';
import { Plus, RotateCcw, Trash2 } from 'lucide-react';
import {
  DAY_END,
  END_OPTIONS,
  formatMinutes,
  ROOM_NAME,
  START_OPTIONS,
  type Booking,
  type BookingRequest,
} from '@/lib/availability';

interface TestControlsProps {
  blocked: boolean;
  bookings: Booking[];
  onBlockedChange: (blocked: boolean) => void;
  onAddBooking: (request: BookingRequest) => void;
  onRemoveBooking: (id: string) => void;
  onReset: () => void;
}

const selectClass =
  'w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm transition focus:border-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-600/20';

export default function TestControls({
  blocked,
  bookings,
  onBlockedChange,
  onAddBooking,
  onRemoveBooking,
  onReset,
}: TestControlsProps) {
  const [startValue, setStartValue] = useState('900');
  const [endValue, setEndValue] = useState('960');
  const [error, setError] = useState<string | null>(null);

  function handleAdd(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const start = Number(startValue);
    const end = Number(endValue);
    if (start >= end || end > DAY_END) {
      setError('End time must be after the start time.');
      return;
    }
    setError(null);
    onAddBooking({ start, end });
  }

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Testing tools</h2>
          <p className="mt-1 text-sm text-slate-600">
            Demo data only. Nothing here creates a real reservation.
          </p>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-semibold text-teal-700 transition hover:bg-teal-50 focus:outline-none focus:ring-4 focus:ring-teal-600/20"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Reset
        </button>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4 rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
        <div>
          <p id="blocked-label" className="text-sm font-semibold text-slate-900">
            {ROOM_NAME} is blocked
          </p>
          <p className="text-sm text-slate-600">Blocked rooms always show Unavailable.</p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={blocked}
          aria-labelledby="blocked-label"
          onClick={() => onBlockedChange(!blocked)}
          className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition focus:outline-none focus:ring-4 focus:ring-teal-600/20 ${
            blocked ? 'bg-rose-600' : 'bg-slate-300'
          }`}
        >
          <span
            className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
              blocked ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-semibold text-slate-900">Bookings</h3>
        {bookings.length === 0 ? (
          <p className="mt-2 text-sm text-slate-600">No bookings. The room is free all day.</p>
        ) : (
          <ul className="mt-2 divide-y divide-slate-200 rounded-xl ring-1 ring-slate-200">
            {bookings.map((booking) => (
              <li key={booking.id} className="flex items-center justify-between gap-3 px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {formatMinutes(booking.start)} to {formatMinutes(booking.end)}
                  </p>
                  <p className="text-xs text-slate-600">{booking.label}</p>
                </div>
                <button
                  type="button"
                  onClick={() => onRemoveBooking(booking.id)}
                  aria-label={`Remove booking ${formatMinutes(booking.start)} to ${formatMinutes(booking.end)}`}
                  className="rounded-lg p-2 text-slate-500 transition hover:bg-rose-50 hover:text-rose-700 focus:outline-none focus:ring-4 focus:ring-rose-600/20"
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <form onSubmit={handleAdd} noValidate className="mt-6">
        <h3 className="text-sm font-semibold text-slate-900">Add a test booking</h3>
        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="sr-only">Test booking start time</span>
            <select value={startValue} onChange={(e) => setStartValue(e.target.value)} className={selectClass}>
              {START_OPTIONS.map((minutes) => (
                <option key={minutes} value={minutes}>
                  {formatMinutes(minutes)}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="sr-only">Test booking end time</span>
            <select value={endValue} onChange={(e) => setEndValue(e.target.value)} className={selectClass}>
              {END_OPTIONS.map((minutes) => (
                <option key={minutes} value={minutes}>
                  {formatMinutes(minutes)}
                </option>
              ))}
            </select>
          </label>
        </div>
        {error && (
          <p role="alert" className="mt-2 text-sm font-medium text-rose-700">
            {error}
          </p>
        )}
        <button
          type="submit"
          className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-teal-700 px-4 py-2.5 text-sm font-semibold text-teal-700 transition hover:bg-teal-50 focus:outline-none focus:ring-4 focus:ring-teal-600/20"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Add test booking
        </button>
      </form>
    </section>
  );
}
