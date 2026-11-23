
import { describe, expect, test } from 'vitest';
import { canBook } from './booking';

const base = {
  start: 660,
  end: 720,
  now: 540,
  blocked: false,
  bookings: [] as { start: number; end: number }[],
};

describe('Booking availability — AC and boundaries', () => {
  test('AC1: invalid time interval is rejected', () => {
    expect(canBook({ ...base, start: 720, end: 660 })).toBe(false);
    expect(canBook({ ...base, start: NaN })).toBe(false);
  });

  test('AC2 B1: exactly 120 minutes is allowed', () => {
    expect(canBook({ ...base, end: 780 })).toBe(true);
  });

  test('AC2 B2: 121 minutes is rejected', () => {
    expect(canBook({ ...base, end: 781 })).toBe(false);
  });

  test('AC3: blocked room is unavailable', () => {
    expect(canBook({ ...base, blocked: true })).toBe(false);
  });

  test('AC4 B3: touching an existing booking is allowed', () => {
    expect(
      canBook({
        ...base,
        bookings: [{ start: 600, end: 660 }],
      })
    ).toBe(true);
  });

  test('AC4 B4: overlapping an existing booking is rejected', () => {
    expect(
      canBook({
        ...base,
        start: 630,
        bookings: [{ start: 600, end: 660 }],
      })
    ).toBe(false);
  });

  test('AC5: existing booking data is not mutated', () => {
    const bookings = Object.freeze([
      Object.freeze({ start: 600, end: 660 }),
    ]);

    const snapshot = JSON.stringify(bookings);

    canBook({ ...base, bookings });

    expect(JSON.stringify(bookings)).toBe(snapshot);
  });
});
