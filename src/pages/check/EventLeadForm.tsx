import React, { useState } from 'react';
import { CheckCircle, Phone } from 'lucide-react';
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from 'react-google-recaptcha-v3';

/**
 * Compact lead-capture form for the Table Mountain QR flow. Posts to the same
 * /api/contact Brevo pipeline the main Contact page uses, so leads land in the
 * inbox immediately. Every submission is tagged with `source` (e.g.
 * "Table Mountain — Free Consult") via the service field + message header, so
 * leads from the talk are identifiable.
 */

export type EventLeadFormProps = {
  /** Identifies where the lead came from. Becomes the email subject tag. */
  source: string;
  /** Submit button label. */
  cta: string;
  /** Label for the notes textarea. */
  notesLabel: string;
  /** Placeholder for the notes textarea. */
  notesPlaceholder: string;
  /** Show a free-text "preferred day / time" field (appointment flow). */
  askPreferredTime?: boolean;
};

function FormInner({
  source,
  cta,
  notesLabel,
  notesPlaceholder,
  askPreferredTime,
}: EventLeadFormProps) {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: '',
    business: '',
    phone: '',
    email: '',
    preferredTime: '',
    notes: '',
    consent: false,
  });

  const set = (k: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) =>
    setForm((f) => ({
      ...f,
      [k]: e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value,
    }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!executeRecaptcha) {
      setError('Spam check not ready yet. Please wait a second and try again.');
      setLoading(false);
      return;
    }

    try {
      const token = await executeRecaptcha('check_lead');

      // Compose a message that is always non-empty and carries every detail
      // the compact form collects (the /api/contact endpoint requires it).
      const message = [
        `Source: ${source} (boostifyusa.com/check)`,
        form.business && `Business: ${form.business}`,
        askPreferredTime && form.preferredTime && `Preferred time: ${form.preferredTime}`,
        '',
        form.notes || '(no additional notes)',
      ]
        .filter((line) => line !== false && line !== undefined)
        .join('\n');

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          service: source,
          message,
          consentPromo: form.consent,
          consentService: form.consent,
          recaptchaToken: token,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        try {
          const data = JSON.parse(text);
          throw new Error(data.error || 'Something went wrong.');
        } catch {
          throw new Error(`Server error (${res.status}). Please try again.`);
        }
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(
        err.message ||
          'Could not send right now. Please call us at (559) 785-3834.'
      );
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-gray-light bg-light p-8 text-center">
        <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle size={28} className="text-green-600" strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-black tracking-tight mb-2">You're on the list.</h2>
        <p className="text-gray font-medium leading-relaxed mb-5">
          Thanks, {form.name.split(' ')[0] || 'friend'}. We'll reach out within one
          business day. Want to talk sooner?
        </p>
        <a
          href="tel:+15597853834"
          className="inline-flex items-center gap-2 text-orange font-bold hover:underline"
        >
          <Phone size={16} strokeWidth={2.5} />
          Call (559) 785-3834
        </a>
      </div>
    );
  }

  const field =
    'w-full px-4 py-3.5 bg-light border border-gray-light rounded-xl text-dark font-medium placeholder:text-gray/40 focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/10 transition-all';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-bold mb-1.5">Your Name *</label>
        <input required value={form.name} onChange={set('name')} placeholder="First and last" className={field} />
      </div>

      <div>
        <label className="block text-sm font-bold mb-1.5">Business Name</label>
        <input value={form.business} onChange={set('business')} placeholder="Your business" className={field} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold mb-1.5">Phone</label>
          <input type="tel" value={form.phone} onChange={set('phone')} placeholder="(559) 555-0123" className={field} />
        </div>
        <div>
          <label className="block text-sm font-bold mb-1.5">Email *</label>
          <input required type="email" value={form.email} onChange={set('email')} placeholder="you@business.com" className={field} />
        </div>
      </div>

      {askPreferredTime && (
        <div>
          <label className="block text-sm font-bold mb-1.5">Best day &amp; time to meet</label>
          <input
            value={form.preferredTime}
            onChange={set('preferredTime')}
            placeholder="e.g. Thursday afternoon, or next week"
            className={field}
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-bold mb-1.5">{notesLabel}</label>
        <textarea
          rows={3}
          value={form.notes}
          onChange={set('notes')}
          placeholder={notesPlaceholder}
          className={`${field} resize-none`}
        />
      </div>

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={form.consent}
          onChange={set('consent')}
          className="mt-1 w-4 h-4 rounded border-gray-light accent-orange shrink-0"
        />
        <span className="text-[11px] text-gray leading-relaxed">
          OK to text me at the number above about my request (Boostify USA LLC).
          Up to 4 msgs/month, msg &amp; data rates may apply. Reply STOP to opt out,
          HELP for help.
        </span>
      </label>

      <button
        type="submit"
        disabled={loading}
        className="w-full inline-flex items-center justify-center px-8 py-4 bg-orange text-white font-bold rounded-lg hover:bg-orange-hover transition-all shadow-lg hover:shadow-orange/20 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Sending...' : cta}
      </button>

      {error && <p className="text-red-500 font-bold text-center text-sm">{error}</p>}

      <p className="text-[11px] text-gray/70 leading-relaxed text-center">
        By submitting you agree to our{' '}
        <a href="https://boostifyusa.com/terms" className="text-orange hover:underline">Terms</a>{' '}
        and{' '}
        <a href="https://boostifyusa.com/privacy" className="text-orange hover:underline">Privacy Policy</a>.
      </p>
    </form>
  );
}

export function EventLeadForm(props: EventLeadFormProps) {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={(import.meta.env.VITE_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI').trim()}
      scriptProps={{ async: false, defer: false, appendTo: 'head', nonce: undefined }}
    >
      <FormInner {...props} />
    </GoogleReCaptchaProvider>
  );
}
