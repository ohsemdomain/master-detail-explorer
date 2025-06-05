import type React from 'react'
import { memo, useState } from 'react'

interface UserMenuProps {
	className?: string
}

const UserMenu = ({ className = '' }: UserMenuProps): React.ReactNode => {
	const [isOpen, setIsOpen] = useState(false)

	// Mock user data - will be replaced with real data later
	const user = {
		name: 'John Doe',
		email: 'john.doe@example.com',
		initials: 'JD',
	}

	const toggleMenu = () => {
		setIsOpen(!isOpen)
	}

	const handleLogout = () => {
		// Logout logic will be implemented later
		console.log('Logout clicked')
		setIsOpen(false)
	}

	const handleKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === 'Escape') {
			setIsOpen(false)
		}
	}

	const handleBackdropClick = () => {
		setIsOpen(false)
	}

	return (
		<div className={`relative ${className}`}>
			{/* User Avatar Button */}
			<button
				type="button"
				onClick={toggleMenu}
				className="
          flex items-center gap-3 p-2 text-sm
          bg-white border border-gray-300 rounded-lg
          hover:bg-gray-50 focus:ring-2 focus:ring-primary-500
          transition-colors duration-150
        "
				aria-label="User menu"
				aria-expanded={isOpen}
			>
				{/* Avatar */}
				<div
					className="
          w-8 h-8 bg-primary-600 rounded-full
          flex items-center justify-center
          text-white text-sm font-medium
        "
				>
					{user.initials}
				</div>

				{/* User Name (hidden on mobile) */}
				<span className="hidden sm:block text-gray-700 font-medium">
					{user.name}
				</span>

				{/* Dropdown Arrow */}
				<svg
					className={`w-4 h-4 text-gray-400 transition-transform duration-150 ${
						isOpen ? 'rotate-180' : ''
					}`}
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					aria-hidden="true"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M19 9l-7 7-7-7"
					/>
				</svg>
			</button>

			{/* Dropdown Menu */}
			{isOpen && (
				<>
					{/* Backdrop */}
					<div
						className="fixed inset-0 z-10"
						onClick={handleBackdropClick}
						onKeyDown={handleKeyDown}
						aria-hidden="true"
						role="button"
						tabIndex={-1}
					/>

					{/* Menu Panel */}
					<div
						className="
            absolute right-0 mt-2 w-64 z-20
            bg-white rounded-lg shadow-lg border border-gray-200
            py-2
          "
					>
						{/* User Info */}
						<div className="px-4 py-3 border-b border-gray-100">
							<p className="text-sm font-medium text-gray-900">{user.name}</p>
							<p className="text-sm text-gray-500">{user.email}</p>
						</div>

						{/* Menu Items */}
						<div className="py-1">
							<button
								type="button"
								className="
                  w-full text-left px-4 py-2 text-sm text-gray-700
                  hover:bg-gray-100 transition-colors duration-150
                "
								onClick={() => setIsOpen(false)}
							>
								Profile Settings
							</button>

							<button
								type="button"
								className="
                  w-full text-left px-4 py-2 text-sm text-gray-700
                  hover:bg-gray-100 transition-colors duration-150
                "
								onClick={() => setIsOpen(false)}
							>
								Account Settings
							</button>

							<button
								type="button"
								className="
                  w-full text-left px-4 py-2 text-sm text-gray-700
                  hover:bg-gray-100 transition-colors duration-150
                "
								onClick={() => setIsOpen(false)}
							>
								Help & Support
							</button>
						</div>

						{/* Logout */}
						<div className="border-t border-gray-100 py-1">
							<button
								type="button"
								onClick={handleLogout}
								className="
                  w-full text-left px-4 py-2 text-sm text-red-700
                  hover:bg-red-50 transition-colors duration-150
                "
							>
								Sign Out
							</button>
						</div>
					</div>
				</>
			)}
		</div>
	)
}

export default memo(UserMenu)
