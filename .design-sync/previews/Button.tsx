import { Button } from '@/components/ui/button';

export function Variants() {
  return (
    <div style={{ display: 'flex', gap: 12 }}>
      <Button variant="default">Try Login Again</Button>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Back to Home</Button>
    </div>
  );
}

export function Sizes() {
  return (
    <div style={{ alignItems: 'center', display: 'flex', gap: 12 }}>
      <Button size="sm" variant="primary">
        Small
      </Button>
      <Button size="md" variant="primary">
        Medium
      </Button>
      <Button size="lg" variant="primary">
        Large
      </Button>
    </div>
  );
}

export function FullWidth() {
  return (
    <div style={{ display: 'grid', gap: 8, maxWidth: 260 }}>
      <Button className="w-full">Try Login Again</Button>
      <Button className="w-full" variant="secondary">
        Back to Home
      </Button>
    </div>
  );
}
