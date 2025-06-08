import type React from 'react'
import { memo } from 'react'
import { Dropdown } from '../../ui'

interface UserMenuProps {
	className?: string
}

const UserMenu = ({ className = '' }: UserMenuProps): React.ReactNode => {
	// Mock user data - will be replaced with real data later
	const user = {
		name: 'John Doe',
		email: 'john.doe@example.com',
		initials: 'JD',
	}

	const handleMenuAction = (action: string) => {
		switch (action) {
			case 'logout':
				// Logout logic will be implemented later
				console.log('Logout clicked')
				break
			case 'profile':
				console.log('Profile clicked')
				break
			case 'account':
				console.log('Account clicked')
				break
			case 'help':
				console.log('Help clicked')
				break
			default:
				break
		}
	}

	const trigger = (
		<button
			type="button"
			className="flex items-center gap-3 p-2 text-sm bg-white border border-gray-300 rounded-lg transition-colors duration-150"
			aria-label="User menu"
		>
			{/* Avatar */}
			<div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
				{user.initials}
			</div>

			{/* User Name (hidden on mobile) */}
			<span className="hidden sm:block text-gray-700 font-medium">
				{user.name}
			</span>

			{/* Dropdown Arrow */}
			<svg
				className="w-4 h-4 text-gray-400"
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
	)

	const menuOptions = [
		{ value: 'profile', label: 'Profile Settings' },
		{ value: 'account', label: 'Account Settings' },
		{ value: 'help', label: 'Help & Support' },
		{ value: 'logout', label: 'Sign Out' },
	]

	return (
		<Dropdown
			trigger={trigger}
			options={menuOptions}
			onSelect={handleMenuAction}
			placement="bottom-right"
			className={className}
			menuClassName="w-64"
		/>
	)
}

export default memo(UserMenu)
