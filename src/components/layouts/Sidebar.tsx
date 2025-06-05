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
						Explorer
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

export default Sidebar
