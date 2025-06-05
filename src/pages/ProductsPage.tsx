import type React from 'react'
import { memo, useCallback, useEffect, useState } from 'react'
import MasterDetailLayout from '../components/MasterDetailLayout'
import { PRODUCTS_DATA } from '../constants/products'
import { useAsyncData } from '../hooks/useAsyncData'
import type { Product } from '../types/Product'

const ProductListItem: React.FC<{
	product: Product
	isSelected: boolean
	onSelect: () => void
}> = memo(({ product, isSelected, onSelect }) => {
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

const ProductDetailView: React.FC<{ product: Product }> = memo(
	({ product }) => {
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

				<div className="bg-gray-50 p-4 rounded-lg shadow">
					<h4 className="font-semibold text-gray-700">Category</h4>
					<p className="text-gray-600">{product.category}</p>
				</div>
			</div>
		)
	},
)

const ProductsPage: React.FC = () => {
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
	const [isLoadingDetail, setIsLoadingDetail] = useState<boolean>(false)

	// Use custom hook for data fetching
	const { data: products, loading: isLoading } = useAsyncData(
		() => PRODUCTS_DATA,
		[],
		{ delay: 1500 },
	)

	const handleSelectProduct = useCallback(
		(product: Product | null) => {
			if (product) {
				// Only set loading detail if it's a new product or no product was selected
				if (selectedProduct?.id !== product.id || !selectedProduct) {
					setSelectedProduct(product)
					setIsLoadingDetail(true)
					const detailTimer = setTimeout(() => {
						setIsLoadingDetail(false)
					}, 500) // Simulate detail fetch delay
					return () => clearTimeout(detailTimer)
				}
				// If same product is clicked again, ensure detail is shown without reloading
				setSelectedProduct(product)
				setIsLoadingDetail(false)
			} else {
				setSelectedProduct(null)
				setIsLoadingDetail(false)
			}
		},
		[selectedProduct],
	)

	// Auto-select first product after initial data is loaded, ONLY ON DESKTOP
	useEffect(() => {
		if (
			!isLoading &&
			products &&
			products.length > 0 &&
			!selectedProduct &&
			typeof window !== 'undefined' &&
			window.innerWidth >= 768 // Tailwind's 'md' breakpoint
		) {
			handleSelectProduct(products[0])
		}
	}, [isLoading, products, selectedProduct, handleSelectProduct])

	const renderListItem = useCallback(
		(product: Product, isSelected: boolean, onSelect: () => void) => (
			<ProductListItem
				key={product.id}
				product={product}
				isSelected={isSelected}
				onSelect={onSelect}
			/>
		),
		[],
	)

	const renderDetail = useCallback(
		(product: Product) => <ProductDetailView product={product} />,
		[],
	)

	const itemKeyExtractor = useCallback((product: Product) => product.id, [])
	const getItemTitle = useCallback((product: Product) => product.name, [])

	return (
		<MasterDetailLayout<Product>
			items={products || []}
			selectedItem={selectedProduct}
			onSelectItem={handleSelectProduct}
			renderListItem={renderListItem}
			renderDetail={renderDetail}
			listTitle="All Products"
			detailTitle="Product Details"
			placeholderText="Select a product to see its details."
			itemKeyExtractor={itemKeyExtractor}
			getItemTitle={getItemTitle}
			isLoadingItems={isLoading}
			isLoadingDetail={isLoadingDetail}
		/>
	)
}

export default ProductsPage
