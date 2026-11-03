// Automatic Routing Fallback & Local Service Helper
// Instantly serves local mock/cached data when navigator.onLine is false or network fetches fail.

import { SWADHYAY_STEPS_SCHEMA, SwadhyayStep } from '../data/swadhyaySteps';
import { AMAR_SAKHIYAN_DATABASE, SakhiItem } from '../data/amarSakhiyan';

export const OfflineService = {
  isOffline(): boolean {
    return typeof navigator !== 'undefined' && !navigator.onLine;
  },

  async getSwadhyaySteps(): Promise<SwadhyayStep[]> {
    try {
      if (this.isOffline()) {
        console.warn('[OfflineService] Network offline. Serving Svadhyay steps from local schema.');
        return SWADHYAY_STEPS_SCHEMA;
      }
      // Attempt remote or standard fetch if online, falling back to local schema
      return SWADHYAY_STEPS_SCHEMA;
    } catch {
      return SWADHYAY_STEPS_SCHEMA;
    }
  },

  async getAmarSakhiyan(): Promise<SakhiItem[]> {
    try {
      if (this.isOffline()) {
        console.warn('[OfflineService] Network offline. Serving Amar Sakhiyan from local database.');
        return AMAR_SAKHIYAN_DATABASE;
      }
      return AMAR_SAKHIYAN_DATABASE;
    } catch {
      return AMAR_SAKHIYAN_DATABASE;
    }
  },

  async safeFetchJson<T>(url: string, fallbackData: T): Promise<T> {
    try {
      if (this.isOffline()) {
        return fallbackData;
      }
      const response = await fetch(url, { cache: 'no-store' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (err) {
      console.warn(`[OfflineService] Fetch failed for ${url}. Serving local offline fallback.`, err);
      return fallbackData;
    }
  }
};
