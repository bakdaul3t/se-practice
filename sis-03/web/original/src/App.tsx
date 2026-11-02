import { useState } from 'react';
import { School } from 'lucide-react';
import AvailabilityChecker from '@/components/AvailabilityChecker';
import TestControls from '@/components/TestControls';
import { SAMPLE_BOOKINGS, type Booking, type BookingRequest } from '@/lib/availability';

function App() {
  const [blocked, setBlocked] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>(SAMPLE_BOOKINGS);

  function handleAddBooking({ start, end }: BookingRequest) {
    setBookings((prev) => [...prev, { id: crypto.randomUUID(), start, end, label: 'Test booking' }]);
  }

  function handleRemoveBooking(id: string) {
    setBookings((prev) => prev.filter((booking) => booking.id !== id));
  }

  function handleReset() {
    setBlocked(false);
    setBookings(SAMPLE_BOOKINGS);
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-4 sm:px-6">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-700 text-white">
            <School className="h-5 w-5" aria-hidden="true" />
          </span>
          <p className="text-base font-semibold text-slate-900">Smart Campus</p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
            Room Availability Checker
          </h1>
          <p className="mt-3 text-base leading-relaxed text-slate-600">
            Pick a start and end time to see whether Room A101 is free. Bookings are up to 2 hours.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          <AvailabilityChecker blocked={blocked} bookings={bookings} />
          <TestControls
            blocked={blocked}
            bookings={bookings}
            onBlockedChange={setBlocked}
            onAddBooking={handleAddBooking}
            onRemoveBooking={handleRemoveBooking}
            onReset={handleReset}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
