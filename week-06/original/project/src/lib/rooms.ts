export type Booking = {
  id: string;
  start: number; // minutes from 00:00
  end: number;
  title: string;
  owner: string;
};

export type Room = {
  id: string;
  name: string;
  building: string;
  capacity: number;
  blocked: boolean;
  blockedReason?: string;
  bookings: Booking[];
};

export const MINUTES_PER_DAY = 1440;
export const MAX_BOOKING_MINUTES = 120;

export const sampleRooms: Room[] = [
  {
    id: "r1",
    name: "Aurora Hall",
    building: "North Wing · Floor 2",
    capacity: 40,
    blocked: false,
    bookings: [
      { id: "b1", start: 540, end: 600, title: "Intro Algorithms", owner: "Prof. Chen" },
      { id: "b2", start: 720, end: 780, title: "Faculty Sync", owner: "Dr. Okafor" },
      { id: "b3", start: 900, end: 960, title: "Study Group", owner: "Student Council" },
    ],
  },
  {
    id: "r2",
    name: "Beacon Lab",
    building: "East Wing · Floor 1",
    capacity: 24,
    blocked: false,
    bookings: [
      { id: "b4", start: 600, end: 660, title: "Robotics Lab", owner: "Prof. Ito" },
      { id: "b5", start: 840, end: 900, title: "Capstone Demo", owner: "Team Lumen" },
    ],
  },
  {
    id: "r3",
    name: "Cedar Commons",
    building: "Central · Floor 3",
    capacity: 80,
    blocked: true,
    blockedReason: "Maintenance — HVAC repair scheduled today.",
    bookings: [
      { id: "b6", start: 480, end: 540, title: "Board Meeting", owner: "Administration" },
    ],
  },
  {
    id: "r4",
    name: "Driftwood Studio",
    building: "South Wing · Ground",
    capacity: 12,
    blocked: false,
    bookings: [
      { id: "b7", start: 780, end: 840, title: "Design Critique", owner: "Studio B" },
    ],
  },
];

export type ValidationCode =
  | "ok"
  | "missing"
  | "invalid-time"
  | "start-before-now"
  | "too-long"
  | "room-blocked"
  | "overlap";

export type ValidationResult = {
  code: ValidationCode;
  message: string;
  conflictingBooking?: Booking;
};

export function minutesToLabel(min: number): string {
  const m = ((Math.round(min) % MINUTES_PER_DAY) + MINUTES_PER_DAY) % MINUTES_PER_DAY;
  const h = Math.floor(m / 60);
  const mm = m % 60;
  return `${String(h).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}

export function labelToMinutes(label: string): number | null {
  const match = /^(\d{1,2}):(\d{2})$/.exec(label.trim());
  if (!match) return null;
  const h = Number(match[1]);
  const mm = Number(match[2]);
  if (h < 0 || h > 23 || mm < 0 || mm > 59) return null;
  return h * 60 + mm;
}

// Touching endpoints allowed: [aStart, aEnd) vs [bStart, bEnd)
export function intervalsOverlap(aStart: number, aEnd: number, bStart: number, bEnd: number): boolean {
  return aStart < bEnd && bStart < aEnd;
}

export function validateBooking(
  room: Room | null,
  start: number | null,
  end: number | null,
  nowMinutes: number
): ValidationResult {
  if (!room) return { code: "missing", message: "Select a room to check availability." };
  if (start === null || end === null)
    return { code: "missing", message: "Enter both a start and end time." };

  // AC1
  if (!(0 <= start && start < end && end <= MINUTES_PER_DAY))
    return {
      code: "invalid-time",
      message: "Interval must fit within the day: 00:00 ≤ start < end ≤ 24:00.",
    };
  if (start < nowMinutes)
    return {
      code: "start-before-now",
      message: `Start time must be at or after the current time (${minutesToLabel(nowMinutes)}).`,
    };

  // AC2
  if (end - start > MAX_BOOKING_MINUTES)
    return {
      code: "too-long",
      message: `Bookings may not exceed ${MAX_BOOKING_MINUTES} minutes. This one is ${end - start} minutes.`,
    };

  // AC3
  if (room.blocked)
    return {
      code: "room-blocked",
      message: room.blockedReason
        ? `${room.name} is unavailable. ${room.blockedReason}`
        : `${room.name} is currently blocked.`,
    };

  // AC4
  const conflict = room.bookings.find((b) => intervalsOverlap(start, end, b.start, b.end));
  if (conflict)
    return {
      code: "overlap",
      message: `Overlaps "${conflict.title}" (${minutesToLabel(conflict.start)}–${minutesToLabel(conflict.end)}). Touching endpoints are allowed.`,
      conflictingBooking: conflict,
    };

  return {
    code: "ok",
    message: `Available — ${room.name} is free from ${minutesToLabel(start)} to ${minutesToLabel(end)}.`,
  };
}
