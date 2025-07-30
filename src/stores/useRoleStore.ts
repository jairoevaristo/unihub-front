import { create } from 'zustand'

interface RoleState {
  role: 'ADMIN' | 'MEMBER' | null
  setRole: (role: 'ADMIN' | 'MEMBER') => void
}

export const useRoleStore = create<RoleState>((set) => ({
  role: null,
  setRole: () => set((state) => ({ role: state.role })),
}))
