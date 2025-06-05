import type React from 'react'
import { SpinnerIcon } from './Icons'

interface SpinnerProps {
	message?: string
	iconClassName?: string
	textClassName?: string
}

const Spinner: React.FC<SpinnerProps> = ({
	message = 'Loading...',
	iconClassName = 'w-10 h-10 text-primary-600',
	textClassName = 'text-lg text-gray-600 mt-4',
}) => {
	return (
		<div
			role="status"
			className="flex flex-col items-center justify-center"
			aria-live="polite"
			aria-busy="true"
		>
			<SpinnerIcon className={iconClassName} />
			{message && <p className={textClassName}>{message}</p>}
			<span className="sr-only">{message}</span>
		</div>
	)
}

export default Spinner
