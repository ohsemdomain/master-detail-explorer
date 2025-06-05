import type React from 'react'

interface IconProps {
	className?: string
	'aria-label'?: string
}

export const EmailIcon: React.FC<IconProps> = ({
	className,
	'aria-label': ariaLabel = 'Email',
}) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		strokeWidth={1.5}
		stroke="currentColor"
		className={className}
		aria-label={ariaLabel}
		role="img"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
		/>
	</svg>
)

export const PhoneIcon: React.FC<IconProps> = ({
	className,
	'aria-label': ariaLabel = 'Phone',
}) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		strokeWidth={1.5}
		stroke="currentColor"
		className={className}
		aria-label={ariaLabel}
		role="img"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.018-.991-.053-1.467l-.092-.81a11.245 11.245 0 0 0-1.548-3.097A11.336 11.336 0 0 0 14.093 9.96l-.042-.028a2.25 2.25 0 0 1-.757-2.986l.511-.681a.676.676 0 0 0-.063-.945l-1.361-1.361a.675.675 0 0 0-.945-.063l-.681.511a2.25 2.25 0 0 1-2.986-.757l-.028-.042A11.336 11.336 0 0 0 9.96 4.093a11.245 11.245 0 0 0-3.097-1.548l-.81-.092A1.88 1.88 0 0 0 4.628 2.42v-.043A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
		/>
	</svg>
)

export const LocationIcon: React.FC<IconProps> = ({
	className,
	'aria-label': ariaLabel = 'Location',
}) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		strokeWidth={1.5}
		stroke="currentColor"
		className={className}
		aria-label={ariaLabel}
		role="img"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
		/>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
		/>
	</svg>
)

export const CityIcon: React.FC<IconProps> = ({
	className,
	'aria-label': ariaLabel = 'City',
}) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		strokeWidth={1.5}
		stroke="currentColor"
		className={className}
		aria-label={ariaLabel}
		role="img"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 7.5h.75m-.75 3h.75m-.75 3h.75m3-9h.75m-.75 3h.75m-.75 3h.75M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
		/>
	</svg>
)

export const ZipIcon: React.FC<IconProps> = ({
	className,
	'aria-label': ariaLabel = 'Zip code',
}) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		strokeWidth={1.5}
		stroke="currentColor"
		className={className}
		aria-label={ariaLabel}
		role="img"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.981V18Z"
		/>
	</svg>
)

export const CountryIcon: React.FC<IconProps> = ({
	className,
	'aria-label': ariaLabel = 'Country',
}) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		strokeWidth={1.5}
		stroke="currentColor"
		className={className}
		aria-label={ariaLabel}
		role="img"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21.75 12c0 .779-.102 1.533-.294 2.243m-1.03 4.018A11.913 11.913 0 0 1 12 16.5c-1.429 0-2.776-.37-3.963-.986M12 16.5A8.959 8.959 0 0 1 4.25 12c0-.779.102-1.533.294-2.243m1.03 4.018A11.913 11.913 0 0 0 12 16.5c1.429 0 2.776-.37 3.963-.986"
		/>
	</svg>
)

export const MenuIcon: React.FC<IconProps> = ({
	className,
	'aria-label': ariaLabel = 'Menu',
}) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		strokeWidth={1.5}
		stroke="currentColor"
		className={className}
		aria-label={ariaLabel}
		role="img"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
		/>
	</svg>
)

export const XIcon: React.FC<IconProps> = ({
	className,
	'aria-label': ariaLabel = 'Close',
}) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		strokeWidth={1.5}
		stroke="currentColor"
		className={className}
		aria-label={ariaLabel}
		role="img"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M6 18L18 6M6 6l12 12"
		/>
	</svg>
)

export const ArrowLeftIcon: React.FC<IconProps> = ({
	className,
	'aria-label': ariaLabel = 'Back',
}) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		strokeWidth={1.5}
		stroke="currentColor"
		className={className}
		aria-label={ariaLabel}
		role="img"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
		/>
	</svg>
)

export const SpinnerIcon: React.FC<IconProps> = ({
	className = 'w-8 h-8 text-primary-500',
	'aria-label': ariaLabel = 'Loading',
}) => (
	<svg
		className={`animate-spin ${className}`}
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		aria-label={ariaLabel}
		role="img"
	>
		<circle
			className="opacity-25"
			cx="12"
			cy="12"
			r="10"
			stroke="currentColor"
			strokeWidth="4"
		/>
		<path
			className="opacity-75"
			fill="currentColor"
			d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
		/>
	</svg>
)

export const SearchIcon: React.FC<IconProps> = ({
	className,
	'aria-label': ariaLabel = 'Search',
}) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		strokeWidth={1.5}
		stroke="currentColor"
		className={className}
		aria-label={ariaLabel}
		role="img"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
		/>
	</svg>
)
