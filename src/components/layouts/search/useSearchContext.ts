import { useLocation } from 'react-router-dom'
import type { SearchScope } from './SearchProvider'

interface SearchContextConfig {
	scope: SearchScope
	placeholder: string
	shortcut: string
}

export const useSearchContext = (): SearchContextConfig => {
	const location = useLocation()
	const pathname = location.pathname

	// Determine search context based on current route
	switch (pathname) {
		case '/products':
			return {
				scope: 'products',
				placeholder: 'Search in Products (/)',
				shortcut: '/',
			}

		case '/contacts':
			return {
				scope: 'contacts',
				placeholder: 'Search in Contacts (/)',
				shortcut: '/',
			}

		default:
			return {
				scope: 'global',
				placeholder: 'Search (/)',
				shortcut: '/',
			}
	}
}
