
import { describe, expect, test } from 'vitest';
import { filterRooms } from './filter';
import { checkRoom } from './booking';
import type { Room } from './rooms';

const rooms: readonly Room[] = [
  {
    id: 'r1',
    name: 'Room One',
    capacity: 30,
    equipment: ['Projector', 'Whiteboard'],
    blocked: false,
    bookings: [{ start: 600, end: 660 }],
  },
  {
    id: 'r2',
    name: 'Room Two',
    capacity: 50,
    equipment: ['Projector', 'Computers'],
    blocked: false,
    bookings: [],
  },
  {
    id: 'r3',
    name: 'Room Three',
    capacity: 20,
    equipment: ['Whiteboard'],
    blocked: true,
    bookings: [],
  },
  {
    id: 'r4',
    name: 'Room Four',
    capacity: 100,
    equipment: ['Projector', 'Whiteboard'],
    blocked: false,
    bookings: [],
  },
];

describe('Room filtering and integration', () => {
  test('F1: capacity must be at least attendees', () => {
    const result = filterRooms(rooms, {
      attendees: 40,
      equipment: [],
    });
    expect(result.map(r => r.id)).toEqual(['r2', 'r4']);
  });

  test('F2: room must have ALL selected equipment', () => {
    const result = filterRooms(rooms, {
      attendees: 25,
      equipment: ['Projector', 'Whiteboard'],
    });
    expect(result.map(r => r.id)).toEqual(['r1', 'r4']);
  });

  test('F3: blocked room is never available', () => {
    expect(
      checkRoom(rooms, 'r3', {
        start: 660,
        end: 720,
        now: 540,
      })
    ).toBe(false);
  });

  test('F4: no matching rooms returns empty array', () => {
    const result = filterRooms(rooms, {
      attendees: 150,
      equipment: [],
    });
    expect(result).toEqual([]);
  });

  test('F5: selected room uses its own bookings', () => {
    const request = {
      start: 600,
      end: 660,
      now: 540,
    };

    expect(checkRoom(rooms, 'r1', request)).toBe(false);
    expect(checkRoom(rooms, 'r2', request)).toBe(true);
  });

  test('B5: capacity equal to attendees is included', () => {
    const result = filterRooms(rooms, {
      attendees: 30,
      equipment: [],
    });
    expect(result.map(r => r.id)).toContain('r1');
  });

  test('B6: capacity one below attendees is excluded', () => {
    const result = filterRooms(rooms, {
      attendees: 31,
      equipment: [],
    });
    expect(result.map(r => r.id)).not.toContain('r1');
  });

  test('INT: filtered room can be checked for availability', () => {
    const matching = filterRooms(rooms, {
      attendees: 25,
      equipment: ['Projector', 'Whiteboard'],
    });

    expect(matching.map(r => r.id)).toEqual(['r1', 'r4']);

    const request = {
      start: 600,
      end: 660,
      now: 540,
    };

    expect(checkRoom(matching, 'r1', request)).toBe(false);
    expect(checkRoom(matching, 'r4', request)).toBe(true);
  });
});
