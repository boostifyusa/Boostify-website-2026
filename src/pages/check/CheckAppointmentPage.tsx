import { Clock, Phone } from 'lucide-react';
import { SeoHead } from '../../components/SeoHead';
import { CheckShell, Eyebrow, Highlight } from './CheckShell';
import { EventLeadForm } from './EventLeadForm';

export function CheckAppointmentPage() {
  return (
    <CheckShell back>
      <SeoHead
        title="Book an Appointment — Boostify USA"
        description="Request a time to meet with Boostify USA. Web design and SEO for Central Valley businesses. Fresno, CA."
        canonicalUrl="/check/appointment"
        noIndex
      />

      <div className="mb-7">
        <Eyebrow>Book an Appointment</Eyebrow>
        <h1 className="text-4xl sm:text-5xl font-black text-dark tracking-tighter leading-[0.95] mb-4">
          Pick a time. We'll <Highlight>be there.</Highlight>
        </h1>
        <p className="text-lg text-gray font-medium leading-relaxed mb-5">
          Tell us when works for you. We will confirm by text or email and meet
          you in person, by phone, or on a video call. Your choice.
        </p>

        <div className="flex items-center gap-2 text-sm font-semibold text-gray">
          <Clock size={15} className="text-orange" strokeWidth={2.5} />
          Mon&ndash;Fri 9am&ndash;6pm &middot; weekends by appointment
        </div>
      </div>

      <EventLeadForm
        source="Table Mountain — Appointment"
        cta="Request My Appointment"
        notesLabel="Anything we should know before we meet?"
        notesPlaceholder="What you want to cover, in person vs. phone vs. video..."
        askPreferredTime
      />

      <p className="mt-6 text-center text-sm text-gray font-medium">
        Prefer to just call?{' '}
        <a href="tel:+15597853834" className="inline-flex items-center gap-1.5 text-orange font-bold hover:underline">
          <Phone size={15} strokeWidth={2.5} />
          (559) 785-3834
        </a>
      </p>
    </CheckShell>
  );
}
