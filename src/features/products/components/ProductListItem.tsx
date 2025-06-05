import type React from 'react'
import { memo } from 'react'
import type { Product } from '../../../../shared/types/Product'

interface ProductListItemProps {
	product: Product
	isSelected: boolean
	onSelect: () => void
}

const ProductListItem: React.FC<ProductListItemProps> = memo(({ 
	product, 
	isSelected, 
	onSelect 
}) => {
	const handleKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault()
			onSelect()
		}
	}

	return (
		<li
			key={product.id}
			onClick={onSelect}
			onKeyDown={handleKeyDown}
			aria-selected={isSelected}
			className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-primary-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 ${
				isSelected ? 'bg-primary-100 border-l-4 border-primary-500' : ''
			}`}
		>
			<h3
				className={`font-semibold ${isSelected ? 'text-primary-700' : 'text-gray-800'}`}
			>
				{product.name}
			</h3>
			<p className="text-sm text-gray-500">{product.category}</p>
			<p className="text-sm text-green-600 font-medium">
				${product.price.toFixed(2)}
			</p>
		</li>
	)
})

export default ProductListItem