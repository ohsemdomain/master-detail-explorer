import type React from 'react'
import { memo } from 'react'
import type { Product } from '../../../../shared/types/Product'

interface ProductDetailProps {
	product: Product
}

const ProductDetail: React.FC<ProductDetailProps> = memo(({ product }) => {
	return (
		<div className="space-y-6">
			<div>
				<img
					src={product.imageUrl}
					alt={product.name}
					className="w-full h-64 object-cover rounded-lg shadow-md mb-4"
				/>
				<h2 className="text-3xl font-bold text-primary-700 mb-2">
					{product.name}
				</h2>
				<p className="text-xl text-green-700 font-semibold mb-4">
					${product.price.toFixed(2)}
				</p>
			</div>

			<div className="bg-gray-50 p-4 rounded-lg shadow">
				<h3 className="text-lg font-semibold text-gray-700 mb-2">
					Product Description
				</h3>
				<p className="text-gray-600 leading-relaxed">{product.description}</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="bg-gray-50 p-4 rounded-lg shadow">
					<h4 className="font-semibold text-gray-700">Category</h4>
					<p className="text-gray-600">{product.category}</p>
				</div>

				<div className="bg-gray-50 p-4 rounded-lg shadow">
					<h4 className="font-semibold text-gray-700">Status</h4>
					<span
						className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
							product.isActive
								? 'bg-green-100 text-green-800'
								: 'bg-red-100 text-red-800'
						}`}
					>
						{product.isActive ? 'Active' : 'Inactive'}
					</span>
				</div>
			</div>
		</div>
	)
})

export default ProductDetail