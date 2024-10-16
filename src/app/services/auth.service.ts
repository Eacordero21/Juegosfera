import { Injectable } from '@angular/core';
import { Auth, User, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut, setPersistence, browserLocalPersistence, onAuthStateChanged, browserSessionPersistence } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser: User | null = null;
  loading: boolean = false;

  constructor(private auth: Auth, private firestore: Firestore) {
    // Listen for changes in auth state (e.g., login/logout)
    this.authStateListener();
  }

  authStateListener() {
    // Subscribe to the auth state
    onAuthStateChanged(this.auth, (user) => {
      this.currentUser = user;
      console.log(user ? 'User is logged in:' : 'User is logged out', user);
    });
  }

  async signUp(email: string, password: string, username: string): Promise<string | null> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: username });
      await this.createUserProfileInFirestore(user.uid, email, username);

      console.log('User signed up and profile updated:', user);
      return null; // Success
    } catch (error) {
      console.error('Error signing up:', error);
      return ""; // Return error message
    }
  }

  private async createUserProfileInFirestore(uid: string, email: string, username: string) {
    const userRef = doc(this.firestore, `users/${uid}`);
    await setDoc(userRef, {
      uid,
      email,
      username,
      createdAt: new Date(),
    });
  }

  async signIn(email: string, password: string): Promise<{ user: User | null; error: string | null }> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      return { user: userCredential.user, error: null }; // Return user object
    } catch (error) {
      console.error('Login error:', error);
      return { user: null, error: "" }; // Return error message
    }
    
  }

  async signOut(): Promise<void> {
    try {
      await signOut(this.auth);
      console.log('User signed out');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }
  

  async setAuthPersistence(persistenceType: 'local' | 'session') {
    try {
      const persistence = persistenceType === 'local' ? browserLocalPersistence : browserSessionPersistence;
      await setPersistence(this.auth, persistence);
      console.log(`Session persistence set to ${persistenceType.toUpperCase()}`);
    } catch (error) {
      console.error('Error setting persistence:', error);
    }
  }
}
