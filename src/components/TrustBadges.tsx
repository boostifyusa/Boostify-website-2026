// Real marks: SBA, Fresno State and Google Partner come from the brand package
// in Drive (Logos Branding/); Valley Sierra SBDC is the official lockup from
// valleysierrasbdc.com. These replaced hand-drawn SVG approximations.
//
// Sizing is per-logo, not uniform. These four have aspect ratios from 2.0 to
// 4.7, so a single height would make the near-square Google badge tower over the
// Fresno State wordmark. Heights below are tuned so the LETTERING reads at the
// same size, which is what "optically balanced" means in a logo row.
const logos = [
  {
    id: 'sba',
    src: '/logos/sba.svg',
    alt: 'U.S. Small Business Administration',
    width: 250,
    height: 70,
    // ratio 3.6, wordmark fills most of the box
    className: 'h-8 md:h-11',
  },
  {
    id: 'fresno-state',
    src: '/logos/fresno-state.webp',
    alt: 'Fresno State',
    width: 400,
    height: 85,
    // ratio 4.7, the widest and thinnest, but h-7 left it visibly the smallest
    className: 'h-7 md:h-9',
  },
  {
    id: 'valley-sierra-sbdc',
    src: '/logos/valley-sierra-sbdc.webp',
    alt: 'Valley Sierra Small Business Development Center',
    width: 452,
    height: 140,
    // ratio 3.2, dense two-part lockup: h-14 made it dominate the row
    className: 'h-9 md:h-11',
  },
  {
    id: 'google-partner',
    src: '/logos/google-partner.webp',
    alt: 'Google Partner',
    width: 440,
    height: 220,
    // ratio 2.0, stacked: needs the most height to match on area
    className: 'h-11 md:h-14',
  },
];

export function TrustBadges() {
  return (
    <>
      {/* Only Google Partner is marked as a credential, because it is the only
          one of the four that is one. Per the About page the SBA is a speaking
          invitation and Fresno State is a client we built a news platform for,
          and marking either as a certification would be the same kind of false
          claim as a self-issued review rating. Valley Sierra SBDC is displayed
          without a documented relationship, so nothing is asserted about it. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            '@id': 'https://boostifyusa.com/#organization',
            name: 'Boostify USA',
            url: 'https://boostifyusa.com',
            hasCredential: {
              '@type': 'EducationalOccupationalCredential',
              credentialCategory: 'certification',
              name: 'Google Partner',
              recognizedBy: { '@type': 'Organization', name: 'Google', url: 'https://www.google.com' }
            }
          })
        }}
      />
    <section className="py-10 md:py-12 bg-light/50 border-b border-gray-light/50">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-xs font-bold text-gray uppercase tracking-[0.25em] text-center mb-10">
          Trusted by Organizations You Know
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-12 md:gap-x-20 gap-y-8">
          {logos.map((logo) => (
            <img
              key={logo.id}
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              loading="lazy"
              decoding="async"
              // multiply drops the white field these marks ship on, so they sit
              // on the band instead of floating in a white rectangle
              className={`${logo.className} w-auto object-contain mix-blend-multiply grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500`}
            />
          ))}
        </div>
      </div>
    </section>
    </>
  );
}
