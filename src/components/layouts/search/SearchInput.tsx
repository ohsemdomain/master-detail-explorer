import type React from 'react'
import { memo, useEffect, useRef, useState } from 'react'
import { SearchIcon, XIcon } from '../../Icons'
import { useSearchContext } from './useSearchContext'

interface SearchInputProps {
	className?: string
}

const SearchInput = ({ className = '' }: SearchInputProps): React.ReactNode => {
	const [searchTerm, setSearchTerm] = useState('')
	const inputRef = useRef<HTMLInputElement>(null)
	const searchContext = useSearchContext()

	const handleClear = () => {
		setSearchTerm('')
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	// Keyboard shortcut support
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			// Check for "/" key to focus search (like GitHub, Twitter, etc.)
			if (
				event.key === searchContext.shortcut &&
				!event.ctrlKey &&
				!event.metaKey
			) {
				// Only trigger if not already focused on an input/textarea
				const activeElement = document.activeElement
				const isInputFocused =
					activeElement?.tagName === 'INPUT' ||
					activeElement?.tagName === 'TEXTAREA' ||
					activeElement?.getAttribute('contenteditable') === 'true'

				if (!isInputFocused) {
					event.preventDefault()
					inputRef.current?.focus()
				}
			}
		}

		document.addEventListener('keydown', handleKeyDown)
		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [searchContext.shortcut])

	return (
		<div className={`relative ${className}`}>
			<div className="relative">
				{/* Search Icon */}
				<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
					<SearchIcon className="h-5 w-5 text-gray-400" aria-label="Search" />
				</div>

				{/* Input Field */}
				<input
					ref={inputRef}
					type="text"
					value={searchTerm}
					onChange={handleChange}
					placeholder={searchContext.placeholder}
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
