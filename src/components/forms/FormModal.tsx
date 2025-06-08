import type React from 'react'

interface FormModalProps {
	isOpen: boolean
	onClose: () => void
	title: string
	children: React.ReactNode
}

const FormModal: React.FC<FormModalProps> = ({
	isOpen,
	onClose,
	title,
	children,
}) => {
	if (!isOpen) return null

	return (
		<div className="fixed inset-0 z-50 overflow-y-auto">
			<div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
				{/* Background overlay */}
				<div
					className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
					onClick={onClose}
					onKeyDown={(e) => e.key === 'Enter' && onClose()}
					role="button"
					tabIndex={0}
					aria-label="Close modal"
				/>

				{/* Modal content */}
				<div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
					<div className="flex items-center justify-between mb-4">
						<h3 className="text-lg font-medium text-gray-900">{title}</h3>
						<button
							type="button"
							onClick={onClose}
							className="text-gray-400 hover:text-gray-600"
						>
							<span className="sr-only">Close</span>
							<svg
								className="w-6 h-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</div>
					{children}
				</div>
			</div>
		</div>
	)
}

export default FormModal
