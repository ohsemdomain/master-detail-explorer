import type React from 'react'
import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'
import { MenuIcon } from './components/Icons'
import Sidebar from './components/layouts/Sidebar'
import TopBar from './components/layouts/TopBar'
import { SearchProvider } from './components/layouts/search/SearchProvider'
import ContactsPage from './pages/ContactsPage'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import './index.css'

const App: React.FC = () => {
	const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

	const toggleMobileSidebar = () => {
		setIsMobileSidebarOpen(!isMobileSidebarOpen)
	}

	return (
		<ErrorBoundary>
			<SearchProvider>
				<div className="flex h-screen bg-gray-100">
					{/* Sidebar - Full Height */}
					<Sidebar
						isMobileOpen={isMobileSidebarOpen}
						toggleMobileSidebar={toggleMobileSidebar}
					/>
					
					{/* Main Content Area */}
					<div className="flex-1 flex flex-col overflow-hidden">
						{/* Mobile Header */}
						<header className="lg:hidden bg-white shadow-md p-4 sticky top-0 z-20">
							<div className="container mx-auto flex items-center justify-between">
								<button
									type="button"
									onClick={toggleMobileSidebar}
									className="text-gray-600 hover:text-primary-500 focus:outline-none"
									aria-label="Open sidebar"
									aria-expanded={isMobileSidebarOpen}
									aria-controls="mobile-sidebar"
								>
									<MenuIcon className="w-6 h-6" />
								</button>
								<span className="text-xl font-semibold text-primary-700">
									MasterDetail
								</span>
								<div className="w-6" /> {/* Placeholder to balance title */}
							</div>
						</header>

						{/* Top Bar - Desktop Only */}
						<div className="hidden lg:block">
							<TopBar />
						</div>

						{/* Page Content */}
						<main className="flex-1 container mx-auto px-4 lg:px-8 py-6 overflow-y-auto">
							<Routes>
								<Route path="/" element={<HomePage />} />
								<Route path="/products" element={<ProductsPage />} />
								<Route path="/contacts" element={<ContactsPage />} />
								<Route path="*" element={<Navigate to="/" />} />
							</Routes>
						</main>
					</div>
				</div>
			</SearchProvider>
		</ErrorBoundary>
	)
}

export default App
