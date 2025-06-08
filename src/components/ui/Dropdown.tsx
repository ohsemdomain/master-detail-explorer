import type React from 'react'
import { memo, useState } from 'react'

interface DropdownOption {
	value: string
	label: string
	disabled?: boolean
}

interface DropdownProps {
	trigger: React.ReactNode
	options: DropdownOption[]
	onSelect: (value: string) => void
	selectedValue?: string
	className?: string
	menuClassName?: string
	placement?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'
}

const Dropdown = ({
	trigger,
	options,
	onSelect,
	selectedValue,
	className = '',
	menuClassName = '',
	placement = 'bottom-left',
}: DropdownProps): React.ReactNode => {
	const [isOpen, setIsOpen] = useState(false)

	const handleToggle = () => {
		setIsOpen(!isOpen)
	}

	const handleOptionClick = (value: string, disabled?: boolean) => {
		if (disabled) return
		onSelect(value)
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

	const getMenuPlacementClass = () => {
		switch (placement) {
			case 'bottom-right':
				return 'right-0 mt-2'
			case 'top-left':
				return 'left-0 bottom-full mb-2'
			case 'top-right':
				return 'right-0 bottom-full mb-2'
			default: // bottom-left
				return 'left-0 mt-2'
		}
	}

	return (
		<div className={`relative ${className}`}>
			{/* Trigger */}
			<div onClick={handleToggle} role="button" tabIndex={0} onKeyDown={handleKeyDown}>
				{trigger}
			</div>

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

					{/* Options Panel */}
					<div
						className={`
							absolute z-20 min-w-full bg-white rounded-md shadow-lg border border-gray-200 py-1 max-h-60 overflow-auto
							${getMenuPlacementClass()}
							${menuClassName}
						`}
						role="menu"
					>
						{options.map((option) => (
							<button
								key={option.value}
								type="button"
								onClick={() => handleOptionClick(option.value, option.disabled)}
								disabled={option.disabled}
								className={`
									w-full text-left px-3 py-2 text-sm transition-colors duration-150
									${option.disabled 
										? 'text-gray-400 cursor-not-allowed' 
										: option.value === selectedValue
											? 'bg-primary-50 text-primary-700'
											: 'text-gray-700 hover:bg-gray-100'
									}
								`}
								role="menuitem"
							>
								{option.label}
							</button>
						))}
					</div>
				</>
			)}
		</div>
	)
}

export default memo(Dropdown)