import type React from 'react'
import { useCallback, useEffect, useState } from 'react'
import MasterDetailLayout from '../../../components/layouts/master-detail/MasterDetailLayout'
import ProductListItem from '../components/ProductListItem'
import ProductDetail from '../components/ProductDetail'
import { useProducts } from '../hooks/useProducts'
import type { Product } from '../../../../shared/types/Product'



const ProductsPage: React.FC = () => {
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
	const [isLoadingDetail, setIsLoadingDetail] = useState<boolean>(false)

	// Use custom hook for data fetching
	const { products, loading: isLoading } = useProducts()

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
			window.innerWidth >= 1024 // Tailwind's 'lg' breakpoint - only auto-select on desktop
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
		(product: Product) => <ProductDetail product={product} />,
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
			itemKeyExtractor={itemKeyExtractor}
			getItemTitle={getItemTitle}
			isLoadingItems={isLoading}
			isLoadingDetail={isLoading || isLoadingDetail}
		/>
	)
}

export default ProductsPage
