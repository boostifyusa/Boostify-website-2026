import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { CTASection } from '../components/CTASection';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  Share2,
  Check,
  X
} from
  'lucide-react';
// Blog Post Data Dictionary
const blogPosts: Record<string, any> = {
  'seo-mistakes': {
    title: '5 SEO Mistakes Fresno Businesses Keep Making',
    excerpt:
      "Most local businesses are leaving money on the table with these common SEO mistakes. Here's how to fix them and start ranking higher on Google.",
    date: 'January 15, 2026',
    readTime: '6 min read',
    author: 'Joaquin Estrada',
    authorImage: "/1733568683912.jpg",

    category: 'Local SEO',
    featuredImage: "/pexels-level23media-19097251.jpg",

    tags: ['SEO', 'Local Business', 'Google', 'Fresno'],
    content:
      <>
        <p>
          If you're a local business owner in Fresno, you already know how
          important it is to show up on Google. But here's the thing: most
          businesses are making the same handful of mistakes that keep them
          buried on page two (or worse).
        </p>

        <h2 className="text-3xl font-black text-dark tracking-tight !mt-12 !mb-4">
          1. Ignoring Your Google Business Profile
        </h2>
        <p>
          Your Google Business Profile is the single most important asset for
          local search. Yet most businesses set it up once and never touch it
          again. Google rewards active, complete profiles with higher rankings
          in the local pack.
        </p>
        <p>
          <strong className="text-dark">The fix:</strong> Update your profile
          weekly. Add photos, respond to reviews, post updates, and make sure
          your hours, services, and description are current and keyword-rich.
        </p>

        <h2 className="text-3xl font-black text-dark tracking-tight !mt-12 !mb-4">
          2. No Local Keywords on Your Website
        </h2>
        <p>
          Having a beautiful website means nothing if Google can't figure out
          where you are or what you do. Too many local sites use generic copy
          that could apply to any business in any city.
        </p>
        <p>
          <strong className="text-dark">The fix:</strong> Include your city,
          neighborhood, and service area naturally throughout your site. In
          headings, page titles, meta descriptions, and body copy. Think
          "plumber in Fresno" not just "plumber."
        </p>

        <h2 className="text-3xl font-black text-dark tracking-tight !mt-12 !mb-4">
          3. Slow Website Speed
        </h2>
        <p>
          Google has made it crystal clear: site speed is a ranking factor. If
          your site takes more than 3 seconds to load, you're losing both
          rankings and customers. Most visitors will bounce before your page
          even finishes loading.
        </p>
        <p>
          <strong className="text-dark">The fix:</strong> Compress images,
          minimize code, use a fast hosting provider, and ditch the bloated page
          builders. A hand-coded site will always outperform a template.
        </p>

        <h2 className="text-3xl font-black text-dark tracking-tight !mt-12 !mb-4">
          4. Not Getting (or Responding to) Reviews
        </h2>
        <p>
          Reviews are social proof and a ranking signal. Businesses with more
          high-quality reviews consistently rank higher in local search. It's
          not just about quantity either. Google also looks at recency and
          whether you respond.
        </p>
        <p>
          <strong className="text-dark">The fix:</strong> Create a simple system
          to ask happy customers for reviews. Send a follow-up text or email
          with a direct link. And always respond, to positive and negative
          reviews alike.
        </p>

        <h2 className="text-3xl font-black text-dark tracking-tight !mt-12 !mb-4">
          5. No Content Strategy
        </h2>
        <p>
          A static website with 5 pages isn't going to compete with businesses
          that are consistently publishing helpful, locally-relevant content.
          Blog posts, guides, and FAQs signal to Google that your site is active
          and authoritative.
        </p>
        <p>
          <strong className="text-dark">The fix:</strong> Publish at least 2
          pieces of content per month that answer real questions your customers
          are asking. "How much does a roof repair cost in Fresno?" is a
          goldmine keyword most roofers ignore.
        </p>

        <div className="bg-light rounded-2xl border border-gray-light p-8 !mt-12">
          <h3 className="text-xl font-bold text-dark mb-3">The Bottom Line</h3>
          <p className="!mb-0">
            SEO isn't magic. It's consistency, attention to detail, and
            understanding what Google (and your customers) actually want. Fix
            these five mistakes and you'll be ahead of 90% of your local
            competition.
          </p>
        </div>
      </>

  },
  'website-leads': {
    title: "Why Your Website Isn't Getting Leads (And How to Fix It)",
    excerpt:
      "Traffic means nothing if it doesn't convert. If your phone isn't ringing, your website might be guilty of these conversion killers.",
    date: 'January 8, 2026',
    readTime: '5 min read',
    author: 'Joaquin Estrada',
    authorImage: "/1733568683912.jpg",

    category: 'Web Design',
    featuredImage: "/pexels-noviana-27910251.jpg",

    tags: ['Conversion Rate', 'UX Design', 'Small Business'],
    content:
      <>
        <p>
          You spent thousands on a new website. It looks great. You're getting
          traffic. But your phone isn't ringing, and your inbox is empty. What
          gives?
        </p>
        <p>
          The truth is, most small business websites are designed to look
          pretty, not to sell. They function like digital brochures rather than
          24/7 salespeople. Here are the top reasons your website isn't
          converting visitors into leads.
        </p>

        <h2 className="text-3xl font-black text-dark tracking-tight !mt-12 !mb-4">
          1. Your Call-to-Action (CTA) is Weak or Hidden
        </h2>
        <p>
          Don't make visitors hunt for a way to contact you. If they have to
          scroll to the bottom of the page or click through three menus to find
          your phone number, you've already lost them.
        </p>
        <div className="bg-red-50 border-l-4 border-red-500 p-6 my-6">
          <strong className="text-red-700 block mb-2">The Mistake:</strong>
          <p className="!mb-0 text-red-600">
            Using generic buttons like "Submit" or hiding your contact form on a
            separate page.
          </p>
        </div>
        <div className="bg-green-50 border-l-4 border-green-500 p-6 my-6">
          <strong className="text-green-700 block mb-2">The Fix:</strong>
          <p className="!mb-0 text-green-800">
            Place a sticky "Book Now" or "Call Us" button in your header. Use
            action-oriented copy like "Get Your Free Quote" or "Schedule
            Service."
          </p>
        </div>

        <h2 className="text-3xl font-black text-dark tracking-tight !mt-12 !mb-4">
          2. No Social Proof (Trust Signals)
        </h2>
        <p>
          People buy from businesses they trust. If your website doesn't
          immediately prove that you're legitimate, reliable, and skilled,
          visitors will bounce to a competitor who does.
        </p>
        <p>
          <strong>What you need:</strong>
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Real customer reviews (embedded from Google/Yelp)</li>
          <li>Before & After photos of your work</li>
          <li>Badges of accreditations (BBB, Chamber of Commerce)</li>
          <li>License and insurance information</li>
        </ul>

        <h2 className="text-3xl font-black text-dark tracking-tight !mt-12 !mb-4">
          3. It's Not Mobile-Friendly
        </h2>
        <p>
          Over 60% of local searches happen on mobile devices. If your site
          requires pinching and zooming, or if buttons are too small to tap,
          users will leave instantly.
        </p>
        <p>
          Google also indexes the mobile version of your site first. If your
          mobile experience is poor, your rankings will tank along with your
          conversions.
        </p>

        <h2 className="text-3xl font-black text-dark tracking-tight !mt-12 !mb-4">
          4. You Talk About Yourself Too Much
        </h2>
        <p>
          This sounds harsh, but customers don't care about your company history
          as much as they care about solving their own problems.
        </p>
        <p>
          <strong>Flip the script:</strong> Instead of "We have been in business
          since 1985," try "Serving Fresno homeowners for over 40 years." Make
          the customer the hero of the story, not your brand.
        </p>

        <h2 className="text-3xl font-black text-dark tracking-tight !mt-12 !mb-4">
          5. It's Too Slow
        </h2>
        <p>
          We've said it before, and we'll say it again: Speed kills... or
          rather, lack of speed kills conversions.
        </p>
        <p>
          Amazon found that every 100ms of latency cost them 1% in sales. For a
          local service business, a 3-second delay can cost you 50% of your
          traffic. Optimize your images, use a fast host, and keep your code
          clean.
        </p>
      </>

  },
  'google-ads-vs-lsa': {
    title: 'Google Ads vs. Local Service Ads: Which Is Right for You?',
    excerpt:
      "Confused by Google's advertising options? We break down the differences between traditional PPC and the new Local Service Ads (Google Guaranteed).",
    date: 'December 20, 2025',
    readTime: '7 min read',
    author: 'Joaquin Estrada',
    authorImage: "/1733568683912.jpg",

    category: 'Paid Ads',
    featuredImage:
      'https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    tags: ['PPC', 'Google Ads', 'Marketing Budget'],
    content:
      <>
        <p>
          When you search for a plumber or electrician on Google, you'll often
          see two different types of ads at the very top of the page.
        </p>
        <p>
          First, the <strong>Google Guaranteed</strong> badges (Local Service
          Ads), and below them, the traditional text ads (Google Ads / PPC).
          Both cost money, but they work in completely different ways. Which one
          should you put your budget into?
        </p>

        <h2 className="text-3xl font-black text-dark tracking-tight !mt-12 !mb-4">
          Local Service Ads (LSAs)
        </h2>
        <p>
          LSAs are the ones with the green "Google Guaranteed" checkmark. They
          appear at the absolute top of search results for service-based
          industries.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          <div className="bg-green-50 p-6 rounded-xl border border-green-100">
            <h3 className="text-lg font-bold text-green-800 mb-3 flex items-center gap-2">
              <Check size={20} /> Pros
            </h3>
            <ul className="space-y-2 text-sm text-green-900">
              <li>• Pay per lead (call/message), not per click</li>
              <li>• Builds massive trust with the Google badge</li>
              <li>• Top of page visibility</li>
              <li>• Easier to set up than PPC</li>
            </ul>
          </div>
          <div className="bg-red-50 p-6 rounded-xl border border-red-100">
            <h3 className="text-lg font-bold text-red-800 mb-3 flex items-center gap-2">
              <X size={20} /> Cons
            </h3>
            <ul className="space-y-2 text-sm text-red-900">
              <li>• Limited to specific industries</li>
              <li>• Background checks required</li>
              <li>• Less control over targeting</li>
              <li>• Can be expensive per lead</li>
            </ul>
          </div>
        </div>

        <h2 className="text-3xl font-black text-dark tracking-tight !mt-12 !mb-4">
          Google Ads (PPC)
        </h2>
        <p>
          These are the traditional text ads labeled "Sponsored." You bid on
          specific keywords (e.g., "emergency AC repair") and pay every time
          someone clicks your ad, regardless of whether they call you.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          <div className="bg-green-50 p-6 rounded-xl border border-green-100">
            <h3 className="text-lg font-bold text-green-800 mb-3 flex items-center gap-2">
              <Check size={20} /> Pros
            </h3>
            <ul className="space-y-2 text-sm text-green-900">
              <li>• Total control over keywords & messaging</li>
              <li>• Available for ANY business type</li>
              <li>• Advanced targeting options</li>
              <li>• Immediate traffic</li>
            </ul>
          </div>
          <div className="bg-red-50 p-6 rounded-xl border border-red-100">
            <h3 className="text-lg font-bold text-red-800 mb-3 flex items-center gap-2">
              <X size={20} /> Cons
            </h3>
            <ul className="space-y-2 text-sm text-red-900">
              <li>• Pay per click (even if they don't call)</li>
              <li>• Complex to manage (easy to waste money)</li>
              <li>• Lower trust than "Guaranteed" badge</li>
              <li>• "Ad blindness" from some users</li>
            </ul>
          </div>
        </div>

        <h2 className="text-3xl font-black text-dark tracking-tight !mt-12 !mb-4">
          The Verdict: Which Wins?
        </h2>
        <p>
          For most local service businesses (plumbers, HVAC, locksmiths),{' '}
          <strong>Local Service Ads (LSAs)</strong> are the better starting
          point. The "pay-per-lead" model is safer, and the trust badge drives
          high-quality calls.
        </p>
        <p>
          However, <strong>Google Ads</strong> are essential for scaling. Once
          you max out your LSA volume, or if you want to target specific niche
          services that LSAs don't cover, PPC is the way to go.
        </p>
        <p>
          <strong>Pro Tip:</strong> The best strategy is usually a hybrid
          approach. Run LSAs to capture high-intent leads at the top, and use
          Google Ads to capture specific long-tail searches.
        </p>
      </>

  },
  'dental-redesign': {
    title: 'How to Get More Google Reviews (Without Being Annoying)',
    excerpt:
      "Google reviews are the #1 trust signal for local businesses. Here's a simple, repeatable system to get more 5-star reviews without pestering your customers.",
    date: 'December 5, 2025',
    readTime: '6 min read',
    author: 'Joaquin Estrada',
    authorImage: "/1733568683912.jpg",

    category: 'Local SEO',
    featuredImage:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    tags: ['Google Reviews', 'Reputation', 'Local Business', 'Trust'],
    content:
      <>
        <p>
          Let's be honest: asking customers for reviews feels awkward. Nobody
          wants to be that business owner who sends five follow-up texts begging
          for a 5-star rating. But here's the reality — Google reviews are the
          single most powerful trust signal for local businesses, and they
          directly impact your search rankings.
        </p>
        <p>
          Businesses with 50+ reviews and a 4.5+ star average consistently
          outrank competitors in the local pack. The good news? Getting reviews
          doesn't have to feel pushy. You just need a system.
        </p>

        <h2 className="text-3xl font-black text-dark tracking-tight !mt-12 !mb-4">
          Why Google Reviews Matter More Than You Think
        </h2>
        <p>
          Reviews aren't just about vanity. They're a ranking factor. Google's
          local algorithm weighs three things heavily: relevance, distance, and
          prominence. Reviews are a massive part of prominence.
        </p>
        <p>
          According to BrightLocal's annual survey, 87% of consumers read online
          reviews for local businesses. And 73% only pay attention to reviews
          written in the last month. That means you need a steady stream of
          fresh reviews, not just a one-time push.
        </p>

        <h2 className="text-3xl font-black text-dark tracking-tight !mt-12 !mb-4">
          Step 1: Make It Stupidly Easy
        </h2>
        <p>
          The #1 reason customers don't leave reviews isn't that they don't want
          to — it's that it's too much friction. They have to find your business
          on Google, click the right button, sign in, and type something out.
          Most people give up halfway through.
        </p>
        <p>
          <strong className="text-dark">The fix:</strong> Create a direct review
          link. Go to your Google Business Profile, click "Ask for reviews," and
          copy the short link. This takes customers straight to the review form
          — no searching required.
        </p>
        <p>
          Put this link everywhere: in your email signature, on your invoices,
          in follow-up texts, and on a QR code at your front desk.
        </p>

        <h2 className="text-3xl font-black text-dark tracking-tight !mt-12 !mb-4">
          Step 2: Ask at the Right Moment
        </h2>
        <p>
          Timing is everything. Don't ask for a review a week after the job is
          done — the emotional high has faded. Ask when the customer is at peak
          satisfaction.
        </p>
        <p>
          <strong className="text-dark">Best moments to ask:</strong>
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Right after completing a service (while they're still impressed)
          </li>
          <li>
            When a customer gives you a verbal compliment ("You should be our
            spokesperson!")
          </li>
          <li>
            After resolving a problem quickly (turns frustration into loyalty)
          </li>
          <li>At the point of payment (they're already engaged with you)</li>
        </ul>

        <h2 className="text-3xl font-black text-dark tracking-tight !mt-12 !mb-4">
          Step 3: Use the "Two-Sentence Text" Method
        </h2>
        <p>
          Forget long emails. The highest-converting review request is a simple
          two-sentence text message sent within 1 hour of service:
        </p>
        <div className="bg-light rounded-2xl border border-gray-light p-6 my-6 font-mono text-base">
          <p className="!mb-0">
            "Hey [Name], thanks for choosing us today! If you have 30 seconds, a
            Google review would mean the world to our small team: [link]"
          </p>
        </div>
        <p>
          That's it. No essay. No guilt trip. Just a genuine, quick ask with a
          direct link. Our clients who use this method see a 30-40% response
          rate.
        </p>

        <h2 className="text-3xl font-black text-dark tracking-tight !mt-12 !mb-4">
          Step 4: Always Respond to Every Review
        </h2>
        <p>
          This is where most businesses drop the ball. Responding to reviews
          isn't just good manners — Google has confirmed it's a ranking signal.
          Businesses that respond to reviews are seen as more engaged and
          trustworthy.
        </p>
        <p>
          <strong className="text-dark">For positive reviews:</strong> Thank
          them by name, mention the specific service, and invite them back.
          "Thanks, Maria! Glad we could get your AC running before the Fresno
          heat hit. See you for the fall tune-up!"
        </p>
        <p>
          <strong className="text-dark">For negative reviews:</strong> Stay
          calm. Apologize, take it offline, and show future customers you handle
          problems professionally. Never argue publicly.
        </p>

        <h2 className="text-3xl font-black text-dark tracking-tight !mt-12 !mb-4">
          Step 5: Don't Buy Fake Reviews (Seriously)
        </h2>
        <p>
          We see it all the time — businesses buying 50 five-star reviews from
          random accounts. Google's algorithm is getting smarter every month at
          detecting fake reviews. The penalty? Your entire review history can be
          wiped, and your listing can be suspended.
        </p>
        <p>
          It's not worth the risk. Ten real reviews from actual customers will
          always outperform 100 fake ones.
        </p>

        <div className="bg-light rounded-2xl border border-gray-light p-8 !mt-12">
          <h3 className="text-xl font-bold text-dark mb-3">The Bottom Line</h3>
          <p className="!mb-0">
            Getting Google reviews is a system, not a one-time event. Create
            your direct link, ask at the right moment with a simple text, and
            respond to every single review. Do this consistently and you'll
            build a review profile that crushes your competition and earns trust
            before customers even pick up the phone.
          </p>
        </div>
      </>

  }
};
const relatedPosts = [
  {
    title: "Why Your Website Isn't Getting Leads",
    category: 'Web Design',
    image: "/pexels-noviana-27910251.jpg",

    date: 'January 8, 2026',
    slug: 'website-leads'
  },
  {
    title: 'Google Ads vs. LSAs: Which Is Right for You?',
    category: 'Paid Ads',
    image:
      'https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    date: 'December 20, 2025',
    slug: 'google-ads-vs-lsa'
  },
  {
    title: '5 SEO Mistakes Fresno Businesses Keep Making',
    category: 'Local SEO',
    image: "/pexels-level23media-19097251.jpg",

    date: 'January 15, 2026',
    slug: 'seo-mistakes'
  },
  {
    title: 'How to Get More Google Reviews (Without Being Annoying)',
    category: 'Local SEO',
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    date: 'December 5, 2025',
    slug: 'dental-redesign'
  }];

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    // Look up post based on slug from params
    if (slug && blogPosts[slug]) {
      setPost(blogPosts[slug]);
    } else {
      // Default behavior or 404
      // Use seo-mistakes if slug is missing or not found
      setPost(blogPosts['seo-mistakes']);
    }
  }, [slug]);

  if (!post) return null;

  return (
    <div className="min-h-screen bg-white selection:bg-orange selection:text-white">
      <Navigation />

      <main className="pt-28 md:pt-40">
        {/* Back Link */}
        <div className="px-6 max-w-4xl mx-auto mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray font-semibold hover:text-orange transition-colors text-sm">
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>

        {/* Article Header */}
        <article className="px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              key={slug} // Animate on slug change
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                duration: 0.5
              }}>

              {/* Category */}
              <span className="inline-block px-3 py-1 bg-orange/10 text-orange text-xs font-bold uppercase tracking-wider rounded-full mb-6">
                {post.category}
              </span>

              {/* Title */}
              <h1 className="text-4xl md:text-6xl font-black text-dark tracking-tighter leading-[0.95] mb-6">
                {post.title}
              </h1>

              {/* Excerpt */}
              <p className="text-xl text-gray font-medium leading-relaxed mb-8">
                {post.excerpt}
              </p>

              {/* Meta Row */}
              <div className="flex flex-wrap items-center gap-6 pb-8 border-b border-gray-light mb-8">
                <div className="flex items-center gap-3">
                  <img
                    src={post.authorImage}
                    alt={post.author}
                    className="w-10 h-10 rounded-full object-cover border-2 border-gray-light" />

                  <div>
                    <div className="text-sm font-bold text-dark">
                      {post.author}
                    </div>
                    <div className="text-xs text-gray font-medium">
                      Founder, Boostify
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-gray font-medium">
                  <Calendar size={14} className="text-gray/50" />
                  {post.date}
                </div>
                <div className="flex items-center gap-1.5 text-sm text-gray font-medium">
                  <Clock size={14} className="text-gray/50" />
                  {post.readTime}
                </div>
              </div>
            </motion.div>

            {/* Featured Image */}
            <motion.div
              key={`${slug}-img`}
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                duration: 0.5,
                delay: 0.1
              }}
              className="rounded-2xl overflow-hidden mb-12 aspect-[16/9]">

              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-full object-cover" />

            </motion.div>

            {/* Article Body */}
            <motion.div
              key={`${slug}-content`}
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                duration: 0.5,
                delay: 0.2
              }}
              className="prose prose-lg max-w-none mb-16">

              <div className="space-y-6 text-gray font-medium leading-relaxed text-lg">
                {post.content}
              </div>
            </motion.div>

            {/* Share / Tags */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-gray-light mb-16">
              <div className="flex items-center gap-2">
                <Tag size={14} className="text-gray/50" />
                {post.tags &&
                  post.tags.map((tag: string, i: number) =>
                    <span
                      key={i}
                      className="px-3 py-1 bg-light border border-gray-light rounded-full text-xs font-bold text-dark">

                      {tag}
                    </span>
                  )}
              </div>
              <button className="flex items-center gap-2 text-sm font-bold text-gray hover:text-orange transition-colors">
                <Share2 size={14} />
                Share
              </button>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        <section className="px-6 py-24 bg-light/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-black text-dark mb-10 tracking-tight">
              More From the Blog
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.
                filter((p) => p.slug !== slug) // Exclude current post
                .slice(0, 3).
                map((related, i) =>
                  <Link
                    key={i}
                    to={`/blog/${related.slug}`}
                    className="group block">

                    <div className="rounded-2xl overflow-hidden aspect-[16/10] mb-4">
                      <img
                        src={related.image}
                        alt={related.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />

                    </div>
                    <span className="inline-block px-2.5 py-0.5 bg-orange/10 text-orange text-[10px] font-bold uppercase tracking-wider rounded-full mb-2">
                      {related.category}
                    </span>
                    <h3 className="text-lg font-bold text-dark tracking-tight group-hover:text-orange transition-colors leading-snug mb-1">
                      {related.title}
                    </h3>
                    <span className="text-sm text-gray font-medium">
                      {related.date}
                    </span>
                  </Link>
                )}
            </div>
          </div>
        </section>

        <CTASection />
      </main>

      <Footer />
    </div>);
}