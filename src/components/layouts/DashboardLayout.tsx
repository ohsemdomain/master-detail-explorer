import type React from 'react'
import { memo } from 'react'
import BaseLayout from './BaseLayout'

interface DashboardLayoutProps {
	children: React.ReactNode
	title?: string
	subtitle?: string
	actions?: React.ReactNode
	className?: string
}

const DashboardLayout = ({
	children,
	title,
	subtitle,
	actions,
	className = '',
}: DashboardLayoutProps): React.ReactNode => {
	return (
		<BaseLayout className={`p-6 ${className}`}>
			{(title || subtitle || actions) && (
				<header className="mb-6">
					<div className="flex items-center justify-between">
						<div>
							{title && (
								<h1 className="text-2xl font-bold text-gray-900">{title}</h1>
							)}
							{subtitle && (
								<p className="mt-1 text-sm text-gray-600">{subtitle}</p>
							)}
						</div>
						{actions && (
							<div className="flex items-center gap-3">{actions}</div>
						)}
					</div>
				</header>
			)}
			<main className="flex-1">{children}</main>
		</BaseLayout>
	)
}

export default memo(DashboardLayout)
