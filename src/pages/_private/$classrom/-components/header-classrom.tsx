import { useState } from 'react'
import { Link, useLocation } from '@tanstack/react-router'
import {
  BookOpen,
  ClipboardList,
  Home,
  Menu,
  MessageCircle,
  X,
} from 'lucide-react'
import { useUser } from '@clerk/clerk-react'
import { UnreadMessagesBadge } from './cout-messages'
import { cn } from '@/lib/utils'
import { UsersIcon } from '@/components/icons'

export function HeaderClassrom() {
  const { user } = useUser()
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  if (!user) return null

  const navItems = [
    {
      label: 'Home',
      href: '/$classrom/dashboard',
      icon: Home,
      match: '/dashboard',
    },
    {
      label: 'Notícias',
      href: '/$classrom/news',
      icon: BookOpen,
      match: '/news',
    },
    {
      label: 'Chat',
      href: '/$classrom/chat',
      icon: MessageCircle,
      match: '/chat',
    },
    {
      label: 'Alunos',
      href: '/$classrom/students',
      icon: UsersIcon,
      match: '/students',
    },
    {
      label: 'Tarefas',
      href: '/$classrom/task',
      icon: ClipboardList,
      match: '/task',
    },
  ]

  return (
    <div className="w-full relative z-50">
      <div className="flex items-center justify-between h-16 px-4 md:px-8">
        <div className="flex items-center space-x-4 md:hidden">
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            className="text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue"
          >
            {menuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map(({ label, href, icon: Icon, match }) => {
            return (
              <Link
                key={label}
                to={href}
                params={{ classrom: '123' }}
                className={cn(
                  'flex items-center space-x-2 text-gray-600 transition-colors hover:text-blue-dark',
                  {
                    'text-blue font-semibold border-b border-b-blue':
                      pathname.includes(match),
                    hidden:
                      user.unsafeMetadata.role === 'MEMBER' &&
                      label === 'Alunos',
                  },
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
                {label === 'Chat' && <UnreadMessagesBadge />}
              </Link>
            )
          })}
        </nav>
      </div>

      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 bg-white shadow-lg border-t border-gray-200 z-50">
          <nav className="flex flex-col space-y-3 p-4 w-64">
            {navItems.map(({ label, href, icon: Icon, match }, i) => (
              <Link
                key={label}
                to={href}
                params={{ classrom: '123' }}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  'flex items-center space-x-2 text-gray-700 px-3 py-2 rounded hover:bg-gray-100 transition-colors',
                  {
                    'text-blue font-semibold bg-blue/10':
                      pathname.includes(match),
                    'border-b': i < navItems.length - 1,
                  },
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  )
}
