import { Helmet } from 'react-helmet-async';

interface SchemaJSONProps {
    type: 'LocalBusiness' | 'Organization' | 'Service' | 'Article' | 'BreadcrumbList' | 'FAQPage' | 'CollectionPage';
    data: Record<string, any>;
}

export function SchemaJSON({ type, data }: SchemaJSONProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': type,
        ...data
    };

    return (
        <Helmet>
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
        </Helmet>
    );
}
