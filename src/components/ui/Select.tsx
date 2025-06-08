import type React from 'react'
import { memo } from 'react'
import Dropdown from './Dropdown'

interface SelectOption {
	value: string
	label: string
	disabled?: boolean
}

interface SelectProps {
	id: string
	name: string
	value: string
	onChange: (value: string) => void
	options: SelectOption[]
	placeholder?: string
	required?: boolean
	disabled?: boolean
	className?: string
	error?: string
}

const Select = ({
	id,
	name,
	value,
	onChange,
	options,
	placeholder = 'Select an option',
	required = false,
	disabled = false,
	className = '',
	error,
}: SelectProps): React.ReactNode => {
	const selectedOption = options.find((option) => option.value === value)

	const trigger = (
		<button
			type="button"
			id={id}
			disabled={disabled}
			className={`
				w-full px-3 py-2 text-left bg-white border rounded-md shadow-sm transition-colors
				${error 
					? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
					: 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'
				}
				${disabled 
					? 'bg-gray-50 text-gray-500 cursor-not-allowed' 
					: 'hover:border-gray-400'
				}
				${className}
			`}
			aria-haspopup="listbox"
			aria-required={required}
		>
			<div className="flex items-center justify-between">
				<span className={selectedOption ? 'text-gray-900' : 'text-gray-500'}>
					{selectedOption ? selectedOption.label : placeholder}
				</span>
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
			</div>
		</button>
	)

	return (
		<div className="w-full">
			<Dropdown
				trigger={trigger}
				options={options}
				onSelect={onChange}
				selectedValue={value}
				menuClassName="min-w-full"
			/>
			
			{/* Hidden input for form submission */}
			<input
				type="hidden"
				name={name}
				value={value}
				required={required}
			/>
			
			{/* Error message */}
			{error && (
				<p className="mt-1 text-sm text-red-600">{error}</p>
			)}
		</div>
	)
}

export default memo(Select)