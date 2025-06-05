import type React from 'react'
import { memo } from 'react'
import type { Identifiable } from './types'
import { ArrowLeftIcon } from '../../Icons'
import Spinner from '../../loader/Spinner'

interface DetailPanelProps<T extends Identifiable> {
	selectedItem: T | null
	onSelectItem: (item: T | null) => void
	renderDetail: (item: T) => React.ReactNode
	detailTitle: string
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
					<div className="p-6 overflow-y-auto flex-grow scrollbar-modern">
						{isLoading ? (
							<div className="flex h-full w-full items-center justify-center">
								<Spinner />
							</div>
						) : (
							renderDetail(selectedItem)
						)}
					</div>
				</>
			) : (
				<div className="flex h-full w-full items-center justify-center">
					<Spinner />
				</div>
			)}
		</div>
	)
}

export default memo(DetailPanel) as typeof DetailPanel
