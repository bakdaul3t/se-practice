import { useEffect, useMemo, useRef, useState } from "react";
import {
  Building2,
  CalendarCheck,
  CheckCircle2,
  Clock,
  DoorClosed,
  Info,
  Users,
  XCircle,
} from "lucide-react";
import {
  MAX_BOOKING_MINUTES,
  MINUTES_PER_DAY,
  labelToMinutes,
  minutesToLabel,
  sampleRooms,
  validateBooking,
  type Room,
  type ValidationResult,
} from "@/lib/rooms";

function useNowMinutes(): number {
  const [now, setNow] = useState<number>(() => {
    const d = new Date();
    return d.getHours() * 60 + d.getMinutes();
  });
  const ref = useRef<number>(now);
  ref.current = now;
  useEffect(() => {
    const id = setInterval(() => {
      const d = new Date();
      const m = d.getHours() * 60 + d.getMinutes();
      if (m !== ref.current) setNow(m);
    }, 15000);
    return () => clearInterval(id);
  }, []);
  return now;
}

function Timeline({ room, nowMinutes }: { room: Room; nowMinutes: number }) {
  const hours = Array.from({ length: 25 }, (_, i) => i);
  return (
    <div className="mt-4">
      <div className="relative h-16 rounded-xl border border-slate-200 bg-slate-50 overflow-hidden">
        {/* Hour gridlines */}
        {hours.map((h) => (
          <div
            key={h}
            className="absolute top-0 bottom-0 border-l border-slate-200"
            style={{ left: `${(h / 24) * 100}%` }}
          />
        ))}
        {/* Existing bookings */}
        {room.bookings.map((b) => (
          <div
            key={b.id}
            className="absolute top-2 bottom-2 rounded-md bg-indigo-500/90 text-white text-[10px] flex items-center justify-center px-1 truncate"
            style={{
              left: `${(b.start / MINUTES_PER_DAY) * 100}%`,
              width: `${((b.end - b.start) / MINUTES_PER_DAY) * 100}%`,
            }}
            title={`${b.title} — ${minutesToLabel(b.start)} to ${minutesToLabel(b.end)}`}
          >
            <span className="truncate">{b.title}</span>
          </div>
        ))}
        {/* Now marker */}
        {nowMinutes >= 0 && nowMinutes <= MINUTES_PER_DAY && (
          <div
            className="absolute top-0 bottom-0 w-px bg-rose-500"
            style={{ left: `${(nowMinutes / MINUTES_PER_DAY) * 100}%` }}
            title={`Now: ${minutesToLabel(nowMinutes)}`}
          >
            <div className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-rose-500" />
          </div>
        )}
      </div>
      <div className="flex justify-between mt-1 text-[10px] text-slate-400">
        <span>00:00</span>
        <span>06:00</span>
        <span>12:00</span>
        <span>18:00</span>
        <span>24:00</span>
      </div>
    </div>
  );
}

function ResultBanner({ result }: { result: ValidationResult | null }) {
  if (!result) return null;
  const available = result.code === "ok";
  const tone = available
    ? "border-emerald-200 bg-emerald-50 text-emerald-900"
    : "border-rose-200 bg-rose-50 text-rose-900";
  const Icon = available ? CheckCircle2 : XCircle;
  return (
    <div
      role="status"
      aria-live="polite"
      className={`mt-5 flex items-start gap-3 rounded-xl border px-4 py-3 ${tone}`}
    >
      <Icon className="mt-0.5 h-5 w-5 shrink-0" />
      <div>
        <p className="font-semibold leading-tight">
          {available ? "Available" : "Unavailable"}
        </p>
        <p className="text-sm mt-0.5">{result.message}</p>
      </div>
    </div>
  );
}

