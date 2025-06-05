import type React from 'react'
import { memo } from 'react'
import { useResponsive } from '../useResponsive'

interface PanelContainerProps {
	masterPanel: React.ReactNode
	detailPanel: React.ReactNode
	selectedItem: unknown
	className?: string
}

const PanelContainer = ({
	masterPanel,
	detailPanel,
	selectedItem,
	className = '',
}: PanelContainerProps): React.ReactNode => {
	const { isMobile } = useResponsive()

	return (
		<div
			className={`relative flex flex-col lg:flex-row lg:gap-x-6 h-full overflow-hidden lg:overflow-visible ${className}`}
		>
			{/* Master Panel */}
			<div
				className={`
          w-full bg-white shadow-lg rounded-lg flex flex-col
          transition-all duration-300 ease-in-out 
          ${
						selectedItem !== null && isMobile
							? 'absolute -translate-x-full opacity-0 pointer-events-none'
							: 'static translate-x-0 opacity-100 pointer-events-auto flex'
					}
          lg:w-2/5 lg:static lg:translate-x-0 lg:opacity-100 lg:pointer-events-auto lg:flex
          lg:transition-none lg:transform-none
        `}
				aria-hidden={selectedItem !== null && isMobile}
			>
				{masterPanel}
			</div>

			{/* Detail Panel */}
			<div
				className={`
          flex flex-col overflow-hidden
          fixed inset-0 z-50 bg-white shadow-xl
          transition-transform duration-300 ease-in-out
          ${selectedItem !== null ? 'translate-x-0' : 'translate-x-full'}
          lg:static lg:z-auto lg:w-3/5 lg:shadow-lg lg:rounded-lg
          lg:translate-x-0 lg:transform-none lg:transition-none lg:flex
        `}
				aria-hidden={selectedItem === null && isMobile}
			>
				{detailPanel}
			</div>
		</div>
	)
}

export default memo(PanelContainer)
