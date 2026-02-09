import { Helmet } from 'react-helmet-async';

interface SeoHeadProps {
    title: string;
    description: string;
    keywords?: string;
    canonicalUrl?: string;
    ogImage?: string;
    ogType?: 'website' | 'article' | 'profile';
    noIndex?: boolean;
}

export function SeoHead({
    title,
    description,
    keywords,
    canonicalUrl,
    ogImage = '/icon.png',
    ogType = 'website',
    noIndex = false
}: SeoHeadProps) {
    const siteUrl = 'https://boostifyusa.com';
    const fullCanonicalUrl = canonicalUrl
        ? (canonicalUrl.startsWith('http') ? canonicalUrl : `${siteUrl}${canonicalUrl}`)
        : undefined;

    const fullOgImage = ogImage.startsWith('http')
        ? ogImage
        : `${siteUrl}${ogImage.startsWith('/') ? '' : '/'}${ogImage}`;

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{title}</title>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}
            {noIndex && <meta name="robots" content="noindex, nofollow" />}
            {!noIndex && <meta name="robots" content="index, follow" />}

            {/* Canonical URL */}
            {fullCanonicalUrl && <link rel="canonical" href={fullCanonicalUrl} />}

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={ogType} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={fullOgImage} />
            {fullCanonicalUrl && <meta property="og:url" content={fullCanonicalUrl} />}

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={fullOgImage} />
        </Helmet>
    );
}
