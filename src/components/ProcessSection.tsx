import { motion } from 'framer-motion';

// Laid out on a time track, not as another stack of rows. The bar above the
// phases is drawn to the real day counts, so the build phase is visibly the long
// one and discovery is a sliver. That proportion is the information; every other
// agency process section gives four equal boxes and tells you nothing.
//
// Durations match the 3 to 5 week estimate quoted in the homepage FAQ.
const steps = [
  {
    number: '01',
    when: 'Day 1',
    days: 1,
    title: 'Discovery call',
    description:
      'Forty-five minutes on the phone. What you sell, who buys it, and which jobs you would rather stop taking. If we are not the right shop we say so here, not after a deposit clears.',
    from: 'Your three best jobs from last year, and your worst one.',
  },
  {
    number: '02',
    when: 'Days 2 to 6',
    days: 5,
    title: 'Sitemap and copy',
    description:
      'Every page mapped before anything is designed. If you already have a site, this is where its URLs go into the redirect map that protects the rankings you have.',
    from: 'Photos of real work, and an hour to review the outline.',
  },
  {
    number: '03',
    when: 'Days 7 to 20',
    days: 14,
    title: 'Build',
    description:
      'Hand-coded against the spec published further up this page. A staging link goes up on the first day of this phase and stays up, so you watch it come together instead of waiting for a reveal.',
    from: 'Notes on the staging site, whenever you get to them.',
  },
  {
    number: '04',
    when: 'Days 21 to 25',
    days: 5,
    title: 'Launch, then watch',
    description:
      'Redirects go in before the DNS switch, not after. Analytics, Search Console and call tracking get wired up, then we watch the index for two weeks and fix whatever moves the wrong way.',
    from: 'Access to your domain registrar. That is the whole list.',
  },
];

const totalDays = steps.reduce((sum, s) => sum + s.days, 0);

export function ProcessSection() {
  return (
    <section className="py-24 md:py-32 px-6 bg-dark">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-[0.95] max-w-[14ch]">
            How we work.
          </h2>
          <p className="text-lg text-white/55 font-medium leading-relaxed max-w-[46ch] lg:text-right lg:pb-2">
            Four phases, twenty-five working days, and a staging link you can open
            from the second week on.
          </p>
        </div>

        {/* The track. Segment widths are the real day counts, so phase 03 is
            visibly most of the project and phase 01 is a single day. */}
        <div className="hidden md:flex items-stretch gap-1 mb-3" aria-hidden="true">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              style={{ width: `${(step.days / totalDays) * 100}%`, transformOrigin: 'left center' }}
              className={`h-1.5 rounded-full ${i === 2 ? 'bg-orange' : 'bg-white/25'}`}
            />
          ))}
        </div>
        <div className="hidden md:flex gap-1 mb-16" aria-hidden="true">
          {steps.map((step) => (
            <span
              key={step.number}
              style={{ width: `${(step.days / totalDays) * 100}%` }}
              className="text-[10px] font-bold uppercase tracking-[0.11em] text-white/55 whitespace-nowrap overflow-hidden"
            >
              {step.days} {step.days === 1 ? 'day' : 'days'}
            </span>
          ))}
        </div>

        {/* Phases run across, not down. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.45, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="border-t-2 border-white/15 pt-5"
            >
              <div className="flex items-baseline gap-2.5 mb-4">
                <span className="text-2xl font-black text-orange tracking-tighter leading-none">
                  {step.number}
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.13em] text-white/65">
                  {step.when}
                </span>
              </div>

              <h3 className="text-xl font-black text-white tracking-tight mb-3">
                {step.title}
              </h3>
              <p className="text-white/55 font-medium leading-relaxed mb-5">
                {step.description}
              </p>
              <p className="text-sm font-bold text-white/75 leading-relaxed">
                <span className="text-orange">You provide: </span>
                {step.from}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
