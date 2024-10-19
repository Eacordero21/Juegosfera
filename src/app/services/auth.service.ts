import { Injectable } from '@angular/core';
import { 
  Auth, 
  User, 
  createUserWithEmailAndPassword, 
  updateProfile, 
  signInWithEmailAndPassword, 
  signOut, 
  setPersistence, 
  browserLocalPersistence, 
  onAuthStateChanged, 
  browserSessionPersistence, 
  signInWithPopup, 
  GoogleAuthProvider,
  UserCredential
} from '@angular/fire/auth';
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

  async signInWithGoogle(): Promise<{ user: User | null; error: string | null }> {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential: UserCredential = await signInWithPopup(this.auth, provider);

    const user = userCredential.user;
    const additionalUserInfo = (userCredential as any).additionalUserInfo;
    
    // Optional: Create a user profile in Firestore if the user is new
    if (additionalUserInfo?.isNewUser && user) {
      await this.createUserProfileInFirestore(user.uid, user.email as string, user.displayName as string);
    }

    console.log('Google sign-in successful:', user);
    return { user, error: null };
  } catch (error: any) {
    console.error('Google sign-in error:', error.message);
    return { user: null, error: error.message || 'Google sign-in failed' };
  }
}

  // Sign-up with email and password
  async signUp(email: string, password: string, username: string): Promise<string | null> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;
  
      // Update profile with username
      await updateProfile(user, { displayName: username });
      
      // Save user data in Firestore
      await this.createUserProfileInFirestore(user.uid, email, username);
  
      // Optionally sign the user out immediately after registration
      await this.signOut(); 
  
      console.log('User signed up and signed out:', user);
      return null; // Success
    } catch (error) {
      console.error('Error signing up:', error);
      return ""; // Return error message
    }
  }

  // Create user profile in Firestore
  private async createUserProfileInFirestore(uid: string, email: string, username: string) {
    const userRef = doc(this.firestore, `users/${uid}`);
    await setDoc(userRef, {
      uid,
      email,
      username,
      createdAt: new Date(),
    });
  }

  // Email and password sign-in
  async signIn(email: string, password: string): Promise<{ user: User | null; error: string | null }> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      console.log('User signed in:', userCredential.user);
      return { user: userCredential.user, error: null };
    } catch (error: any) {
      console.error('Login error:', error.message);
      return { user: null, error: error.message || 'Login failed' };
    }
  }
  
  // Sign out
  async signOut(): Promise<void> {
    try {
      await signOut(this.auth);
      console.log('User signed out');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }

  // Listen for auth state changes
  authStateListener() {
    onAuthStateChanged(this.auth, (user) => {
      this.currentUser = user;
      console.log(user ? 'User is logged in:' : 'User is logged out', user);
    });
  }

  // Set authentication persistence
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
