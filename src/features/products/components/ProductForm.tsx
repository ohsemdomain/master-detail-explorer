import type React from 'react'
import type { Product } from '../../../../shared/types/Product'

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
	isLoading = false 
}) => {
	// TODO: Implement product form
	return (
		<div className="p-6 bg-white rounded-lg shadow">
			<h2 className="text-2xl font-bold mb-4">
				{product ? 'Edit Product' : 'Create Product'}
			</h2>
			<p className="text-gray-500">Product form placeholder - to be implemented</p>
			<div className="mt-4 flex gap-4">
				<button 
					type="button" 
					onClick={onCancel}
					className="px-4 py-2 bg-gray-500 text-white rounded"
				>
					Cancel
				</button>
				<button 
					type="button" 
					onClick={() => onSave({})}
					disabled={isLoading}
					className="px-4 py-2 bg-blue-500 text-white rounded"
				>
					{isLoading ? 'Saving...' : 'Save'}
				</button>
			</div>
		</div>
	)
}

export default ProductForm