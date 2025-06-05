import type React from 'react'
import { Link } from 'react-router-dom'

const HomePage: React.FC = () => {
	return (
		<div className="text-center p-8 bg-white shadow-lg rounded-lg">
			<h1 className="text-4xl font-bold text-primary-700 mb-6">
				Welcome to Master-Detail Explorer
			</h1>
			<p className="text-lg text-gray-600 mb-8 font-mono text-xs">
				This application demonstrates a responsive master-detail layout pattern.
				Explore product listings and contact directories with ease.
			</p>
			<div className="space-x-4">
				<Link
					to="/products"
					className="bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors duration-300"
				>
					View Products
				</Link>
				<Link
					to="/contacts"
					className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors duration-300"
				>
					View Contacts
				</Link>
			</div>
			<div className="mt-12">
				<img
					src="https://picsum.photos/seed/homepage/800/400"
					alt="Abstract placeholder"
					className="rounded-lg shadow-xl mx-auto"
				/>
			</div>
		</div>
	)
}

export default HomePage
