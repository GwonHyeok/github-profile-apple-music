import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDj8rf6If5LDugpE5GBn8QDRAqQ5TSqIS8',
  authDomain: 'github-profile-apple-music.firebaseapp.com',
  projectId: 'github-profile-apple-music',
  storageBucket: 'github-profile-apple-music.appspot.com',
  messagingSenderId: '204939737976',
  appId: '1:204939737976:web:a1f47d1e63c689ab48e68d',
  measurementId: 'G-5T60BXZVEF',
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const firestore = getFirestore(app);
