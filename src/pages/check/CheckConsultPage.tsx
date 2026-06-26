import { Check } from 'lucide-react';
import { SeoHead } from '../../components/SeoHead';
import { CheckShell, Eyebrow, Highlight } from './CheckShell';
import { EventLeadForm } from './EventLeadForm';

const points = [
  'A straight read on how you show up online today',
  'The one or two moves that matter most for your business',
  'No jargon, no pressure, no obligation',
];

export function CheckConsultPage() {
  return (
    <CheckShell back>
      <SeoHead
        title="Free Consult — Boostify USA"
        description="Book a free, no-pressure consult with Boostify USA. We will show you how to get found and get hired. Fresno, CA."
        canonicalUrl="/check/consult"
        noIndex
      />

      <div className="mb-7">
        <Eyebrow>Free Consult</Eyebrow>
        <h1 className="text-4xl sm:text-5xl font-black text-dark tracking-tighter leading-[0.95] mb-4">
          Let's get you <Highlight>found.</Highlight>
        </h1>
        <p className="text-lg text-gray font-medium leading-relaxed mb-6">
          Tell us a little about your business and we will set up a quick,
          friendly call. Real talk about real growth.
        </p>
        <ul className="space-y-3">
          {points.map((p) => (
            <li key={p} className="flex items-start gap-3 text-dark font-bold">
              <Check className="w-5 h-5 text-orange shrink-0 mt-0.5" strokeWidth={3} />
              {p}
            </li>
          ))}
        </ul>
      </div>

      <EventLeadForm
        source="Table Mountain — Free Consult"
        cta="Request My Free Consult"
        notesLabel="What do you want to work on?"
        notesPlaceholder="e.g. more local customers, a new website, better Google ranking..."
      />
    </CheckShell>
  );
}
