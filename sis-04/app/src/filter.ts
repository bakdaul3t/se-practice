
import type { Room } from './rooms';

export type RoomFilters = {
  attendees: number;
  equipment: readonly string[];
};

export function filterRooms(
  rooms: readonly Room[],
  filters: RoomFilters
): Room[] {
  const { attendees, equipment } = filters;

  if (!Number.isInteger(attendees) || attendees < 1) {
    return [];
  }

  return rooms.filter(room =>
    room.capacity >= attendees &&
    equipment.every(item => room.equipment.includes(item))
  );
}
