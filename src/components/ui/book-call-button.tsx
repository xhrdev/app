'use client';

import { Button } from '@/components/ui/button';

export function BookCallButton() {
  return (
    <Button
      className="mt-16"
      onClick={() =>
        window.open(
          'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0StxPnhSfRoPXxXNSlenk1eQqKYB32IzXvwzv2__QKmYNpLF8kRGVJVAMaKsraFwsAm4NMqDIO',
          '_blank'
        )
      }
      size="lg"
      variant="default"
    >
      Book a call
    </Button>
  );
}
