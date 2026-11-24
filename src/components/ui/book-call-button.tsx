'use client';

import { Button } from '@/components/ui/button';

export function BookCallButton() {
  return (
    <Button
      className="mt-16"
      onClick={() =>
        window.open(
          'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2uDlsqLG_VZLl3s3ri_-YIXD3xXi5WzY21o0dFuk6Gq4HhcXwJBxUz-1K6kMGxTEf4oIPny-nV',
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
