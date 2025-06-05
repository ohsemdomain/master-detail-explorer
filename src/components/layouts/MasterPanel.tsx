import type React from 'react'
import { memo } from 'react'
import type { Identifiable } from '../../types/Common'
import Spinner from '../Spinner'

interface MasterPanelProps<T extends Identifiable> {
	items: T[]
	selectedItem: T | null
	onSelectItem: (item: T | null) => void
	renderListItem: (
		item: T,
		isSelected: boolean,
		onSelect: () => void,
	) => React.ReactNode
	listTitle: string
	itemKeyExtractor: (item: T) => string | number
	isLoading?: boolean
	isVisible?: boolean
	className?: string
}

const MasterPanel = <T extends Identifiable>({
	items,
	selectedItem,
	onSelectItem,
	renderListItem,
	listTitle,
	itemKeyExtractor,
	isLoading = false,
	isVisible = true,
	className = '',
}: MasterPanelProps<T>): React.ReactNode => {
	return (
		<div
			className={`flex flex-col h-full ${className}`}
			aria-hidden={!isVisible}
		>
			<header className="bg-gray-50 p-4 border-b border-gray-200 flex-shrink-0 rounded-t-lg">
				<h2 className="text-xl font-semibold text-gray-700">{listTitle}</h2>
			</header>
			{isLoading ? (
				<div className="flex-grow flex flex-col items-center justify-center p-4 rounded-b-lg">
					<Spinner message="Loading items..." />
				</div>
			) : items.length === 0 ? (
				<div className="p-4 text-gray-500 text-center flex-grow flex items-center justify-center rounded-b-lg">
					No items available.
				</div>
			) : (
				<ul className="overflow-y-auto flex-grow rounded-b-lg scrollbar-modern">
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
	)
}

export default memo(MasterPanel) as typeof MasterPanel
