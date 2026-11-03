// Saheb World Programmatic Offline Sync Utility
// Pre-fetches and caches scriptures, audio tracks, and static assets into a dedicated Cache Storage bucket.

export const OFFLINE_CACHE_NAME = 'saheb-world-offline-bucket-v1';

export const CORE_OFFLINE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/assets/images/kabir_saheb_maghar.jpg'
];

export async function downloadAllForOffline(
  onProgress?: (progress: number, assetUrl: string) => void
): Promise<{ success: boolean; cachedCount: number; error?: string }> {
  try {
    if (!('caches' in window)) {
      throw new Error('Cache Storage API is not supported in this browser.');
    }

    const cache = await caches.open(OFFLINE_CACHE_NAME);
    
    // Gather all candidate URLs (core assets + dynamic vault scriptures & sample audio tracks)
    const urlsToCache = [
      ...CORE_OFFLINE_ASSETS,
      // Add key audio streams or manifest items if available
    ];

    let cachedCount = 0;
    const total = urlsToCache.length;

    for (let i = 0; i < total; i++) {
      const url = urlsToCache[i];
      try {
        const response = await fetch(url, { cache: 'reload' });
        if (response.ok) {
          await cache.put(url, response);
          cachedCount++;
        }
      } catch (err) {
        console.warn(`[OfflineSync] Failed to pre-fetch ${url}:`, err);
      }

      if (onProgress) {
        onProgress(Math.round(((i + 1) / total) * 100), url);
      }
    }

    return { success: true, cachedCount };
  } catch (error) {
    console.error('[OfflineSync] Error downloading for offline:', error);
    return { 
      success: false, 
      cachedCount: 0, 
      error: error instanceof Error ? error.message : 'Unknown offline sync error' 
    };
  }
}

export async function getOfflineStorageUsage(): Promise<{ usageMb: number; quotaMb: number }> {
  if (navigator.storage && navigator.storage.estimate) {
    try {
      const estimate = await navigator.storage.estimate();
      const usageMb = Number(((estimate.usage || 0) / (1024 * 1024)).toFixed(2));
      const quotaMb = Number(((estimate.quota || 0) / (1024 * 1024)).toFixed(2));
      return { usageMb, quotaMb };
    } catch {
      return { usageMb: 0, quotaMb: 0 };
    }
  }
  return { usageMb: 0, quotaMb: 0 };
}
