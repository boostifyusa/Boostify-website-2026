import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        // Evaluate if this is a chunk load or MIME type error
        const isChunkLoadError =
            error.name === 'ChunkLoadError' ||
            error.message.includes('Failed to fetch dynamically imported module') ||
            error.message.includes('Importing a module script failed') ||
            error.message.includes('is not a valid JavaScript MIME type') ||
            error.message.includes('dynamically imported module');

        if (isChunkLoadError) {
            const isReloaded = sessionStorage.getItem('chunk_load_error_reloaded');

            // If we haven't tried reloading yet, trigger a reload immediately
            if (!isReloaded) {
                sessionStorage.setItem('chunk_load_error_reloaded', 'true');
                // We use a small timeout to ensure the state updates, then force reload
                setTimeout(() => {
                    window.location.reload();
                }, 100);

                // Return no error state temporarily while we reload
                return { hasError: false, error: null };
            }
        }

        // Standard error handling or if we already tried to reload
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
    }

    public componentDidMount() {
        // Clear the reload flag if we successfully mounted
        if (sessionStorage.getItem('chunk_load_error_reloaded')) {
            // Small delay to ensure we're stable before clearing the flag
            setTimeout(() => {
                sessionStorage.removeItem('chunk_load_error_reloaded');
            }, 2000);
        }
    }

    public render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            const isChunkLoadError =
                this.state.error?.name === 'ChunkLoadError' ||
                this.state.error?.message.includes('Failed to fetch dynamically imported module') ||
                this.state.error?.message.includes('Importing a module script failed') ||
                this.state.error?.message.includes('is not a valid JavaScript MIME type') ||
                this.state.error?.message.includes('dynamically imported module');

            if (isChunkLoadError) {
                // If it's a chunk load error but we already tried reloading once, suggest manual reload
                return (
                    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-white p-6">
                        <h2 className="text-2xl font-bold mb-4 text-orange">Update Available</h2>
                        <p className="text-zinc-400 mb-6 text-center max-w-md">
                            A new version of the application is available. Please reload the page to apply the update.
                        </p>
                        <button
                            onClick={() => {
                                sessionStorage.removeItem('chunk_load_error_reloaded');
                                window.location.reload();
                            }}
                            className="px-6 py-3 bg-orange text-white rounded-full font-medium transition hover:bg-orange/90"
                        >
                            Reload Page
                        </button>
                    </div>
                );
            }

            return (
                <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-white p-6">
                    <h2 className="text-2xl font-bold mb-4 text-red-500">Something went wrong</h2>
                    <p className="text-zinc-400 mb-6 text-center max-w-md">
                        An unexpected error occurred. You can try refreshing the page to fix the issue.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-3 bg-orange text-white rounded-full font-medium transition hover:bg-orange/90"
                    >
                        Reload Page
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
