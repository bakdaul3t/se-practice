import { useEffect, useState, type FormEvent } from 'react';
import { Ban, CheckCircle2, Clock, DoorOpen, XCircle } from 'lucide-react';
import {
  checkAvailability,
  END_OPTIONS,
  formatMinutes,
  MAX_DURATION,
  NOW_MINUTES,
  ROOM_NAME,
  START_OPTIONS,
  validateRequest,
  type AvailabilityResult,
  type Booking,
} from '@/lib/availability';

interface AvailabilityCheckerProps {
  blocked: boolean;
  bookings: Booking[];
}

const DEFAULT_START = 720;
const DEFAULT_END = 780;

export default function AvailabilityChecker({ blocked, bookings }: AvailabilityCheckerProps) {
  const [startValue, setStartValue] = useState(String(DEFAULT_START));
  const [endValue, setEndValue] = useState(String(DEFAULT_END));
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AvailabilityResult | null>(null);

  useEffect(() => {
    setResult(null);
  }, [blocked, bookings]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const request = { start: Number(startValue), end: Number(endValue) };
    const message = validateRequest(request, NOW_MINUTES);
    if (message) {
      setError(message);
      setResult(null);
      return;
    }
    setError(null);
    setResult(checkAvailability(request, blocked, bookings));
  }

  function clearOutcome() {
    setError(null);
    setResult(null);
  }

  const selectClass =
    'w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 shadow-sm transition focus:border-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-600/20';

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
          <DoorOpen className="h-6 w-6" aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-xl font-semibold text-slate-900">{ROOM_NAME}</h2>
        </div>
      </div>

      <div className="mt-6 rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
        <h3 className="text-sm font-semibold text-slate-900">Booked times today</h3>
        {bookings.length === 0 ? (
          <p className="mt-2 text-sm text-slate-600">No bookings. The room is free all day.</p>
        ) : (
          <ul className="mt-2 space-y-2">
            {bookings.map((booking) => (
              <li key={booking.id} className="flex items-center justify-between gap-3 text-sm">
                <span className="font-semibold text-slate-900">
                  {formatMinutes(booking.start)} to {formatMinutes(booking.end)}
                </span>
                <span className="rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-medium text-rose-800">
                  {booking.label}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
        <p className="flex items-start gap-2 rounded-xl bg-amber-50 px-4 py-3 text-sm font-medium text-amber-900 ring-1 ring-amber-200">
          <Clock className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="min-w-0 break-words">
            Demo current time: {formatMinutes(NOW_MINUTES)} (fixed for testing)
          </span>
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">Start time</span>
            <select
              value={startValue}
              onChange={(e) => {
                setStartValue(e.target.value);
                clearOutcome();
              }}
              className={selectClass}
            >
              {START_OPTIONS.map((minutes) => (
                <option key={minutes} value={minutes}>
                  {formatMinutes(minutes)}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">End time</span>
            <select
              value={endValue}
              onChange={(e) => {
                setEndValue(e.target.value);
                clearOutcome();
              }}
              className={selectClass}
            >
              {END_OPTIONS.map((minutes) => (
                <option key={minutes} value={minutes}>
                  {formatMinutes(minutes)}
                </option>
              ))}
            </select>
          </label>
        </div>
        <p className="text-sm text-slate-600">Bookings can be up to {MAX_DURATION} minutes long.</p>

        {error && (
          <p
            role="alert"
            className="rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700 ring-1 ring-rose-200"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded-xl bg-teal-700 px-5 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-teal-800 focus:outline-none focus:ring-4 focus:ring-teal-600/30 active:scale-[0.99]"
        >
          Check Availability
        </button>
      </form>

      <div role="status" aria-live="polite" className="mt-6">
        {result && <ResultMessage result={result} startValue={startValue} endValue={endValue} />}
      </div>
    </section>
  );
}

interface ResultMessageProps {
  result: AvailabilityResult;
  startValue: string;
  endValue: string;
}

function ResultMessage({ result, startValue, endValue }: ResultMessageProps) {
  const range = `${formatMinutes(Number(startValue))} to ${formatMinutes(Number(endValue))}`;

  if (result.status === 'available') {
    return (
      <div className="flex gap-4 rounded-xl bg-emerald-50 p-5 ring-1 ring-emerald-200">
        <CheckCircle2 className="mt-0.5 h-7 w-7 shrink-0 text-emerald-700" aria-hidden="true" />
        <div>
          <p className="text-lg font-bold text-emerald-800">Available</p>
          <p className="mt-1 text-sm text-emerald-900">
            {ROOM_NAME} is free from {range}.
          </p>
        </div>
      </div>
    );
  }

  if (result.status === 'blocked') {
    return (
      <div className="flex gap-4 rounded-xl bg-rose-50 p-5 ring-1 ring-rose-200">
        <Ban className="mt-0.5 h-7 w-7 shrink-0 text-rose-700" aria-hidden="true" />
        <div>
          <p className="text-lg font-bold text-rose-800">Unavailable</p>
          <p className="mt-1 text-sm text-rose-900">
            {ROOM_NAME} is blocked and cannot be booked right now.
          </p>
        </div>
      </div>
    );
  }

  const { booking } = result;
  return (
    <div className="flex gap-4 rounded-xl bg-rose-50 p-5 ring-1 ring-rose-200">
      <XCircle className="mt-0.5 h-7 w-7 shrink-0 text-rose-700" aria-hidden="true" />
      <div>
        <p className="text-lg font-bold text-rose-800">Unavailable</p>
        <p className="mt-1 text-sm text-rose-900">
          Your time overlaps an existing booking from {formatMinutes(booking.start)} to{' '}
          {formatMinutes(booking.end)} ({booking.label}).
        </p>
      </div>
    </div>
  );
}
