import { create } from 'zustand'
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut as firebaseSignOut } from 'firebase/auth'
import { auth } from '../../firebase'

const useAuthStore = create((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  login: async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password)
    return result.user
  },
  signup: async (email, password) => {
    const result = await createUserWithEmailAndPassword(auth, email, password)
    return result.user
  },
  logout: async () => {
    await firebaseSignOut(auth)
  },
  initializeAuth: () => {
    onAuthStateChanged(auth, (user) => {
      set({ user, loading: false })
    })
  },
}))

export default useAuthStore
