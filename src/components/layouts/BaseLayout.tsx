import type React from 'react'
import { memo } from 'react'

interface BaseLayoutProps {
	children: React.ReactNode
	className?: string
}

const BaseLayout = ({
	children,
	className = '',
}: BaseLayoutProps): React.ReactNode => {
	return <div className={`h-full w-full ${className}`}>{children}</div>
}

export default memo(BaseLayout)
