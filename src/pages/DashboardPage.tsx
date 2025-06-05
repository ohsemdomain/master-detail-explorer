import type React from 'react'
import DashboardLayout from '../components/layouts/DashboardLayout'

const DashboardPage: React.FC = () => {
	return (
		<DashboardLayout 
			title="Dashboard" 
			subtitle="Overview of your application"
		>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{/* Basic Stats Cards */}
				<div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
					<h3 className="text-lg font-semibold text-blue-900 mb-2">Total Products</h3>
					<p className="text-3xl font-bold text-blue-600">24</p>
				</div>
				
				<div className="bg-green-50 border border-green-200 rounded-lg p-4">
					<h3 className="text-lg font-semibold text-green-900 mb-2">Total Contacts</h3>
					<p className="text-3xl font-bold text-green-600">12</p>
				</div>
				
				<div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
					<h3 className="text-lg font-semibold text-purple-900 mb-2">Active Users</h3>
					<p className="text-3xl font-bold text-purple-600">8</p>
				</div>
			</div>
			
			{/* Recent Activity */}
			<div className="mt-8">
				<h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
				<div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
					<ul className="space-y-2">
						<li className="text-sm text-gray-600">• New product "Wireless Headphones" added</li>
						<li className="text-sm text-gray-600">• Contact "Sarah Wilson" updated</li>
						<li className="text-sm text-gray-600">• 3 new users registered today</li>
					</ul>
				</div>
			</div>
		</DashboardLayout>
	)
}

export default DashboardPage