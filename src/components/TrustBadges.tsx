import React from 'react';
function SBALogo() {
  return (
    <div className="flex items-center gap-3">
      <svg
        width="48"
        height="48"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">

        <rect width="40" height="40" rx="4" fill="#002E6D" />
        <text
          x="20"
          y="18"
          textAnchor="middle"
          fill="white"
          fontSize="11"
          fontWeight="900"
          fontFamily="Inter, sans-serif">

          SBA
        </text>
        <rect x="8" y="23" width="24" height="2" fill="#CC0000" />
        <rect x="8" y="27" width="24" height="2" fill="white" />
        <rect x="8" y="31" width="24" height="2" fill="#CC0000" />
      </svg>
      <div>
        <div className="text-xs font-bold text-dark/80 uppercase tracking-wide leading-tight">
          U.S. Small Business
        </div>
        <div className="text-xs font-bold text-dark/80 uppercase tracking-wide leading-tight">
          Administration
        </div>
      </div>
    </div>);

}
function FresnoStateLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <svg
        width="40"
        height="40"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">

        <circle cx="16" cy="16" r="16" fill="#DB0032" />
        <text
          x="16"
          y="20"
          textAnchor="middle"
          fill="white"
          fontSize="12"
          fontWeight="900"
          fontFamily="Inter, sans-serif">

          FS
        </text>
      </svg>
      <div>
        <div className="text-base font-black text-dark/80 uppercase tracking-wider leading-none">
          Fresno
        </div>
        <div className="text-base font-black text-dark/80 uppercase tracking-wider leading-none">
          State
        </div>
      </div>
    </div>);

}
function SBDCLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <svg
        width="44"
        height="44"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">

        <circle cx="18" cy="18" r="18" fill="#1B3A5C" />
        <path
          d="M10 24 L18 10 L26 24 Z"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinejoin="round" />

        <circle cx="18" cy="20" r="3" fill="#E8590C" />
      </svg>
      <div>
        <div className="text-xs font-black text-dark/80 uppercase tracking-wider leading-tight">
          Valley Sierra
        </div>
        <div className="text-lg font-black text-dark/80 uppercase tracking-wider leading-tight">
          SBDC
        </div>
      </div>
    </div>);

}
function GoogleMarketingLogo() {
  return (
    <div className="flex items-center gap-3">
      <svg
        viewBox="0 0 24 24"
        width="36"
        height="36"
        xmlns="http://www.w3.org/2000/svg">

        <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
          <path
            fill="#4285F4"
            d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />

          <path
            fill="#34A853"
            d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />

          <path
            fill="#FBBC05"
            d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" />

          <path
            fill="#EA4335"
            d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" />

        </g>
      </svg>
      <div>
        <div className="text-xs font-bold text-dark/80 leading-tight">
          Google Marketing
        </div>
        <div className="text-xs font-bold text-dark/80 leading-tight">
          Platform{' '}
          <span className="text-[11px] font-medium text-gray/60">
            Certified
          </span>
        </div>
      </div>
    </div>);

}
const logos = [
{
  id: 'sba',
  component: SBALogo
},
{
  id: 'fresno',
  component: FresnoStateLogo
},
{
  id: 'sbdc',
  component: SBDCLogo
},
{
  id: 'google',
  component: GoogleMarketingLogo
}];

export function TrustBadges() {
  return (
    <section className="py-8 bg-light border-y border-gray-light/50">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-[10px] font-bold text-gray/50 uppercase tracking-[0.2em] text-center mb-6">
          Trusted by Organizations You Know
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6 md:gap-x-14">
          {logos.map((logo) =>
          <div
            key={logo.id}
            className="grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-default">

              <logo.component />
            </div>
          )}
        </div>
      </div>
    </section>);

}