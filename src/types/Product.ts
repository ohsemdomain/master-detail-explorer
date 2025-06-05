import type { Identifiable } from './Common'

export interface Product extends Identifiable {
	name: string
	description: string
	price: number
	category: string
	imageUrl: string
	isActive: boolean
}
