import type React from 'react'
import { memo } from 'react'
import SearchInput from './search/SearchInput'
import UserMenu from './user/UserMenu'

interface TopBarProps {
  className?: string
}

const TopBar = ({ className = '' }: TopBarProps): React.ReactNode => {
  return (
    <header
      className={`bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between ${className}`}
    >
      {/* Left Section - Search */}
      <div className="flex-1 max-w-md">
        <SearchInput />
      </div>

      {/* Right Section - User Actions */}
      <div className="flex items-center gap-4">
        <UserMenu />
      </div>
    </header>
  )
}

export default memo(TopBar)