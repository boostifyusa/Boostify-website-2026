import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { SeoHead } from '../components/SeoHead';
import { SchemaJSON } from '../components/SchemaJSON';
import { Footer } from '../components/Footer';
import { CTASection } from '../components/CTASection';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  Share2,
} from 'lucide-react';
import { blogPosts } from '../data/posts';

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
      <SeoHead
        title={`${post.title} - Boostify USA Blog`}
        description={post.excerpt}
        canonicalUrl={`/blog/${slug}`}
        ogImage={post.featuredImage}
        ogType="article"
      />
      <SchemaJSON
        type="Article"
        data={{
          headline: post.title,
          description: post.excerpt,
          image: post.featuredImage.startsWith('http') ? post.featuredImage : `https://boostifyusa.com${post.featuredImage}`,
          author: {
            "@type": "Person",
            "name": post.author
          },
          publisher: {
            "@type": "Organization",
            "name": "Boostify USA",
            "logo": {
              "@type": "ImageObject",
              "url": "https://boostifyusa.com/icon.png"
            }
          },
          datePublished: post.date, // Note: Should ideally be ISO format
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://boostifyusa.com/blog/${slug}`
          }
        }}
      />
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

              <div className="space-y-6 text-gray font-medium leading-relaxed text-lg" dangerouslySetInnerHTML={{ __html: post.content }}>
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
    </div >);
}