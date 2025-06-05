import { useLoader } from '../../../components/loader/useLoader'
import { PRODUCTS_DATA } from '../../../../trpc/data/products'
import type { Product } from '../../../../shared/types/Product'

export const useProducts = () => {
	const { data: products, loading, error, refetch } = useLoader<Product[]>(
		() => PRODUCTS_DATA,
		[],
		{ delay: 1500 }
	)

	return {
		products: products || [],
		loading,
		error,
		refetch
	}
}