import { UserButton } from '@clerk/clerk-react'
import { Link, useLocation } from '@tanstack/react-router'
import { BellIcon } from './icons'
import { HeaderClassrom } from '@/pages/_private/$classrom/-components/header-classrom'

const ROUTES_SHOW_HEADER = ['chat', 'news', 'task', 'dashboard', 'students']

export default function Header() {
  const { pathname } = useLocation()

  const shouldShowHeader = ROUTES_SHOW_HEADER.some((route) => {
    return pathname.includes(`/123/${route}`)
  })

  if (pathname === '/onboarding') return null

  return (
    <header className="py-4 px-6 flex border-b items-center border-b-gray-200 justify-between">
      <div className="flex items-center md:gap-4">
        <div className="flex md:hidden">
          {shouldShowHeader && <HeaderClassrom />}
        </div>
        <Link to="/" className="font-semibold text-2xl">
          Unihub
        </Link>
        <div className="hidden md:flex">
          {shouldShowHeader && <HeaderClassrom />}
        </div>
      </div>
      <div className="flex items-center gap-5">
        <button className="cursor-pointer relative flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
          <BellIcon className="size-5" />
        </button>
        <UserButton
          appearance={{
            elements: {
              userButtonAvatarBox: '!w-10 !h-10',
            },
          }}
        />
      </div>
    </header>
  )
}
