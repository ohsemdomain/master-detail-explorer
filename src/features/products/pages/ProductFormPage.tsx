import type React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import type { Product } from '../../../../shared/types/Product'
import ProductForm from '../components/ProductForm'

const ProductFormPage: React.FC = () => {
	const { id: _id } = useParams<{ id: string }>()
	const navigate = useNavigate()
	// TODO: Use id for edit mode

	const handleSave = (productData: Partial<Product>) => {
		// TODO: Implement save logic
		console.log('Save product:', productData)
		navigate('/products')
	}

	const handleCancel = () => {
		navigate('/products')
	}

	// TODO: Load product data if editing
	const product = undefined // Will be loaded from API

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
