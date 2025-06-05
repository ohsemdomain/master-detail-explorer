import type React from 'react'
import { memo, useState } from 'react'
import { SearchIcon, XIcon } from '../../Icons'

interface SearchInputProps {
	placeholder?: string
	className?: string
}

const SearchInput = ({
	placeholder = 'Search...',
	className = '',
}: SearchInputProps): React.ReactNode => {
	const [searchTerm, setSearchTerm] = useState('')

	const handleClear = () => {
		setSearchTerm('')
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	return (
		<div className={`relative ${className}`}>
			<div className="relative">
				{/* Search Icon */}
				<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
					<SearchIcon className="h-5 w-5 text-gray-400" aria-label="Search" />
				</div>

				{/* Input Field */}
				<input
					type="text"
					value={searchTerm}
					onChange={handleChange}
					placeholder={placeholder}
					className="
            block w-full pl-10 pr-10 py-2.5 
            border border-gray-300 rounded-lg
            bg-gray-50 text-gray-900 text-sm
            placeholder-gray-500
            focus:ring-primary-500 focus:border-primary-500
            focus:bg-white
            transition-colors duration-200
          "
					aria-label="Search input"
				/>

				{/* Clear Button */}
				{searchTerm && (
					<div className="absolute inset-y-0 right-0 pr-3 flex items-center">
						<button
							type="button"
							onClick={handleClear}
							className="
                p-1 text-gray-400 hover:text-gray-600
                rounded-full hover:bg-gray-100
                transition-colors duration-150
              "
							aria-label="Clear search"
						>
							<XIcon className="h-4 w-4" />
						</button>
					</div>
				)}
			</div>
		</div>
	)
}

export default memo(SearchInput)
