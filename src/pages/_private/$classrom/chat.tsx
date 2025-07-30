import { useEffect, useRef, useState } from 'react'
import { Send, User } from 'lucide-react'
import { useUser } from '@clerk/clerk-react'
import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ProtectedRoute } from '@/components/protected-router'
import { cn } from '@/lib/utils'
import { supabase } from '@/lib/supabase'
import { useUnreadStore } from '@/stores/useCountMessage'

interface Message {
  id: string
  content: string
  username: string
  created_at: string
  role: 'ADMIN' | 'MEMBER'
}

export const Route = createFileRoute('/_private/$classrom/chat')({
  component: () => (
    <ProtectedRoute>
      <ChatPage />
    </ProtectedRoute>
  ),
})

function ChatPage() {
  const { user } = useUser()
  const setUnreadCount = useUnreadStore((state) => state.setUnseenCount)
  const [messages, setMessages] = useState<Array<Message>>([])
  const [newMessage, setNewMessage] = useState('')
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const notificationAudioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    const markAllAsRead = async () => {
      const { data: messages } = await supabase.from('messages').select('id')

      const inserts = messages?.map((m) => ({
        message_id: m.id,
        user_id: user?.id,
        read_at: new Date().toISOString(),
      }))

      await supabase.from('message_reads').upsert(inserts, {
        onConflict: 'message_id, user_id',
      })

      setUnreadCount(0)
    }

    markAllAsRead()
  }, [])

  useEffect(() => {
    if (!user) return

    const updateLastSeen = async () => {
      await supabase
        .from('last_seen_chat')
        .upsert({ user_id: user.id, last_seen: new Date().toISOString() })
    }

    updateLastSeen()
  }, [user])

  useEffect(() => {
    fetchMessages()

    const subscription = supabase
      .channel('messages-room')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => {
          const newMsg = payload.new as Message
          setMessages((prev) => [...prev, newMsg])

          notificationAudioRef.current?.play().catch(() => {})
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(subscription)
    }
  }, [])

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: true })
    if (data) setMessages(data)
  }

  const sendMessage = async () => {
    if (!newMessage.trim()) return
    await supabase.from('messages').insert({
      content: newMessage,
      username: user?.firstName,
      role: user?.unsafeMetadata.role,
    })
    setNewMessage('')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="space-y-6 px-4 sm:px-0">
      <div>
        <h1 className="text-3xl font-bold">Chat da Turma</h1>
        <p className="text-gray-600">
          Converse com professores e colegas em tempo real
        </p>
      </div>

      <Card className="flex flex-col min-h-[60vh] max-h-[75vh]">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Chat Geral</span>
            <span className="text-sm font-normal text-gray-500">
              ({messages.length} mensagens)
            </span>
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col flex-1 space-y-4 overflow-hidden h-full">
          <ScrollArea
            className="flex-1 pr-4 overflow-y-auto max-h-[60vh]"
            ref={scrollAreaRef}
          >
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.username === user?.firstName
                      ? 'justify-end'
                      : 'justify-start'
                  }`}
                >
                  <div
                    className={cn(
                      'rounded-lg p-3',
                      'sm:max-w-[85%] max-w-[95%]',
                      message.username === user?.firstName
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-gray-100',
                    )}
                  >
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-sm font-medium">
                        {message.username}
                      </span>
                      <span
                        className={cn(
                          'text-xs px-2 py-1 rounded',
                          message.role === 'ADMIN'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-green-100 text-green-800',
                        )}
                      >
                        {message.role === 'ADMIN' ? 'Professor' : 'Aluno'}
                      </span>
                      <span className="text-xs opacity-70">
                        {formatTime(message.created_at)}
                      </span>
                    </div>
                    <p className="text-sm break-words">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite sua mensagem..."
              className="flex-1"
            />
            <Button
              onClick={sendMessage}
              disabled={!newMessage.trim()}
              className="sm:w-auto w-full"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
