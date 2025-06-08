import type React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import type { Product } from '../../../../shared/types/Product'
import ProductForm from '../components/ProductForm'

const ProductFormPage: React.FC = () => {
	const { id } = useParams<{ id: string }>()
	const navigate = useNavigate()
	const isEditMode = Boolean(id)

	const handleSave = (productData: Partial<Product>) => {
		// TODO: Implement save logic
		console.log('Save product:', productData)
		navigate('/products')
	}

	const handleCancel = () => {
		navigate('/products')
	}

	// Mock product data for edit mode (in real app, this would be fetched from API)
	const product: Product | undefined = isEditMode
		? {
				id: id!,
				name: 'Sample Product',
				description: 'This is a sample product for editing',
				price: 99.99,
				category: 'Electronics',
				imageUrl: 'https://via.placeholder.com/300',
				isActive: true,
		  }
		: undefined

	return (
		<div className="container mx-auto px-4 py-6">
			<ProductForm
				product={product}
				onSave={handleSave}
				onCancel={handleCancel}
			/>
		</div>
	)
}

export default ProductFormPage
