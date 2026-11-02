export const DAY_END = 1440;
export const MAX_DURATION = 120;
export const NOW_MINUTES = 540;
export const ROOM_NAME = 'Room A101';

export interface Booking {
  id: string;
  start: number;
  end: number;
  label: string;
}

export interface BookingRequest {
  start: number;
  end: number;
}

export type AvailabilityResult =
  | { status: 'available' }
  | { status: 'blocked' }
  | { status: 'conflict'; booking: Booking };

export const SAMPLE_BOOKINGS: Booking[] = [
  { id: 'sample-1', start: 600, end: 660, label: 'Existing booking (fictional)' },
];

export const TIME_OPTIONS = Array.from({ length: DAY_END / 15 + 1 }, (_, i) => i * 15);
export const START_OPTIONS = TIME_OPTIONS.filter((t) => t < DAY_END);
export const END_OPTIONS = TIME_OPTIONS.filter((t) => t > 0);

export function formatMinutes(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
}

export function validateRequest(request: BookingRequest, now: number): string | null {
  const { start, end } = request;
  const isWholeMinute = Number.isInteger(start) && Number.isInteger(end);
  if (!isWholeMinute || start < 0 || end > DAY_END) {
    return 'Times must be whole minutes between 00:00 and 24:00.';
  }
  if (start >= end) {
    return 'End time must be after the start time.';
  }
  if (start <= now) {
    return `Start time must be later than the current time (${formatMinutes(now)}).`;
  }
  if (end - start > MAX_DURATION) {
    return `A booking can be at most ${MAX_DURATION} minutes long.`;
  }
  return null;
}

export function checkAvailability(
  request: BookingRequest,
  blocked: boolean,
  bookings: Booking[],
): AvailabilityResult {
  if (blocked) {
    return { status: 'blocked' };
  }
  const conflict = bookings.find((b) => request.start < b.end && request.end > b.start);
  if (conflict) {
    return { status: 'conflict', booking: conflict };
  }
  return { status: 'available' };
}
