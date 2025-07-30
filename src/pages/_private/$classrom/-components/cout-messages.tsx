import { useUnreadStore } from '@/stores/useCountMessage'

export function UnreadMessagesBadge() {
  const unreadCount = useUnreadStore((state) => state.unseenCount)

  if (unreadCount === 0) return null

  return (
    <div className="size-5 my-1 text-sm flex items-center justify-center font-semibold rounded-full text-white bg-blue-dark">
      {unreadCount}
    </div>
  )
}
