import type React from 'react'
import { memo } from 'react'
import DetailPanel from './DetailPanel'
import ListPanel from './ListPanel'
import PanelContainer from './PanelContainer'
import type { Identifiable } from './types'

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
	itemKeyExtractor: (item: T) => string | number
	getItemTitle: (item: T) => string
	isLoadingItems?: boolean
	isLoadingDetail?: boolean
	headerAction?: React.ReactNode
	detailHeaderAction?: React.ReactNode
}

const MasterDetailLayout = <T extends Identifiable>({
	items,
	selectedItem,
	onSelectItem,
	renderListItem,
	renderDetail,
	listTitle,
	detailTitle,
	itemKeyExtractor,
	getItemTitle,
	isLoadingItems = false,
	isLoadingDetail = false,
	headerAction,
	detailHeaderAction,
}: MasterDetailLayoutProps<T>): React.ReactNode => {
	const listPanel = (
		<ListPanel
			items={items}
			selectedItem={selectedItem}
			onSelectItem={onSelectItem}
			renderListItem={renderListItem}
			listTitle={listTitle}
			itemKeyExtractor={itemKeyExtractor}
			isLoading={isLoadingItems}
			headerAction={headerAction}
		/>
	)

	const detailPanel = (
		<DetailPanel
			selectedItem={selectedItem}
			onSelectItem={onSelectItem}
			renderDetail={renderDetail}
			detailTitle={detailTitle}
			getItemTitle={getItemTitle}
			isLoading={isLoadingDetail}
			headerAction={detailHeaderAction}
		/>
	)

	return (
		<PanelContainer
			masterPanel={listPanel}
			detailPanel={detailPanel}
			selectedItem={selectedItem}
		/>
	)
}

export default memo(MasterDetailLayout) as typeof MasterDetailLayout
