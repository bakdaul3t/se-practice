
export type Interval = {
  readonly start: number;
  readonly end: number;
};

export type Room = {
  readonly id: string;
  readonly name: string;
  readonly capacity: number;
  readonly equipment: readonly string[];
  readonly blocked: boolean;
  readonly bookings: readonly Interval[];
};

export const ROOMS: readonly Room[] = [
  {
    id: 'a101',
    name: 'Room A-101',
    capacity: 30,
    equipment: ['Projector', 'Whiteboard'],
    blocked: false,
    bookings: [{ start: 600, end: 660 }],
  },
  {
    id: 'b204',
    name: 'Room B-204',
    capacity: 50,
    equipment: ['Projector', 'Computers', 'Whiteboard'],
    blocked: false,
    bookings: [],
  },
  {
    id: 'c303',
    name: 'Room C-303',
    capacity: 20,
    equipment: ['Whiteboard'],
    blocked: true,
    bookings: [],
  },
  {
    id: 'd404',
    name: 'Room D-404',
    capacity: 100,
    equipment: ['Projector', 'Microphone', 'Whiteboard'],
    blocked: false,
    bookings: [{ start: 780, end: 840 }],
  },
];
