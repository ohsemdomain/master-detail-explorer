import type React from 'react'
import { memo } from 'react'
import type { Identifiable } from '../../types/Common'
import DetailPanel from './DetailPanel'
import MasterPanel from './MasterPanel'
import ResponsiveContainer from './ResponsiveContainer'

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
	const masterPanel = (
		<MasterPanel
			items={items}
			selectedItem={selectedItem}
			onSelectItem={onSelectItem}
			renderListItem={renderListItem}
			listTitle={listTitle}
			itemKeyExtractor={itemKeyExtractor}
			isLoading={isLoadingItems}
		/>
	)

	const detailPanel = (
		<DetailPanel
			selectedItem={selectedItem}
			onSelectItem={onSelectItem}
			renderDetail={renderDetail}
			detailTitle={detailTitle}
			placeholderText={placeholderText}
			getItemTitle={getItemTitle}
			isLoading={isLoadingDetail}
		/>
	)

	return (
		<ResponsiveContainer
			masterPanel={masterPanel}
			detailPanel={detailPanel}
			selectedItem={selectedItem}
		/>
	)
}

export default memo(MasterDetailLayout) as typeof MasterDetailLayout
