import type React from 'react'
import { memo } from 'react'
import type { Identifiable } from '../../types/Common'
import { ArrowLeftIcon } from '../Icons'
import Spinner from '../Spinner'

interface DetailPanelProps<T extends Identifiable> {
	selectedItem: T | null
	onSelectItem: (item: T | null) => void
	renderDetail: (item: T) => React.ReactNode
	detailTitle: string
	placeholderText?: string
	getItemTitle: (item: T) => string
	isLoading?: boolean
	showMobileHeader?: boolean
	className?: string
}

const DetailPanel = <T extends Identifiable>({
	selectedItem,
	onSelectItem,
	renderDetail,
	detailTitle,
	placeholderText = 'Select an item to view details.',
	getItemTitle,
	isLoading = false,
	showMobileHeader = true,
	className = '',
}: DetailPanelProps<T>): React.ReactNode => {
	return (
		<div className={`flex flex-col h-full ${className}`}>
			{selectedItem ? (
				<>
					{/* Mobile Header with Back Button */}
					{showMobileHeader && (
						<header className="flex-shrink-0 lg:hidden bg-gray-50 p-4 border-b border-gray-200 flex items-center sticky top-0 z-10">
							<button
								type="button"
								onClick={() => onSelectItem(null)}
								className="p-1 mr-3 text-primary-600 hover:text-primary-800 rounded-full hover:bg-gray-100 transition-colors"
								aria-label="Back to list"
							>
								<ArrowLeftIcon className="w-6 h-6" />
							</button>
							<h2 className="text-lg font-semibold text-gray-700 truncate">
								{getItemTitle(selectedItem)}
							</h2>
						</header>
					)}

					{/* Desktop Header */}
					<header className="flex-shrink-0 hidden lg:block bg-gray-50 p-4 border-b border-gray-200">
						<h2 className="text-xl font-semibold text-gray-700">
							{detailTitle}: {getItemTitle(selectedItem)}
						</h2>
					</header>

					{/* Scrollable Content Area */}
					<div className="p-6 overflow-y-auto flex-grow">
						{isLoading ? (
							<div className="flex h-full w-full items-center justify-center">
								<Spinner message="Loading details..." />
							</div>
						) : (
							renderDetail(selectedItem)
						)}
					</div>
				</>
			) : (
				<div className="hidden lg:flex h-full w-full items-center justify-center text-gray-500">
					<div className="text-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-16 h-16 mx-auto text-gray-300 mb-4"
							aria-label="Document placeholder"
							role="img"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
							/>
						</svg>
						<p>{placeholderText}</p>
					</div>
				</div>
			)}
		</div>
	)
}

export default memo(DetailPanel) as typeof DetailPanel
