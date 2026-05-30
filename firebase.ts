import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Graceful check if firebase credentials exist
const hasFirebaseConfig =
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID &&
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

let db: any = null;

if (hasFirebaseConfig) {
  try {
    const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    db = getFirestore(app);
  } catch (error) {
    console.error("Failed to initialize Firebase:", error);
  }
} else {
  if (process.env.NODE_ENV === "production") {
    throw new Error("CRITICAL ERROR: Firebase configuration environment variables (NEXT_PUBLIC_FIREBASE_PROJECT_ID, NEXT_PUBLIC_FIREBASE_API_KEY) are missing in production!");
  } else {
    console.warn("Firebase configuration is missing or incomplete. Using memory fallback for development.");
  }
}

// In-memory fallback usage database for development when Firebase is not configured
const memoryDb: Record<string, { count: number; date: string }> = {};

export async function checkAndUpdateUsage(ipHash: string, limit: number = 5): Promise<{ allowed: boolean; remaining: number }> {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const key = `${ipHash}_${today}`;

  if (!db) {
    // Memory fallback logic
    const current = memoryDb[key] || { count: 0, date: today };
    if (current.count >= limit) {
      return { allowed: false, remaining: 0 };
    }
    current.count += 1;
    memoryDb[key] = current;
    return { allowed: true, remaining: limit - current.count };
  }

  try {
    const { doc, getDoc, setDoc, updateDoc, increment } = await import("firebase/firestore");
    const docRef = doc(db, "usage", key);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      await setDoc(docRef, {
        ipHash,
        date: today,
        count: 1,
      });
      return { allowed: true, remaining: limit - 1 };
    }

    const data = docSnap.data();
    if (data.count >= limit) {
      return { allowed: false, remaining: 0 };
    }

    await updateDoc(docRef, {
      count: increment(1),
    });

    return { allowed: true, remaining: limit - (data.count + 1) };
  } catch (e) {
    console.error("Firestore usage tracking failed, falling back to memory:", e);
    // Fall back to memory
    const current = memoryDb[key] || { count: 0, date: today };
    if (current.count >= limit) {
      return { allowed: false, remaining: 0 };
    }
    current.count += 1;
    memoryDb[key] = current;
    return { allowed: true, remaining: limit - current.count };
  }
}

export async function getDailyUsage(ipHash: string): Promise<{ count: number }> {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const key = `${ipHash}_${today}`;

  if (!db) {
    const current = memoryDb[key] || { count: 0, date: today };
    return { count: current.count };
  }

  try {
    const { doc, getDoc } = await import("firebase/firestore");
    const docRef = doc(db, "usage", key);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      return { count: 0 };
    }
    return { count: docSnap.data().count || 0 };
  } catch (e) {
    console.error("Firestore usage fetching failed, falling back to memory:", e);
    const current = memoryDb[key] || { count: 0, date: today };
    return { count: current.count };
  }
}

export { db };