export default function App() {
  const nowMinutes = useNowMinutes();
  const [roomId, setRoomId] = useState<string>(sampleRooms[0].id);
  const [startLabel, setStartLabel] = useState<string>("");
  const [endLabel, setEndLabel] = useState<string>("");
  const [touched, setTouched] = useState(false);

  const room = useMemo<Room | null>(
    () => sampleRooms.find((r) => r.id === roomId) ?? null,
    [roomId]
  );

  const startMin = labelToMinutes(startLabel);
  const endMin = labelToMinutes(endLabel);

  const result = useMemo(
    () => (touched ? validateBooking(room, startMin, endMin, nowMinutes) : null),
    [touched, room, startMin, endMin, nowMinutes]
  );

  // Quick presets relative to "now"
  function applyPreset(delta: number) {
    const base = Math.max(nowMinutes, 0);
    const start = Math.ceil(base / 15) * 15;
    setStartLabel(minutesToLabel(start));
    setEndLabel(minutesToLabel(start + delta));
    setTouched(true);
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
        <header className="mb-8">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-900 text-white">
              <CalendarCheck className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">
                Smart Campus Room Availability
              </h1>
              <p className="text-sm text-slate-500">
                Check whether a room is free for a candidate time slot. No booking data is changed.
              </p>
            </div>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr]">
          {/* Form card */}
          <section className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5 sm:p-6">
            <h2 className="text-base font-semibold flex items-center gap-2">
              <Info className="h-4 w-4 text-slate-400" /> Candidate interval
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Current time:{" "}
              <span className="font-medium text-slate-700">{minutesToLabel(nowMinutes)}</span>{" "}
              · max {MAX_BOOKING_MINUTES} min
            </p>

            <label className="block mt-4 text-sm font-medium" htmlFor="room">
              Room
            </label>
            <select
              id="room"
              value={roomId}
              onChange={(e) => {
                setRoomId(e.target.value);
                setTouched(true);
              }}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/20"
            >
              {sampleRooms.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name} — {r.building}
                  {r.blocked ? " (blocked)" : ""}
                </option>
              ))}
            </select>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <div>
                <label className="block text-sm font-medium" htmlFor="start">
                  Start (HH:MM)
                </label>
                <input
                  id="start"
                  type="time"
                  value={startLabel}
                  onChange={(e) => {
                    setStartLabel(e.target.value);
                    setTouched(true);
                  }}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium" htmlFor="end">
                  End (HH:MM)
                </label>
                <input
                  id="end"
                  type="time"
                  value={endLabel}
                  onChange={(e) => {
                    setEndLabel(e.target.value);
                    setTouched(true);
                  }}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/20"
                />
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => applyPreset(60)}
                className="rounded-full border border-slate-300 px-3 py-1 text-xs hover:bg-slate-50"
              >
                +1h from now
              </button>
              <button
                type="button"
                onClick={() => applyPreset(120)}
                className="rounded-full border border-slate-300 px-3 py-1 text-xs hover:bg-slate-50"
              >
                +2h from now
              </button>
              <button
                type="button"
                onClick={() => {
                  setStartLabel("");
                  setEndLabel("");
                  setTouched(false);
                }}
                className="rounded-full border border-slate-300 px-3 py-1 text-xs hover:bg-slate-50"
              >
                Reset
              </button>
            </div>

            <button
              type="button"
              onClick={() => setTouched(true)}
              className="mt-5 w-full rounded-lg bg-slate-900 text-white py-2.5 text-sm font-semibold hover:bg-slate-800 transition-colors"
            >
              Check availability
            </button>

            <ResultBanner result={result} />
          </section>

          {/* Room detail card */}
          <section className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5 sm:p-6">
            {room && (
              <>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold tracking-tight">{room.name}</h2>
                    <p className="text-sm text-slate-500 flex items-center gap-1.5 mt-1">
                      <Building2 className="h-4 w-4" /> {room.building}
                    </p>
                    <p className="text-sm text-slate-500 flex items-center gap-1.5 mt-1">
                      <Users className="h-4 w-4" /> Seats {room.capacity}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                      room.blocked
                        ? "bg-rose-50 text-rose-700 border border-rose-200"
                        : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    }`}
                  >
                    {room.blocked ? <DoorClosed className="h-3.5 w-3.5" /> : <CheckCircle2 className="h-3.5 w-3.5" />}
                    {room.blocked ? "Blocked" : "Open"}
                  </span>
                </div>

                {room.blocked && room.blockedReason && (
                  <p className="mt-3 text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">
                    {room.blockedReason}
                  </p>
                )}

                <Timeline room={room} nowMinutes={nowMinutes} />

                <h3 className="mt-5 text-sm font-semibold flex items-center gap-2">
                  <Clock className="h-4 w-4 text-slate-400" /> Existing bookings today
                </h3>
                {room.bookings.length === 0 ? (
                  <p className="text-sm text-slate-500 mt-2">No bookings scheduled.</p>
                ) : (
                  <ul className="mt-2 divide-y divide-slate-100 rounded-lg border border-slate-200">
                    {room.bookings
                      .slice()
                      .sort((a, b) => a.start - b.start)
                      .map((b) => (
                        <li key={b.id} className="flex items-center justify-between px-3 py-2 text-sm">
                          <div className="min-w-0">
                            <p className="font-medium truncate">{b.title}</p>
                            <p className="text-xs text-slate-500 truncate">{b.owner}</p>
                          </div>
                          <span className="shrink-0 font-mono text-xs text-slate-600">
                            {minutesToLabel(b.start)}–{minutesToLabel(b.end)}
                          </span>
                        </li>
                      ))}
                  </ul>
                )}
              </>
            )}
          </section>
        </div>

        <footer className="mt-8 text-xs text-slate-400">
          Sample data only · Times are in 24-hour format · This tool never modifies existing bookings.
        </footer>
      </div>
    </div>
  );
}
