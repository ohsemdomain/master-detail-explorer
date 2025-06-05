import type React from 'react'
import { memo } from 'react'
import type { Identifiable } from '../types'
import { ArrowLeftIcon } from './Icons'
import Spinner from './Spinner'

interface MasterDetailLayoutProps<T extends Identifiable> {
	items: T[]
	selectedItem: T | null
	onSelectItem: (item: T | null) => void
	renderListItem: (
		item: T,
		isSelected: boolean,
		onSelect: () => void,
	) => React.ReactNode
	renderDetail: (item: T) => React.ReactNode
	listTitle: string
	detailTitle: string
	placeholderText?: string
	itemKeyExtractor: (item: T) => string | number
	getItemTitle: (item: T) => string
	isLoadingItems?: boolean
	isLoadingDetail?: boolean
}

const MasterDetailLayout = <T extends Identifiable>({
	items,
	selectedItem,
	onSelectItem,
	renderListItem,
	renderDetail,
	listTitle,
	detailTitle,
	placeholderText = 'Select an item to view details.',
	itemKeyExtractor,
	getItemTitle,
	isLoadingItems = false,
	isLoadingDetail = false,
}: MasterDetailLayoutProps<T>): React.ReactNode => {
	return (
		<div className="relative flex flex-col md:flex-row md:gap-x-6 h-full overflow-hidden md:overflow-visible">
			{/* Master List */}
			<div
				className={`
          w-full bg-white shadow-lg rounded-lg flex flex-col
          transition-all duration-300 ease-in-out 
          ${
						selectedItem !== null
							? 'absolute -translate-x-full opacity-0 pointer-events-none'
							: 'static translate-x-0 opacity-100 pointer-events-auto flex'
					}
          md:w-1/3 lg:w-1/4 md:static md:translate-x-0 md:opacity-100 md:pointer-events-auto md:flex
          md:transition-none md:transform-none
        `}
				aria-hidden={
					selectedItem !== null &&
					typeof window !== 'undefined' &&
					window.innerWidth < 768
				}
			>
				<header className="bg-gray-50 p-4 border-b border-gray-200 flex-shrink-0">
					<h2 className="text-xl font-semibold text-gray-700">{listTitle}</h2>
				</header>
				{isLoadingItems ? (
					<div className="flex-grow flex flex-col items-center justify-center p-4">
						<Spinner message="Loading items..." />
					</div>
				) : items.length === 0 ? (
					<div className="p-4 text-gray-500 text-center flex-grow flex items-center justify-center">
						No items available.
					</div>
				) : (
					<ul className="overflow-y-auto flex-grow">
						{items.map((item) =>
							renderListItem(
								item,
								selectedItem !== null &&
									itemKeyExtractor(item) === itemKeyExtractor(selectedItem),
								() => onSelectItem(item),
							),
						)}
					</ul>
				)}
			</div>

			{/* Detail View Panel */}
			<div
				className={`
          flex flex-col overflow-hidden
          fixed inset-0 z-50 bg-white shadow-xl
          transition-transform duration-300 ease-in-out
          ${selectedItem !== null ? 'translate-x-0' : 'translate-x-full'}
          md:static md:z-auto md:w-2/3 lg:w-3/4 md:shadow-lg md:rounded-lg
          md:translate-x-0 md:transform-none md:transition-none md:flex
        `}
				aria-hidden={
					selectedItem === null &&
					typeof window !== 'undefined' &&
					window.innerWidth < 768
				}
			>
				{selectedItem ? (
					<>
						{/* Mobile Header with Back Button */}
						<header className="flex-shrink-0 md:hidden bg-gray-50 p-4 border-b border-gray-200 flex items-center sticky top-0 z-10">
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

						{/* Desktop Header */}
						<header className="flex-shrink-0 hidden md:block bg-gray-50 p-4 border-b border-gray-200">
							<h2 className="text-xl font-semibold text-gray-700">
								{detailTitle}: {getItemTitle(selectedItem)}
							</h2>
						</header>

						{/* Scrollable Content Area */}
						<div className="p-6 overflow-y-auto flex-grow">
							{isLoadingDetail ? (
								<div className="flex h-full w-full items-center justify-center">
									<Spinner message="Loading details..." />
								</div>
							) : (
								renderDetail(selectedItem)
							)}
						</div>
					</>
				) : (
					<div className="hidden md:flex h-full w-full items-center justify-center text-gray-500">
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
		</div>
	)
}

export default memo(MasterDetailLayout) as typeof MasterDetailLayout
