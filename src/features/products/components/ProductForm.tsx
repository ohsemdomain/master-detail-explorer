import type React from 'react'
import { useState } from 'react'
import type { Product } from '../../../../shared/types/Product'
import { Select } from '../../../components/ui'

interface ProductFormProps {
	product?: Product // For edit mode
	onSave: (product: Partial<Product>) => void
	onCancel: () => void
	isLoading?: boolean
}

const ProductForm: React.FC<ProductFormProps> = ({
	product,
	onSave,
	onCancel,
	isLoading = false,
}) => {
	const [formData, setFormData] = useState({
		name: product?.name || '',
		description: product?.description || '',
		price: product?.price || 0,
		category: product?.category || '',
		imageUrl: product?.imageUrl || '',
		isActive: product?.isActive ?? true,
	})

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value, type } = e.target
		setFormData(prev => ({
			...prev,
			[name]: type === 'number' ? Number(value) : value
		}))
	}

	const handleSelectChange = (name: string, value: string) => {
		setFormData(prev => ({
			...prev,
			[name]: value
		}))
	}

	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = e.target
		setFormData(prev => ({
			...prev,
			[name]: checked
		}))
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		onSave(formData)
	}

	return (
		<div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
			<h2 className="text-2xl font-bold mb-6 text-gray-900">
				{product ? 'Edit Product' : 'Create Product'}
			</h2>
			
			<form onSubmit={handleSubmit} className="space-y-6">
				{/* Product Name */}
				<div>
					<label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
						Product Name *
					</label>
					<input
						type="text"
						id="name"
						name="name"
						value={formData.name}
						onChange={handleInputChange}
						required
						className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
						placeholder="Enter product name"
					/>
				</div>

				{/* Description */}
				<div>
					<label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
						Description *
					</label>
					<textarea
						id="description"
						name="description"
						value={formData.description}
						onChange={handleInputChange}
						required
						rows={4}
						className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
						placeholder="Enter product description"
					/>
				</div>

				{/* Price and Category Row */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{/* Price */}
					<div>
						<label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
							Price *
						</label>
						<div className="relative">
							<span className="absolute left-3 top-2 text-gray-500">$</span>
							<input
								type="number"
								id="price"
								name="price"
								value={formData.price}
								onChange={handleInputChange}
								required
								min="0"
								step="0.01"
								className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
								placeholder="0.00"
							/>
						</div>
					</div>

					{/* Category */}
					<div>
						<label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
							Category *
						</label>
						<Select
							id="category"
							name="category"
							value={formData.category}
							onChange={(value) => handleSelectChange('category', value)}
							placeholder="Select a category"
							required
							options={[
								{ value: 'Electronics', label: 'Electronics' },
								{ value: 'Clothing', label: 'Clothing' },
								{ value: 'Books', label: 'Books' },
								{ value: 'Home & Garden', label: 'Home & Garden' },
								{ value: 'Sports', label: 'Sports' },
								{ value: 'Other', label: 'Other' },
							]}
						/>
					</div>
				</div>

				{/* Image URL */}
				<div>
					<label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-2">
						Image URL
					</label>
					<input
						type="url"
						id="imageUrl"
						name="imageUrl"
						value={formData.imageUrl}
						onChange={handleInputChange}
						className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
						placeholder="https://example.com/image.jpg"
					/>
				</div>

				{/* Active Status */}
				<div className="flex items-center">
					<input
						type="checkbox"
						id="isActive"
						name="isActive"
						checked={formData.isActive}
						onChange={handleCheckboxChange}
						className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
					/>
					<label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
						Active Product
					</label>
				</div>

				{/* Form Actions */}
				<div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
					<button
						type="button"
						onClick={onCancel}
						className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
					>
						Cancel
					</button>
					<button
						type="submit"
						disabled={isLoading}
						className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
					>
						{isLoading ? 'Saving...' : product ? 'Update Product' : 'Create Product'}
					</button>
				</div>
			</form>
		</div>
	)
}

export default ProductForm
