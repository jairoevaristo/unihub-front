import { create } from 'zustand'

type MessageStore = {
  unseenCount: number
  setUnseenCount: (count: number) => void
  increment: () => void
  clear: () => void
}

export const useUnreadStore = create<MessageStore>((set) => ({
  unseenCount: 0,
  setUnseenCount: (count) => set({ unseenCount: count }),
  increment: () => set((state) => ({ unseenCount: state.unseenCount + 1 })),
  clear: () => set({ unseenCount: 0 }),
}))
