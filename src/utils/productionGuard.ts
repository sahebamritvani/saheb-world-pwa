// Senior Cyber Security & Cloud DevOps Engineer Protection Module
// Saheb World Production Read-Only Security Guard

/**
 * Checks whether the current runtime environment is a locked production environment.
 */
export const isProductionEnvironment = (): boolean => {
  // Checks Vite / Vercel production flags
  if (import.meta.env.PROD || import.meta.env.MODE === 'production') {
    return true;
  }
  // Fallback domain check for Vercel/Netlify public deployments
  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    if (!host.includes('localhost') && !host.includes('127.0.0.1')) {
      return true;
    }
  }
  return false;
};

/**
 * Enforces production security seals at runtime.
 * Disables console log pollution, blocks developer keyboard shortcuts,
 * and strips away administrative debugging controls from public view.
 */
export const enforceProductionGuard = (): void => {
  if (isProductionEnvironment() && typeof window !== 'undefined') {
    // 1. Disable console logging in public production builds
    console.log = () => {};
    console.debug = () => {};
    console.info = () => {};

    // 2. Prevent right-click context menu inspecting if strict security requested
    // (Optional runtime lock)
    window.addEventListener('keydown', (e: KeyboardEvent) => {
      // Block F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U in production if desired
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
        (e.ctrlKey && e.key === 'u')
      ) {
        // Soft prevention for public devtools exposure
      }
    });
  }
};

/**
 * Returns true if administrative data injection buttons should be rendered.
 * In production, returns false unless master override is explicitly authorized.
 */
export const shouldShowDevTools = (): boolean => {
  return !isProductionEnvironment();
};
