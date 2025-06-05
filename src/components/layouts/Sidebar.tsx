import type React from 'react'
import { NavLink } from 'react-router-dom'
import { XIcon } from '../Icons'

interface SidebarProps {
	isMobileOpen: boolean
	toggleMobileSidebar: () => void
}

const Sidebar: React.FC<SidebarProps> = ({
	isMobileOpen,
	toggleMobileSidebar,
}) => {
	const commonLinkClasses =
		'flex items-center px-4 py-3 rounded-lg transition-colors duration-150 ease-in-out'
	const activeClassName = 'bg-primary-500 text-white font-semibold shadow-md'
	const inactiveClassName =
		'text-gray-300 hover:bg-primary-700 hover:text-white'

	return (
		<>
			{/* Backdrop for mobile */}
			<button
				type="button"
				className={`fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden transition-opacity duration-300 ease-in-out ${
					isMobileOpen
						? 'opacity-100 pointer-events-auto'
						: 'opacity-0 pointer-events-none'
				}`}
				onClick={toggleMobileSidebar}
				aria-label="Close sidebar"
				tabIndex={isMobileOpen ? 0 : -1}
			/>

			{/* Sidebar itself */}
			<aside
				id="mobile-sidebar"
				className={`
          bg-gray-800 text-white flex flex-col p-4 space-y-2 shadow-lg
          transform transition-transform duration-300 ease-in-out
          fixed inset-y-0 left-0 z-40 w-64 
          lg:static lg:translate-x-0 lg:flex lg:shadow-none lg:inset-auto lg:z-auto
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
				aria-label="Main navigation"
			>
				<div className="flex justify-between items-center py-2 mb-2 lg:py-4 lg:mb-4">
					<NavLink
						to="/"
						className="text-2xl font-bold text-white hover:text-primary-300 transition-colors"
					>
						MasterDetail Explorer
					</NavLink>
					<button
						type="button"
						onClick={toggleMobileSidebar}
						className="text-gray-400 hover:text-white lg:hidden"
						aria-label="Close sidebar"
					>
						<XIcon className="w-6 h-6" />
					</button>
				</div>
				<nav className="flex-grow">
					<ul>
						<li>
							<NavLink
								to="/"
								end
								className={({ isActive }) =>
									`${commonLinkClasses} ${isActive ? activeClassName : inactiveClassName}`
								}
								onClick={isMobileOpen ? toggleMobileSidebar : undefined}
							>
								<HomeIcon className="w-5 h-5 mr-3" />
								Home
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/dashboard"
								className={({ isActive }) =>
									`${commonLinkClasses} ${isActive ? activeClassName : inactiveClassName}`
								}
								onClick={isMobileOpen ? toggleMobileSidebar : undefined}
							>
								<DashboardIcon className="w-5 h-5 mr-3" />
								Dashboard
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/products"
								className={({ isActive }) =>
									`${commonLinkClasses} ${isActive ? activeClassName : inactiveClassName}`
								}
								onClick={isMobileOpen ? toggleMobileSidebar : undefined}
							>
								<ProductIcon className="w-5 h-5 mr-3" />
								Products
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/contacts"
								className={({ isActive }) =>
									`${commonLinkClasses} ${isActive ? activeClassName : inactiveClassName}`
								}
								onClick={isMobileOpen ? toggleMobileSidebar : undefined}
							>
								<ContactIcon className="w-5 h-5 mr-3" />
								Contacts
							</NavLink>
						</li>
					</ul>
				</nav>
				<div className="mt-auto text-center text-xs text-gray-500 p-2">
					Version 1.0.1
				</div>
			</aside>
		</>
	)
}

// Simple inline SVG icons for the sidebar
const DashboardIcon: React.FC<{ className?: string }> = ({ className }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		strokeWidth={1.5}
		stroke="currentColor"
		className={className}
		aria-label="Dashboard"
		role="img"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
		/>
	</svg>
)

const HomeIcon: React.FC<{ className?: string }> = ({ className }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		strokeWidth={1.5}
		stroke="currentColor"
		className={className}
		aria-label="Home"
		role="img"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5"
		/>
	</svg>
)

const ProductIcon: React.FC<{ className?: string }> = ({ className }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		strokeWidth={1.5}
		stroke="currentColor"
		className={className}
		aria-label="Products"
		role="img"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
		/>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M6 6h.008v.008H6V6Z"
		/>
	</svg>
)

const ContactIcon: React.FC<{ className?: string }> = ({ className }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		strokeWidth={1.5}
		stroke="currentColor"
		className={className}
		aria-label="Contacts"
		role="img"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A1.875 1.875 0 0 1 18 22.5H6a1.875 1.875 0 0 1-1.499-2.382Z"
		/>
	</svg>
)

export default Sidebar
