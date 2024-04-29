import { useState, useEffect } from 'react';


/*
*   const [loading, error] = useScript({
        src: 'https://js.stripe.com/v3/',
        onload: () => console.log('Script loaded!'),
        checkForExisting: true,
    });
*
*   if (loading) return <h3>Loading Stripe API...</h3>;
*   if (error) return <h3>Failed to load Stripe API: {error.message}</h3>;
*
*
*   https://github.com/hupe1980/react-script-hook/blob/master/src/use-script.tsx
*/

export default function useScript({
    src,
    checkForExisting = false,
    ...attributes
}) {
    const [loading, setLoading] = useState(Boolean(src));
    const [error, setError] = useState<ErrorState>(null);

    useEffect(() => {
        if (!isBrowser || !src) return;

        if (checkForExisting) {
            const existing = document.querySelector(`script[src="${src}"]`);
            if (existing) {
                setLoading(existing.getAttribute('data-status') === 'loading');
                return;
            }
        }

        const scriptEl = document.createElement('script');
        scriptEl.setAttribute('src', src);
        scriptEl.setAttribute('data-status', 'loading');

        Object.keys(attributes).forEach((key) => {
            if (scriptEl[key] === undefined) {
                scriptEl.setAttribute(key, attributes[key]);
            } else {
                scriptEl[key] = attributes[key];
            }
        });

        const handleLoad = () => {
            scriptEl.setAttribute('data-status', 'ready');
            setLoading(false);
        };
        const handleError = ( error ) => {
            scriptEl.setAttribute('data-status', 'error');
            setError(error);
        };

        scriptEl.addEventListener('load', handleLoad);
        scriptEl.addEventListener('error', handleError);

        document.body.appendChild(scriptEl);

        return () => {
            scriptEl.removeEventListener('load', handleLoad);
            scriptEl.removeEventListener('error', handleError);
        };
        // we need to ignore the attributes as they're a new object per call, so we'd never skip an effect call
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [src]);

    return [loading, error];
}

const isBrowser =
    typeof window !== 'undefined' && typeof window.document !== 'undefined';