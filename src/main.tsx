import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { LanguageProvider } from './context/LanguageContext';
import { enforceProductionGuard } from './utils/productionGuard';

// Force purge stale PWA caches on client load
if (typeof window !== 'undefined' && 'caches' in window) {
  caches.keys().then((keys) => {
    keys.forEach((key) => {
      if (key.includes('workbox') || key.includes('scriptures') || key.includes('media')) {
        caches.delete(key);
      }
    });
  });
}

enforceProductionGuard();

createRoot(document.getElementById('root')!).render(
  <LanguageProvider>
    <App />
  </LanguageProvider>
);
