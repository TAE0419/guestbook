import { create } from 'zustand';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut, 
  updateProfile 
} from 'firebase/auth';
import { auth } from '../../firebase';

const useAuthStore = create((set) => ({
  user: null,
  nickname: null,
  loading: true,
  setUser: (user) => set({ user }),
  setNickname: (nickname) => set({ nickname }),
  setLoading: (loading) => set({ loading }),

  login: async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const user = result.user;
    
    // 서버에서 최신 프로필 정보를 강제로 다시 불러옵니다.
    await user.reload(); 
    
    set({ 
      user: auth.currentUser, 
      nickname: auth.currentUser.displayName 
    });
    
    return auth.currentUser;
  },

  signup: async (email, password, nickname) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    
    // 1. 프로필 업데이트
    await updateProfile(result.user, { displayName: nickname });
    
    // 2. 업데이트 후 서버에서 즉시 데이터를 다시 불러옵니다.
    await result.user.reload();
    
    // 3. 갱신된 데이터를 상태에 저장
    set({ user: result.user, nickname: result.user.displayName });
    return result.user;
  },

  logout: async () => {
    await firebaseSignOut(auth);
    set({ user: null, nickname: null });
  },

  initializeAuth: () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        await user.reload();
        set({ 
          user: auth.currentUser, 
          nickname: auth.currentUser.displayName, 
          loading: false 
        });
      } else {
        set({ user: null, nickname: null, loading: false });
      }
    });
  },
}));

export default useAuthStore;