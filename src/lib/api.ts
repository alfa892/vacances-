import { StoryResponse, BudgetResponse, FeatureFlagsResponse, SearchResult } from '@/app/api/data/types';

const getBaseUrl = () => {
    if (typeof window !== 'undefined') return ''; // Browser should use relative path
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR on Vercel
    return 'http://localhost:3000'; // SSR locally
};

const API_BASE = getBaseUrl();

async function fetchJson<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = endpoint.startsWith('http') ? endpoint : `${API_BASE}${endpoint}`;
    const res = await fetch(url, options);
    if (!res.ok) {
        throw new Error(`Failed to fetch ${endpoint}: ${res.status} ${res.statusText}`);
    }
    return res.json();
}

export async function getStory(): Promise<StoryResponse> {
    // Cache for 1 hour (SSG-like behavior with revalidation)
    return fetchJson<StoryResponse>('/api/story', { next: { revalidate: 3600 } });
}

export async function getBudget(): Promise<BudgetResponse> {
    // Cache for 1 hour
    return fetchJson<BudgetResponse>('/api/budget', { next: { revalidate: 3600 } });
}

export async function getFeatureFlags(): Promise<FeatureFlagsResponse> {
    // No cache for feature flags to allow quick toggles, or short cache
    return fetchJson<FeatureFlagsResponse>('/api/feature-flags', { cache: 'no-store' });
}

export async function search(query: string, limit = 12): Promise<SearchResult[]> {
    if (!query) return [];
    const params = new URLSearchParams({ q: query, limit: limit.toString() });
    return fetchJson<SearchResult[]>(`/api/search?${params.toString()}`);
}

export type TrackingEvent = {
    event: string;
    path?: string;
    dayId?: string;
    city?: string;
    device?: string;
    props?: Record<string, any>;
};

export async function track(data: TrackingEvent): Promise<void> {
    try {
        await fetch('/api/track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
    } catch (err) {
        // Ignore tracking errors (fire and forget)
        console.warn('Tracking failed:', err);
    }
}
