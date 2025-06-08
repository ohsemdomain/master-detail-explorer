import type { Product } from '../../../../shared/types/Product'
import { PRODUCTS_DATA } from '../../../../trpc/data/products'
import { useLoader } from '../../../components/loader/useLoader'

export const useProducts = () => {
	const {
		data: products,
		loading,
		error,
		refetch,
	} = useLoader<Product[]>(() => PRODUCTS_DATA, [], { delay: 1500 })

	return {
		products: products || [],
		loading,
		error,
		refetch,
	}
}
