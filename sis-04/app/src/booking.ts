
import type { Interval, Room } from './rooms';

export type BookingRequest = {
  start: number;
  end: number;
  now: number;
  blocked: boolean;
  bookings: readonly Interval[];
};

export type RoomCheckRequest = {
  start: number;
  end: number;
  now: number;
};

export function canBook({
  start,
  end,
  now,
  blocked,
  bookings,
}: BookingRequest): boolean {
  if (![start, end, now].every(Number.isFinite)) {
    return false;
  }

  if (
    start < 0 ||
    now < 0 ||
    now > 1440 ||
    end > 1440 ||
    start >= end ||
    start <= now
  ) {
    return false;
  }

  if (end - start > 120) {
    return false;
  }

  if (blocked) {
    return false;
  }

  return !bookings.some(
    booking => start < booking.end && end > booking.start
  );
}

export function checkRoom(
  rooms: readonly Room[],
  roomId: string,
  request: RoomCheckRequest
): boolean {
  const room = rooms.find(room => room.id === roomId);

  if (!room) {
    return false;
  }

  return canBook({
    ...request,
    blocked: room.blocked,
    bookings: room.bookings,
  });
}
