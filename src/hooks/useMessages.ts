import { useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'
import { supabase } from '@/lib/supabase'
import { useUnreadStore } from '@/stores/useCountMessage'

const audio = new Audio('/assets/notification.wav')

export function useMessageRealtime() {
  const { user } = useUser()
  const increment = useUnreadStore((state) => state.increment)

  useEffect(() => {
    const subscription = supabase
      .channel('public:messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
        },
        (payload) => {
          if (user?.firstName !== payload.new.username) {
            increment()
            audio.play()
          }
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(subscription)
    }
  }, [])
}
