import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  User,
  UserCredential,
} from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const ADMIN_EMAIL = 'smongia76@gmail.com';

export function isVerifiedAdminUser(user: User | null): boolean {
  if (!user || !user.email) return false;
  return Boolean(user.emailVerified && user.email.toLowerCase() === ADMIN_EMAIL);
}

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export interface GoogleLoginResult {
  credential: UserCredential | null;
  redirected: boolean;
}

export function isInIframe(): boolean {
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
}

export function getFirebaseAuthErrorMessage(error: unknown, lang: 'hi' | 'pa' | 'en'): { message: string; code: string; suggestExternalTab: boolean } {
  const code =
    typeof error === 'object' && error !== null && 'code' in error
      ? String((error as { code?: unknown }).code || '')
      : '';
  const hostname = typeof window !== 'undefined' ? window.location.hostname : '';

  if (code === 'auth/popup-blocked' || code === 'auth/operation-not-supported-in-this-environment') {
    return {
      code,
      suggestExternalTab: isInIframe(),
      message:
        lang === 'pa'
          ? 'ਬ੍ਰਾਊਜ਼ਰ ਨੇ Google ਸਾਈਨ-ਇਨ ਪੌਪ-ਅੱਪ ਬਲੌਕ ਕੀਤਾ ਹੈ। ਕਿਰਪਾ ਕਰਕੇ ਪੌਪ-ਅੱਪ ਦੀ ਇਜਾਜ਼ਤ ਦਿਓ ਜਾਂ ਨਵੇਂ ਟੈਬ ਵਿੱਚ ਖੋਲ੍ਹੋ।'
          : lang === 'en'
          ? 'Sign-in popup was blocked by your browser/environment. Please allow popups or open in a browser tab.'
          : 'ब्राउज़र ने Google साइन-इन पॉप-अप ब्लॉक कर दिया है। कृपया पॉप-अप की अनुमति दें या ऐप को नए ब्राउज़र टैब में खोलें।',
    };
  }

  if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') {
    return {
      code,
      suggestExternalTab: false,
      message:
        lang === 'pa'
          ? 'ਸਾਈਨ-ਇਨ ਵਿੰਡੋ ਬੰਦ ਹੋ ਗਈ ਸੀ। ਕਿਰਪਾ ਕਰਕੇ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।'
          : lang === 'en'
          ? 'Google sign-in window was closed before completing. Please try again.'
          : 'साइन-इन विंडो पूरी होने से पहले बंद हो गई। कृपया पुनः प्रयास करें।',
    };
  }

  if (code === 'auth/unauthorized-domain') {
    return {
      code,
      suggestExternalTab: false,
      message:
        lang === 'pa'
          ? `ਇਹ ਡੋਮੇਨ (${hostname}) Firebase Authorized Domains ਵਿੱਚ ਸ਼ਾਮਲ ਨਹੀਂ ਹੈ।`
          : lang === 'en'
          ? `Domain (${hostname}) is not in Firebase Authentication Authorized Domains.`
          : `यह डोमेन (${hostname}) Firebase Authorized Domains में पंजीकृत नहीं है। कृपया Firebase Console में इसे जोड़ें।`,
    };
  }

  if (code === 'auth/operation-not-allowed') {
    return {
      code,
      suggestExternalTab: false,
      message:
        lang === 'pa'
          ? 'Firebase Console ਵਿੱਚ Google Sign-In ਚਾਲੂ ਨਹੀਂ ਹੈ।'
          : lang === 'en'
          ? 'Google Sign-In provider is not enabled in Firebase Authentication.'
          : 'Firebase Authentication में Google Sign-In सक्षम नहीं है।',
    };
  }

  if (code === 'auth/network-request-failed') {
    return {
      code,
      suggestExternalTab: false,
      message:
        lang === 'pa'
          ? 'ਇੰਟਰਨੈੱਟ ਕਨੈਕਸ਼ਨ ਕਮਜ਼ੋਰ ਹੈ। ਕਿਰਪਾ ਕਰਕੇ ਨੈੱਟਵਰਕ ਜਾਂਚੋ।'
          : lang === 'en'
          ? 'Network error during sign-in. Please check your internet connection.'
          : 'इंटरनेट कनेक्शन त्रुटि। कृपया नेटवर्क की जांच कर पुनः प्रयास करें।',
    };
  }

  const rawMsg = error instanceof Error ? error.message : String(error || '');
  return {
    code: code || 'auth/unknown',
    suggestExternalTab: isInIframe(),
    message:
      lang === 'pa'
        ? `Google ਸਾਈਨ-ਇਨ ਵਿੱਚ ਸਮੱਸਿਆ ਆਈ${rawMsg ? `: ${rawMsg}` : ''}`
        : lang === 'en'
        ? `Google Sign-In failed${rawMsg ? `: ${rawMsg}` : ''}`
        : `Google साइन-इन विफल रहा${rawMsg ? ` (${code || 'त्रुटि'})` : ''}। कृपया पुनः प्रयास करें।`,
  };
}

export async function checkGoogleRedirectResult(): Promise<UserCredential | null> {
  try {
    return await getRedirectResult(auth);
  } catch (error) {
    console.warn('Google redirect sign-in notice:', error);
    return null;
  }
}

export async function loginWithGoogle(): Promise<GoogleLoginResult> {
  try {
    const credential = await signInWithPopup(auth, googleProvider);
    return { credential, redirected: false };
  } catch (error: unknown) {
    const code =
      typeof error === 'object' && error !== null && 'code' in error
        ? String((error as { code?: unknown }).code || '')
        : '';

    // Outside iframes (e.g. standalone mobile PWA / Chrome Custom Tab / APK WebView),
    // automatically fall back to redirect sign-in if popup is blocked or unsupported.
    if (
      (code === 'auth/popup-blocked' || code === 'auth/operation-not-supported-in-this-environment') &&
      !isInIframe()
    ) {
      await signInWithRedirect(auth, googleProvider);
      return { credential: null, redirected: true };
    }

    console.warn('Google sign-in popup error:', error);
    throw error;
  }
}

export async function logoutUser() {
  try {
    await signOut(auth);
  } catch (error) {
    console.warn('Sign-out error:', error);
  }
}

// Connection test
async function testFirestoreConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error('Please check your Firebase configuration.');
    }
  }
}
testFirestoreConnection();
