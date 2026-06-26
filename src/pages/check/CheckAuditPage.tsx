import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import { SeoHead } from '../../components/SeoHead';
import { CheckShell, Eyebrow, Highlight } from './CheckShell';
import { EventLeadForm } from './EventLeadForm';

export function CheckAuditPage() {
  return (
    <CheckShell back>
      <SeoHead
        title="Free Local SEO Audit — Boostify USA"
        description="See your real-time Google Map rankings with a free Local SEO audit from Boostify USA. Find out exactly where you show up. Fresno, CA."
        canonicalUrl="/check/audit"
        noIndex
      />

      <div className="mb-7">
        <Eyebrow>Free Local SEO Audit</Eyebrow>
        <h1 className="text-4xl sm:text-5xl font-black text-dark tracking-tighter leading-[0.95] mb-4">
          See where you <Highlight>rank.</Highlight>
        </h1>
        <p className="text-lg text-gray font-medium leading-relaxed">
          We check your real Google rankings across the map, in real time, so you
          can see exactly where customers find you and where you are invisible.
        </p>
      </div>

      {/* Fast path: the live ranking-grid tool. */}
      <Link
        to="/seo-audit"
        className="group relative flex items-center gap-4 p-5 rounded-2xl bg-dark text-white overflow-hidden mb-7 hover:-translate-y-0.5 transition-transform"
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-orange/20 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 pointer-events-none" />
        <span className="relative w-11 h-11 rounded-xl bg-orange flex items-center justify-center shrink-0">
          <MapPin size={20} className="text-white" strokeWidth={2.5} />
        </span>
        <span className="relative flex-1 min-w-0">
          <span className="block font-black tracking-tight">Run the live audit now</span>
          <span className="block text-sm text-white/60 font-medium leading-snug">
            Real-time map rankings in under a minute
          </span>
        </span>
        <ArrowRight size={20} className="relative text-white/50 group-hover:translate-x-1 transition-transform shrink-0" strokeWidth={2.5} />
      </Link>

      <div className="flex items-center gap-4 mb-7">
        <span className="flex-1 h-px bg-gray-light" />
        <span className="text-xs font-bold uppercase tracking-widest text-gray/60">or have us run it for you</span>
        <span className="flex-1 h-px bg-gray-light" />
      </div>

      <EventLeadForm
        source="Table Mountain — Local SEO Audit"
        cta="Send Me My Free Audit"
        notesLabel="Your business name & city (so we can find you on the map)"
        notesPlaceholder="e.g. Valley Pro Construction, Fresno CA"
      />
    </CheckShell>
  );
}
