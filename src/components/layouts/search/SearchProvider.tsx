import type React from 'react'
import { createContext, useContext, useState } from 'react'

// Search scope based on current route
export type SearchScope = 'products' | 'contacts' | 'global'

// Search result interface for future use
export interface SearchResult {
	id: string
	title: string
	type: SearchScope
	url: string
}

// Context interface
interface SearchContextType {
	searchTerm: string
	searchScope: SearchScope
	isSearching: boolean
	results: SearchResult[]
	// Methods for future implementation
	setSearchTerm: (term: string) => void
	setSearchScope: (scope: SearchScope) => void
	handleSearch: (term: string) => void
	clearSearch: () => void
}

// Default context value
const defaultContextValue: SearchContextType = {
	searchTerm: '',
	searchScope: 'global',
	isSearching: false,
	results: [],
	setSearchTerm: () => {},
	setSearchScope: () => {},
	handleSearch: () => {},
	clearSearch: () => {},
}

// Create context
const SearchContext = createContext<SearchContextType>(defaultContextValue)

// Custom hook to use search context
export const useSearch = (): SearchContextType => {
	const context = useContext(SearchContext)
	if (!context) {
		throw new Error('useSearch must be used within a SearchProvider')
	}
	return context
}

// Provider props
interface SearchProviderProps {
	children: React.ReactNode
}

// Search Provider component
export const SearchProvider = ({
	children,
}: SearchProviderProps): React.ReactNode => {
	const [searchTerm, setSearchTerm] = useState('')
	const [searchScope, setSearchScope] = useState<SearchScope>('global')
	const [isSearching, setIsSearching] = useState(false)
	const [results, setResults] = useState<SearchResult[]>([])

	const handleSearch = (term: string) => {
		setSearchTerm(term)

		// Future search logic will be implemented here
		if (term.trim()) {
			setIsSearching(true)

			// Simulate search API call
			setTimeout(() => {
				// Mock search results - will be replaced with real search logic
				const mockResults: SearchResult[] = [
					{
						id: '1',
						title: `Search result for "${term}"`,
						type: searchScope,
						url: '#',
					},
				]
				setResults(mockResults)
				setIsSearching(false)
			}, 300)
		} else {
			clearSearch()
		}
	}

	const clearSearch = () => {
		setSearchTerm('')
		setResults([])
		setIsSearching(false)
	}

	const value: SearchContextType = {
		searchTerm,
		searchScope,
		isSearching,
		results,
		setSearchTerm,
		setSearchScope,
		handleSearch,
		clearSearch,
	}

	return (
		<SearchContext.Provider value={value}>{children}</SearchContext.Provider>
	)
}
